# InternAgents

[中文](README.md) | [English](README.en.md)

InternAgents is an agent workspace developed by Shanghai AI Laboratory for research, learning, and technical exploration. It is not just a chat interface for large language models. Instead, it brings conversations, files, project materials, tool use, and human approval into one workspace, so AI can help users understand materials, break down problems, organize findings, and move real tasks forward.

![InternAgents Workspace](用户手册/assets/user-manual/02-workbench.png)

## Project Vision

InternAgents is designed to be an AI work partner for researchers, students, and knowledge workers. Users can place papers, notes, experiment records, project documents, or other materials into a workspace, then ask questions or assign tasks in natural language. InternAgents reads, analyzes, summarizes, and generates content around the current workspace while keeping human supervision available for important actions.

InternAgents is suitable for:

- Reading papers, PDFs, Markdown files, text materials, and experiment records.
- Summarizing materials into research questions, methods, contributions, limitations, and next steps.
- Comparing multiple documents and organizing differences, strengths, weaknesses, and suitable scenarios.
- Understanding project materials by identifying structure, themes, and key information.
- Creating reports, survey outlines, task lists, experiment analyses, and revision suggestions.
- Breaking long goals into steps and continuing them within the same conversation.

## Core Concepts

InternAgents is built around two core concepts:

- Workspace: The local folder InternAgents can see and process. Users place task-related materials in the workspace so InternAgents can work with them.
- Conversation: A dialogue record around a specific question or task. Different tasks can be kept in separate conversations for easier review, continuation, and archiving.

## Workspace Experience

The main interface uses a three-column workspace:

- The left side contains the project workspace and conversation list for browsing files, switching tasks, and managing history.
- The center contains the chat area where users can enter tasks, add context, and attach images or files.
- The right side provides file preview for Markdown, text, PDF, and common image formats.

On first launch, InternAgents introduces the workspace, files, conversations, configuration, and update entry through a quick tour, helping new users understand the overall workflow.

![Quick Tour](用户手册/assets/user-manual/01-workbench-tour.png)

## Key Capabilities

### Literature And Material Reading

InternAgents can help read papers, PDFs, project descriptions, and research notes, then produce structured summaries covering research questions, core methods, experimental results, contributions, limitations, and future directions.

### Multi-Document Comparison

When a workspace contains several proposals, paper summaries, or experiment descriptions, InternAgents can compare them side by side and organize the result into tables or checklists.

### Project Material Understanding

For an unfamiliar set of materials, InternAgents can first review folders, descriptions, and key files, then help users understand goals, structure, important content, and reading order.

### Reports And Content Generation

After reading or analysis, InternAgents can help generate Markdown reports, survey outlines, experiment analyses, meeting preparation notes, task lists, and other structured documents.

### Skill Extensions

InternAgents supports skills that enhance its behavior for specific tasks, such as paper reading, experiment analysis, material organization, project conventions, and document writing. Users can choose relevant skills to make the agent better aligned with the current scenario.

## Human In The Loop

InternAgents emphasizes user supervision over important actions. For file writing, content modification, or other high-impact operations, users can require confirmation through approval settings. They can review the purpose, target location, and potential risk before approving, rejecting, or adjusting the action.

This design allows InternAgents to participate in complex tasks while preserving human judgment, approval, and correction.

## Who It Is For

InternAgents is suitable for:

- Researchers who need to read and organize papers efficiently.
- Students working on course projects, experiment reports, or literature reviews.
- Knowledge workers who need to understand project materials or technical documents.
- Users who want to apply AI inside a real workspace rather than only ask single-turn questions.

## User Manual

This repository includes a beginner-friendly user manual:

- [Markdown User Manual](用户手册/user-manual.md)
- [PDF User Manual](用户手册/internagents-user-manual.pdf)

The manual covers the workspace, file preview, conversation management, attachments, configuration, skills, approval, and common questions.
