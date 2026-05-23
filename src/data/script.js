export const SECTIONS = [
  { id: 0, label: 'Opening',      target: '30 sec' },
  { id: 1, label: 'Curiosity Gap', target: '30 sec' },
  { id: 2, label: 'Pitch',        target: '20 sec' },
  { id: 3, label: 'Close',        target: '30 sec' },
  { id: 4, label: 'Booking',      target: '15 sec' },
]

// type: 'dialogue' | 'note' | 'conditional'
// Only 'dialogue' and 'conditional' are navigable (can receive focus)
export const LINES = [

  // ─── SECTION 0: OPENING ───────────────────────────────────────────────
  {
    id: 'o-b1',
    section: 0,
    beatLabel: 'Beat 1 — Confirm Identity',
    text: 'Hey, is this [NAME]?',
    tones: ['FLAT', 'CALM'],
    type: 'dialogue',
  },
  {
    id: 'o-b1-note',
    section: 0,
    text: '⏸  Wait for them to say yes.',
    type: 'note',
  },
  {
    id: 'o-b23',
    section: 0,
    beatLabel: 'Beat 2 & 3 — Introduction + Social Proof',
    text: 'Hey [NAME], this is Suyash — I work with roofing contractors in [region]. I came across your shop on [Yelp/Angi] while I was looking at roofers in [city], reviews are solid man, looks like you\'re doing great work.',
    tones: ['WARM', 'GENUINE'],
    threatZoneId: 1,
    type: 'dialogue',
  },

  // ─── SECTION 1: CURIOSITY GAP ─────────────────────────────────────────
  {
    id: 'cg-b4',
    section: 1,
    beatLabel: 'Beat 4 — The Curiosity Gap',
    text: 'So I actually searched \'roof repair [city]\' right before I called and your shop doesn\'t come up anywhere — and honestly I think that\'s costing you jobs you don\'t even know you\'re losing.',
    tones: ['DELIBERATE', 'LET IT LAND'],
    threatZoneId: 2,
    type: 'dialogue',
  },
  {
    id: 'cg-b4-note',
    section: 1,
    text: '⏸  Stop. Let them react. Do not fill the air.',
    type: 'note',
  },

  // ─── SECTION 2: PITCH ─────────────────────────────────────────────────
  {
    id: 'p-b5',
    section: 2,
    beatLabel: 'Beat 5 — The Hook',
    text: 'Yeah — I might have something that can fix that.',
    tones: ['CERTAIN', 'DELIBERATE'],
    type: 'dialogue',
  },
  {
    id: 'p-b6',
    section: 2,
    beatLabel: 'Beat 6 — What You Do',
    text: 'What I do is get roofing contractors more jobs coming in and make sure none slip through the cracks.',
    tones: ['MATTER-OF-FACT', 'CERTAIN'],
    type: 'dialogue',
  },

  // ─── SECTION 3: CLOSE ─────────────────────────────────────────────────
  {
    id: 'c-b7',
    section: 3,
    beatLabel: 'Beat 7 — The Close Question',
    text: 'If I could get your business in front of more people who need roofing work and make sure every job gets handled — would that be something worth looking at?',
    tones: ['WARM', 'CURIOUS'],
    threatZoneId: 3,
    type: 'dialogue',
  },
  {
    id: 'c-b7-note',
    section: 3,
    text: '⏸  Wait for the yes.',
    type: 'note',
  },

  // ─── SECTION 4: BOOKING ───────────────────────────────────────────────
  {
    id: 'b-b8',
    section: 4,
    beatLabel: 'Beat 8 — The Zoom Ask',
    text: 'I don\'t want to get into the whole thing on the phone — it\'s honestly easier to just show you. Would a quick 15 minute Zoom be worth your time?',
    tones: ['WARM', 'DIRECT'],
    threatZoneId: 4,
    type: 'dialogue',
  },
  {
    id: 'b-b8-note',
    section: 4,
    text: '⏸  Wait for the yes.',
    type: 'note',
  },
  {
    id: 'b-b9',
    section: 4,
    beatLabel: 'Beat 9 — Lock It In',
    text: 'Perfect, what does [day] or [day] look like? Sending you an invite now — talk then [NAME].',
    tones: ['WARM', 'BRIEF'],
    type: 'dialogue',
  },
]

