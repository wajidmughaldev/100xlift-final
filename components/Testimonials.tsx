'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Users } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'

import FeatureStrip from './FeatureStrip'
import SectionIntro from './SectionIntro'

type TestimonialItem = {
  id: number
  quote: string
  highlights?: string[]
  name: string
  role: string
  avatarLabel: string
  avatarImage?: string
}

type TestimonialsProps = {
  items?: TestimonialItem[]
  cardsVisible?: 3 | 5
  title?: string
  stripText?: string
  className?: string
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 1,
    quote:
      'Abdul is highly professional and solution-focused. The 100XLift team knew how to resolve every challenge we brought to the project.',
    highlights: ['highly professional', 'solution-focused', 'resolve every challenge'],
    name: 'Isaac',
    role: 'Client',
    avatarLabel: 'IS',
    avatarImage: '/testimonials/isaac.png',
  },
  {
    id: 2,
    quote:
      'Abdul and the 100XLift team delivered excellent work ahead of schedule. Communication was clear throughout, every requirement was handled carefully, and the final quality exceeded expectations.',
    highlights: ['excellent work ahead of schedule', 'Communication was clear', 'final quality exceeded expectations'],
    name: 'Anthony Jones',
    role: 'Client',
    avatarLabel: 'AJ',
    avatarImage: '/testimonials/anthony-jones.png',
  },
  {
    id: 3,
    quote:
      'I am grateful for the timely, courteous support. 100XLift listened carefully, solved both known and hidden issues, and saved me countless hours of frustration with practical technical guidance.',
    highlights: ['timely, courteous support', 'saved me countless hours', 'practical technical guidance'],
    name: 'Daniyal Perkins',
    role: 'Client',
    avatarLabel: 'DP',
    avatarImage: '/testimonials/daniyal-perkins.png',
  },
  {
    id: 4,
    quote:
      'Working with Abdul and 100XLift has been a strong long-term experience. Across website design, SEO, graphics, video, and social support, they have been reliable, honest, and consistently helpful.',
    highlights: ['strong long-term experience', 'reliable, honest', 'consistently helpful'],
    name: 'Miranda Lau',
    role: 'Client',
    avatarLabel: 'ML',
    avatarImage: '/testimonials/miranda-lau.png',
  },
]

const widthMap = {
  3: '!w-[86%] sm:!w-[58%] xl:!w-[26.5%]',
  5: '!w-[86%] sm:!w-[52%] xl:!w-[22%]',
}

function renderHighlightedQuote(text: string, highlights: string[] = []) {
  if (highlights.length === 0) {
    return text
  }

  const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length)
  const escaped = sortedHighlights.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi')

  return text.split(regex).map((part, index) => {
    const isMatch = highlights.some((item) => item.toLowerCase() === part.toLowerCase())

    if (isMatch) {
      return (
        <mark
          key={`${part}-${index}`}
          className="bg-[#b8ea18] px-0.5 text-black"
        >
          {part}
        </mark>
      )
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
  })
}

