"use client"

import * as React from "react"
import { PanelLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SIDEBAR_WIDTH = "18rem"

type SidebarContextType = {
  open: boolean
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextType | null>(null)

export function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("SidebarProvider missing")
  return ctx
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)

  const toggle = () => setOpen((o) => !o)

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      <div className="flex min-h-screen">{children}</div>
    </SidebarContext.Provider>
  )
}

/* =========================
   SIDEBAR
========================= */

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { open } = useSidebar()

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 h-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open
          ? "w-[18rem] translate-x-0"
          : "w-[4rem] -translate-x-[0rem]"
      )}
    >
      {/* Glass Layer */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/40 backdrop-blur-xl border-r border-white/20 dark:border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.12)]" />

      {/* Gradient Glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-b from-emerald-400/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col p-3">
        {children}
      </div>
    </aside>
  )
}

/* =========================
   TRIGGER BUTTON
========================= */

export function SidebarTrigger() {
  const { toggle } = useSidebar()

  return (
    <Button
      onClick={toggle}
      size="icon"
      variant="ghost"
      className="fixed top-4 left-4 z-[60] backdrop-blur-md bg-white/40 dark:bg-black/40 border border-white/20 hover:scale-110 transition-all duration-300"
    >
      <PanelLeftIcon className="w-5 h-5" />
    </Button>
  )
}

/* =========================
   MENU
========================= */

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return (
    <nav className="mt-10 flex flex-col gap-2">{children}</nav>
  )
}

/* =========================
   MENU ITEM
========================= */

export function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  const { open } = useSidebar()

  return (
    <div
      className={cn(
        "group flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden",
        active
          ? "bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 text-emerald-600 dark:text-emerald-400"
          : "hover:bg-white/40 dark:hover:bg-white/10"
      )}
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

      {/* Icon */}
      <div className="text-lg transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      {/* Label */}
      <span
        className={cn(
          "text-sm font-medium whitespace-nowrap transition-all duration-300",
          open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        )}
      >
        {label}
      </span>
    </div>
  )
}

/* =========================
   FOOTER (PROFILE / CTA)
========================= */

export function SidebarFooter() {
  const { open } = useSidebar()

  return (
    <div className="mt-auto pt-4">
      <div className="relative rounded-2xl p-3 bg-white/30 dark:bg-white/5 backdrop-blur-lg border border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700" />

          <div
            className={cn(
              "transition-all duration-300",
              open ? "opacity-100" : "opacity-0 hidden"
            )}
          >
            <div className="text-sm font-semibold">Abdo Mahmoud</div>
            <div className="text-xs text-muted-foreground">
              Medical Designer
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}