/**
 * Every piece of site copy lives here as a typed constant.
 * There is no CMS: edit this file to change the site.
 */

export type AccentName = 'primary' | 'violet' | 'emerald' | 'coral' | 'amber'

export type IconName =
  | 'user'
  | 'pulse'
  | 'snowflake'
  | 'blocks'
  | 'target'
  | 'route'
  | 'compass'
  | 'code'
  | 'terminal'
  | 'layers'
  | 'server'
  | 'check'
  | 'mail'
  | 'calendar'

export const site = {
  name: 'Socioglobal',
  domain: 'socioglobal.ca',
  url: 'https://socioglobal.ca',
  tagline: 'B2B outbound and revenue systems for technology firms.',
  description:
    'Socioglobal is a B2B revenue agency in Canada. We build and run outbound pipeline systems, CRM and nurture automation, and fractional sales leadership for technology firms across North America.',
  email: 'hello@socioglobal.ca',
  linkedin: 'https://www.linkedin.com/company/socioglobal',
  location: 'Canada · Serving North America',
} as const

export const nav = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: "Who It's For", href: '/who-its-for' },
  { label: 'About', href: '/about' },
] as const

/* ------------------------------------------------------------------ */
/* Home — 1. Hero                                                      */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: 'B2B Outbound & Revenue Systems',
  h1: 'Outbound revenue engines for B2B tech firms.',
  sub: 'We build and run the pipeline systems that turn founder-led sales into a repeatable revenue function.',
  bullets: [
    {
      text: 'Cold email infrastructure, ICP targeting, and sequences built and managed for you',
      accent: 'primary' as AccentName,
    },
    {
      text: 'CRM, nurture automation, and follow-up that stops deals going cold',
      accent: 'violet' as AccentName,
    },
    {
      text: 'Sales process design and coaching from a leader who has generated $10M+ in enterprise B2B revenue',
      accent: 'emerald' as AccentName,
    },
  ],
  primaryCta: { label: 'Get Your Pipeline Score', href: '#pipeline-calculator' },
  secondaryCta: { label: 'Book a Revenue Call', href: '/book-a-call' },
} as const

/* ------------------------------------------------------------------ */
/* Home — 2. Credibility bar                                           */
/* ------------------------------------------------------------------ */

export const credibility = [
  { value: '$10M+', label: 'Enterprise B2B revenue generated' },
  { value: '300+', label: 'B2B clients served' },
  { value: 'Oracle', label: 'Partner ecosystem experience' },
  { value: '10+ yrs', label: 'Building and mentoring B2B sales teams' },
] as const

/* ------------------------------------------------------------------ */
/* Home — 3. Problem                                                   */
/* ------------------------------------------------------------------ */

export const problem = {
  eyebrow: 'The Pattern We See',
  h2: 'Most B2B tech firms can deliver. Very few can sell consistently.',
  sub: 'The engineering is sound. The delivery is strong. Revenue is the part that was never built as a system.',
  cards: [
    {
      icon: 'user' as IconName,
      accent: 'coral' as AccentName,
      title: 'The founder is the only salesperson.',
      body: 'Pipeline dies every time delivery gets busy. Revenue moves in the gaps between projects instead of ahead of them.',
    },
    {
      icon: 'pulse' as IconName,
      accent: 'amber' as AccentName,
      title: 'Outbound is inconsistent.',
      body: 'A burst of activity, then nothing for two months. Results arrive in waves, and the quiet quarters are the expensive ones.',
    },
    {
      icon: 'snowflake' as IconName,
      accent: 'violet' as AccentName,
      title: 'Leads go cold after first contact.',
      body: 'No nurture, no follow-up, no CRM discipline. Interested buyers slip away because nobody owned the second conversation.',
    },
    {
      icon: 'blocks' as IconName,
      accent: 'primary' as AccentName,
      title: 'Nothing is repeatable.',
      body: 'Every deal runs differently, so nothing can be taught or delegated. The knowledge stays in one person’s head.',
    },
  ],
} as const

/* ------------------------------------------------------------------ */
/* Home — 4. Calculator                                                */
/* ------------------------------------------------------------------ */

export const calculator = {
  eyebrow: 'Pipeline Cost Calculator',
  h2: 'What is the gap between your pipeline and your target costing you?',
  sub: 'Four questions. Drag the sliders and the figures move with you — nothing is hidden behind a form.',
  presets: [
    { label: 'Web agency', avgDealValue: 35_000, dealsPerMonth: 2, targetDealsPerMonth: 4, closeRatePercent: 25 },
    { label: 'Software firm', avgDealValue: 120_000, dealsPerMonth: 1, targetDealsPerMonth: 3, closeRatePercent: 18 },
    { label: 'ERP partner', avgDealValue: 250_000, dealsPerMonth: 1, targetDealsPerMonth: 2, closeRatePercent: 15 },
    { label: 'MSP', avgDealValue: 45_000, dealsPerMonth: 2, targetDealsPerMonth: 6, closeRatePercent: 22 },
  ],
  steps: [
    {
      key: 'avgDealValue' as const,
      short: 'Deal value',
      question: 'What is your average deal value?',
      help: 'Total contract value of a typical closed deal. For recurring contracts, use the first-year value.',
      prefix: '$',
      suffix: '',
      step: 1000,
      min: 1000,
      max: 500_000,
    },
    {
      key: 'dealsPerMonth' as const,
      short: 'Closing now',
      question: 'How many deals do you close in a typical month?',
      help: 'Your honest current run rate, not your best month. Decimals are fine — enter 0 if it is lumpy.',
      prefix: '',
      suffix: ' / mo',
      step: 1,
      min: 0,
      max: 40,
    },
    {
      key: 'targetDealsPerMonth' as const,
      short: 'Target',
      question: 'How many deals a month do you want to be closing?',
      help: 'The run rate the business is actually built to deliver.',
      prefix: '',
      suffix: ' / mo',
      step: 1,
      min: 0,
      max: 40,
    },
    {
      key: 'closeRatePercent' as const,
      short: 'Close rate',
      question: 'What share of qualified meetings turn into deals?',
      help: 'Most B2B technology firms sit between 15% and 30%. This is what turns a revenue gap into a meeting target.',
      prefix: '',
      suffix: '%',
      step: 1,
      min: 1,
      max: 100,
    },
  ],
  results: {
    monthly: 'Revenue gap per month',
    annual: 'Annual revenue gap',
    meetings: 'Qualified meetings a month to close it',
    sdr: 'Cost to close it with an in-house SDR',
    closingLine:
      'An outbound system reaches full output in 30–60 days, not 5 months.',
    assumptions:
      'Assumes a fully loaded SDR cost of $75,000 a year, around 12 qualified meetings a month at full output, and a five-month ramp during which output climbs steadily rather than arriving all at once. Change any input above to test your own numbers.',
  },
  cta: {
    heading: 'Want the version with your name on it?',
    sub: 'Book a 30-minute call and we will walk through these numbers against your actual pipeline, then tell you what we would build first.',
    button: 'Book a Revenue Call',
  },
  form: {
    heading: 'Or have the breakdown emailed to you',
    sub: 'We will send these figures with a short read on where the gap is most likely coming from.',
    button: 'Send Me the Full Breakdown',
  },
} as const

/* ------------------------------------------------------------------ */
/* Home — 5. Solution                                                  */
/* ------------------------------------------------------------------ */

