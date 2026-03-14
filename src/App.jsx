import { useState } from 'react';
import Header from './components/Header.jsx';
import CallInterface from './components/CallInterface.jsx';
import TranscriptFeed from './components/TranscriptFeed.jsx';
import ScenarioDrawer from './components/ScenarioDrawer.jsx';
import { useVapi } from './hooks/useVapi.js';

// Lush botanical corner accents — layered sage stems, terra berry clusters
function BotanicalAccents() {
  const leafLg = "M 0,0 C -6,-10 -7,-24 0,-30 C 7,-24 6,-10 0,0";
  const leafMd = "M 0,0 C -5,-8 -6,-18 0,-22 C 6,-18 5,-8 0,0";
  const leafSm = "M 0,0 C -4,-6 -5,-14 0,-17 C 5,-14 4,-6 0,0";
  const leafRd = "M 0,0 C -8,-7 -9,-17 0,-21 C 9,-17 8,-7 0,0";

  return (
    <>
      {/* ─── Top-right corner ─── */}
      <svg
        className="fixed top-0 right-0 pointer-events-none select-none"
        aria-hidden="true"
        width="300" height="320" viewBox="0 0 300 320"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        style={{ zIndex: 0 }}
      >
        {/* Ghost background layer — depth */}
        <path d="M 300,2 C 262,34 226,70 192,108 C 162,142 132,178 100,218"
              stroke="#7DAB82" strokeWidth="1" fill="none" opacity="0.14" />
        <path d={leafLg} fill="#7DAB82" opacity="0.08" transform="translate(270,25) rotate(-52)" />
        <path d={leafLg} fill="#7DAB82" opacity="0.08" transform="translate(228,68) rotate(24)" />
        <path d={leafLg} fill="#7DAB82" opacity="0.08" transform="translate(192,108) rotate(-46)" />

        {/* Main stem */}
        <path d="M 300,2 C 262,34 226,70 192,108 C 162,142 132,178 100,218 C 78,244 56,270 36,302"
              stroke="#5A8B64" strokeWidth="1.5" fill="none" opacity="0.3" />

        {/* Main stem leaves — alternating sides */}
        <path d={leafLg} fill="#5A8B64" opacity="0.2"  transform="translate(272,22) rotate(-54)" />
        <path d={leafMd} fill="#5A8B64" opacity="0.18" transform="translate(248,44) rotate(22)" />
        <path d={leafLg} fill="#5A8B64" opacity="0.2"  transform="translate(218,72) rotate(-50)" />
        <path d={leafMd} fill="#5A8B64" opacity="0.18" transform="translate(196,100) rotate(24)" />
        <path d={leafMd} fill="#5A8B64" opacity="0.18" transform="translate(168,132) rotate(-46)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.16" transform="translate(146,160) rotate(20)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.16" transform="translate(116,194) rotate(-42)" />

        {/* Branch 1 — from ~(242,50) up-left to ~(120,12) */}
        <path d="M 242,50 C 216,36 190,24 164,14 C 148,8 134,4 120,12"
              stroke="#5A8B64" strokeWidth="1.2" fill="none" opacity="0.28" />
        <path d={leafRd} fill="#5A8B64" opacity="0.18" transform="translate(222,40) rotate(-56)" />
        <path d={leafRd} fill="#5A8B64" opacity="0.17" transform="translate(196,26) rotate(-60)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.16" transform="translate(166,14) rotate(-64)" />
        {/* Berry cluster */}
        <circle cx="120" cy="14" r="5"   fill="#C4785A" opacity="0.24" />
        <circle cx="112" cy="8"  r="3.5" fill="#C4785A" opacity="0.18" />
        <circle cx="128" cy="8"  r="3.5" fill="#DBA88F" opacity="0.20" />
        <circle cx="128" cy="20" r="3"   fill="#DBA88F" opacity="0.17" />
        <circle cx="112" cy="20" r="3"   fill="#C4785A" opacity="0.17" />

        {/* Branch 2 — from ~(196,106) left to ~(68,130) */}
        <path d="M 196,106 C 174,114 150,120 126,124 C 108,127 88,130 68,130"
              stroke="#5A8B64" strokeWidth="1.2" fill="none" opacity="0.26" />
        <path d={leafMd} fill="#5A8B64" opacity="0.17" transform="translate(174,114) rotate(8)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.16" transform="translate(148,121) rotate(6)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.15" transform="translate(120,125) rotate(4)" />
        <circle cx="68"  cy="130" r="4"   fill="#C4785A" opacity="0.18" />
        <circle cx="60"  cy="124" r="3"   fill="#DBA88F" opacity="0.15" />
        <circle cx="60"  cy="136" r="2.5" fill="#DBA88F" opacity="0.14" />

        {/* Branch 3 — from ~(138,176) left-down to ~(14,218) */}
        <path d="M 138,176 C 114,186 90,196 66,206 C 48,212 28,216 14,218"
              stroke="#5A8B64" strokeWidth="1" fill="none" opacity="0.22" />
        <path d={leafSm} fill="#5A8B64" opacity="0.16" transform="translate(110,184) rotate(28)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.15" transform="translate(84,196) rotate(24)" />
        <circle cx="16"  cy="218" r="3.5" fill="#C4785A" opacity="0.16" />
        <circle cx="8"   cy="212" r="2.5" fill="#DBA88F" opacity="0.13" />

        {/* Foreground accent leaves — slightly higher opacity for depth pop */}
        <path d={leafSm} fill="#5A8B64" opacity="0.24" transform="translate(258,32) rotate(-55)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.22" transform="translate(205,88) rotate(26)" />

        {/* Scattered accent dots */}
        <circle cx="294" cy="8"   r="3"   fill="#C4785A" opacity="0.18" />
        <circle cx="284" cy="15"  r="2"   fill="#DBA88F" opacity="0.15" />
        <circle cx="158" cy="148" r="2.5" fill="#C4785A" opacity="0.15" />
        <circle cx="126" cy="184" r="2"   fill="#DBA88F" opacity="0.13" />
      </svg>

      {/* ─── Bottom-left corner ─── */}
      <svg
        className="fixed bottom-0 left-0 pointer-events-none select-none"
        aria-hidden="true"
        width="300" height="320" viewBox="0 0 300 320"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        style={{ zIndex: 0 }}
      >
        {/* Ghost background layer */}
        <path d="M 0,318 C 38,280 74,242 110,202 C 142,166 174,134 208,108"
              stroke="#7DAB82" strokeWidth="1" fill="none" opacity="0.14" />
        <path d={leafLg} fill="#7DAB82" opacity="0.08" transform="translate(30,296) rotate(52)" />
        <path d={leafLg} fill="#7DAB82" opacity="0.08" transform="translate(72,254) rotate(-24)" />
        <path d={leafLg} fill="#7DAB82" opacity="0.08" transform="translate(108,208) rotate(46)" />

        {/* Main stem */}
        <path d="M 0,318 C 38,280 74,240 110,200 C 142,164 174,134 208,108 C 234,88 260,68 286,48"
              stroke="#5A8B64" strokeWidth="1.5" fill="none" opacity="0.3" />

        {/* Main stem leaves */}
        <path d={leafLg} fill="#5A8B64" opacity="0.2"  transform="translate(28,298) rotate(54)" />
        <path d={leafMd} fill="#5A8B64" opacity="0.18" transform="translate(52,276) rotate(-22)" />
        <path d={leafLg} fill="#5A8B64" opacity="0.2"  transform="translate(78,248) rotate(50)" />
        <path d={leafMd} fill="#5A8B64" opacity="0.18" transform="translate(104,220) rotate(-24)" />
        <path d={leafMd} fill="#5A8B64" opacity="0.18" transform="translate(132,192) rotate(46)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.16" transform="translate(154,166) rotate(-20)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.16" transform="translate(182,138) rotate(42)" />

        {/* Branch 1 — from ~(58,258) down-right to ~(182,316) */}
        <path d="M 58,258 C 82,272 108,284 134,296 C 154,304 170,310 182,316"
              stroke="#5A8B64" strokeWidth="1.2" fill="none" opacity="0.28" />
        <path d={leafRd} fill="#5A8B64" opacity="0.18" transform="translate(76,267) rotate(56)" />
        <path d={leafRd} fill="#5A8B64" opacity="0.17" transform="translate(104,282) rotate(60)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.16" transform="translate(136,295) rotate(64)" />
        {/* Berry cluster */}
        <circle cx="182" cy="314" r="5"   fill="#C4785A" opacity="0.24" />
        <circle cx="174" cy="308" r="3.5" fill="#C4785A" opacity="0.18" />
        <circle cx="190" cy="308" r="3.5" fill="#DBA88F" opacity="0.20" />
        <circle cx="190" cy="318" r="3"   fill="#DBA88F" opacity="0.17" />
        <circle cx="174" cy="318" r="3"   fill="#C4785A" opacity="0.17" />

        {/* Branch 2 — from ~(108,200) right to ~(234,224) */}
        <path d="M 108,200 C 130,208 154,216 178,220 C 198,224 216,226 234,224"
              stroke="#5A8B64" strokeWidth="1.2" fill="none" opacity="0.26" />
        <path d={leafMd} fill="#5A8B64" opacity="0.17" transform="translate(128,210) rotate(-8)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.16" transform="translate(154,217) rotate(-6)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.15" transform="translate(180,221) rotate(-4)" />
        <circle cx="234" cy="224" r="4"   fill="#C4785A" opacity="0.18" />
        <circle cx="242" cy="218" r="3"   fill="#DBA88F" opacity="0.15" />
        <circle cx="242" cy="230" r="2.5" fill="#DBA88F" opacity="0.14" />

        {/* Branch 3 — from ~(166,132) right-up to ~(286,90) */}
        <path d="M 166,132 C 188,122 212,112 236,102 C 256,95 272,92 286,90"
              stroke="#5A8B64" strokeWidth="1" fill="none" opacity="0.22" />
        <path d={leafSm} fill="#5A8B64" opacity="0.16" transform="translate(188,122) rotate(-28)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.15" transform="translate(216,108) rotate(-24)" />
        <circle cx="284" cy="90"  r="3.5" fill="#C4785A" opacity="0.16" />
        <circle cx="292" cy="84"  r="2.5" fill="#DBA88F" opacity="0.13" />

        {/* Foreground accent leaves */}
        <path d={leafSm} fill="#5A8B64" opacity="0.24" transform="translate(42,285) rotate(55)" />
        <path d={leafSm} fill="#5A8B64" opacity="0.22" transform="translate(95,232) rotate(-26)" />

        {/* Scattered accent dots */}
        <circle cx="6"   cy="312" r="3"   fill="#C4785A" opacity="0.18" />
        <circle cx="16"  cy="305" r="2"   fill="#DBA88F" opacity="0.15" />
        <circle cx="144" cy="172" r="2.5" fill="#C4785A" opacity="0.15" />
        <circle cx="175" cy="150" r="2"   fill="#DBA88F" opacity="0.13" />
      </svg>
    </>
  );
}

