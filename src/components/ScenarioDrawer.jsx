const SCENARIOS = [
  {
    id: 1,
    name: 'Jessica Martinez',
    tag: 'Annual Exam',
    tagColor: 'bg-terra/10 text-terra',
    details: [
      'DOB: March 15, 1990 · Established patient',
      'Last annual exam: Jan 10, 2025 — eligible now (366+ days)',
      'Mammogram overdue per provider rec (family history); last Jan 2024',
      'Insurance: Blue Cross Blue Shield · Location: Fort Walton Beach',
    ],
    hint: `"I'd like to schedule my annual exam \u2014 I think I'm also due for a mammogram."`,
  },
  {
    id: 2,
    name: 'Amanda Chen',
    tag: 'Prenatal OB Check',
    tagColor: 'bg-sage-light text-sage',
    details: [
      'DOB: July 22, 1992 · Established patient',
      'Pregnant \u2014 LMP Nov 15, 2025 (~17 weeks as of today)',
      '20-week anatomy scan due ~March 28 (double-resource booking)',
      'Insurance: United Healthcare · Provider: Dr. William Smith · Jacksonville',
    ],
    hint: `"I need to schedule my next prenatal appointment \u2014 I'm about 17 weeks along."`,
  },
  {
    id: 3,
    name: 'Rachel Thompson',
    tag: 'OB Routine Check',
    tagColor: 'bg-sage-light text-sage',
    details: [
      'DOB: November 3, 1988 · Established patient',
      'Pregnant \u2014 LMP Aug 20, 2025 (~29 weeks as of today)',
      'Last OB check: March 1, 2026 · Every-2-week cadence · Glucose normal',
      'Insurance: Aetna · Provider: Dr. Graham-Bieber · Fort Walton Beach',
    ],
    hint: `"I need to schedule my next OB appointment \u2014 I'm 29 weeks."`,
  },
  {
    id: 4,
    name: 'Danielle Brooks',
    tag: 'IUD Insertion',
    tagColor: 'bg-[#E8DDD5] text-mid-brown',
    details: [
      'DOB: May 8, 1995 · Established patient',
      'IUD consult completed Dec 15, 2025 \u2014 ready for insertion',
      'Mirena IUD selected · Provider: Brandi Perkins, NP',
      'Insurance: Cigna · Location: Jacksonville · Prefers early morning',
    ],
    hint: `"I had my consult already \u2014 I'm ready to schedule the actual IUD insertion."`,
  },
  {
    id: 5,
    name: 'Megan Taylor',
    tag: 'Postpartum Follow-up',
    tagColor: 'bg-[#F5E6E0] text-terra-dark',
    details: [
      'DOB: September 12, 1993 · Established patient',
      'Vaginal delivery Feb 26, 2026 · Dr. Graham-Bieber · Fort Walton Beach Medical Center',
      'Early postpartum check due by March 19 (not yet scheduled)',
      '6-week visit due ~April 9, 2026 (not yet scheduled) · Insurance: BCBS',
    ],
    hint: `"I had my baby on February 26th and need to schedule my postpartum visit."`,
  },
];

function ScenarioCard({ scenario }) {
  return (
    <div className="bg-warm-white rounded-xl p-4 border border-cream-dark hover:border-terra-mute transition-colors">

      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="font-display text-base font-medium text-warm-brown leading-tight">
            {scenario.name}
          </div>
        </div>
        <span className={`flex-shrink-0 text-[9px] tracking-widest uppercase font-body font-bold px-2 py-1 rounded-full ${scenario.tagColor}`}>
          {scenario.tag}
        </span>
      </div>

      <ul className="space-y-1 mb-3">
        {scenario.details.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-warm-gray font-body leading-snug">
            <span className="text-terra mt-0.5 flex-shrink-0">·</span>
            {d}
          </li>
        ))}
      </ul>

      <div className="mt-3 pt-3 border-t border-cream-dark">
        <p className="text-[11px] text-warm-gray/70 font-body italic leading-relaxed">
          {scenario.hint}
        </p>
      </div>

    </div>
  );
}

export default function ScenarioDrawer({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-warm-brown/10 z-30 backdrop-blur-[1px]"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 h-full z-40 flex flex-col bg-cream shadow-2xl shadow-warm-brown/10"
        style={{
          width: 360,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >

        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-dark">
          <div>
            <div className="font-display text-lg font-medium text-warm-brown">
              Demo Scenarios
            </div>
            <div className="text-[10px] tracking-widest uppercase text-warm-gray mt-0.5 font-body">
              Roleplay guide for sales engineer
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream-dark hover:bg-cream-mid text-warm-gray hover:text-warm-brown transition-colors flex items-center justify-center"
            aria-label="Close scenarios"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scenario cards */}
        <div className="flex-1 overflow-y-auto scrollbar-warm px-4 py-4 space-y-3">
          {SCENARIOS.map((s) => (
            <ScenarioCard key={s.id} scenario={s} />
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-cream-dark">
          <p className="text-[10px] text-warm-gray/60 font-body text-center tracking-wide">
            Bloom Women's Multispecialty Clinic — Assort Health Demo
          </p>
        </div>

      </div>
    </>
  );
}
