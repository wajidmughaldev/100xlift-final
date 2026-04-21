'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

type ShowcaseFirstSectionProps = {
  title: string
  description: string
  heroImage: string
  metrics?: Array<{ value: string; label: string }>
  thumbSlides?: Array<{ id: string; image: string }>
}

const ShowcaseFirstSection = ({
  title,
  description,
  heroImage,
  metrics = [],
  thumbSlides = [],
}: ShowcaseFirstSectionProps) => {
  const slides = thumbSlides

  return (
    <section className="px-5 pb-8 pt-8 text-[var(--page-fg)] sm:px-7 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-7 border-b border-[var(--outline-soft)] pb-7">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--muted-fg)]">
                Project Overview
              </p>
              <h2 className="mt-3 text-4xl font-bold leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                {title}
              </h2>
            </div>

            <div className="lg:justify-self-end">
              <p className="max-w-[460px] text-sm font-medium leading-[1.6] text-[var(--muted-fg)] sm:text-[0.96rem]">
                {description}
              </p>
            </div>
          </div>

          {metrics.length ? (
            <div className="grid gap-4 border-y border-[var(--outline-soft)] py-5 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="text-center lg:text-left">
                  <p className="text-[1.45rem] font-bold tracking-[-0.04em]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[0.74rem] font-medium uppercase tracking-[0.12em] text-[var(--muted-fg)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-8 overflow-hidden rounded-[22px] border border-[var(--outline-soft)] bg-[var(--panel-strong)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.32)]">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--panel-strong)]">
            <Image
              src={heroImage}
              alt={`${title} case study hero`}
              fill
              sizes="(max-width: 1023px) 100vw, 82vw"
              className="object-contain object-center"
            />
          </div>
        </div>

        {slides.length > 1 ? (
          <div className="mt-4">
            <Swiper
              slidesPerView={1.15}
              spaceBetween={12}
              speed={600}
              breakpoints={{
                640: {
                  slidesPerView: 2.2,
                },
                900: {
                  slidesPerView: 3.2,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
              className="!overflow-visible"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id} className="!h-auto">
                <article className="overflow-hidden rounded-[14px] border border-[var(--outline-soft)] bg-[var(--panel-strong)]">
                  <div className="relative aspect-[16/12] overflow-hidden bg-[var(--surface-2)]">
                    <Image
                      src={slide.image}
                      alt="Case study preview"
                      fill
                      sizes="(max-width: 639px) 80vw, (max-width: 1199px) 30vw, 20vw"
                      className="object-contain object-center p-1.5"
                    />
                  </div>
                </article>
              </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ShowcaseFirstSection
