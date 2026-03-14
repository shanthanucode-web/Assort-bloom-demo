import WaveformRing from './WaveformRing.jsx';

// Small location pin icon
function PinIcon() {
  return (
    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" aria-hidden="true">
      <path d="M3.5 0C1.57 0 0 1.57 0 3.5C0 5.88 3.5 9 3.5 9C3.5 9 7 5.88 7 3.5C7 1.57 5.43 0 3.5 0Z"
            fill="#5A8B64" opacity="0.55" />
      <circle cx="3.5" cy="3.5" r="1.2" fill="#FAF7F2" opacity="0.8" />
    </svg>
  );
}

// Status badge — small pill indicator
function StatusBadge({ callStatus }) {
  const config = {
    idle: {
      label: 'Ready',
      dot: 'bg-sage animate-dot-pulse',
      pill: 'bg-sage-light text-sage',
    },
    connecting: {
      label: 'Connecting…',
      dot: 'bg-terra animate-dot-pulse',
      pill: 'bg-terra/10 text-terra',
    },
    active: {
      label: 'Call in Progress',
      dot: 'bg-sage animate-dot-pulse',
      pill: 'bg-sage-light text-sage',
    },
    ended: {
      label: 'Call Ended',
      dot: 'bg-warm-gray',
      pill: 'bg-cream-dark text-warm-gray',
    },
  };

  const { label, dot, pill } = config[callStatus] ?? config.idle;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body tracking-widest uppercase ${pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </div>
  );
}

// Phone icon SVG
function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}

// End call icon SVG
function EndCallIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.69.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.26 0-.51-.1-.69-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CallInterface({
  callStatus,
  isSpeaking,
  volumeLevel,
  error,
  onStart,
  onEnd,
  onReset,
}) {
  const isIdle       = callStatus === 'idle';
  const isConnecting = callStatus === 'connecting';
  const isActive     = callStatus === 'active';
  const isEnded      = callStatus === 'ended';

  return (
    <div className="flex flex-col items-center gap-6 text-center">

      {/* Location tags */}
      <div className="flex gap-2 flex-wrap justify-center">
        {['Fort Walton Beach, FL', 'Jacksonville, FL'].map((loc) => (
          <span
            key={loc}
            className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-warm-gray/70 font-body border border-cream-dark/70 rounded-full px-3 py-1.5"
          >
            <PinIcon />
            {loc}
          </span>
        ))}
      </div>

      {/* Central waveform ring */}
      <WaveformRing
        callStatus={callStatus}
        isSpeaking={isSpeaking}
        volumeLevel={volumeLevel}
      />

      {/* Agent name & title */}
      <div className="space-y-1.5">
        <h1
          className="font-display text-4xl font-medium tracking-wide"
          style={{ color: '#3A2820' }}
        >
          Amber
        </h1>
        <p className="text-sm text-warm-gray/80 font-body tracking-widest uppercase" style={{ fontSize: '11px' }}>
          AI Scheduling Assistant
        </p>
      </div>

      {/* Status badge */}
      <StatusBadge callStatus={callStatus} />

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 font-body max-w-xs text-center animate-fade-up">
          {error}
        </p>
      )}

      {/* Primary action button */}
      <div className="pt-2">
        {(isIdle || isEnded) && (
          <button
            onClick={isEnded ? onReset : onStart}
            className="
              inline-flex items-center gap-3
              px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase
              text-warm-white
              hover:brightness-110 active:scale-95
              transition-all duration-200
            "
            style={{
              background: 'linear-gradient(180deg, #d4886a 0%, #c4785a 45%, #b06245 100%)',
              boxShadow: '0 6px 24px rgba(196, 120, 90, 0.38), 0 2px 8px rgba(44, 36, 32, 0.12)',
            }}
          >
            <PhoneIcon />
            {isEnded ? 'Call Again' : 'Call Amber'}
          </button>
        )}

        {isConnecting && (
          <button
            disabled
            className="
              inline-flex items-center gap-3
              px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase
              bg-terra-mute text-warm-white cursor-not-allowed
              opacity-80
            "
          >
            <span className="w-4 h-4 rounded-full border-2 border-warm-white/30 border-t-warm-white animate-spin" />
            Connecting
          </button>
        )}

        {isActive && (
          <button
            onClick={onEnd}
            className="
              inline-flex items-center gap-3
              px-10 py-4 rounded-full font-body font-medium text-sm tracking-widest uppercase
              bg-warm-brown text-warm-white
              hover:bg-black active:scale-95
              transition-all duration-200 shadow-md
            "
          >
            <EndCallIcon />
            End Call
          </button>
        )}
      </div>

      {/* Subtle call-to-action hint when idle */}
      {isIdle && (
        <p className="text-[11px] text-warm-gray/55 font-body tracking-wide max-w-xs leading-relaxed">
          Click to connect directly with Amber, Bloom's AI scheduling assistant.
        </p>
      )}

    </div>
  );
}
