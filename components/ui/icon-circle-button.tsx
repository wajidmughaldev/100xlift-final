import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type IconCircleButtonProps = React.ComponentProps<typeof Button>
type SizableIconProps = {
  size?: number | string
  style?: React.CSSProperties
}

function normalizeIconSize(size: unknown) {
  if (typeof size === "number") {
    return `${size}px`
  }

  if (typeof size === "string") {
    return size
  }

  return undefined
}

function IconCircleButton({
  className,
  children,
  ...props
}: IconCircleButtonProps) {
  const iconChild = React.isValidElement<SizableIconProps>(children)
    ? children
    : null

  const content =
    iconChild && typeof iconChild.props === "object"
      ? React.cloneElement(iconChild, {
          style: {
            width: normalizeIconSize(iconChild.props.size),
            height: normalizeIconSize(iconChild.props.size),
            ...(iconChild.props.style ?? {}),
          },
        })
      : children

  return (
    <Button
      size="icon"
      className={cn(
        "shrink-0 text-[#BFEF2E] [&_svg]:shrink-0 rounded-full p-6",
        className
      )}
      {...props}
    >
      {content}
    </Button>
  )
}

export { IconCircleButton }
