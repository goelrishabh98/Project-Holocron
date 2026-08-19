---
title: "Pneumag"
slug: "pneumag"
tagline: "Energy-harvesting power front-end that runs a sensing payload on microwatts"
date: 2026-03-01
tags: ["energy harvesting", "power management", "PCB", "battery-free", "embedded"]
featured: false
status: "active"
category: "research"
draft: true
---

<!-- SCAFFOLD — review before publishing.
     DISCLOSURE: this overlaps your submitted 2025 patent on batteryless
     fixed-wing UAVs / energy-harvesting systems. Confirm with your advisor and
     GT OTL what is safe to describe publicly BEFORE this goes live. The draft
     below is deliberately architectural — no part numbers, no component values,
     no schematics. Do not add them without clearing it first.
     TODO: confirm the date — currently a placeholder. -->

## Overview

Pneumag is the power-management front-end for a battery-free sensing system: it
harvests energy from motion, conditions it across wildly different input
regimes, banks it, and delivers a stable rail to a downstream application load —
all within a power budget small enough that the system never needs a battery.

The hard part is not any single converter. It is that the harvester produces
energy in two very different regimes, and a design tuned for one is badly
mismatched to the other.

## Technical Details

- Designed a two-channel "regime-split" architecture: high-voltage impact events
  and low-voltage continuous motion are each routed to a harvesting front-end
  suited to that regime, rather than compromising on a single converter
- Combined the two channels through ideal-diode OR-ing into a shared
  supercapacitor bank, so neither channel can back-feed the other
- Fed the banked energy through a buck-boost stage to hold a stable rail as the
  supercapacitor voltage sags across its usable range
- Targeted a sub-10 µW quiescent draw, since at this scale the power management
  circuit's own idle consumption is a first-order term in the energy budget, not
  a rounding error
- Instrumented the design with on-board coulomb counting so harvested energy can
  be measured directly rather than inferred
- Captured the design as PRDs covering power management, the application load
  subsystem, simulation and modeling, and field analytics — with the schematic
  generated from an editable script and validated in CI

<!-- TODO: describe the application load and the deployment context — what the
     system actually senses and where it goes. Cleared-for-publication only. -->
