---
title: "Sensorless Pump Sensing via Back-EMF"
slug: "back-emf-pump-sensing"
tagline: "Recovering pump state from motor back-EMF, with no added sensor"
date: 2026-08-17
tags: ["embedded", "analog design", "PCB", "instrumentation", "soft robotics"]
featured: false
status: "active"
category: "research"
---

<!-- SCAFFOLD — review before publishing.
     TODO: state the research question explicitly — what pump state you're
     recovering (pressure? flow? occlusion? actuator failure?) and why a
     sensorless approach matters for the soft-actuator work.
     TODO: add results once the board is characterized. -->

## Overview

A pneumatic pump's motor already encodes a great deal about what the pump is
doing. When drive is removed and the motor is allowed to coast, it acts as a
generator, and the resulting back-EMF carries information about the mechanical
load the pump is working against. Reading it well means you can infer pump state
without adding a pressure or flow sensor — no extra part, no extra failure mode,
no extra power draw.

The obstacle is that this is a genuinely difficult measurement. The signal of
interest is small, rides on a switching power stage, and appears only during
brief coast windows. Most of the engineering is in the analog front-end and the
sampling strategy, not the algorithm.

## Technical Details

- Designed a custom measurement board around a coast-capable motor driver, so the
  firmware can command clean high-impedance windows in which back-EMF is
  observable
- Built a differential front-end with tightly matched precision resistors, since
  common-mode rejection — not gain — sets the noise floor on this measurement
- Placed a dedicated current-sense amplifier directly at a Kelvin-connected shunt,
  so the sense path shares no copper with the high-current motor return
- Laid the board out around a star ground that keeps the analog sense grounds off
  the motor's current path, with the driver's thermal pad tied into the pour as
  both heatsink and return
- Moved from breadboard to SMD PCB specifically to eliminate the parasitic
  inductance and coupling that were limiting capture quality on the bench
- Implemented PWM-phase-locked acquisition, triggering the ADC from the PWM
  timer through the chip's crossbar and DMA so every sample lands at a known,
  jitter-free point in the drive cycle rather than being scheduled in software

<!-- TODO: results — what you can actually distinguish from the back-EMF signal,
     and how it compares against a ground-truth sensor. -->
