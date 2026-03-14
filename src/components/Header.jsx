// Bloom SVG logo mark — botanical flower, terracotta
function BloomMark({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="32" cy="17" rx="4.5" ry="11" fill="#C4785A" opacity="0.92" />
      <ellipse cx="32" cy="17" rx="4.5" ry="11" fill="#C4785A" opacity="0.92" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="17" rx="4.5" ry="11" fill="#C4785A" opacity="0.92" transform="rotate(120 32 32)" />
      <ellipse cx="32" cy="17" rx="4.5" ry="11" fill="#C4785A" opacity="0.92" transform="rotate(180 32 32)" />
      <ellipse cx="32" cy="17" rx="4.5" ry="11" fill="#C4785A" opacity="0.92" transform="rotate(240 32 32)" />
      <ellipse cx="32" cy="17" rx="4.5" ry="11" fill="#C4785A" opacity="0.92" transform="rotate(300 32 32)" />
      <circle cx="32" cy="32" r="7.5" fill="#C4785A" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="w-full border-b border-cream-dark bg-warm-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left — Practice identity */}
        <div className="flex items-center gap-3">
          <BloomMark size={38} />
          <div>
            <div className="font-display text-[15px] font-semibold text-warm-brown leading-tight tracking-wide">
              Bloom Women's Multispecialty Clinic
            </div>
            <div className="text-[11px] text-warm-gray font-body tracking-widest uppercase mt-0.5">
              OB/GYN &nbsp;·&nbsp; Midwifery &nbsp;·&nbsp; Women's Health
            </div>
          </div>
        </div>

        {/* Right — Assort attribution */}
        <div className="hidden sm:flex flex-col items-end">
          <div className="text-[10px] tracking-widest uppercase text-warm-gray font-body">
            Powered by
          </div>
          <div className="font-display text-sm font-medium text-terra tracking-wide">
            Assort Health
          </div>
        </div>

      </div>
    </header>
  );
}