export const solution = {
  eyebrow: 'What We Build',
  h2: 'We build the revenue system. Then we run it.',
  sub: 'Three layers, built in order. Each one is owned by us and handed over documented.',
  pillars: [
    {
      icon: 'target' as IconName,
      accent: 'primary' as AccentName,
      title: 'Pipeline',
      body: 'Getting the right conversations started, every week, without the founder driving it.',
      items: [
        'Cold email infrastructure',
        'ICP definition',
        'Verified lists',
        'Sequence copywriting',
        'LinkedIn outreach playbooks',
      ],
    },
    {
      icon: 'route' as IconName,
      accent: 'violet' as AccentName,
      title: 'Conversion',
      body: 'Making sure interest turns into meetings, and meetings turn into signed work.',
      items: [
        'CRM build',
        'Email and SMS nurture',
        'Pipeline stages',
        'Proposal templates',
        'Booking flows',
      ],
    },
    {
      icon: 'compass' as IconName,
      accent: 'emerald' as AccentName,
      title: 'Leadership',
      body: 'Turning selling into a discipline the team can run without you in every call.',
      items: [
        'Sales process design',
        'Call coaching',
        'Hiring support',
        'Pipeline reviews',
        'Forecasting',
      ],
    },
  ],
} as const

/* ------------------------------------------------------------------ */
/* Home — 6. Engagement tiers                                          */
/* ------------------------------------------------------------------ */

export const audit = {
  eyebrow: 'Start Here',
  title: 'Start with a Revenue Audit',
  body: 'A two-week diagnostic of your pipeline, messaging, CRM and sales process, delivering a written 90-day revenue plan you can act on with us or without us.',
  cta: { label: 'Book Your Audit', href: '/book-a-call' },
} as const

export const tiers = {
  eyebrow: 'Engagements',
  h2: 'Three ways to work with us.',
  sub: 'Each one replaces a hire you would otherwise be sourcing, onboarding and managing. Start anywhere; most firms move up a tier once the one below is running.',
  items: [
    {
      name: 'Pipeline Engine',
      forWho: 'Nothing consistent is coming in',
      replaces: 'An SDR hire',
      /** One line on the constraint this tier removes. */
      premise:
        'You have a proven offer and no reliable way to start conversations about it.',
      accent: 'primary' as AccentName,
      emphasised: false,
      buildLabel: 'What we build and run',
      includes: [
        'An ICP drawn from your last twenty closed deals, not from a persona workshop',
        'Sending domains, authentication and warm-up done properly, so mail reaches the inbox',
        'Verified contact lists, re-checked before every send so bounces stay low',
        'Three message angles running side by side, so you learn which one earns replies',
        'A LinkedIn outreach playbook your team can run in parallel',
        'Replies read and qualified daily; the real ones land in your calendar',
      ],
      rhythmLabel: 'Your week',
      rhythm: 'A Monday number: sends, replies, meetings booked, and what changed.',
      outcomeLabel: 'What changes',
      outcome:
        'Meetings arrive whether or not you had time to sell that week.',
    },
    {
      name: 'Pipeline + Conversion',
      forWho: 'Interest arrives, then quietly dies',
      replaces: 'SDR + RevOps hire',
      premise:
        'Getting the first reply is no longer the problem. Everything after it is.',
      accent: 'violet' as AccentName,
      emphasised: true,
      buildLabel: 'Everything in Pipeline Engine, plus',
      includes: [
        'A CRM built around the stages your deals actually move through',
        'Every enquiry tracked from first reply to signed contract, with nothing living in an inbox',
        'Automated follow-up for the majority who say “not right now” and mean “not yet”',
        'Proposal and pricing templates that go out the same day the call ends',
        'A booking flow that ends the scheduling back-and-forth',
        'Stage-by-stage reporting that shows exactly where deals stall',
      ],
      rhythmLabel: 'Your fortnight',
      rhythm: 'A conversion review: what stalled, where, and the fix going in next.',
      outcomeLabel: 'What changes',
      outcome:
        'Far fewer conversations are lost between the first reply and the contract.',
    },
    {
      name: 'Fractional Revenue Leadership',
      forWho: 'Selling still runs through you',
      replaces: 'A VP of Sales hire',
      premise:
        'The pipeline works. It just cannot scale past the hours you personally have.',
      accent: 'emerald' as AccentName,
      emphasised: false,
      buildLabel: 'Everything in Pipeline + Conversion, plus',
      includes: [
        'A written sales process specific enough that a new hire can follow it in week one',
        'Recorded call reviews with named fixes, not general encouragement',
        'Scorecards, interview questions and a 30-day onboarding plan for your first sales hires',
        'A weekly pipeline review run with your leadership team, not sent as a report',
        'A forecast you can plan hiring, cash and delivery capacity against',
        'Quarterly revenue planning tied to what delivery can actually absorb',
      ],
      rhythmLabel: 'Your quarter',
      rhythm: 'A plan the leadership team has signed off, and a forecast that holds up.',
      outcomeLabel: 'What changes',
      outcome: 'Selling stops depending on you being in the room.',
    },
  ],
  cta: 'Discuss This Tier',
  footnote:
    'Every engagement is scoped per company after the audit, because a small studio selling short projects and a fifty-person partner selling enterprise implementations do not need the same machine. Everything we build is documented and yours to keep.',
} as const