export default function App() {
  const [scenariosOpen, setScenariosOpen] = useState(false);
  const {
    callStatus,
    transcript,
    isSpeaking,
    volumeLevel,
    error,
    startCall,
    endCall,
    resetCall,
  } = useVapi();

  return (
    <div
      className="min-h-screen font-body text-warm-brown flex flex-col overflow-x-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 38%, #fdf0e8 0%, #faf7f2 52%, #f5ede5 100%)' }}
    >

      <BotanicalAccents />
      <Header />

      {/* Main content — vertically centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">

          <CallInterface
            callStatus={callStatus}
            isSpeaking={isSpeaking}
            volumeLevel={volumeLevel}
            error={error}
            onStart={startCall}
            onEnd={endCall}
            onReset={resetCall}
          />

          {/* Transcript fades in after first message */}
          {transcript.length > 0 && (
            <div className="w-full">
              <TranscriptFeed transcript={transcript} />
            </div>
          )}

        </div>
      </main>

      {/* Footer — practice info */}
      <footer className="border-t border-cream-dark py-3 px-6">
        <p className="text-center text-[10px] tracking-widest uppercase text-warm-gray/50 font-body">
          Fort Walton Beach &nbsp;·&nbsp; Jacksonville &nbsp;·&nbsp; Bloom Women's Multispecialty Clinic
        </p>
      </footer>

      {/* Scenarios toggle tab — vertical text on right edge */}
      <button
        onClick={() => setScenariosOpen(true)}
        className="
          fixed right-0 top-1/2 -translate-y-1/2 z-20
          bg-cream-dark hover:bg-terra-mute text-warm-gray hover:text-warm-brown
          transition-colors duration-200
          rounded-l-lg px-3 py-5
          text-[10px] tracking-widest uppercase font-body
        "
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
        aria-label="Open demo scenarios"
      >
        Scenarios
      </button>

      <ScenarioDrawer
        isOpen={scenariosOpen}
        onClose={() => setScenariosOpen(false)}
      />

    </div>
  );
}
