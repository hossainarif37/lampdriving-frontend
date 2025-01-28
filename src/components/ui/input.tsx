import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-[1.5px] border-neutral-200 focus:border-primary bg-light px-3 py-2 text-primary placeholder:text-neutral-500 placeholder:capitalize disabled:cursor-not-allowed disabled:opacity-50 text-base outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