/* ------------------------------------------------------------------ */
/* Home — 7. Who we work with                                          */
/* ------------------------------------------------------------------ */

export const icps = [
  {
    slug: 'web-development-agencies',
    icon: 'code' as IconName,
    accent: 'primary' as AccentName,
    name: 'Web Development Agencies',
    h2: 'Outbound lead generation for web development agencies',
    short: 'Referrals and repeat work carry the year, and the quiet months arrive without warning.',
    problem:
      'Most web development agencies grow on referrals and past clients. That works until a large project ends and there is nothing behind it. Outbound has usually been tried once, from a personal inbox, and abandoned when delivery got busy.',
    build: [
      'A verified target list of the industries and company sizes your best projects actually came from',
      'Cold email infrastructure and sequences that lead with outcomes rather than technology stacks',
      'A CRM and nurture setup that keeps long-cycle prospects warm between budget cycles',
    ],
  },
  {
    slug: 'software-development-firms',
    icon: 'terminal' as IconName,
    accent: 'violet' as AccentName,
    name: 'Software Development Firms',
    h2: 'Cold email and outbound for software development firms',
    short: 'Strong engineering, long sales cycles, and no repeatable way to start conversations.',
    problem:
      'Custom software and product engineering firms sell complex, high-value work into long buying cycles. Technical credibility is not the problem. Consistent, qualified conversations at the top of the pipeline are.',
    build: [
      'ICP targeting by technology signal, funding stage and in-house engineering capacity',
      'Sequences written for technical buyers, with proof points instead of adjectives',
      'Pipeline stages and forecasting that reflect a six-to-twelve-month cycle honestly',
    ],
  },
  {
    slug: 'oracle-erp-partners',
    icon: 'layers' as IconName,
    accent: 'emerald' as AccentName,
    name: 'Oracle & ERP Implementation Partners',
    h2: 'Outbound for Oracle and ERP implementation partners',
    short: 'Enterprise deals, multiple stakeholders, and pipeline that depends on the partner channel.',
    problem:
      'ERP implementation partners sell into committees. Deals are large, cycles are long, and much of the pipeline arrives through the vendor channel. When the channel is quiet, there is often no independent source of opportunity.',
    build: [
      'Direct outbound to finance, operations and IT leadership alongside your channel activity',
      'Account-based sequencing that reaches several stakeholders in the same organisation',
      'Partner and alliance motion designed by someone who has built one inside the Oracle ecosystem',
    ],
  },
  {
    slug: 'msps-and-it-services',
    icon: 'server' as IconName,
    accent: 'amber' as AccentName,
    name: 'MSPs & IT Services',
    h2: 'Outbound lead generation for MSPs and IT services firms',
    short: 'Recurring revenue is stable until churn arrives, and there is nothing queued to replace it.',
    problem:
      'Managed services businesses live on recurring contracts. That stability hides the risk: when a large account leaves, replacing it takes months of pipeline that was never being built. Most MSPs have no consistent source of new logos.',
    build: [
      'Territory and vertical targeting by company size, headcount and existing IT posture',
      'Outbound built around contract renewal timing, security posture and support cost',
      'A nurture programme that keeps prospects engaged until their current contract ends',
    ],
  },
] as const

