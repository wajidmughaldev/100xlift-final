import React from 'react'
import Navigation from '@/components/Navigation'
import Banner from '@/components/Banner'
import TheRealProblem from '@/components/TheRealProblem'
import SectionSpacer from '@/components/SectionSpacer'
import WhatChange from '@/components/WhatChange'
import NowIntroducing from '@/components/NowIntroducing'
import CaseStudy from '@/components/CaseStudy'
import Whyus from '@/components/Whyus'
import OurProcess from '@/components/OurProcess'
import FixFirstCallout from '@/components/FixFirstCallout'
import Testimonials from '@/components/Testimonials'
import QuestionsFAQ from '@/components/QuestionsFAQ'
import FinalStatementCTA from '@/components/FinalStatementCTA'
import ProjectStartSection from '@/components/ProjectStartSection'
import SiteFooter from '@/components/SiteFooter'

export const dynamic = 'force-static'

const siteUrl = 'https://100xlift.com'

const faqItems = [
  {
    question: 'Can you improve an existing website?',
    answer:
      "like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
  },
  {
    question: 'What if we are not sure what is wrong yet?',
    answer:
      'We start by identifying trust, clarity, and conversion issues first so the next step is based on what actually matters.',
  },
  {
    question: 'Can we start with one service?',
    answer:
      'Yes. We can begin with the highest-impact piece first and expand only if it supports the business goal.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer:
      'Yes. We can support updates, design consistency, content improvements, and continued optimization after launch.',
  },
]

const testimonialItems = [
  {
    name: 'Abdul Wajid Khan',
    quote:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
  },
  {
    name: 'Abdul Wajid Khan',
    quote:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
  },
  {
    name: 'Abdul Wajid Khan',
    quote:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
  },
]

const portfolioItems = [
  {
    title: 'Qarora.ai',
    description:
      'A conversion-focused website system designed to present the product clearly, build trust quickly, and guide users from first impression to action without visual clutter.',
  },
  {
    title: 'Bold Commerce',
    description:
      'A storefront experience structured around product storytelling, cleaner pathways to purchase, and a stronger visual system for premium digital merchandising.',
  },
  {
    title: 'Portal Flow',
    description:
      'A web-based internal platform focused on usability, reduced friction, and stronger information hierarchy for repeat daily tasks and team workflows.',
  },
]

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '100XLift',
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  image: `${siteUrl}/100xlift-building.png`,
  email: '100xlift@gmail.com',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61586106101272',
    'https://www.linkedin.com/company/110819732',
    'https://instagram.com',
    'https://wa.me/923361815141',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '100XLift',
  url: siteUrl,
  inLanguage: 'en',
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: '100XLift',
  url: siteUrl,
  image: `${siteUrl}/100xlift-building.png`,
  description:
    '100XLift helps businesses improve digital presence, trust, clarity, conversion, and lead generation through websites, UX, systems, and branding.',
  areaServed: 'Worldwide',
  email: '100xlift@gmail.com',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '100XLift testimonials',
  itemListElement: testimonialItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    description: item.quote,
  })),
}

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '100XLift case studies',
  itemListElement: portfolioItems.map((study, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: study.title,
    description: study.description,
  })),
}

const page = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />
      <main id='main-content' className='w-11/12 mx-auto'>

        <Navigation/>
        <div id="top">
          <Banner/>
        </div>
        <SectionSpacer size='2xl'/>
        <TheRealProblem/>
        <SectionSpacer size='2xl'/>
        <WhatChange/>
        <SectionSpacer size='2xl'/>
        <div id="services" className="scroll-mt-28 md:scroll-mt-36">
          <NowIntroducing/>
        </div>
      <SectionSpacer size='2xl'/>
      <div id="case-studies" className="relative left-1/2 w-screen -translate-x-1/2 scroll-mt-28 md:scroll-mt-36">
        <CaseStudy/>
      </div>
      <SectionSpacer size='2xl'/>
        <Whyus/>
        <SectionSpacer size='2xl'/>
        <div id="process" className="scroll-mt-28 md:scroll-mt-36">
          <OurProcess/>
        </div>
        <SectionSpacer size='2xl'/>
      <FixFirstCallout/>
      <SectionSpacer size='2xl'/>
      <div id="testimonials" className="relative left-1/2 w-screen -translate-x-1/2 scroll-mt-28 md:scroll-mt-36">
        <Testimonials cardsVisible={3} />
      </div>
        <SectionSpacer size='2xl'/>
        <div id="faqs" className="scroll-mt-28 md:scroll-mt-36">
          <QuestionsFAQ/>
        </div>
        <SectionSpacer size='2xl'/>
        <FinalStatementCTA/>
        <SectionSpacer size='2xl'/>
        <div id="contact" className="scroll-mt-28 md:scroll-mt-36">
          <ProjectStartSection/>
        </div>
        <SectionSpacer size='2xl'/>
        <SiteFooter/>
      </main>
    </>
  )
}

export default page