// ─── THREAT ZONES ─────────────────────────────────────────────────────────────
export const THREAT_ZONES = [
  {
    id: 1,
    location: 'Beat 2 & 3',
    title: 'After Introduction',
    level: 'medium',
    objections: [
      {
        trigger: '"I\'m not buying whatever you\'re selling"',
        response: 'Honestly fair — I\'m not here to sell you anything on a phone call. I just noticed something about your business online that I think is costing you money and wanted to give you a heads up. Literally 30 seconds.',
        tones: ['WARM', 'GENUINE'],
        followUp: 'So I actually searched \'roof repair [city]\' right before I called and...',
        followUpTones: ['DELIBERATE'],
        note: '→ Bridge back to Beat 4',
      },
      {
        trigger: '"I\'m busy right now"',
        response: 'I\'ll be quick — I noticed something about your business online that I think is costing you jobs. Thirty seconds and if it\'s not relevant I\'ll let you go.',
        tones: ['EASY', 'DIRECT'],
        followUp: 'So I searched \'roof repair [city]\' right before I called and...',
        followUpTones: ['DELIBERATE'],
        note: '→ Bridge back to Beat 4',
      },
      {
        trigger: '"How did you get my number?"',
        response: 'I came across your shop on [Yelp/Angi] while I was looking at roofers in [city] — took me two minutes to find your number. But while I was there I noticed something that I think is hurting your business, can I tell you real quick?',
        tones: ['MATTER-OF-FACT', 'GENUINE'],
        followUp: 'So when I searched \'roof repair [city]\' your shop doesn\'t come up anywhere and...',
        followUpTones: ['DELIBERATE'],
        note: '→ Bridge back to Beat 4',
      },
    ],
  },
  {
    id: 2,
    location: 'Beat 4',
    title: 'After Curiosity Gap',
    level: 'high',
    objections: [
      {
        trigger: '"We get enough work from referrals" / "We\'re booked to capacity"',
        response: 'That\'s honestly great to hear — referrals are the best kind of work. My only question is what happens when that slows down? Because referrals are great but they\'re not something you can control or turn up when you need to. I\'m not saying replace what\'s working — I\'m saying have something running alongside it so you\'re never dependent on one source.',
        tones: ['WARM', 'GENUINE'],
        followUp: 'And I might actually have something that helps with exactly that.',
        followUpTones: ['CERTAIN'],
        note: '→ Bridge back to Beat 5',
      },
      {
        trigger: '"I already have someone handling my marketing"',
        response: 'That\'s fine — what I\'m talking about isn\'t really traditional marketing. It\'s something pretty specific to roofing. Can I tell you what I noticed and then you can tell me if it\'s even relevant to what you already have?',
        tones: ['UNBOTHERED', 'DIRECT'],
        followUp: 'Because I might have something that works alongside whatever you already have.',
        followUpTones: ['EASY'],
        note: '→ Bridge back to Beat 5',
      },
      {
        trigger: '"I\'ve tried Google Ads before, didn\'t work"',
        response: 'Yeah I get that — most people who\'ve tried it got burned because whoever ran it didn\'t know roofing. What I do is actually different but I haven\'t even told you what it is yet.',
        tones: ['WARM', 'MATTER-OF-FACT'],
        followUp: 'Let me just tell you what I\'m seeing first — I might have something that actually works for you.',
        followUpTones: ['CERTAIN'],
        note: '→ Bridge back to Beat 5',
      },
      {
        trigger: '"Send me an email"',
        response: 'I would but it\'s honestly a two second thing — let me just tell you what I noticed and then I\'ll leave you alone if it\'s not relevant.',
        tones: ['EASY', 'UNBOTHERED'],
        followUp: 'Because I might have something here that\'s actually worth your time.',
        followUpTones: ['DIRECT'],
        note: '→ Bridge back to Beat 5',
      },
    ],
  },
  {
    id: 3,
    location: 'Beat 7',
    title: 'At the Close Question',
    level: 'medium',
    objections: [
      {
        trigger: '"How much does it cost?"',
        response: 'That\'s exactly what the Zoom is for — I don\'t want to throw a number at you without showing you what you\'re actually getting first. It\'ll make a lot more sense after you\'ve seen it.',
        tones: ['CERTAIN', 'DIRECT'],
        followUp: 'Which is why I\'d love to just show you — would a quick 15 minute Zoom be worth your time?',
        followUpTones: ['WARM'],
        note: '→ Bridge back to Beat 8',
      },
      {
        trigger: '"I don\'t have time for a Zoom"',
        response: 'It\'s 15 minutes — I\'ll have you out before that. And honestly what I want to show you isn\'t something I can explain on a phone call, you need to see it and experience part of it live.',
        tones: ['EASY', 'UNBOTHERED'],
        followUp: 'Would [day] or [day] work — I\'ll keep it tight, 15 minutes max.',
        followUpTones: ['DIRECT'],
        note: '→ Bridge back to Beat 8',
      },
      {
        trigger: '"Just tell me what it is"',
        response: 'I could but it honestly won\'t land the way it does when I show you — part of it you actually get to experience yourself on the call and that\'s the moment it clicks.',
        tones: ['HONEST', 'WARM'],
        followUp: '15 minutes on a Zoom — would that be worth your time?',
        followUpTones: ['DIRECT'],
        note: '→ Bridge back to Beat 8',
      },
    ],
  },
  {
    id: 4,
    location: 'Beat 8',
    title: 'At the Zoom Ask',
    level: 'medium',
    objections: [
      {
        trigger: '"How much does it cost?"',
        response: 'That\'s exactly what the Zoom is for — I don\'t want to throw a number at you without showing you what you\'re actually getting first. It\'ll make a lot more sense after you\'ve seen it.',
        tones: ['CERTAIN', 'DIRECT'],
        note: 'Hold the line. Number means nothing without context.',
      },
      {
        trigger: '"I don\'t have time for a Zoom"',
        response: 'It\'s 15 minutes — I\'ll have you out before that. And what I want to show you isn\'t something I can explain on a phone call, you need to see it and experience part of it live.',
        tones: ['EASY', 'UNBOTHERED'],
      },
      {
        trigger: '"Just tell me what it is"',
        response: 'I could but it honestly won\'t land the way it does when I show you — part of it you actually get to experience yourself on the call and that\'s the moment it clicks. 15 minutes on a Zoom — would that be worth your time?',
        tones: ['HONEST', 'DIRECT'],
      },
    ],
  },
]

