---
title: "Sweepy: Acoustic Material Identification"
slug: "material-sound-id"
tagline: "Identifying what an object is made of from its acoustic response to an inaudible chirp"
date: 2026-07-18
tags: ["acoustic sensing", "machine learning", "signal processing", "iOS", "PCB"]
featured: false
status: "active"
category: "research"
draft: true
---

<!-- SCAFFOLD — review before publishing.
     TODO: confirm the date (currently last-activity, not project start)
     TODO: decide featured: true — this is arguably the flagship
     TODO: check paper status before publishing accuracy numbers (Sweepy.pdf)
     TODO: add a system-diagram thumbnail (figures/System_overview.png exists) -->

## Overview

Sweepy identifies the material an object is made from by listening to how it
responds to sound. An inaudible swept-sine chirp is played from a speaker placed
near the object, a microphone captures the response, and a classifier sorts the
result into one of five material classes: glass, metal, paper, plastic, and
organic.

The premise is that an object's geometry and material determine how it absorbs
and reflects energy across frequency — a signature that is invisible to a camera
but recoverable from a single cheap microphone.

## How it works

1. A 10 Hz – 22 kHz swept-sine chirp is played through a speaker near the object.
2. A microphone records the acoustic response simultaneously.
3. A control recording of the empty surface is subtracted to isolate the material's own signature.
4. The STFT spectral profile feeds a StandardScaler → PCA → LogisticRegression pipeline.
5. The pipeline emits a material class.

## Technical Details

- Built `acoustikit`, a Python library holding all core logic — WAV/filename I/O,
  STFT spectral profiling, control subtraction, label consolidation, pipeline
  construction, and cross-validation — so experiments stay reproducible rather
  than living in notebooks
- Collected four datasets spanning desktop and mobile microphones, with 40+
  distinct object variants across the five classes in the main dataset
- Designed custom microphone PCBs to control the capture chain rather than
  depending on consumer hardware
- Evaluated with object-grouped and leave-one-device-out cross-validation, so
  reported accuracy reflects generalization to unseen physical objects rather
  than memorized recordings
- Explored wavelet scattering transforms, PCEN, model ensembles, test-time
  augmentation, and device-invariance techniques to close the gap between
  same-object and unseen-object performance

<!-- TODO: add results. Two numbers exist and they measure different things —
     be explicit about which is which, since the leakage-free number is the
     honest one and the LOO number is the flattering one. -->

## Companion iOS app

A SwiftUI capture app makes dataset collection practical in the field. It plays
the reference chirp while recording in iOS *measurement mode* — which disables
automatic gain control, EQ, and echo cancellation, all of which would otherwise
corrupt the spectral signature. Each capture is tagged with a stable object ID so
that object-grouped cross-validation stays leakage-free, then synced over WiFi
directly into the research repo's dataset and catalog.
