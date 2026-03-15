# Bloom Women's Multispecialty Clinic — Voice AI Demo

A prospect-facing demo application for **Assort Health**, showcasing a VAPI-powered voice AI scheduling agent named **Amber** deployed for a fictional OB/GYN practice. Built as a technical assignment submission.

---

## Project Overview

This is a single-page React app that puts a live voice AI agent in the browser. A visitor clicks one button, a WebRTC call connects via VAPI, and they're talking to Amber — an AI scheduling assistant trained on the clinical workflows of a women's multispecialty clinic.

The demo is designed for **sales-assisted walkthroughs**: a sales engineer opens the app with a prospect, selects one of five pre-built patient scenarios from a side drawer, and the prospect roleplays as the patient. Amber handles the scheduling conversation end-to-end.

**What it demonstrates:**

- In-browser voice calls to a VAPI assistant (no phone number, no app install)
- Real-time partial + final transcript rendering during the call
- Live call status and animated audio waveform ring tied to agent volume
- A scenario drawer with roleplay prompts for sales-guided demos
- Clinical scheduling logic embedded in the agent prompt (see [Voice Agent Design](#voice-agent-design))

---

## Demo Scenarios

The scenario drawer (accessible via the tab on the right edge of the screen) provides five patient profiles covering the most common scheduling use cases for an OB/GYN practice.

| # | Patient | Scenario Type | What It Demonstrates |
|---|---------|--------------|----------------------|
| 1 | **Jessica Martinez** | Annual Exam | Well-woman exam scheduling; 366-day annual exam rule; mammogram eligibility check and dual-resource booking |
| 2 | **Amanda Chen** | New OB Intake | New pregnancy intake; gestational age logic (17 wks → anatomy scan at ~20 wks); insurance capture; transfer-of-care handling |
| 3 | **Rachel Thompson** | OB Routine Check | Visit cadence enforcement (every 4 weeks at 29 wks); gestational diabetes flag; existing patient at a specific location |
| 4 | **Danielle Brooks** | IUD Insertion | Post-consult procedure scheduling; Mirena IUD; preference-aware slot selection |
| 5 | **Megan Taylor** | Postpartum Follow-up | Delivery date → 6-week follow-up calculation (vaginal delivery Feb 26); location preference routing |

Each card in the drawer includes a suggested opening line the prospect can use to kick off the call naturally.

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
git clone https://github.com/shanthanu/bloom-demo.git
cd bloom-demo
npm install
```

### Environment Configuration

Copy the example file and fill in your VAPI credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
VITE_VAPI_ASSISTANT_ID=your_assistant_id_here
```

See [Environment Variables](#environment-variables) below for where to find these values.

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

Both variables are required. The app will surface a clear error in the UI if either is missing at call time.

> **Note:** These variables are prefixed `VITE_` so Vite exposes them to the browser bundle. Do not put private/secret keys here — VAPI's web SDK is intentionally designed to be used with the public key on the client side.

---

## Project Structure

```
bloom-demo/
├── public/
│   └── favicon.svg               # Bloom brand mark
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Clinic name and branding bar
│   │   ├── CallInterface.jsx      # Main call button, status badge, and action states
│   │   ├── WaveformRing.jsx       # Animated SVG ring that pulses with agent audio volume
│   │   ├── TranscriptFeed.jsx     # Real-time scrolling transcript with partial/final states
│   │   └── ScenarioDrawer.jsx     # Slide-in panel with five patient scenario cards
│   ├── hooks/
│   │   └── useVapi.js             # All VAPI SDK integration: call lifecycle, transcript state, volume
│   ├── App.jsx                    # Root layout; wires together all components and the useVapi hook
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind directives and custom font/animation definitions
├── .env.example                   # Required environment variable template
├── tailwind.config.js             # Custom color palette (cream, terra, sage, warm-brown)
├── vite.config.js                 # Vite + React plugin config
└── package.json
```

The VAPI integration is fully encapsulated in `useVapi.js`. It initializes the SDK once on mount, registers all event listeners, and exposes a clean interface (`startCall`, `endCall`, `resetCall`, `callStatus`, `transcript`, `isSpeaking`, `volumeLevel`) to the rest of the app. Partial transcripts are merged in-place so the feed updates smoothly mid-utterance rather than appending on every token.

---

## Voice Agent Design

Amber's system prompt encodes a meaningful amount of clinical scheduling logic that goes beyond generic assistant behavior. Key rules baked in:

**Annual Exam Eligibility (366-Day Rule)**
Preventive well-woman exams are only covered by insurance once per 366 days. Amber calculates eligibility from the patient's last visit date and will flag if a patient is attempting to schedule too early, rather than booking a visit that will be denied by insurance.

**Double-Resource Scheduling**
A mammogram requires both a provider and imaging equipment. Amber understands that when a patient requests an annual exam *and* a mammogram, two separate scheduling actions are needed — she handles both in the same call rather than only booking the exam.

**Gestational Age Calculations**
Amber takes a last menstrual period (LMP) or current gestational age, calculates the estimated due date, and uses it to determine which appointment type is appropriate. At 17 weeks, an anatomy scan is coming up at ~20 weeks. At 29 weeks, visits should be every 4 weeks per standard OB protocol.

**Visit Cadence Enforcement**
OB visit frequency follows clinical guidelines: every 4 weeks through 28 weeks, every 2 weeks from 28–36 weeks, weekly from 36 weeks to delivery. Amber applies this logic when booking the next appointment rather than asking the patient what interval to use.

**Postpartum Follow-up Timing**
Vaginal deliveries: 6-week postpartum visit. C-sections: 2-week wound check followed by 6-week visit. Amber calculates the target date from the delivery date provided by the patient.

**High-Risk Pregnancy Routing**
Patients with flags like gestational diabetes, hypertension, or multiple gestation are routed to an MD rather than a CNM, and are flagged for closer monitoring intervals.

**Depo-Provera Injection Window**
Depo shots must be administered within a specific window (every 11–13 weeks). Amber enforces the acceptable window when scheduling rather than booking outside of it.

**HIPAA-Aware Call Handling**
Amber does not repeat sensitive patient information back unnecessarily, avoids confirming or denying appointment details to callers who haven't been verified, and uses appropriate language when discussing clinical information.

**Red Flag Triage**
Certain symptom descriptions (heavy bleeding, loss of fetal movement, signs of preeclampsia) trigger Amber to redirect to emergency care rather than continue scheduling, with a brief explanation of urgency.

---

## Assignment Notes

**What was prioritized:**
The demo is built to be convincing in a live sales context. The UI is polished and clinical in tone — it looks like something a real practice could deploy, not a hackathon prototype. The scenario drawer is purpose-built for the sales engineer workflow: it's non-intrusive to the prospect but immediately accessible.

The VAPI integration handles edge cases that matter in a live demo: partial transcript merging (so text doesn't stutter), graceful error states if the key is missing, and clean call reset so the demo can be run multiple times in a single session without a page refresh.

**Known limitations:**
- The assistant configuration (system prompt, voice, model settings) lives in the VAPI dashboard and is not version-controlled here. A production implementation would use VAPI's API to programmatically define the assistant so the full agent config is in code.
- There is no authentication layer. The public VAPI key is intentionally designed to be client-side, but in a real deployment you'd want to proxy call initiation through a backend to prevent unauthorized usage.
- The demo does not connect to a real scheduling system. Amber simulates scheduling decisions conversationally but does not write to any calendar or EHR.

**What would be added with more time:**
- Backend proxy for call initiation with rate limiting and session tokens
- Post-call summary panel showing the scheduled appointment details extracted from the transcript
- Multi-language support (Spanish is highly relevant for an OB/GYN patient population)
- Analytics event logging for demo engagement (call duration, scenarios selected)
