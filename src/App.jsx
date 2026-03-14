import { useState } from 'react';
import Header from './components/Header.jsx';
import CallInterface from './components/CallInterface.jsx';
import TranscriptFeed from './components/TranscriptFeed.jsx';
import ScenarioDrawer from './components/ScenarioDrawer.jsx';
import { useVapi } from './hooks/useVapi.js';

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
    <div className="min-h-screen bg-cream font-body text-warm-brown flex flex-col overflow-x-hidden">

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
