"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Check, CircleX } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, message, success = true, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-center gap-3">
              {
                success ?
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  :
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                    <CircleX className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>

              }
              <div className="grid gap-1">
                <ToastTitle>{success ? "Success" : "Failed"}</ToastTitle>
                {message && (
                  <ToastDescription>{message}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
