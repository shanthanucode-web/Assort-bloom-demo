/**
 * WaveformRing — the central visual element of the call interface.
 *
 * idle:       Soft cream circle, "A" monogram, calm
 * connecting: Gentle breathing pulse, terracotta ring
 * active:     Three ripple rings radiate outward
 * speaking:   Seven animated waveform bars below the ring
 */

function WaveBars({ isSpeaking, volumeLevel }) {
  const bars = [0.5, 0.8, 0.65, 1.0, 0.72, 0.85, 0.55];

  return (
    <div className="flex items-center justify-center gap-[3px] h-9 mt-4">
      {bars.map((relH, i) => {
        const isAnimating = isSpeaking;
        return (
          <div
            key={i}
            className="w-[3px] rounded-full origin-bottom transition-all duration-100"
            style={{
              height: '36px',
              backgroundColor: '#C4785A',
              opacity: isAnimating ? 0.7 + relH * 0.3 : 0.2,
              animation: isAnimating
                ? `wave-bar ${0.7 + i * 0.07}s ease-in-out infinite`
                : 'none',
              animationDelay: `${i * 0.06}s`,
              transform: isAnimating ? 'scaleY(1)' : 'scaleY(0.15)',
            }}
          />
        );
      })}
    </div>
  );
}

export default function WaveformRing({ callStatus, isSpeaking, volumeLevel }) {
  const isConnecting = callStatus === 'connecting';
  const isActive     = callStatus === 'active';
  const isEnded      = callStatus === 'ended';

  return (
    <div className="flex flex-col items-center select-none">

      {/* Ring container */}
      <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>

        {/* Ripple rings — active call */}
        {isActive && (
          <>
            <div
              className="absolute inset-0 rounded-full border border-terra"
              style={{ animation: 'ripple 2.4s ease-out infinite' }}
            />
            <div
              className="absolute inset-0 rounded-full border border-terra"
              style={{ animation: 'ripple 2.4s ease-out infinite', animationDelay: '0.8s' }}
            />
            <div
              className="absolute inset-0 rounded-full border border-terra"
              style={{ animation: 'ripple 2.4s ease-out infinite', animationDelay: '1.6s' }}
            />
          </>
        )}

        {/* Connecting ring — breathing */}
        {isConnecting && (
          <div
            className="absolute inset-0 rounded-full border-2 border-terra-mute"
            style={{ animation: 'breathe 1.8s ease-in-out infinite' }}
          />
        )}

        {/* Outer decorative ring — always present */}
        <div
          className={`
            absolute rounded-full border
            transition-all duration-700
            ${isActive
              ? 'inset-3 border-terra opacity-30'
              : isEnded
                ? 'inset-3 border-cream-dark opacity-50'
                : 'inset-3 border-cream-dark opacity-80'}
          `}
        />

        {/* Main circle */}
        <div
          className={`
            relative z-10 rounded-full flex items-center justify-center
            transition-all duration-700 shadow-sm
            ${isActive
              ? 'bg-terra shadow-terra/20 shadow-xl'
              : isConnecting
                ? 'bg-terra-mute'
                : isEnded
                  ? 'bg-cream-dark'
                  : 'bg-cream-mid'}
          `}
          style={{ width: 112, height: 112 }}
        >
          <span
            className={`
              font-display font-semibold select-none
              transition-colors duration-500
              ${isActive || isConnecting ? 'text-warm-white' : 'text-warm-gray'}
            `}
            style={{ fontSize: 48, lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            A
          </span>
        </div>

      </div>

      {/* Wave bars — only when Amber is speaking */}
      <WaveBars isSpeaking={isSpeaking} volumeLevel={volumeLevel} />

      {/* Spacer when not speaking to keep layout stable */}
      {!isSpeaking && (
        <div style={{ height: 52 }} />
      )}

    </div>
  );
}
