import { useEffect, useRef } from 'react';

function TranscriptEntry({ role, text, partial, isFirst }) {
  const isAmber = role === 'assistant';

  return (
    <div className="animate-fade-up">
      {/* Horizontal rule separator */}
      {!isFirst && (
        <div className="border-t border-cream-dark my-5" />
      )}

      <div className="flex gap-4">

        {/* Speaker label — fixed width column */}
        <div className="flex-shrink-0 pt-0.5" style={{ width: 64 }}>
          <span
            className={`
              block text-[10px] tracking-widest uppercase font-body font-bold
              ${isAmber ? 'text-terra' : 'text-warm-gray'}
            `}
          >
            {isAmber ? 'Amber' : 'You'}
          </span>
        </div>

        {/* Message text */}
        <div className="flex-1 min-w-0">
          <p
            className={`
              font-body text-sm leading-relaxed
              ${partial ? 'text-warm-gray/70' : 'text-warm-brown'}
              ${partial ? 'italic' : ''}
            `}
          >
            {text}
            {partial && (
              <span className="inline-flex gap-0.5 ml-1.5 align-middle">
                <span className="w-1 h-1 rounded-full bg-warm-gray/50 animate-dot-pulse" style={{ animationDelay: '0s' }} />
                <span className="w-1 h-1 rounded-full bg-warm-gray/50 animate-dot-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-1 h-1 rounded-full bg-warm-gray/50 animate-dot-pulse" style={{ animationDelay: '0.4s' }} />
              </span>
            )}
          </p>
        </div>

      </div>
    </div>
  );
}

export default function TranscriptFeed({ transcript }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom as transcript grows
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  if (!transcript.length) return null;

  return (
    <div className="w-full mt-4 animate-fade-up">

      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 border-t border-cream-dark" />
        <span className="text-[10px] tracking-widest uppercase text-warm-gray/60 font-body">
          Live Transcript
        </span>
        <div className="flex-1 border-t border-cream-dark" />
      </div>

      {/* Transcript entries */}
      <div
        className="overflow-y-auto scrollbar-warm"
        style={{ maxHeight: '38vh' }}
      >
        <div className="space-y-0 pb-4">
          {transcript.map((entry, index) => (
            <TranscriptEntry
              key={entry.id}
              role={entry.role}
              text={entry.text}
              partial={entry.partial}
              isFirst={index === 0}
            />
          ))}
        </div>
        <div ref={bottomRef} />
      </div>

    </div>
  );
}
