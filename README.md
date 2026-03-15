# Bloom Women's Multispecialty Clinic — Voice AI Demo

**Assort Health — Technical Assignment Submission**

Built by Shanthanu Bhardwaj as part of the Assort Health interview process.

---

## What This Is

This repo is a working demo application I built to complete a technical assignment for Assort Health. The assignment asked me to demonstrate an understanding of voice AI in a healthcare scheduling context — both technically (build something real) and commercially (show you understand the sales motion and clinical environment the product operates in).

The result is a browser-based voice demo featuring **Amber**, an AI scheduling assistant for a fictional OB/GYN practice called **Bloom Women's Multispecialty Clinic**. The call is live — clicking the button opens a real WebRTC voice session via VAPI. Amber is not a prototype or a recording; she's a fully configured AI assistant with clinical scheduling logic baked into her system prompt.

The fictional practice, the patient database, and the scenario structure are all purpose-built for **sales-guided demos**: a sales engineer walks a prospect through the app, plays the role of a patient, and lets Amber demonstrate the scheduling conversation end-to-end. This mirrors how I'd expect a tool like this to actually be demoed in the field.

---

## What's Real vs. What's Simulated

| Component | Status |
|-----------|--------|
| Voice call via VAPI | **Real** — live WebRTC session in the browser |
| Real-time transcript | **Real** — streaming partial + final transcripts from VAPI |
| Amber's scheduling logic | **Real** — encoded in the system prompt (see [Voice Agent Design](#voice-agent-design)) |
| Patient database | **Simulated** — five hardcoded mock patients in the system prompt |
| Appointment booking | **Simulated** — Amber decides and confirms verbally; nothing writes to a calendar or EHR |
| Practice identity | **Fictional** — Bloom Women's Multispecialty Clinic does not exist |

---

## Demo Scenarios

The scenario drawer (tab on the right edge of the screen) gives the sales engineer five patient profiles to roleplay through. Each one is chosen to exercise a specific piece of Amber's clinical logic.

| # | Patient | Scenario Type | What It Demonstrates |
|---|---------|--------------|----------------------|
| 1 | **Jessica Martinez** | Annual Exam | Well-woman exam scheduling; 366-day annual exam rule; mammogram eligibility check and dual-resource booking |
| 2 | **Amanda Chen** | Prenatal OB Check | Gestational age logic (17 wks → anatomy scan at ~20 wks); double-resource appointment (ultrasound + provider) |
| 3 | **Rachel Thompson** | OB Routine Check | Visit cadence enforcement (every 2 weeks at 29 wks); existing patient continuity with same provider |
| 4 | **Danielle Brooks** | IUD Insertion | Post-consult procedure scheduling; provider routing (NP-appropriate visit) |
| 5 | **Megan Taylor** | Postpartum Follow-up | Delivery date → dual follow-up scheduling (early check + 6-week visit); vaginal vs. C-section branching logic |

Each card includes the patient's key details (DOB, insurance, last visit, provider) and a suggested opening line for the roleplay.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **React** | 18.3 | UI component model and state management |
| **Vite** | 6.0 | Dev server and production build tooling |
| **Tailwind CSS** | 3.4 | Utility-first styling with a custom warm botanical color palette |
| **`@vapi-ai/web`** | 2.0 | VAPI Web SDK — WebRTC call lifecycle, speech events, real-time transcript streaming |
| **Vercel** | — | Production hosting with automatic deploys from `main` |

No backend. The app talks directly to VAPI's infrastructure from the browser. Vite bakes the public API key into the bundle at build time via `import.meta.env`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [VAPI](https://vapi.ai) account with a configured assistant

### Installation

```bash
git clone https://github.com/shanthanucode-web/Assort-bloom-demo.git
cd bloom-demo
npm install
```

