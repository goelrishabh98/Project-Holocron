---
title: "Project Holocron"
slug: "project-holocron"
tagline: "Project Holocron enables easy updated to my resume and website by keeping a single source of truth document"
date: 2026-03-11
tags: ["Computer Science", "Web Dev", "Server", "hosting", "Python"]
featured: false
status: "active"
category: "personal"
---

## Overview

This site, and the resume it generates. Project Holocron keeps a single source
of truth for my professional history, publications, and projects, then compiles
that one dataset into two very different outputs: a typeset PDF resume and a
static portfolio website. Updating a job, a paper, or a project means editing one
YAML file — never reconciling a document against a webpage.

## Technical Details

- Structured all professional data as a central `vault.yaml`, with projects and
  publications as markdown files carrying typed frontmatter
- Built the resume engine in Python, injecting vault data into a LaTeX template
  through Jinja2 with custom delimiters so Jinja's syntax doesn't collide with
  LaTeX's braces
- Built the site in Astro, reading the same vault directly and validating every
  markdown file against a schema at build time, so a malformed entry fails the
  build instead of silently rendering wrong
- Automated the whole pipeline in GitHub Actions: each push to `main` recompiles
  the PDF, rebuilds the site, and deploys to GitHub Pages