export const icpSection = {
  eyebrow: 'Who We Work With',
  h2: 'Built for B2B technology firms with something real to sell.',
  sub: 'We work best with firms that already deliver well and need selling to become a system.',
} as const

/* ------------------------------------------------------------------ */
/* Home — 8. Track record                                              */
/* ------------------------------------------------------------------ */

export const trackRecord = {
  eyebrow: 'Track Record',
  h2: 'Built on a track record of enterprise revenue.',
  sub: 'The systems we build come out of enterprise selling, not theory.',
  points: [
    '$10M+ in enterprise B2B revenue generated across Oracle ERP implementations, managed services, and B2B technology',
    'Built partner and alliance channels within the Oracle ecosystem',
    'Co-founded and scaled a B2B company to $1M+ annual revenue with 300+ clients and a 25-person team',
    'Hired, onboarded and mentored B2B sales teams',
  ],
} as const

/* ------------------------------------------------------------------ */
/* Home — 9. Checklist lead magnet                                     */
/* ------------------------------------------------------------------ */

export const checklist = {
  title: 'The B2B Outbound Readiness Checklist',
  body: 'Nineteen checks across infrastructure, targeting, messaging, CRM and follow-up. Find out what is missing before you spend another quarter on it.',
  button: 'Send Me the Checklist',
} as const

/* ------------------------------------------------------------------ */
/* Home — 10. FAQ                                                      */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: 'What happens on the first call?',
    a: 'Thirty minutes. We ask what you sell, who buys it, what your current pipeline looks like and what you have already tried. You leave with a clear read on whether outbound is the right lever for you right now. If it is not, we will say so on the call.',
  },
  {
    q: 'How long before we see results?',
    a: 'Infrastructure and list building take the first two to four weeks, because domains need to warm up properly. Campaigns typically go live in week three or four, first replies follow within days of launch, and meaningful conversion data arrives around day 60. Enterprise cycles then run on their own timeline.',
  },
  {
    q: 'What do you need from us?',
    a: 'Access to your domain and CRM, an hour at the start to define the ideal customer profile and pull apart your best past deals, and roughly thirty minutes a month after that. Someone on your side needs to be able to take a booked meeting. We handle the rest.',
  },
  {
    q: 'Do you guarantee results?',
    a: 'No. Anyone guaranteeing a revenue number is guessing on your behalf. We control the system: infrastructure, targeting, messaging, volume, follow-up and reporting. We do not control your market, your pricing or how your team runs a booked meeting. What we commit to is the work, the reporting and an honest read on whether it is working.',
  },
  {
    q: 'Who is this not for?',
    a: 'Firms without a proven offer, businesses selling to consumers, and anyone looking for a list of contacts to run themselves. We are also the wrong fit if delivery cannot absorb new clients, or if nobody internally can take a meeting within a week of it being booked.',
  },
  {
    q: 'How are engagements structured?',
    a: 'Most engagements start with a two-week Revenue Audit that produces a written 90-day plan. From there you choose one of three ongoing engagements, run on a monthly retainer with a 90-day initial term, because outbound cannot be judged fairly on less. Everything we build is documented and yours to keep.',
  },
] as const

/* ------------------------------------------------------------------ */
/* Home — 11. Final CTA                                                */
/* ------------------------------------------------------------------ */

export const finalCta = {
  h2: 'Let’s look at your pipeline.',
  sub: 'Thirty minutes, no pitch deck. We will tell you what we would build and whether it is worth building.',
  button: { label: 'Book a Revenue Call', href: '/book-a-call' },
} as const

/* ------------------------------------------------------------------ */
/* How It Works                                                        */
/* ------------------------------------------------------------------ */