### Environment Configuration

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
VITE_VAPI_ASSISTANT_ID=your_assistant_id_here
```

### Run Locally

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Environment Variables

| Variable | Description | Where to Find It |
|----------|-------------|-----------------|
| `VITE_VAPI_PUBLIC_KEY` | VAPI public (web) API key used to initialize the SDK client | VAPI Dashboard → Account → API Keys → **Public Key** |
| `VITE_VAPI_ASSISTANT_ID` | ID of the configured Amber assistant | VAPI Dashboard → Assistants → select assistant → copy ID from URL or settings |

Both variables are required. The app surfaces a clear error in the UI if either is missing at call time.

> **Note:** `VITE_` prefix is required for Vite to expose env vars to the browser bundle. VAPI's web SDK is designed for client-side use with a public key — no secret credentials are involved.

---

## Project Structure

```
bloom-demo/
├── public/
│   └── favicon.svg               # Bloom botanical logo mark
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Clinic branding bar
│   │   ├── CallInterface.jsx      # Call button, status badge, action states
│   │   ├── WaveformRing.jsx       # Animated ring tied to agent audio volume
│   │   ├── TranscriptFeed.jsx     # Real-time scrolling transcript with partial/final states
│   │   └── ScenarioDrawer.jsx     # Slide-in panel with five patient scenario cards
│   ├── hooks/
│   │   └── useVapi.js             # All VAPI SDK integration: call lifecycle, transcript state, volume
│   ├── App.jsx                    # Root layout; wires components and the useVapi hook
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind directives and custom animation definitions
├── .env.example                   # Required environment variable template
├── tailwind.config.js             # Custom color palette (cream, terra, sage, warm-brown)
├── vite.config.js                 # Vite + React plugin config
└── package.json
```

The VAPI integration is fully encapsulated in `useVapi.js`. It initializes the SDK once on mount, registers all event listeners, and exposes a clean interface to the rest of the app. Partial transcripts are merged in-place so the feed updates smoothly mid-utterance rather than appending on every token. A `callEndedRef` flag prevents a spurious VAPI error event — which fires on normal assistant-initiated hangups — from surfacing as a UI error.

---

## Voice Agent Design

Amber's system prompt goes beyond a generic scheduling assistant. The clinical logic I encoded:

**Annual Exam Eligibility (366-Day Rule)**
Preventive well-woman exams are covered by insurance once per 366 days. Amber calculates eligibility from the patient's last visit date and flags if the patient is scheduling too early — rather than booking a visit that will be denied.

**Double-Resource Scheduling**
Some appointments require two bookings: a mammogram needs both a provider and an imaging slot; an anatomy scan needs an ultrasound tech followed by a provider visit. Amber handles both in the same call with correct sequencing.

**Gestational Age Calculations**
Amber calculates gestational age from LMP, determines the appropriate appointment type (Confirm Pregnancy vs. New OB Visit), and identifies upcoming milestones (anatomy scan at ~20 weeks, glucose screening at 24–28 weeks, GBS culture at 36 weeks).

**Visit Cadence Enforcement**
OB visit frequency follows ACOG guidelines: every 4 weeks through 28 weeks, every 2 weeks from 28–36 weeks, weekly from 36 weeks to delivery. Amber applies this rather than asking the patient what interval to use.

**Postpartum Follow-up Timing**
Vaginal deliveries: early check within 3 weeks + full visit at 6 weeks. C-sections: post-op check at 2 weeks, early postpartum at 3 weeks, full visit at 6 weeks. Amber calculates both target dates from the delivery date.

**High-Risk Pregnancy Routing**
Advanced maternal age, IVF conception, prior pre-eclampsia, gestational diabetes, or multiple gestation → MD only. Amber will not route these patients to a CNM or NP for OB care, and explains why if a patient requests one.

**Depo-Provera Injection Window**
Depo must be administered every 11–15 weeks. Amber flags patients outside the window as requiring a pregnancy test before the next injection.

**Red Flag Triage**
Symptoms like heavy bleeding, loss of fetal movement, or signs of preeclampsia route to the nurse line or 911 — not to scheduling. Amber ends the call after delivering the guidance.

**HIPAA-Aware Handling**
Amber verifies identity before discussing any appointment details and does not repeat PHI unnecessarily during the call.

---

## Assignment Reflection

**What I prioritized:**
I treated this as if I were building a real sales tool, not a homework project. That meant: a UI that looks credible in front of a prospect, a scenario structure that actually maps to a sales engineer's workflow, and agent logic that demonstrates clinical depth rather than surface-level scheduling.

On the engineering side, the main decisions worth noting: keeping everything client-side (no backend) to make the demo trivially deployable; encapsulating all VAPI state in a single custom hook so the component layer stays clean; handling partial transcript merging to keep the live feed readable; and suppressing the spurious error event VAPI fires on normal assistant-initiated hangups.

**What's intentionally out of scope:**
- The assistant configuration lives in the VAPI dashboard, not in this repo. In a production system it would be version-controlled and deployed via VAPI's API.
- No rate limiting or auth on call initiation. The public key is client-side by design, but a real deployment would proxy call starts through a backend.
- No EHR or calendar integration. Amber schedules conversationally but nothing is written anywhere.

**If this were a real product build, the next layer would include:**
- A backend service to manage call initiation, usage limits, and session tokens per demo link
- Post-call summary extraction — parsing the transcript to pull out the scheduled appointment details and surfacing them in the UI
- A/B testing on Amber's opening line and call flow to optimize prospect engagement during demos
- Multi-language support — Spanish is clinically relevant for any OB/GYN patient population
- Analytics on demo engagement: which scenarios get run, call duration, how often prospects call back

---

## Hypothetical: Production Sales Demo Platform

> What this tool would look like if Assort Health built and deployed it as an internal sales asset — used by AEs and SEs to run live demos with real prospects.

---

### Overview

The production version of this demo is a multi-tenant, self-serve sales enablement platform. Sales engineers generate shareable demo links pre-configured for a specific prospect — practice type, specialty, patient personas, and voice persona — without touching code. Each link is scoped, trackable, and expires after use.

The AI agent (Amber, or any configured persona) runs on VAPI with the assistant definition version-controlled and deployed programmatically. No configuration lives in a dashboard.

---

### Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser (React)                   │
│  Demo UI  ←→  VAPI Web SDK  ←→  VAPI Infrastructure │
└───────────────────────┬─────────────────────────────┘
                        │ REST
              ┌─────────▼──────────┐
              │   Backend API      │
              │  (Node / Express)  │
              │                    │
              │ • Session tokens   │
              │ • Call auth        │
              │ • Usage limits     │
              │ • Analytics events │
              └─────────┬──────────┘
                        │
          ┌─────────────┼──────────────┐
          ▼             ▼              ▼
     PostgreSQL      Redis         VAPI API
   (sessions,      (rate          (assistant
    analytics)      limits)        management)
```

