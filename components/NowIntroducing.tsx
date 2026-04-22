'use client'

import React, { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Clock3,
  Handshake,
  MoveUpRight,
  Sparkles,
} from 'lucide-react'

import FeatureStrip from './FeatureStrip'
import PopupShell from './popup/popup-shell'
import SectionIntro from './SectionIntro'
import HashCTAButton from './HashCTAButton'
import { CTAButton } from './ui/cta-button'

type GoalFilter = 'all' | 'leads' | 'ux' | 'visibility' | 'systems'

type IntroCard = {
  id: number
  title: string
  label: string
  projectType: string
  summary: string
  deliverables: string[]
  timeline: string
  caseStudyHint: string
  goal: Exclude<GoalFilter, 'all'>
  bestFor: string
  outcomes: string[]
  currentSituation: string
  afterLift: string
  clientInputs: string
  includes: string
  excludes: string
  ctaText: string
  pricingBand: string
  caseStudyTitle: string
  caseStudyMetric: string
  caseStudyLink: string
  faq: Array<{ question: string; answer: string }>
}

const goalFilters: Array<{ key: GoalFilter; label: string }> = [
  { key: 'all', label: 'All Services' },
  { key: 'leads', label: 'More Leads' },
  { key: 'ux', label: 'Better UX' },
  { key: 'visibility', label: 'More Visibility' },
  { key: 'systems', label: 'System Build' },
]

const introCards: IntroCard[] = [
  {
    id: 1,
    title: 'Custom websites built for business goals',
    label: 'Web Design',
    projectType: 'Website',
    summary:
      'Custom website systems designed around trust, positioning, and conversion for your specific business model.',
    deliverables: [
      'Conversion-focused page structure and messaging',
      'Custom visual direction mapped to your brand',
      'Responsive build for mobile, tablet, and desktop',
      'Clean handoff and support-ready architecture',
    ],
    timeline: '2-6 weeks depending on scope',
    caseStudyHint: 'See related case studies for structure and outcomes.',
    goal: 'leads',
    bestFor: 'Best for service businesses that need a website that closes better.',
    outcomes: [
      'Higher inquiry quality from clearer service pages',
      'Better conversion from trust-first page structure',
      'Stronger brand credibility on first visit',
    ],
    currentSituation: 'Traffic visits the site, but users do not take action consistently.',
    afterLift: 'Users quickly understand value, trust the brand, and move into contact flow.',
    clientInputs: 'Brand direction, offer details, target audience, existing assets.',
    includes: 'Strategy, UX structure, UI direction, responsive implementation.',
    excludes: 'Paid ad management, long-form content production, hosting fees.',
    ctaText: 'Get Website Plan',
    pricingBand: 'Typical starting range: $1,000 - $7,500+',
    caseStudyTitle: 'Biocare Ecommerce',
    caseStudyMetric: 'Improved structure for conversion and cleaner purchase path.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'Can this work with our current website?',
        answer: 'Yes, we can rebuild on top of your current system or migrate if needed.',
      },
      {
        question: 'How fast can we start?',
        answer: 'Most projects can start within days after scope finalization.',
      },
      {
        question: 'Can you help with copy and section messaging?',
        answer: 'Yes, we guide structure and conversion messaging as part of delivery.',
      },
    ],
  },
  {
    id: 2,
    title: 'E-commerce websites that support sales',
    label: 'E-commerce',
    projectType: 'Website',
    summary:
      'Online store experiences optimized for product discovery, checkout flow, and repeat purchase behavior.',
    deliverables: [
      'Store architecture and collection hierarchy',
      'Product detail and cart/checkout optimization',
      'Conversion-focused UX for key buying journeys',
      'Performance and usability improvements',
    ],
    timeline: '3-8 weeks depending on catalog and flows',
    caseStudyHint: 'Best fit for brands that need higher online sales velocity.',
    goal: 'leads',
    bestFor: 'Best for ecommerce brands with traffic but low purchase conversion.',
    outcomes: [
      'Faster product discovery from cleaner collections',
      'Reduced checkout drop-off in key steps',
      'Better average order journey with stronger product pages',
    ],
    currentSituation: 'Users browse products but hesitate before adding to cart or paying.',
    afterLift: 'Users move through product, cart, and checkout with less friction.',
    clientInputs: 'Catalog data, shipping/tax setup, brand assets, conversion goals.',
    includes: 'Store UX, page templates, key flow optimization, responsive QA.',
    excludes: 'Inventory ops, ad creatives, warehouse integrations unless scoped.',
    ctaText: 'Get Ecommerce Plan',
    pricingBand: 'Typical starting range: $3,000 - $7,500+',
    caseStudyTitle: 'Ultimate Content Calendar',
    caseStudyMetric: 'Clearer journey structure to support recurring user action.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'Do you work with Shopify and WooCommerce?',
        answer: 'Yes, both are supported based on your growth and operation needs.',
      },
      {
        question: 'Will existing products stay intact?',
        answer: 'Yes, we map migration or redesign to preserve existing catalog data.',
      },
      {
        question: 'Can we launch in phases?',
        answer: 'Yes, we can roll out high-impact pages first and scale in phases.',
      },
    ],
  },
  {
    id: 3,
    title: 'WordPress, Shopify, Webflow, and CMS builds',
    label: 'CMS Builds',
    projectType: 'Website',
    summary:
      'CMS-powered builds that balance editor flexibility with clean code, speed, and long-term maintainability.',
    deliverables: [
      'Platform setup and CMS architecture',
      'Template and component implementation',
      'Content modeling and publishing workflows',
      'Technical SEO and performance setup',
    ],
    timeline: '2-7 weeks based on platform and complexity',
    caseStudyHint: 'Ideal when your team needs controlled, scalable content publishing.',
    goal: 'systems',
    bestFor: 'Best for teams who need easy publishing without breaking design consistency.',
    outcomes: [
      'Faster publishing with cleaner editorial workflow',
      'Lower dependency on developers for routine updates',
      'Stronger consistency across new pages and content types',
    ],
    currentSituation: 'Content updates are slow, inconsistent, or blocked by technical setup.',
    afterLift: 'Your team can publish faster with reusable templates and controlled layout.',
    clientInputs: 'Preferred CMS, content types, editor roles, migration priorities.',
    includes: 'CMS architecture, templates, reusable sections, publishing workflow.',
    excludes: 'Long-term editorial operations unless retained separately.',
    ctaText: 'Get CMS Build Plan',
    pricingBand: 'Typical starting range: $1,000 - $7,500+',
    caseStudyTitle: 'Eye Care App UI',
    caseStudyMetric: 'Structured content and interface blocks for long-term maintainability.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'Which CMS should we use?',
        answer: 'We recommend based on your update frequency, team skills, and growth needs.',
      },
      {
        question: 'Will this help SEO too?',
        answer: 'Yes, CMS structure and page architecture are aligned with SEO basics.',
      },
      {
        question: 'Can this include custom post types?',
        answer: 'Yes, we can model content with CPT/ACF when needed.',
      },
    ],
  },
  {
    id: 4,
    title: 'Custom portals and web-based systems',
    label: 'Web Systems',
    projectType: 'Web App',
    summary:
      'Role-based portals and internal systems built to reduce operational friction and improve decision visibility.',
    deliverables: [
      'User roles, permissions, and dashboard logic',
      'Custom workflow design and implementation',
      'Data views, reporting, and system utilities',
      'Integration-ready architecture',
    ],
    timeline: '4-12 weeks depending on modules',
    caseStudyHint: 'Strong fit for service, operations, and multi-role teams.',
    goal: 'systems',
    bestFor: 'Best for operations-heavy businesses handling recurring internal workflows.',
    outcomes: [
      'Reduced manual workload through clearer workflows',
      'Better visibility with role-based dashboards',
      'Faster decision-making from centralized data views',
    ],
    currentSituation: 'Workflows are spread across tools, spreadsheets, and manual follow-up.',
    afterLift: 'Core processes are handled in one structured portal with role-level control.',
    clientInputs: 'Workflow map, user roles, data fields, must-have integrations.',
    includes: 'System architecture, workflow modules, dashboards, role permissions.',
    excludes: 'Legacy system rewrite beyond scoped modules.',
    ctaText: 'Get Web App Scope',
    pricingBand: 'Typical starting range: $7,500+',
    caseStudyTitle: 'Tabiat Live',
    caseStudyMetric: 'Converted complex diagnostic workflows into structured web operations.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'Can we launch one module first?',
        answer: 'Yes, we usually recommend phased delivery for speed and lower risk.',
      },
      {
        question: 'Can this connect with current tools?',
        answer: 'Yes, integration-ready architecture is planned in scope.',
      },
      {
        question: 'Will non-technical staff be able to use it?',
        answer: 'Yes, UX and role flow are built for daily operational teams.',
      },
    ],
  },
  {
    id: 5,
    title: 'Landing pages designed to generate leads',
    label: 'Lead Capture',
    projectType: 'Website',
    summary:
      'Focused landing page systems built to improve campaign outcomes and convert qualified traffic into leads.',
    deliverables: [
      'Offer-first page structure and messaging',
      'Lead form flow and conversion UX',
      'Speed and mobile readability optimization',
      'A/B testing-ready layout foundation',
    ],
    timeline: '1-3 weeks',
    caseStudyHint: 'Best for paid traffic, campaigns, and offer validation.',
    goal: 'leads',
    bestFor: 'Best for campaigns where clicks are coming but leads are weak.',
    outcomes: [
      'Higher lead conversion from focused page structure',
      'Stronger lead quality from clearer offer messaging',
      'Improved mobile response on campaign traffic',
    ],
    currentSituation: 'Ad traffic lands on pages that are too broad and low-converting.',
    afterLift: 'Visitors see a clear offer path and submit with less hesitation.',
    clientInputs: 'Offer details, audience profile, campaign goals, existing analytics.',
    includes: 'Landing page UX, copy structure guidance, form and CTA optimization.',
    excludes: 'Ad account management unless scoped separately.',
    ctaText: 'Get Landing Page Plan',
    pricingBand: 'Typical starting range: Less than $1,000 - $3,000',
    caseStudyTitle: 'Sipko Security',
    caseStudyMetric: 'Focused lead-capture structure for better inquiry flow.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'Can you match this to our ads?',
        answer: 'Yes, landing structure is aligned to campaign intent and user stage.',
      },
      {
        question: 'Do you include mobile optimization?',
        answer: 'Yes, mobile readability and form flow are core requirements.',
      },
      {
        question: 'Can we test variants?',
        answer: 'Yes, we can prepare A/B-test-ready layout variations.',
      },
    ],
  },
  {
    id: 6,
    title: 'Website redesigns and platform migrations',
    label: 'Redesign',
    projectType: 'Website',
    summary:
      'Strategic redesigns and migrations that improve clarity, preserve rankings, and reduce transition risk.',
    deliverables: [
      'UX and content architecture audit',
      'Visual redesign with improved hierarchy',
      'Migration plan and URL/content mapping',
      'Launch QA and post-launch stabilization',
    ],
    timeline: '3-10 weeks depending on migration scope',
    caseStudyHint: 'Recommended when the current site no longer supports growth.',
    goal: 'ux',
    bestFor: 'Best for sites that look outdated or underperform after updates.',
    outcomes: [
      'Cleaner information hierarchy for better decision flow',
      'Lower migration risk through structured rollout',
      'Better retention of rankings with mapped redirects',
    ],
    currentSituation: 'Current site blocks growth due to outdated UX or platform limitations.',
    afterLift: 'You get a clearer, faster site with safer migration and launch process.',
    clientInputs: 'Current site access, analytics, content inventory, migration constraints.',
    includes: 'Audit, redesign system, migration mapping, QA and stabilization.',
    excludes: 'Large net-new feature development unless added in scope.',
    ctaText: 'Get Redesign Plan',
    pricingBand: 'Typical starting range: $3,000 - $7,500+',
    caseStudyTitle: 'Bilsign',
    caseStudyMetric: 'Redesign-driven clarity improvement with stronger presentation flow.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'Will this hurt SEO?',
        answer: 'No, migration mapping and technical checks are included to protect visibility.',
      },
      {
        question: 'Can we keep our existing content?',
        answer: 'Yes, we restructure and migrate important content where it supports goals.',
      },
      {
        question: 'Can redesign happen without downtime?',
        answer: 'Yes, staging-first approach minimizes risk during launch.',
      },
    ],
  },
  {
    id: 7,
    title: 'UI/UX that improves clarity and flow',
    label: 'Experience',
    projectType: 'UI/UX Design',
    summary:
      'Product and interface design focused on clearer navigation, lower friction, and better user completion rates.',
    deliverables: [
      'UX mapping and flow-level decisions',
      'Wireframes and high-fidelity UI direction',
      'Component-level interaction standards',
      'Design handoff for implementation teams',
    ],
    timeline: '2-6 weeks',
    caseStudyHint: 'Great for products with drop-off, confusion, or low completion.',
    goal: 'ux',
    bestFor: 'Best for products where users drop before reaching key actions.',
    outcomes: [
      'Higher task completion through cleaner flow design',
      'Reduced confusion at decision-heavy screens',
      'Better consistency across product touchpoints',
    ],
    currentSituation: 'Users struggle to understand next steps inside the product.',
    afterLift: 'Flows become easier to follow, with clear hierarchy and action cues.',
    clientInputs: 'Current screens, user goals, analytics, product constraints.',
    includes: 'Flow mapping, UI system, interaction guidance, handoff package.',
    excludes: 'Full frontend development unless included separately.',
    ctaText: 'Get UX Improvement Plan',
    pricingBand: 'Typical starting range: $1,000 - $7,500+',
    caseStudyTitle: 'Eye Care App UI',
    caseStudyMetric: 'Improved readability and interaction flow for multi-screen UX.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'Can this be done without full rebuild?',
        answer: 'Yes, we can target key flows first and improve iteratively.',
      },
      {
        question: 'Do you provide design files?',
        answer: 'Yes, complete handoff files and flow notes are included.',
      },
      {
        question: 'Can you collaborate with our developers?',
        answer: 'Yes, implementation guidance is part of handoff support.',
      },
    ],
  },
  {
    id: 8,
    title: 'Better structure for user journeys',
    label: 'User Flow',
    projectType: 'UI/UX Design',
    summary:
      'Journey-level restructuring that helps users move from first interaction to action with less confusion.',
    deliverables: [
      'Journey mapping for core user intents',
      'Navigation and hierarchy restructuring',
      'Task-based path optimization',
      'Clarity improvements across decision points',
    ],
    timeline: '2-5 weeks',
    caseStudyHint: 'Useful when users browse but do not convert.',
    goal: 'ux',
    bestFor: 'Best for websites/apps with traffic but poor action completion.',
    outcomes: [
      'Fewer user drop-offs between key steps',
      'Clearer journey progression from entry to action',
      'Improved conversion paths for major intents',
    ],
    currentSituation: 'Users enter the product/site but get stuck between steps.',
    afterLift: 'Journey paths become clear, predictable, and easier to complete.',
    clientInputs: 'Top user journeys, conversion goals, current analytics behavior.',
    includes: 'Journey map, path redesign, friction fixes, navigation adjustments.',
    excludes: 'Deep backend logic changes unless separately scoped.',
    ctaText: 'Get User Flow Plan',
    pricingBand: 'Typical starting range: $1,000 - $3,000',
    caseStudyTitle: 'Ultimate Content Calendar',
    caseStudyMetric: 'Structured pathing improved progression through key pages.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'How do you decide which journey to fix first?',
        answer: 'We prioritize by conversion impact and user drop-off severity.',
      },
      {
        question: 'Will this affect our brand style?',
        answer: 'No, journey improvements can retain your current visual identity.',
      },
      {
        question: 'Can this be tested before full rollout?',
        answer: 'Yes, we can validate flow changes in staged iterations.',
      },
    ],
  },
  {
    id: 9,
    title: 'SEO that improves visibility',
    label: 'Visibility',
    projectType: 'SEO',
    summary:
      'Search-focused improvements across structure, content, and technical setup to increase discoverability.',
    deliverables: [
      'Keyword and intent mapping',
      'On-page SEO and content structure fixes',
      'Technical SEO and indexing improvements',
      'Tracking and reporting setup',
    ],
    timeline: 'Ongoing, first gains in 4-8 weeks',
    caseStudyHint: 'Best paired with clear service and location pages.',
    goal: 'visibility',
    bestFor: 'Best for businesses with weak search visibility despite quality services.',
    outcomes: [
      'Stronger keyword visibility on priority service pages',
      'Improved crawl and indexing quality',
      'Better content relevance for search intent',
    ],
    currentSituation: 'Pages exist but do not rank or attract qualified organic traffic.',
    afterLift: 'Search engines and users better understand your services and value.',
    clientInputs: 'Target services, geography, current search data, existing content.',
    includes: 'On-page SEO, technical checks, content structure guidance, reporting.',
    excludes: 'Large-scale content writing unless included in project scope.',
    ctaText: 'Get SEO Action Plan',
    pricingBand: 'Typical starting range: $1,000 - $7,500+',
    caseStudyTitle: 'Biocare Ecommerce',
    caseStudyMetric: 'Improved discoverability with stronger page intent mapping.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'How soon can we see results?',
        answer: 'Early improvements are often visible in 4-8 weeks, then compound over time.',
      },
      {
        question: 'Do you handle technical SEO too?',
        answer: 'Yes, technical SEO is part of the core implementation.',
      },
      {
        question: 'Do we need to publish more content?',
        answer: 'Only where needed; we focus on high-impact pages first.',
      },
    ],
  },
  {
    id: 10,
    title: 'Ongoing support, updates, and growth',
    label: 'Growth',
    projectType: 'Website',
    summary:
      'Ongoing execution support to maintain quality, ship improvements, and keep your digital system aligned with growth goals.',
    deliverables: [
      'Monthly update and optimization cycles',
      'Issue resolution and maintenance support',
      'Performance and conversion refinements',
      'Priority implementation backlog handling',
    ],
    timeline: 'Retainer-based ongoing engagement',
    caseStudyHint: 'Built for teams that need consistent execution without internal bottlenecks.',
    goal: 'systems',
    bestFor: 'Best for teams that need reliable execution every month.',
    outcomes: [
      'Consistent monthly progress without delivery gaps',
      'Faster resolution of blockers and regressions',
      'Steady improvement across conversion and performance',
    ],
    currentSituation: 'Important updates are delayed due to team bandwidth or execution gaps.',
    afterLift: 'Improvements ship continuously with a clear priority and support loop.',
    clientInputs: 'Priority backlog, approvals, business goals, release preferences.',
    includes: 'Monthly roadmap support, fixes, iterations, optimization tasks.',
    excludes: 'Large net-new builds unless separately planned.',
    ctaText: 'Start Ongoing Support',
    pricingBand: 'Typical starting range: Monthly retainer',
    caseStudyTitle: 'Tabiat Live',
    caseStudyMetric: 'Sustained platform support improved operational reliability.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'Can this include design and development both?',
        answer: 'Yes, support can cover both design and implementation tasks.',
      },
      {
        question: 'How do we prioritize requests?',
        answer: 'We set monthly priorities based on business impact and urgency.',
      },
      {
        question: 'Can support scale as we grow?',
        answer: 'Yes, engagement scope can scale with your roadmap.',
      },
    ],
  },
  {
    id: 11,
    title: 'Brand-consistent digital presentation',
    label: 'Brand Presence',
    projectType: 'Branding',
    summary:
      'Digital brand consistency across pages, touchpoints, and content so your business looks credible at every stage.',
    deliverables: [
      'Visual consistency standards',
      'Brand expression across digital touchpoints',
      'Messaging and presentation alignment',
      'Reusable style components',
    ],
    timeline: '2-5 weeks',
    caseStudyHint: 'Important when trust drops due to inconsistent presentation.',
    goal: 'visibility',
    bestFor: 'Best for brands that look inconsistent across channels and pages.',
    outcomes: [
      'Higher trust through consistent visual language',
      'Cleaner cross-channel brand presentation',
      'Stronger recognition across digital touchpoints',
    ],
    currentSituation: 'Brand visuals and tone vary too much across key customer touchpoints.',
    afterLift: 'Brand expression becomes consistent, clear, and easier to scale.',
    clientInputs: 'Brand assets, positioning notes, current channels and pages.',
    includes: 'Visual alignment system, touchpoint consistency, style components.',
    excludes: 'Full rebrand strategy unless specifically scoped.',
    ctaText: 'Get Brand Consistency Plan',
    pricingBand: 'Typical starting range: $1,000 - $3,000',
    caseStudyTitle: 'Bilsign',
    caseStudyMetric: 'Improved digital consistency for stronger trust and positioning.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'Is this a full rebrand?',
        answer: 'Not necessarily; this can focus on digital consistency improvements only.',
      },
      {
        question: 'Can this work with existing logo and colors?',
        answer: 'Yes, we can improve consistency using your current brand base.',
      },
      {
        question: 'Do you provide reusable brand components?',
        answer: 'Yes, reusable digital style components are included.',
      },
    ],
  },
  {
    id: 12,
    title: 'Content layouts that support action',
    label: 'Conversion',
    projectType: 'Website',
    summary:
      'Content-driven page structures designed to guide attention, communicate value faster, and move users toward action.',
    deliverables: [
      'Content hierarchy and section sequencing',
      'Action-oriented layout structure',
      'Readability and scanning optimization',
      'Conversion cue placement',
    ],
    timeline: '1-4 weeks',
    caseStudyHint: 'Ideal for pages with traffic but weak conversion behavior.',
    goal: 'leads',
    bestFor: 'Best for pages where visitors read but do not convert.',
    outcomes: [
      'Improved readability and page scanning behavior',
      'Better section order for persuasive flow',
      'Higher action rate from stronger conversion cues',
    ],
    currentSituation: 'Page content is heavy but does not guide users to action clearly.',
    afterLift: 'Users can scan quickly, understand value, and move to conversion points.',
    clientInputs: 'Existing content, page goals, conversion targets, analytics context.',
    includes: 'Layout restructuring, section logic, content hierarchy direction.',
    excludes: 'Large content rewriting unless added in scope.',
    ctaText: 'Get Conversion Layout Plan',
    pricingBand: 'Typical starting range: Less than $1,000 - $3,000',
    caseStudyTitle: 'Sipko Security',
    caseStudyMetric: 'Layout restructure improved conversion-focused page clarity.',
    caseStudyLink: '/#case-studies',
    faq: [
      {
        question: 'Do we need to rewrite all copy?',
        answer: 'Usually no, structure improvements can deliver strong gains first.',
      },
      {
        question: 'Can this be done on existing pages?',
        answer: 'Yes, we can optimize existing page layouts without full rebuild.',
      },
      {
        question: 'Will this affect branding?',
        answer: 'No, changes can stay fully aligned with your current brand.',
      },
    ],
  },
]

