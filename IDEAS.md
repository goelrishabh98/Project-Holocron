# 💡 The Holocron Roadmap: Quirky & Technical Ideas

This file tracks the "Future Vision" for Project Holocron. These tasks range from UI polish to deep hardware-web integration.

## 🤖 Phase 1: Interactive Droids & Robots
* [ ] **The Screen-Droid Component:** Create a 3D or 2D robot model (using Three.js) where the "face" is a secondary display showing scrolling project thumbnails.
* [ ] **Physics-Based Interaction:** Allow users to "click and drag" robot assistants around the screen, utilizing a simple physics engine (p5.js or Matter.js).
* [ ] **Hover-Logic:** When a user hovers over a research paper (e.g., sustainable intelligent systems), a droid "walks" over to the link and points to it.

## ⚡ Phase 2: Power-Aware UI
* [ ] **Simulated Power Dashboard:** Implement a "System Health" footer that calculates a simulated power draw based on how many interactive Three.js elements are currently running.
* [ ] **Low-Power Mode:** A toggle that disables animations and 3D droids to "conserve energy," switching the site to a minimalist, high-contrast text mode—a nod to energy-constrained environments.

## 🕸️ Phase 3: Hardware & Terminal Navigation
* [ ] **The "Binary" Terminal:** A hidden terminal overlay (triggered by `~`) that allows users to query the `vault.yaml` directly (e.g., `holocron --get-skills`).
* [ ] **Circuit-Trace Navigation:** Replace standard nav-bars with interactive PCB traces. When a page is selected, "signals" pulse along the trace to the destination node.
* [ ] **Live Telemetry Widget:** Use the Web Serial API or an MQTT bridge to display real-time (sanitized) data from your current bench projects, like the MDBT42V BLE module or PneuMags test cycles.

## 📜 Phase 4: The Archive (Content)
* [ ] **Google Scholar Integration:** Automate the "Citations" count in the `vault.yaml` by fetching data from your Scholar profile.
* [ ] **Solar Car Retrospective:** A dedicated interactive page mapping the World Solar Challenge route across Australia with embedded technical specs from your EE lead role.
* [ ] **Muscle Actuator Visualization:** A p5.js animation visualizing the ion exchange process based on the square wave control logic used in the PCB design.

---
*Task Status:* 🟢 Ready | 🟡 In-Progress | 🔴 Backlog