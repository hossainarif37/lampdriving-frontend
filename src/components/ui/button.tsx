import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

const buttonVariants = cva(
  "rounded-[4px] font-bold text-sm uppercase transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default: "bg-primary text-light hover:bg-primary/90",
        gradient: "gradient-color text-light hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border bg-light",
        secondary:
          "bg-secondary text-light hover:bg-secondary/90 dark:bg-secondary dark:text-light",
        red: "bg-red-600 text-light hover:bg-red-700",
        green: "bg-green-600 text-light hover:bg-green-700",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
        sidebar: "hover:bg-primary/90 hover:text-white",
        activeSidebar: "bg-primary text-light dark:bg-primary dark:text-light",
      },
      size: {
        default: "h-12 px-10",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? <LoaderCircle className="animate-spin" /> : children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
