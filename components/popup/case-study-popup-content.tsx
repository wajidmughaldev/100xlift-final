import SiteFooter from '@/components/SiteFooter'
import type { CaseStudyRecord } from '@/lib/case-studies'
import ShowcaseDetailsSection from './showcase-details-section'
import ShowcaseFeatureSection from './showcase-feature-section'
import ShowcaseFirstSection from './showcase-first-section'

type CaseStudyPopupContentProps = {
  caseStudy: CaseStudyRecord
}

const CaseStudyPopupContent = ({ caseStudy }: CaseStudyPopupContentProps) => {
  const handleStartProject = () => {
    window.dispatchEvent(
      new CustomEvent('open-proposal-modal', {
        detail: { projectType: caseStudy.techValue || 'Website' },
      }),
    )
  }

  const projectFacts: Array<[string, string]> = [
    [caseStudy.techLabel, caseStudy.techValue],
    ...(caseStudy.snapshot?.map((item) => [item.label, item.value] as [string, string]) ?? []),
  ]

  const introParagraphs = [caseStudy.description, caseStudy.subtitle].filter(
    (item): item is string => Boolean(item),
  )

  const supportNotes =
    caseStudy.sections
      .slice(0, 2)
      .flatMap((section) => section.paragraphs ?? [])
      .slice(0, 2)

  const accordionItems = caseStudy.sections.map((section) => ({
    title: section.title,
    body: [...(section.paragraphs ?? []), ...(section.bullets ?? [])].join(' '),
  }))

  const lastSection = caseStudy.sections[caseStudy.sections.length - 1]
  const lastSectionText = [
    ...(lastSection?.paragraphs ?? []),
    ...(lastSection?.bullets ?? []),
  ].join(' ')
  const fallbackOutcome =
    caseStudy.outcomes?.join(' ') || lastSectionText || caseStudy.description

  const thumbSlides = (caseStudy.gallery?.length
    ? caseStudy.gallery
    : [caseStudy.image]
  ).map((image, index) => ({ id: `slide-${index + 1}`, image }))

  const checklist =
    caseStudy.outcomes?.length ? caseStudy.outcomes : caseStudy.tags.map((tag) => `${tag} delivery focus`)

  return (
    <section className="w-full rounded-lg bg-[var(--page-bg)] py-4 text-[var(--page-fg)]">
      <ShowcaseFirstSection
        title={`${caseStudy.title} - ${caseStudy.techValue}`}
        description={caseStudy.description}
        heroImage={caseStudy.image}
        metrics={caseStudy.metrics}
        thumbSlides={thumbSlides}
      />

      <ShowcaseDetailsSection
        projectFacts={projectFacts}
        supportNotes={supportNotes.length ? supportNotes : introParagraphs}
        accordionItems={accordionItems}
        headline={caseStudy.subtitle || caseStudy.description}
        introParagraphs={introParagraphs}
        outcomeTitle="Final Outcome With 100XLIFT"
        outcomeBody={fallbackOutcome}
      />

      <ShowcaseFeatureSection
        image={caseStudy.gallery?.[1] || caseStudy.image}
        eyebrow="Ready To Scale"
        title="Want similar results for your business?"
        description="We can apply the same strategic process, UX structure, and delivery framework to build a scalable solution for your product goals."
        checklist={checklist.slice(0, 4)}
        ctaLabel="Start your project"
        onCtaClick={handleStartProject}
      />

      <SiteFooter />
    </section>
  )
}

export default CaseStudyPopupContent
