import { cn } from '@/lib/utils'

type BlogImageCropProps = {
  x: number
  y: number
  width: number
  height: number
  alt: string
  className?: string
  priority?: boolean
  overlayClassName?: string
}

const SPRITE_WIDTH = 5760

export default function BlogImageCrop({
  x,
  y,
  width,
  height,
  alt,
  className,
  overlayClassName,
}: BlogImageCropProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn('relative overflow-hidden bg-[var(--surface-2)]', className)}
    >
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: "url('/blog-reference.png')",
          backgroundSize: `${SPRITE_WIDTH}px auto`,
          backgroundPosition: `-${x}px -${y}px`,
        }}
      />
      {overlayClassName ? <div className={cn('absolute inset-0', overlayClassName)} /> : null}
      <span className="sr-only">{alt}</span>
      <div style={{ paddingBottom: `${(height / width) * 100}%` }} />
    </div>
  )
}