**Call initiation is proxied through the backend.** The browser never holds a long-lived VAPI key. Instead, on call start, it requests a scoped session token from the backend, which validates the demo link, checks rate limits, logs the session start, and returns a short-lived token for that call only.

---

### Demo Link Generation

Sales engineers generate links from an internal admin UI or CLI:

```bash
assort demo create \
  --practice "Bloom Women's Clinic" \
  --specialty obgyn \
  --persona amber \
  --scenarios jessica,amanda,rachel \
  --expires 7d \
  --notify se@assort.health
```

Each link encodes a `demoId` that the backend resolves to:
- Which VAPI assistant to use
- Which patient scenarios to surface in the drawer
- Which practice branding to render
- Call limits (e.g., max 10 calls per link)

---

### Environment Variables (Production)

| Variable | Description |
|----------|-------------|
| `VAPI_PRIVATE_KEY` | Server-side VAPI key for assistant management and call auth |
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis for rate limiting and session state |
| `JWT_SECRET` | Signs scoped session tokens issued to the browser |
| `ADMIN_API_KEY` | Authenticates the demo link generation CLI/API |

The browser receives only a short-lived JWT scoped to a single call session — no raw VAPI keys on the client.

---

### Post-Call Summary

After each call, the backend receives the full transcript via VAPI webhook and runs a structured extraction pass:

```json
{
  "patient": "Jessica Martinez",
  "appointmentType": "Annual Well-Woman Exam + Mammogram",
  "provider": "Dr. Hunter Graham-Bieber",
  "location": "Fort Walton Beach",
  "proposedDate": "Tuesday, March 17th at 10:00 AM",
  "insuranceVerified": true,
  "notes": "Patient confirmed mammogram overdue per family history recommendation."
}
```

This summary surfaces in the UI immediately after the call ends — giving the SE something concrete to show the prospect ("here's what your patients would receive after every call").

---

### Analytics

Every demo session emits events to an internal analytics pipeline:

| Event | Captured Data |
|-------|--------------|
| `demo.started` | Demo link ID, SE name, practice type, timestamp |
| `scenario.selected` | Which patient scenario was opened |
| `call.started` | Session ID, VAPI call ID |
| `call.ended` | Duration, who ended the call (agent vs. user) |
| `call.completed` | Appointment type scheduled, whether red-flag routing triggered |
| `demo.converted` | Marked manually by SE post-meeting |

The internal dashboard surfaces: which scenarios prospects engage with most, average call duration by specialty, conversion rate from demo to next meeting, and which SEs run the most demos.

---

### Assistant Version Control

The Amber assistant is defined in code, not the VAPI dashboard:

```
assistants/
├── amber/
│   ├── system-prompt.md       # Full system prompt
│   ├── config.json            # Voice, model, temperature settings
│   └── scenarios/
│       ├── jessica-martinez.json
│       ├── amanda-chen.json
│       └── ...
└── deploy.js                  # Pushes assistant config to VAPI via API
```

Deployments are gated: prompt changes go through PR review before being pushed to the production assistant ID. The staging assistant runs against the same UI via a `?env=staging` query param.

---

### Multi-Persona Support

Different specialties use different assistant personas, each with specialty-specific clinical logic:

| Persona | Specialty | Configured For |
|---------|-----------|---------------|
| Amber | OB/GYN | Prenatal care, well-woman, postpartum |
| Jordan | Primary Care | Annual physicals, chronic condition management |
| Casey | Orthopedics | Surgical consults, post-op follow-ups, PT referrals |
| Morgan | Behavioral Health | Intake scheduling, therapy matching, crisis routing |

Each persona has its own system prompt, voice selection, and scenario library. The demo UI renders the correct persona based on the `demoId` in the link.
