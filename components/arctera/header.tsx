"use client"

import Link from "next/link"
import { User, HelpCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#003d73]">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">
                  <span className="text-arctera-orange">{"'"}</span>Arctera
                </span>
                <span className="text-sm font-semibold text-white/90 border-l border-white/30 pl-3 ml-1">
                  Support
                </span>
              </Link>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <span className="text-xs text-white/70">Prototype developed by</span>
              <img
                src="/images/shimentox-logo.png"
                alt="ShimentoX"
                className="h-8"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/90 hover:text-white hover:bg-white/10 text-xs gap-1.5"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                Help
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/90 hover:text-white hover:bg-white/10 text-xs gap-1.5"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Contact
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/90 hover:text-white hover:bg-white/10 text-xs gap-1.5"
              >
                <User className="h-3.5 w-3.5" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>


    </header>
  )
}
