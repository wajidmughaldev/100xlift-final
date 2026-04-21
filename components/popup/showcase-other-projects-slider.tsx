'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export type OtherProjectItem = {
  id: string
  title: string
  image: string
  techValue: string
  tags: string[]
  description: string
  type: string
  imagePosition: string
}

const projects: OtherProjectItem[] = [
  {
    id: 'integrations',
    title: 'Marketing Integrations',
    image: '/Projects/Brand-consistent%20digital%20presentation.png',
    techValue: 'Automation',
    tags: ['AI', 'Integrations', 'Marketing'],
    description:
      'A responsive content system designed to explain integrations clearly, guide teams through product value, and support lead generation across every device.',
    type: 'article',
    imagePosition: 'object-left-top',
  },
  {
    id: 'team',
    title: 'Team Profile System',
    image: '/Projects/Custom%20websites%20built%20for%20business%20goals.png',
    techValue: 'Team Pages',
    tags: ['Profiles', 'Branding', 'Trust'],
    description:
      'A polished team experience built to introduce people, strengthen credibility, and make a service business feel more human from the first interaction.',
    type: 'team',
    imagePosition: 'object-left-top',
  },
  {
    id: 'content',
    title: 'Content Marketing Hub',
    image: '/Projects/Content%20layouts%20that%20support%20action.png',
    techValue: 'Content',
    tags: ['Blog', 'Newsletter', 'Growth'],
    description:
      'A mobile-ready content hub that combines newsletter capture, topic discovery, and editorial presentation in a single focused marketing experience.',
    type: 'newsletter',
    imagePosition: 'object-left-top',
  },
  {
    id: 'workflow',
    title: 'Workflow Automation',
    image: '/Projects/Custom%20portals%20and%20web-based%20systems.png',
    techValue: 'Workflow',
    tags: ['Automation', 'Systems', 'UX'],
    description:
      'A workflow-focused interface structured around faster task completion, clearer action paths, and stronger operational visibility for growing teams.',
    type: 'article',
    imagePosition: 'object-top',
  },
  {
    id: 'creator',
    title: 'Creator Landing Page',
    image: '/Projects/Landing%20pages%20designed%20to%20generate%20leads.png',
    techValue: 'Landing Page',
    tags: ['Creator', 'Content', 'Conversion'],
    description:
      'A creator-focused landing page designed to present the offer quickly, capture attention on mobile, and move visitors toward a direct action.',
    type: 'newsletter',
    imagePosition: 'object-right-top',
  },
]

type ShowcaseOtherProjectsSliderProps = {
  desktopSlidesVisible?: number
  onProjectOpen?: (project: OtherProjectItem) => void
}

const ShowcaseOtherProjectsSlider = ({
  desktopSlidesVisible = 3,
  onProjectOpen,
}: ShowcaseOtherProjectsSliderProps) => {
  const safeDesktopSlidesVisible = Math.max(3, desktopSlidesVisible)

  return (
    <section className="overflow-hidden px-5 pb-16 pt-4 text-white sm:px-7 lg:px-8">
      <h3 className="mb-12 text-center text-xl font-bold tracking-[-0.02em] text-[#b8ea18]">
        Other Projects
      </h3>

      <Swiper
        centeredSlides
        initialSlide={1}
        grabCursor
        rewind
        watchSlidesProgress
        slidesPerView={1}
        spaceBetween={22}
        speed={650}
        breakpoints={{
          1024: {
            slidesPerView: safeDesktopSlidesVisible,
            spaceBetween: 54,
          },
        }}
        className="!overflow-visible"
      >
        {projects.map((project) => (
          <SwiperSlide
            key={project.id}
            className="!h-auto"
          >
            {({ isActive }) => (
              <div
                className={`transition-all duration-500 ${
                  isActive ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-55'
                }`}
              >
                <article
                  className="relative h-[292px] cursor-pointer overflow-hidden rounded-lg sm:h-[330px]"
                  onClick={() => onProjectOpen?.(project)}
                >
                  <div className="relative h-full overflow-hidden rounded-lg bg-white shadow-[0_14px_28px_rgba(0,0,0,0.2)]">
                    <Image
                      src={project.image}
                      alt={`${project.title} mockup`}
                      fill
                      sizes="(max-width: 1023px) 84vw, 30vw"
                      className={`object-cover ${project.imagePosition}`}
                    />
                  </div>
                </article>

                <button
                  type="button"
                  className="mt-4 block w-full text-center text-base font-bold leading-tight tracking-[-0.02em] text-white transition hover:text-[#b8ea18]"
                  onClick={() => onProjectOpen?.(project)}
                >
                  {project.title}
                </button>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default ShowcaseOtherProjectsSlider