type IntroCardItemProps = IntroCard & {
  className?: string
  onOpen: (service: IntroCard) => void
}

const IntroCardItem = ({
  id,
  title,
  label,
  projectType,
  summary,
  deliverables,
  timeline,
  caseStudyHint,
  goal,
  bestFor,
  outcomes,
  currentSituation,
  afterLift,
  clientInputs,
  includes,
  excludes,
  ctaText,
  pricingBand,
  caseStudyTitle,
  caseStudyMetric,
  caseStudyLink,
  faq,
  className = '',
  onOpen,
}: IntroCardItemProps) => {
  const handleOpen = () =>
    onOpen({
      id,
      title,
      label,
      projectType,
      summary,
      deliverables,
      timeline,
      caseStudyHint,
      goal,
      bestFor,
      outcomes,
      currentSituation,
      afterLift,
      clientInputs,
      includes,
      excludes,
      ctaText,
      pricingBand,
      caseStudyTitle,
      caseStudyMetric,
      caseStudyLink,
      faq,
    })

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleOpen()
        }
      }}
      className={`group relative isolate flex min-h-[232px] flex-col justify-between overflow-hidden rounded-[26px] border border-[color-mix(in_srgb,var(--accent-lime)_24%,transparent)] bg-[linear-gradient(145deg,#20270e_0%,#121607_48%,#070805_100%)] px-7 py-6 text-white shadow-[0_22px_70px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent-lime)_52%,transparent)] hover:shadow-[0_28px_90px_rgba(0,0,0,0.36)] sm:min-h-[248px] lg:h-full lg:min-h-0 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(191,239,46,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(191,239,46,0.08)_1px,transparent_1px)] bg-[size:92px_92px] opacity-60" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_20%,rgba(191,239,46,0.24),transparent_34%),radial-gradient(circle_at_88%_72%,rgba(109,133,24,0.42),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.17] [background-image:radial-gradient(rgba(255,255,255,0.82)_0.8px,transparent_0.9px)] [background-size:7px_7px]" />
      <div className="pointer-events-none absolute inset-[18px] -z-10 rounded-[22px] border border-white/10" />

      <div className="flex items-start justify-between gap-5">
        <p className="max-w-[180px] text-[14px] font-semibold leading-tight text-[#f3ffd4]/90 sm:text-[15px]">
          {label}
        </p>
        <MoveUpRight
          aria-hidden="true"
          className="h-10 w-10 shrink-0 text-[#dfff72] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-12 sm:w-12"
          strokeWidth={1.35}
        />
      </div>

      <h3 className="max-w-[420px] pt-8 text-[28px] font-medium leading-[1] tracking-[-0.03em] text-[#f7f9f0] sm:text-[32px] lg:text-[clamp(1.85rem,2.4vw,2.75rem)]">
        {title}
      </h3>
    </article>
  )
}

const cardGridClasses = [
  'lg:col-span-6 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-6 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-6 lg:row-span-2',
  'lg:col-span-6 lg:row-span-2',
]

const NowIntroducing = () => {
  const [selectedService, setSelectedService] = useState<IntroCard | null>(null)
  const [goalFilter, setGoalFilter] = useState<GoalFilter>('all')

  const displayedCards = useMemo(() => {
    if (goalFilter === 'all') return introCards
    return introCards.filter((card) => card.goal === goalFilter)
  }, [goalFilter])

  const handleRequestService = (projectType: string) => {
    window.dispatchEvent(
      new CustomEvent('open-proposal-modal', {
        detail: { projectType },
      }),
    )
    setSelectedService(null)
  }

  const handleSeeCaseStudies = () => {
    window.location.hash = 'case-studies'
    setSelectedService(null)
  }

  return (
    <section className="space-y-10">
      <SectionIntro
        topContent={
          <FeatureStrip
            text="Now introduce 100xlift."
            icon={<Handshake size={16} strokeWidth={2} />}
          />
        }
        title="We fix the parts of your digital presence that quietly kill growth"
        description={
          <>
            100xlift helps businesses improve how they show up online and how well that
            presence supports lead generation.
          </>
        }
      />

      <div className="w-6/12 mx-auto flex flex-col items-center justify-center gap-3   p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
          What do you want most right now?
        </p>
        <div className="flex flex-wrap gap-2">
          {goalFilters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setGoalFilter(item.key)}
              className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition ${
                goalFilter === item.key
                  ? 'bg-[#314100] text-[#BFEF2E]'
                  : 'border border-[var(--outline-soft)] bg-[var(--surface-2)] text-[var(--page-fg)] hover:border-[var(--page-fg)]/28'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[132px] lg:gap-3">
        {displayedCards.map((card) => (
          <IntroCardItem
            key={card.id}
            {...card}
            className={cardGridClasses[(card.id - 1) % cardGridClasses.length]}
            onOpen={setSelectedService}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <HashCTAButton hash="contact" text="Talk About Your Project" />
      </div>

      {selectedService ? (
        <PopupShell
          isOpen={Boolean(selectedService)}
          onClose={() => setSelectedService(null)}
          title={`${selectedService.title} service details`}
        >
          <section className="mx-auto w-11/12 max-w-[1180px] bg-[var(--page-bg)] py-8 text-[var(--page-fg)] sm:py-10">
            <div className="overflow-hidden rounded-[14px] border border-[var(--outline-soft)] bg-[var(--surface-1)]">
              <div className="border-b border-[var(--outline-soft)] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--accent-lime)_20%,transparent),transparent_55%)] px-6 py-5 sm:px-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--outline-soft)] bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted-fg)]">
                  <Sparkles size={13} strokeWidth={2.1} />
                  {selectedService.label}
                </div>
                <h3 className="mt-3 max-w-[24ch] text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[2.6rem]">
                  {selectedService.title}
                </h3>
                <p className="mt-3 max-w-[70ch] text-[15px] leading-7 text-[var(--page-fg)]/78 sm:text-base">
                  {selectedService.summary}
                </p>
                <p className="mt-4 text-sm font-semibold text-[var(--page-fg)]">
                  {selectedService.bestFor}
                </p>
              </div>

              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_330px]">
                <div className="px-6 py-6 sm:px-8 sm:py-8">
                  <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--outline-soft)] bg-[var(--surface-2)] px-3 py-1">
                      <Clock3 size={13} strokeWidth={2.1} />
                      {selectedService.timeline}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[var(--outline-soft)] bg-[var(--surface-2)] px-3 py-1">
                      {selectedService.projectType}
                    </span>
                  </div>

                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                    Outcomes you can expect
                  </p>
                  <ul className="space-y-3">
                    {selectedService.outcomes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-2)] px-4 py-3"
                      >
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#314100] text-[#BFEF2E]">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-sm font-medium leading-6 text-[var(--page-fg)]/92">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <div className="rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-2)] px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                        Current situation
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--page-fg)]/84">
                        {selectedService.currentSituation}
                      </p>
                    </div>
                    <div className="rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-2)] px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                        After 100XLift
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--page-fg)]/84">
                        {selectedService.afterLift}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    <div className="rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-2)] px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                        Client team needed
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--page-fg)]/84">
                        {selectedService.clientInputs}
                      </p>
                    </div>
                    <div className="rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-2)] px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                        Included
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--page-fg)]/84">
                        {selectedService.includes}
                      </p>
                    </div>
                    <div className="rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-2)] px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                        Not included
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--page-fg)]/84">
                        {selectedService.excludes}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-2)] px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                      Related proof
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[var(--page-fg)]">
                      {selectedService.caseStudyTitle}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--page-fg)]/80">
                      {selectedService.caseStudyMetric}
                    </p>
                    <button
                      type="button"
                      onClick={handleSeeCaseStudies}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#799FFF]"
                    >
                      View case study
                      <ArrowUpRight size={15} strokeWidth={2.2} />
                    </button>
                  </div>

                  <div className="mt-5 rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-2)] px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                      Common questions
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {selectedService.faq.map((item) => (
                        <div key={item.question} className="rounded-[8px] border border-[var(--outline-soft)] px-3 py-2.5">
                          <p className="text-sm font-semibold text-[var(--page-fg)]">{item.question}</p>
                          <p className="mt-1 text-sm text-[var(--page-fg)]/78">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <aside className="border-t border-[var(--outline-soft)] bg-[var(--surface-2)] px-6 py-6 sm:px-8 lg:border-l lg:border-t-0">
                  <div className="lg:sticky lg:top-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                      Next Step
                    </p>
                    <h4 className="mt-2 text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.03em]">
                      Start this service with a focused proposal
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-[var(--page-fg)]/78">
                      We will share scope, timeline, and investment based on your business goals.
                    </p>

                    <div className="mt-4 rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-1)] px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                        Pricing expectation
                      </p>
                      <p className="mt-1 text-sm font-medium text-[var(--page-fg)]">{selectedService.pricingBand}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <CTAButton
                        variant="secondary"
                        text={selectedService.ctaText}
                        icon={<ArrowUpRight size={18} strokeWidth={2.2} />}
                        onClick={() => handleRequestService(selectedService.projectType)}
                      />
                      <button
                        type="button"
                        onClick={handleSeeCaseStudies}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--outline-soft)] bg-[var(--surface-1)] px-5 text-sm font-semibold text-[var(--page-fg)] transition hover:border-[var(--page-fg)]/22"
                      >
                        See related case studies
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </PopupShell>
      ) : null}
    </section>
  )
}

export default NowIntroducing
export { introCards }

