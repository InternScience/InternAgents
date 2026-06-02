const manualEl = document.querySelector("#manual");
const sectionNav = document.querySelector("#sectionNav");
const menuButton = document.querySelector("#menuButton");

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[：:，,。.!！?？、/\\()[\]{}"'“”‘’]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function stripInlineToc(markdown) {
  return markdown.replace(/\n## 目录\n[\s\S]*?(?=\n## InternAgents 是什么)/, "\n");
}

function normalizeHeadingIds() {
  const used = new Map();
  const headings = [...manualEl.querySelectorAll("h1, h2, h3")];

  headings.forEach((heading) => {
    const base = slugify(heading.textContent || "section");
    const count = used.get(base) || 0;
    used.set(base, count + 1);
    heading.id = count ? `${base}-${count + 1}` : base;
  });

  return headings;
}

function renderSidebar(headings) {
  const sidebarHeadings = [];
  let inTaskTutorial = false;

  headings.forEach((heading) => {
    if (heading.tagName === "H2") {
      inTaskTutorial = heading.textContent.trim() === "任务教程";
      sidebarHeadings.push(heading);
      return;
    }

    if (inTaskTutorial && heading.tagName === "H3") {
      sidebarHeadings.push(heading);
    }
  });

  sectionNav.innerHTML = sidebarHeadings
    .map((heading) => {
      const label = escapeHtml(heading.textContent.trim());
      const className = heading.tagName === "H3" ? "subitem" : "";
      return `<a class="${className}" href="#${heading.id}">${label}</a>`;
    })
    .join("");
}

function observeActiveLinks(headings) {
  const links = [...document.querySelectorAll(".section-nav a")];
  const linkById = new Map();

  links.forEach((link) => {
    const id = decodeURIComponent(link.hash.slice(1));
    if (!linkById.has(id)) {
      linkById.set(id, []);
    }
    linkById.get(id).push(link);
  });

  const activate = (id) => {
    links.forEach((link) => link.classList.remove("active"));
    (linkById.get(id) || []).forEach((link) => link.classList.add("active"));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible[0]) {
        activate(visible[0].target.id);
      }
    },
    { rootMargin: "-15% 0px -70% 0px", threshold: [0, 1] },
  );

  headings
    .filter((heading) => ["H2", "H3"].includes(heading.tagName))
    .forEach((heading) => observer.observe(heading));

  if (headings[1]) {
    activate(headings[1].id);
  }
}

async function loadManual() {
  const response = await fetch("./user-manual.md");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const markdown = await response.text();
  const html = marked.parse(stripInlineToc(markdown), {
    gfm: true,
    breaks: false,
  });

  manualEl.innerHTML = html;
  const headings = normalizeHeadingIds();
  renderSidebar(headings);
  observeActiveLinks(headings);

  if (window.location.hash) {
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    target?.scrollIntoView();
  }
}

menuButton.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target instanceof HTMLAnchorElement && target.closest(".sidebar")) {
    document.body.classList.remove("nav-open");
  }
});

loadManual().catch((error) => {
  manualEl.innerHTML = `
    <div class="intro">
      <p class="eyebrow">加载失败</p>
      <h1>InternAgents 用户手册</h1>
      <p>手册内容暂时无法加载。你可以直接打开 <a href="./user-manual.md">Markdown 版本</a>。</p>
      <pre><code>${escapeHtml(String(error))}</code></pre>
    </div>
  `;
  sectionNav.innerHTML = '<a href="./user-manual.md">Markdown 版本</a>';
});
