# 🔷 Project Holocron

> "A Holocron is a repository of knowledge, accessible only to those with the discipline to master its interface."

Project Holocron is a **Data-Driven Portfolio & Resume Engine**. It establishes a Single Source of Truth (SSOT) for professional history, research publications, and hardware projects. By updating a central data vault, the system automatically synchronizes a high-fidelity LaTeX resume and a highly interactive, "robot-driven" portfolio website.

## 🏛️ The Architecture

The system uses a **Decoupled Data Architecture** to ensure consistency across all formats:

1.  **The Core (`/data`):** A single `vault.yaml` containing all job history, skills, and project details (e.g., PneuMags development, Solar Car EE lead, and research on energy-constrained systems).
2.  **The PDF Engine (`/resume`):** A Python script using **Jinja2** to inject YAML data into a professional LaTeX template.
3.  **The Web Interface (`/web`):** An **Astro**-based site that consumes the YAML data to generate static pages with high-performance interactive islands.
4.  **The Automation (`/.github/workflows`):** GitHub Actions that trigger on every push to re-compile the PDF and deploy the site to the cloud.

## 🛠️ Tech Stack

* **Source:** YAML / JSON
* **Web Framework:** Astro (Multi-framework support for React/Three.js)
* **Resume Engine:** LaTeX / Python (Jinja2)
* **Deployment:** GitHub Actions / Vercel (or Netlify)
* **Interactivity:** Three.js / p5.js

## 🚀 Getting Started

1.  **Modify the Vault:** Edit `data/vault.yaml` with your latest research milestones or project updates.
2.  **Local Dev:** Run `npm run dev` in the `/web` directory to see the live site.
3.  **Build Resume:** Run `python build_resume.py` to generate the latest `resume.pdf`.
4.  **Sync:** Push to `main`. The Holocron handles the rest.