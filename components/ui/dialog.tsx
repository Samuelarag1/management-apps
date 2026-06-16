"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Context ──────────────────────────────────────────────────────────────────

interface DialogCtx {
  open: boolean
  onClose: () => void
  onOpen: () => void
}

const DialogContext = React.createContext<DialogCtx>({
  open: false,
  onClose: () => {},
  onOpen: () => {},
})

// ─── Dialog root ──────────────────────────────────────────────────────────────

function Dialog({
  open,
  onOpenChange,
  defaultOpen = false,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? (open as boolean) : internalOpen

  const handleClose = React.useCallback(() => {
    if (isControlled) onOpenChange?.(false)
    else setInternalOpen(false)
  }, [isControlled, onOpenChange])

  const handleOpen = React.useCallback(() => {
    if (isControlled) onOpenChange?.(true)
    else setInternalOpen(true)
  }, [isControlled, onOpenChange])

  return (
    <DialogContext.Provider value={{ open: isOpen, onClose: handleClose, onOpen: handleOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

function DialogTrigger({
  asChild,
  children,
}: {
  asChild?: boolean
  children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>
}) {
  const { onOpen } = React.useContext(DialogContext)

  if (asChild) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e)
        onOpen()
      },
    })
  }

  return (
    <button type="button" onClick={onOpen}>
      {children}
    </button>
  )
}

// ─── Portal (no-op passthrough for API compat) ────────────────────────────────

function DialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// ─── Overlay (used internally by DialogContent) ───────────────────────────────

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", className)}
    aria-hidden="true"
    {...props}
  />
))
DialogOverlay.displayName = "DialogOverlay"

// ─── Close button ─────────────────────────────────────────────────────────────

function DialogClose({
  asChild,
  children,
  className,
  ...props
}: {
  asChild?: boolean
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onClose } = React.useContext(DialogContext)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onClick?: () => void }>,
      { onClick: onClose }
    )
  }

  return (
    <button type="button" onClick={onClose} className={className} {...props}>
      {children}
    </button>
  )
}

// ─── Content ──────────────────────────────────────────────────────────────────

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open, onClose } = React.useContext(DialogContext)
  const [mounted, setMounted] = React.useState(false)

  // SSR-safe: only use portal after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Body scroll lock while open
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Escape key
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!mounted || !open) return null

  return createPortal(
    <>
      <DialogOverlay onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100%-2rem)] max-w-lg",
          "max-h-[90svh] overflow-y-auto",
          "rounded-xl border bg-background p-6 shadow-xl",
          "animate-in fade-in-0 zoom-in-95 duration-150",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Cerrar</span>
        </button>
      </div>
    </>,
    document.body
  )
})
DialogContent.displayName = "DialogContent"

// ─── Header / Footer / Title / Description ────────────────────────────────────

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 text-left", className)} {...props} />
  )
}
DialogHeader.displayName = "DialogHeader"

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
