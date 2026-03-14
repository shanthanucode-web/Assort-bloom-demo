const SCENARIOS = [
  {
    id: 1,
    name: 'Jessica Martinez',
    tag: 'Annual Exam',
    tagColor: 'bg-terra/10 text-terra',
    details: [
      'Existing patient on file',
      'Annual well-woman exam',
      'Mammogram screening also overdue',
      'Prefers mornings, Jacksonville location',
    ],
    hint: `"I'd like to schedule my annual exam \u2014 I think I'm also due for a mammogram."`,
  },
  {
    id: 2,
    name: 'Amanda Chen',
    tag: 'New OB Intake',
    tagColor: 'bg-sage-light text-sage',
    details: [
      'Pregnant, 17 weeks',
      'Anatomy scan upcoming (~20 weeks)',
      'First pregnancy, transferred from another OB',
      'Insurance: Blue Cross',
    ],
    hint: `"I just moved here and need to establish care \u2014 I'm 17 weeks pregnant."`,
  },
  {
    id: 3,
    name: 'Rachel Thompson',
    tag: 'OB Routine Check',
    tagColor: 'bg-sage-light text-sage',
    details: [
      'Pregnant, 29 weeks',
      'Routine OB appointment due',
      'Existing patient at Fort Walton Beach',
      'Gestational diabetes monitoring',
    ],
    hint: `"I need to schedule my next OB appointment \u2014 I'm 29 weeks."`,
  },
  {
    id: 4,
    name: 'Danielle Brooks',
    tag: 'IUD Insertion',
    tagColor: 'bg-[#E8DDD5] text-mid-brown',
    details: [
      'Consult already completed',
      'Ready to schedule insertion procedure',
      'Mirena IUD selected',
      'Needs early morning slot',
    ],
    hint: `"I had my consult already \u2014 I'm ready to schedule the actual procedure."`,
  },
  {
    id: 5,
    name: 'Megan Taylor',
    tag: 'Postpartum Follow-up',
    tagColor: 'bg-[#F5E6E0] text-terra-dark',
    details: [
      'Vaginal delivery February 26',
      'Standard 6-week postpartum visit',
      'Baby doing well, no complications',
      'Jacksonville location preferred',
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
