export type CaseStudyMetric = {
  label: string
  value: string
}

export type CaseStudySection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export type CaseStudyRecord = {
  id: number
  title: string
  slug: string
  image: string
  techLabel: string
  techValue: string
  tags: string[]
  description: string
  subtitle?: string
  website?: string
  snapshot?: Array<{ label: string; value: string }>
  metrics?: CaseStudyMetric[]
  techStack?: string[]
  sections: CaseStudySection[]
  outcomes?: string[]
  gallery?: string[]
}

export const caseStudies: CaseStudyRecord[] = [
  {
    id: 1,
    title: 'Tabiat Live',
    slug: 'tabiat-live',
    image: '/casestudy/Tabbiat/tabbiat.png',
    techLabel: 'Project Type',
    techValue: 'Healthcare Platform',
    tags: ['Web App', 'Analytics', 'Healthcare'],
    description:
      'Turned complex diagnostic device data into a scalable doctor-friendly web platform with reporting, analytics, and patient record workflows.',
    subtitle:
      'Turning complex diagnostic device data into a clear, scalable web platform for doctors',
    website: 'https://tabiat.live/',
    snapshot: [
      { label: 'Client', value: 'Dr. Sukhera' },
      { label: 'Industry', value: 'Healthcare / Nephrology' },
      { label: 'Scope', value: 'Strategy, UX/UI, full-stack, integrations, reporting, support' },
      { label: 'Engagement', value: 'End-to-end build' },
    ],
    metrics: [
      { label: 'Core Analytics Views', value: '12+' },
      { label: 'Report Workflows', value: 'Bulk + Individual' },
      { label: 'Cloud Architecture', value: 'AWS-backed' },
      { label: 'Delivery Model', value: 'Waterfall + Iterative Support' },
    ],
    techStack: ['React.js', 'Node.js', 'AWS Lambda', 'DynamoDB', 'REST APIs', 'Redux', 'Zustand'],
    sections: [
      {
        title: 'Client Background',
        paragraphs: [
          'Tabiat Live is built around a diagnostic device that captures kidney-related and broader health indicators.',
          'The core challenge was not data collection. The challenge was turning technical readings into clinically useful decisions.',
        ],
      },
      {
        title: 'Problem',
        bullets: [
          'No complete doctor-facing platform for patient records, trends, and report review',
          'Data was trapped in raw technical flow with low practical usability',
          'No clean search/filter/export system for report operations',
          'No strong community analytics layer for wider disease trend visibility',
        ],
      },
      {
        title: 'What We Built',
        bullets: [
          'Secure authenticated application structure',
          'Clinical dashboards for BP, pulse, systolic/diastolic, report distribution, and trend analysis',
          'Community-level analytics for BMI, age, gender, hypertension, and related indicators',
          'Patient report management with search, filtering, and individual/bulk downloads',
          'Scalable cloud-backed architecture with optimized read/write operations',
        ],
      },
      {
        title: 'Approach',
        paragraphs: [
          'We handled product strategy, UX planning, UI design, frontend and backend development, API integration, and reporting architecture.',
          'Execution followed structured discovery, information mapping, UX direction, build, integration, testing, and support.',
        ],
      },
      {
        title: 'Outcome',
        bullets: [
          'Doctors gained clearer visibility into patient and community-level patterns',
          'Report workflows became faster and more practical for daily medical usage',
          'The product shifted from device-bound data dependency to a usable platform',
          'Long-term maintainability and scalability improved significantly',
        ],
      },
    ],
    outcomes: [
      'Better clinical readability of diagnostic data',
      'Stronger healthcare reporting workflow',
      'Scalable product foundation for future growth',
    ],
    gallery: ['/casestudy/Tabbiat/tabbiat.png'],
  },
  {
    id: 2,
    title: 'Biocare Ecommerce',
    slug: 'biocare-ecommerce',
    image: '/casestudy/Biocare/biocare.png',
    techLabel: 'Project Type',
    techValue: 'CRO + Performance',
    tags: ['WooCommerce', 'CRO', 'Speed'],
    description:
      'Optimized WooCommerce buying flow with AJAX cart behavior, bundle logic, and performance improvements to reduce friction and improve conversion.',
    subtitle:
      'Improving page speed, reducing friction, and increasing cart value with CRO-focused WooCommerce enhancements',
    website: 'https://biocare.co.il/',
    snapshot: [
      { label: 'Client', value: 'Biocare' },
      { label: 'Industry', value: 'Healthcare supplements / ecommerce' },
      { label: 'Scope', value: 'AJAX cart, bundle discounts, speed optimization, CRO' },
      { label: 'Engagement', value: 'Optimization project' },
    ],
    metrics: [
      { label: 'Conversion Lift', value: '~20%' },
      { label: 'Load Speed Improvement', value: '~40%' },
      { label: 'Cart UX', value: 'AJAX, no forced full reloads' },
      { label: 'Primary Focus', value: 'Cart value + flow clarity' },
    ],
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'AJAX'],
    sections: [
      {
        title: 'Problem',
        bullets: [
          'Archive and product pages had slow interaction flow',
          'Add-to-cart actions were reload-heavy and delayed',
          'Store lacked conversion-focused upsell/bundle mechanics',
          'Too much friction between product discovery and checkout',
        ],
      },
      {
        title: 'Solution',
        bullets: [
          'Implemented AJAX-based add-to-cart flow',
          'Built bundle discount feature to support higher cart value',
          'Improved product/archive responsiveness under real usage',
          'Aligned changes around conversion path rather than isolated code tasks',
        ],
      },
      {
        title: 'Approach',
        paragraphs: [
          'We audited key interaction bottlenecks, replaced reload-heavy behavior, and prioritized purchase-critical touchpoints first.',
          'Every improvement was evaluated through practical conversion impact and stability inside the existing WooCommerce architecture.',
        ],
      },
      {
        title: 'Outcome',
        bullets: [
          'Faster and smoother product interaction',
          'Reduced cart flow interruption',
          'Better buying momentum from listing page to checkout',
          'Improved conversion efficiency without a full store rebuild',
        ],
      },
    ],
    outcomes: [
      'Higher conversion performance',
      'Better UX in purchase-critical moments',
      'More effective support for multi-item orders',
    ],
    gallery: ['/casestudy/Biocare/biocare.png'],
  },
  {
    id: 3,
    title: 'Sipko Security',
    slug: 'sipko-security',
    image: '/casestudy/Sipko/sipko.png',
    techLabel: 'Project Type',
    techValue: 'SEO + Redesign System',
    tags: ['Local SEO', 'Conversion', 'WordPress'],
    description:
      'Rebuilt local service and suburb pages into a reusable, conversion-focused SEO system with improved structure, speed, and ranking outcomes.',
    subtitle:
      'Rebuilding local service pages into a scalable lead generation system for SEO, speed, and conversion',
    website: 'https://sipkosecurity.com/',
    snapshot: [
      { label: 'Client', value: 'Sipko Security' },
      { label: 'Industry', value: 'Security systems (Australia)' },
      { label: 'Scope', value: 'UI redesign, local SEO, page system, speed, conversion' },
      { label: 'Engagement', value: 'High-volume rollout + ongoing support' },
    ],
    metrics: [
      { label: 'Traffic Increase', value: '~30%' },
      { label: 'Page Production Pace', value: '15-18 pages/day' },
      { label: 'Web Vitals', value: '90%+ performance' },
      { label: 'SERP Impact', value: 'Multiple pages in top 5' },
    ],
    techStack: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'Google Search Console', 'Semrush'],
    sections: [
      {
        title: 'Problem',
        bullets: [
          'Traffic existed, but conversion and trust flow were weak',
          'Pages were bloated, unclear in intent, and poorly structured',
          'CTA placement and hierarchy were inconsistent',
          'Keyword targeting and local service intent had critical gaps',
        ],
      },
      {
        title: 'What We Changed',
        bullets: [
          'Redesigned local suburb, service, and catalog page structures',
          'Replaced AI-heavy content style with clearer, user-first layout',
          'Built reusable WordPress design system to avoid CSS duplication',
          'Aligned pages to local intent, conversion flow, and indexing readiness',
          'Improved technical performance and page responsiveness',
        ],
      },
      {
        title: 'Approach',
        paragraphs: [
          'We treated the site as a growth system, not a page collection: audit, keyword mapping, intent definition, design system creation, rollout, and iterative optimization.',
          'Daily review in Search Console kept decisions tied to real visibility and click behavior.',
        ],
      },
      {
        title: 'Outcome',
        bullets: [
          'Higher visibility and stronger local ranking movement',
          'Improved engagement and lead flow from targeted pages',
          'Operationally sustainable publishing workflow for future expansion',
          'Cleaner journey from search visit to service enquiry',
        ],
      },
    ],
    outcomes: [
      'Stronger local SEO system',
      'Better conversion-focused page UX',
      'Reusable framework for ongoing location expansion',
    ],
    gallery: ['/casestudy/Sipko/sipko.png'],
  },
  {
    id: 4,
    title: 'Eye Care App UI/UX',
    slug: 'eye-care-app-ui-ux',
    image: '/casestudy/Eye%20Care/Eye.png',
    techLabel: 'Project Type',
    techValue: 'Mobile App UI/UX',
    tags: ['UI/UX', 'Figma', 'Health App'],
    description:
      'Designed a calm, structured mobile experience for eye tests, exercises, mini games, and progress tracking with a repeat-friendly product flow.',
    subtitle:
      'A complete mobile UI system that makes eye care activities approachable, clear, and easier to repeat.',
    website:
      'https://www.figma.com/design/RP56jCTJKVS1LBD6gRwLQX/Eye-Care-App-Ui?node-id=0-1&p=f&t=zJ1jCgxAdDZHmeI2-0',
    snapshot: [
      { label: 'Industry', value: 'Digital health / wellness' },
      { label: 'Tooling', value: 'Figma' },
      { label: 'Scope', value: 'Product UX, UI system, flow design' },
      { label: 'Delivery', value: 'Concept-to-system design' },
    ],
    metrics: [
      { label: 'Core Modules', value: '5+' },
      { label: 'Primary Platform', value: 'Mobile' },
      { label: 'Flow Type', value: 'Habit + Progress' },
      { label: 'Design System', value: 'Card-based UI' },
    ],
    techStack: ['Figma', 'UX research', 'Interaction design', 'Mobile UI'],
    sections: [
      {
        title: 'The Opportunity',
        paragraphs: [
          'The product needed to combine tests, exercises, games, history, and utility screens inside one coherent mobile structure.',
          'The direction focused on calm usability and repeat engagement rather than one-time novelty interaction.',
        ],
      },
      {
        title: 'The Problem',
        bullets: [
          'Health apps lose users when UX is too dense or too playful without structure.',
          'Multiple feature groups needed to coexist without fragmented navigation.',
          'Users needed confidence, clarity, and quick task context on small screens.',
        ],
      },
      {
        title: 'What We Designed',
        bullets: [
          'Welcome and home flow with category-led wayfinding',
          'Dedicated hubs for exercises and games',
          'Instruction-first task detail screens',
          'Progress and history views for repeat use',
          'Utility screens like privacy, rating, and remove-ads flows',
        ],
      },
      {
        title: 'Outcome',
        paragraphs: [
          'The result is a development-ready product design system with clearer navigation, stronger feature grouping, and better session continuity.',
          'The concept now feels easier to understand, easier to build from, and easier for end users to trust.',
        ],
      },
    ],
    outcomes: [
      'Cleaner mobile UX hierarchy',
      'More structured repeat-use behavior',
      'Stronger product readiness for implementation',
    ],
    gallery: [
      '/casestudy/Eye%20Care/Eye.png',
      '/casestudy/Eye%20Care/Home%20Screen.png',
      '/casestudy/Eye%20Care/Eye%20Exercise%20Screen.png',
      '/casestudy/Eye%20Care/Inner%20page%2020.png',
    ],
  },
  {
    id: 5,
    title: 'Bilsign',
    slug: 'bilsign',
    image: '/casestudy/Bilsign/Bilsign.png',
    techLabel: 'Project Type',
    techValue: 'SaaS Product UX',
    tags: ['SaaS', 'Automotive', 'Multi-tenant'],
    description:
      'Built a complete SaaS UX system for automotive dealerships with multi-tenant structure, role-based workflows, and contract-heavy operational flows.',
    subtitle:
      'End-to-end product UX for a dealership platform with 50+ role-aware screens and scalable system logic.',
    snapshot: [
      { label: 'Client', value: 'Valon Salemi / Bilsign' },
      { label: 'Industry', value: 'Automotive dealership software' },
      { label: 'Scope', value: 'Brand, IA, wireframes, 50+ product screens' },
      { label: 'Language', value: 'Norwegian UI' },
    ],
    metrics: [
      { label: 'Designed Screens', value: '50+' },
      { label: 'Core User Roles', value: '5' },
      { label: 'Engagement', value: 'Long-term collaboration' },
      { label: 'Delivery Type', value: 'End-to-end UX' },
    ],
    techStack: ['Figma', 'UX strategy', 'Wireframing', 'Information architecture'],
    sections: [
      {
        title: 'Client Background',
        paragraphs: [
          'Bilsign was positioned as a dealership-focused SaaS product for buying, selling, and mediation contract workflows.',
          'The system needed to support hierarchy from super admin to employees across organizations.',
        ],
      },
      {
        title: 'The Problem',
        bullets: [
          'No complete UX foundation for contract-heavy dealership workflows',
          'No tenant-aware structure for organizations and internal roles',
          'No cohesive interface language for large dealership operations',
        ],
      },
      {
        title: 'Our Approach',
        bullets: [
          'Defined workflow map before visual polish',
          'Built wireframe-first information clarity',
          'Created modular design language for scalability',
          'Iterated continuously as requirements evolved',
        ],
      },
      {
        title: 'Outcome',
        paragraphs: [
          'The client moved from concept-level needs to a complete, development-ready SaaS design system.',
          'The platform became easier to present, easier to navigate, and stronger for long-term scale decisions.',
        ],
      },
    ],
    outcomes: [
      'Stronger dealership SaaS positioning',
      'Clearer multi-role UX architecture',
      'Scalable design foundation for buildout',
    ],
    gallery: [
      '/casestudy/Bilsign/Bilsign.png',
      '/casestudy/Bilsign/Hjem.png',
      '/casestudy/Bilsign/Admin%20Company%20dashbord.png',
      '/casestudy/Bilsign/Admin%20Company%20-%20Administrer%20roller.png',
      '/casestudy/Bilsign/Admin%20Company%20-%20Kontrakter.png',
      '/casestudy/Bilsign/Employees%20-%20%20New%20kj%C3%B8pskontrakt.png',
      '/casestudy/Bilsign/Super%20Admin%20dashbord.png',
      '/casestudy/Bilsign/Super%20Admin%20-%20All%20customer%20-%20Kunder.png',
    ],
  },
  {
    id: 6,
    title: 'Ultimate Content Calendar',
    slug: 'ultimate-content-calendar',
    image: '/casestudy/ultimate%20content%20calender/Screenshot%20%2889%29.png',
    techLabel: 'Project Type',
    techValue: 'SaaS Product Build',
    tags: ['Laravel', 'Stripe', 'Social APIs'],
    description:
      'Built a multi-client social media planning and scheduling platform with tenant controls, Stripe billing, and API-aware operational architecture.',
    subtitle:
      'A scalable scheduling product designed for multi-account operations, billing readiness, and platform API constraints.',
    website: 'https://ultimatecontentcalendar.com/',
    snapshot: [
      { label: 'Client', value: 'John Spinosa / Spin Management' },
      { label: 'Industry', value: 'Social media management' },
      { label: 'Scope', value: 'Product build, UX/UI, APIs, billing, support' },
      { label: 'Model', value: 'Multi-client tenant architecture' },
    ],
    metrics: [
      { label: 'Users', value: '2,000+' },
      { label: 'Leads (3 Months)', value: '1,000+' },
      { label: 'Weekly Activity', value: '10,000+' },
      { label: 'Social Integrations', value: '5+ major platforms' },
    ],
    techStack: ['Laravel', 'Blade', 'Stripe', 'Facebook API', 'Instagram API', 'LinkedIn API', 'TikTok API', 'X API'],
    sections: [
      {
        title: 'The Problem',
        bullets: [
          'No existing system for multi-client scheduling at scale',
          'Need for tenant-safe account separation',
          'Need for monetization and subscription workflows',
          'Need to operate within third-party API rate limits',
        ],
      },
      {
        title: 'What We Built',
        bullets: [
          'Tenant-based client isolation model',
          'Scheduling and planning product workflows',
          'Stripe-powered billing and subscription logic',
          'API logging and usage visibility for operational control',
          'Ongoing support for evolving requirements',
        ],
      },
      {
        title: 'Key Challenges',
        paragraphs: [
          'API rate limits and shifting requirements required a flexible architecture that stayed stable under real usage.',
          'The product had to balance operational clarity, growth readiness, and monetization in one coherent system.',
        ],
      },
      {
        title: 'Outcome',
        paragraphs: [
          'The platform launched with strong early traction and better control over multi-client operations.',
          'It now supports account separation, billing readiness, and growth-focused scheduling workflows in a single product foundation.',
        ],
      },
    ],
    outcomes: [
      'Scalable multi-client publishing workflows',
      'Operational visibility for API usage control',
      'Commercial readiness through billing integration',
    ],
    gallery: [
      '/casestudy/ultimate%20content%20calender/Screenshot%20%2889%29.png',
      '/casestudy/ultimate%20content%20calender/Screenshot%20%2887%29%20%281%29.png',
      '/casestudy/ultimate%20content%20calender/Screenshot%20%2890%29.png',
      '/casestudy/ultimate%20content%20calender/Screenshot%20%2891%29.png',
      '/casestudy/ultimate%20content%20calender/Screenshot%20%2892%29.png',
      '/casestudy/ultimate%20content%20calender/Screenshot%20%2893%29.png',
      '/casestudy/ultimate%20content%20calender/Screenshot%20%2894%29.png',
    ],
  },
]