// ─── QUICK REFERENCE MAP ──────────────────────────────────────────────────────
export const QUICK_REFERENCE = [
  { num: 1,  when: 'Beat 2 & 3', objection: '"I\'m not buying whatever you\'re selling"',          flip: '"Not here to sell — noticed something costing you money. 30 seconds." → Beat 4' },
  { num: 2,  when: 'Beat 2 & 3', objection: '"I\'m busy right now"',                               flip: '"Quick — noticed something costing you jobs. 30 seconds." → Beat 4' },
  { num: 3,  when: 'Beat 2 & 3', objection: '"How did you get my number?"',                        flip: '"Found you on [Yelp/Angi] — noticed something hurting your business. Real quick?" → Beat 4' },
  { num: 4,  when: 'Beat 4',     objection: '"We get referrals / We\'re booked"',                  flip: '"Great — what happens when that slows down? Have something running alongside it." → Beat 5' },
  { num: 5,  when: 'Beat 4',     objection: '"Already have someone for marketing"',                flip: '"Not traditional marketing — roofing specific. Tell you what I noticed first?" → Beat 5' },
  { num: 6,  when: 'Beat 4',     objection: '"Tried Google Ads — didn\'t work"',                   flip: '"Got burned because they didn\'t know roofing. Haven\'t even told you what it is yet." → Beat 5' },
  { num: 7,  when: 'Beat 4',     objection: '"Send me an email"',                                  flip: '"Literally two seconds — tell you what I noticed, gone if not relevant." → Beat 5' },
  { num: 8,  when: 'Beat 7',     objection: '"How much does it cost?"',                            flip: '"That\'s what the Zoom is for — number means nothing without seeing it first." → Beat 8' },
  { num: 9,  when: 'Beat 7',     objection: '"I don\'t have time for a Zoom"',                     flip: '"15 minutes — you need to see it, not hear me explain it. [Day] or [day]?" → Beat 8' },
  { num: 10, when: 'Beat 7',     objection: '"Just tell me what it is"',                           flip: '"Won\'t land the same — you experience part of it live. 15 min Zoom?" → Beat 8' },
]