export const howItWorks = {
  eyebrow: 'How It Works',
  h1: 'Ninety days from founder-led selling to a running system.',
  sub: 'Three phases. Each one ends with something built, documented and working.',
  phases: [
    {
      range: 'Days 1–30',
      title: 'Build',
      accent: 'primary' as AccentName,
      body: 'We define who you are selling to and put the machinery in place. Nothing is sent until the infrastructure can carry it.',
      items: [
        'ICP definition, drawn from your best past deals rather than assumptions',
        'Cold email infrastructure: sending domains, authentication and warm-up',
        'List building and verification against the agreed ICP',
        'Sequence writing, with variants ready to test',
        'CRM configuration, pipeline stages and reporting',
      ],
    },
    {
      range: 'Days 31–60',
      title: 'Launch',
      accent: 'violet' as AccentName,
      body: 'Campaigns go live at controlled volume. Replies are handled the same day, and the first real conversion data arrives.',
      items: [
        'Campaigns live, with volume increased in steps',
        'Replies handled and qualified on your behalf',
        'Meetings booked directly into your calendar',
        'Nurture running for prospects who are interested but not ready',
        'First conversion data by segment and message',
      ],
    },
    {
      range: 'Days 61–90',
      title: 'Optimise',
      accent: 'emerald' as AccentName,
      body: 'We cut what is not working and document what is, so the system can be run by your team or kept running by ours.',
      items: [
        'A/B testing on subject lines, angles and calls to action',
        'Messaging refined against what actually books meetings',
        'Segment and list refinement based on reply quality',
        'Weekly pipeline reviews with your leadership',
        'Written process documentation and handover',
      ],
    },
  ],
  needFromYou: {
    eyebrow: 'Your Side',
    h2: 'What we need from you.',
    sub: 'Three things. Deliberately few, because your time is the constraint we are designing around.',
    items: [
      {
        accent: 'primary' as AccentName,
        title: 'Access',
        body: 'Domain and DNS access to set up sending infrastructure correctly, plus your CRM and calendar. If you do not have a CRM yet, we will build one.',
      },
      {
        accent: 'violet' as AccentName,
        title: 'ICP input',
        body: 'One working session at the start to pull apart your best deals, your worst fits, and what buyers actually say when they are ready. This is the highest-value hour of the engagement.',
      },
      {
        accent: 'emerald' as AccentName,
        title: 'Thirty minutes a month',
        body: 'A monthly review of pipeline, messaging and results. Someone on your side also needs to be able to take a booked meeting within a week.',
      },
    ],
  },
} as const

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  eyebrow: 'About Socioglobal',
  h1: 'A B2B revenue agency for technology firms.',
  opening:
    'Socioglobal is a B2B revenue agency headquartered in Canada, serving technology firms across North America. We exist because most B2B tech companies are excellent at delivery and improvised at sales.',
  sections: [
    {
      accent: 'primary' as AccentName,
      title: 'Our approach: systems over campaigns',
      body: [
        'A campaign is a burst of activity with an end date. A system keeps producing after the person who started it moves on to something else. Almost every firm we meet has run campaigns. Very few have a system.',
        'So we build the machinery first: who you sell to, how the conversation starts, what happens when someone replies, where it is recorded, and what gets reviewed each week. Once that exists, individual campaigns become something you can test rather than something you have to hope about.',
      ],
    },
    {
      accent: 'violet' as AccentName,
      title: 'How we work: embedded, not arms-length',
      body: [
        'We do not hand over a strategy document and leave. We build the infrastructure, write the sequences, run the campaigns, handle the replies and sit in your pipeline reviews. You see the same dashboard we do.',
        'Everything we build is documented and yours to keep, including the lists, the sequences, the CRM configuration and the written process. The goal is a revenue function that survives us, whether we keep running it or your own team takes it over.',
      ],
    },
    {
      accent: 'emerald' as AccentName,
      title: 'Who we serve',
      body: [
        'Web development agencies, software development firms, Oracle and ERP implementation partners, and MSPs and IT services businesses. B2B only, technology only, North America.',
        'We work best with firms that already deliver well, have a proven offer and a real average deal value, and have reached the point where the founder can no longer be the only person who can sell.',
      ],
    },
  ],
  leadership: {
    eyebrow: 'Leadership',
    h2: 'Who runs it.',
    name: 'Tejasvi Saini',
    role: 'Founder',
    bio: [
      'A B2B sales leader with over a decade generating enterprise revenue across Oracle ERP implementations, managed services, and B2B technology.',
      'Has generated $10M+ in enterprise B2B revenue, built partner and alliance channels within the Oracle ecosystem, and hired, onboarded and mentored sales teams.',
      'Previously co-founded and scaled a B2B company to $1M+ annual revenue with 300+ clients and a 25-person team.',
    ],
  },
} as const