function TestimonialCard({
  item,
  isActive,
  isSide,
}: {
  item: TestimonialItem
  isActive: boolean
  isSide: boolean
}) {
  return (
    <article
      className={`relative flex min-h-[372px] flex-col rounded-[22px] border border-black/10 px-5 py-6 transition-all duration-500 ${
        isActive
          ? 'scale-100 bg-[#cfff19] text-black'
          : isSide
            ? 'scale-[0.92] bg-[linear-gradient(180deg,#d8d8d8_0%,#bababa_100%)] text-black/95'
            : 'scale-[0.85] bg-[linear-gradient(180deg,#b8b8b8_0%,#9f9f9f_100%)] opacity-55'
      }`}
    >
      <Image
        src="/icons/“.png"
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className="absolute left-5 top-5 size-9 object-contain"
      />

      <p className="mt-10 text-[15px] leading-[1.45] italic">
        {renderHighlightedQuote(item.quote, item.highlights)}
      </p>

      <Image
        src="/icons/“.png"
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className="absolute bottom-[88px] right-5 size-9 rotate-180 object-contain"
      />

      <div className="mt-auto flex items-center gap-3 pt-6">
        {item.avatarImage ? (
          <div className="relative size-[52px] shrink-0 overflow-hidden rounded-full border border-black/20 bg-[linear-gradient(180deg,#274f40_0%,#0f1817_100%)]">
            <Image
              src={item.avatarImage}
              alt={`${item.name} testimonial`}
              fill
              sizes="52px"
              className="object-cover object-center"
            />
          </div>
        ) : (
          <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full border border-black/20 bg-[linear-gradient(180deg,#274f40_0%,#0f1817_100%)] text-[14px] font-semibold text-[#d8ff71]">
            {item.avatarLabel}
          </div>
        )}
        <div className="text-left">
          <p className="text-[14px] font-semibold leading-none">{item.name}</p>
          <p className="mt-1 text-[12px] italic leading-none opacity-80">{item.role}</p>
        </div>
      </div>
    </article>
  )
}

const Testimonials = ({
  items = defaultTestimonials,
  cardsVisible = 3,
  title = 'Trusted by businesses that needed stronger digital execution',
  stripText = 'Client perspective',
  className = '',
}: TestimonialsProps) => {
  const repeatedItems = useMemo(() => [...items, ...items, ...items], [items])
  const baseIndex = items.length
  const initialIndex = baseIndex + Math.min(1, items.length - 1)
  const [activeIndex, setActiveIndex] = useState(initialIndex)

  useEffect(() => {
    setActiveIndex(initialIndex)
  }, [initialIndex])

  const adjacentIndexes = useMemo(() => {
    const total = repeatedItems.length
    return {
      prevIndex: (activeIndex - 1 + total) % total,
      nextIndex: (activeIndex + 1) % total,
    }
  }, [activeIndex, repeatedItems.length])

  const normalizeInfinitePosition = (swiper: SwiperInstance) => {
    if (items.length <= 1) {
      setActiveIndex(swiper.activeIndex)
      return
    }

    let targetIndex = swiper.activeIndex

    if (targetIndex < baseIndex) {
      targetIndex += baseIndex
      swiper.slideTo(targetIndex, 0, false)
    } else if (targetIndex >= baseIndex * 2) {
      targetIndex -= baseIndex
      swiper.slideTo(targetIndex, 0, false)
    }

    setActiveIndex(targetIndex)
  }

  return (
    <section className={`space-y-10 overflow-x-clip py-8 ${className}`}>
      <SectionIntro
        topContent={
          <FeatureStrip
            text={stripText}
            icon={<Users size={16} strokeWidth={2.2} />}
          />
        }
        title={title}
        description=""
        className=" px-4"
      />

      <div className="relative px-2 pb-8 pt-4 sm:px-8 xl:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 sm:block"
          style={{ background: 'linear-gradient(90deg, var(--page-bg) 0%, rgba(0,0,0,0) 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 sm:block"
          style={{ background: 'linear-gradient(270deg, var(--page-bg) 0%, rgba(0,0,0,0) 100%)' }}
        />
        <Swiper
          centeredSlides
          initialSlide={initialIndex}
          grabCursor
          watchSlidesProgress
          speed={700}
          slidesPerView="auto"
          spaceBetween={18}
          breakpoints={{
            768: {
              spaceBetween: 20,
            },
            1280: {
              spaceBetween: 24,
            },
          }}
          onSwiper={(swiper) => {
            normalizeInfinitePosition(swiper)
          }}
          onSlideChange={(swiper) => {
            normalizeInfinitePosition(swiper)
          }}
          className="!overflow-visible"
        >
          {repeatedItems.map((item, index) => (
            <SwiperSlide
              key={`${item.id}-${index}`}
              className={`!h-auto ${widthMap[cardsVisible]}`}
            >
              {() => {
                const isActive = index === activeIndex
                const isPrev = index === adjacentIndexes.prevIndex
                const isNext = index === adjacentIndexes.nextIndex

                return (
                <div
                  className={`transition-all duration-500 ${
                    isActive
                      ? 'scale-100 opacity-100'
                      : isPrev || isNext
                        ? `${isPrev ? '-translate-x-2' : 'translate-x-2'} opacity-95`
                        : 'opacity-65'
                  }`}
                >
                  <TestimonialCard
                    item={item}
                    isActive={isActive}
                    isSide={Boolean(isPrev || isNext)}
                  />
                </div>
              )}}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials
export { defaultTestimonials }