/* ------------------------------------------------------------------ */
/* Book a call                                                         */
/* ------------------------------------------------------------------ */

export const bookACall = {
  eyebrow: 'Book a Revenue Call',
  h1: 'Let’s look at your pipeline.',
  sub: 'Thirty minutes. We will ask what you sell, who buys it and what your pipeline looks like now, then tell you plainly whether we can help.',
  points: [
    'A direct read on whether outbound is your constraint right now',
    'What we would build first, and in what order',
    'An honest answer if we are not the right fit',
  ],
  companySizes: [
    '1–10 employees',
    '11–25 employees',
    '26–50 employees',
    '51–200 employees',
    '200+ employees',
  ],
  outboundApproaches: [
    'None — referrals and inbound only',
    'Founder sends outreach when there is time',
    'We have tried cold email and stopped',
    'We have an SDR or agency running it now',
    'We have a sales team but no consistent process',
  ],
} as const

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  description:
    'B2B outbound and revenue systems for technology firms across North America.',
  services: [
    { label: 'Pipeline Engine', href: '/how-it-works' },
    { label: 'Pipeline + Conversion', href: '/how-it-works' },
    { label: 'Fractional Revenue Leadership', href: '/how-it-works' },
    { label: 'Revenue Audit', href: '/book-a-call' },
  ],
  company: [
    { label: 'How It Works', href: '/how-it-works' },
    { label: "Who It's For", href: '/who-its-for' },
    { label: 'About', href: '/about' },
    { label: 'Book a Call', href: '/book-a-call' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  disclaimer:
    'Results disclaimer: Socioglobal does not guarantee any specific revenue, pipeline or meeting outcome. Figures shown on this site describe past work and are not a projection of your results. Outcomes depend on your market, offer, pricing and sales execution.',
} as const

/* ------------------------------------------------------------------ */
/* Per-page SEO                                                        */
/* ------------------------------------------------------------------ */

export const seo = {
  home: {
    title: 'B2B Outbound Agency & Revenue Systems for Tech Firms',
    description:
      'Socioglobal is a B2B outbound agency in Canada. We build and run cold email infrastructure, CRM and nurture, and fractional sales leadership for technology firms across North America.',
  },
  howItWorks: {
    title: 'How It Works — 90 Days to a Running Outbound System',
    description:
      'Our 90-day B2B outbound process: ICP definition and cold email infrastructure in days 1–30, live campaigns and booked meetings in days 31–60, testing and documentation in days 61–90.',
  },
  whoItsFor: {
    title: 'Who It’s For — Outbound for Agencies, MSPs and ERP Partners',
    description:
      'Outbound lead generation for MSPs, web development agencies, software development firms and Oracle ERP implementation partners. The pipeline problem each one faces, and what we build to fix it.',
  },
  about: {
    title: 'About — B2B Revenue Agency in Canada',
    description:
      'Socioglobal is a B2B revenue agency headquartered in Canada, serving technology firms across North America. Systems over campaigns, embedded rather than arms-length.',
  },
  bookACall: {
    title: 'Book a Revenue Call',
    description:
      'Book a 30-minute call with Socioglobal. We will look at your pipeline, tell you what we would build first, and give you an honest answer if we are not the right fit.',
  },
} as const
