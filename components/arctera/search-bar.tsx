"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
  suggestions?: string[]
  compact?: boolean
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search Arctera Support...",
  suggestions = [],
  compact = false,
}: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(value.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (activeSuggestion >= 0 && filteredSuggestions[activeSuggestion]) {
        onChange(filteredSuggestions[activeSuggestion])
        setShowSuggestions(false)
        setActiveSuggestion(-1)
      } else {
        onSearch()
        setShowSuggestions(false)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveSuggestion((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      setActiveSuggestion(-1)
    }
  }

  const handleClear = () => {
    onChange("")
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative flex items-center bg-white border-2 transition-colors focus-within:border-primary",
          compact ? "rounded-md border-border" : "rounded-lg border-border shadow-sm"
        )}
      >
        <div className={cn("flex items-center", compact ? "pl-3" : "pl-4")}>
          <Search className={cn("text-muted-foreground", compact ? "h-4 w-4" : "h-5 w-5")} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setShowSuggestions(true)
            setActiveSuggestion(-1)
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent border-0 outline-none placeholder:text-muted-foreground",
            compact ? "text-sm py-2.5 px-3" : "text-base py-4 px-3"
          )}
        />
        {value && (
          <button
            onClick={handleClear}
            className={cn(
              "hover:bg-muted rounded-full transition-colors",
              compact ? "p-1.5 mr-2" : "p-2 mr-2"
            )}
            aria-label="Clear search"
          >
            <X className={cn("text-muted-foreground hover:text-foreground", compact ? "h-4 w-4" : "h-5 w-5")} />
          </button>
        )}
        <button
          onClick={onSearch}
          className={cn(
            "bg-primary hover:bg-primary/90 text-primary-foreground transition-colors font-medium",
            compact ? "px-4 py-2.5 text-sm rounded-r-md" : "px-6 py-4 text-base rounded-r-lg"
          )}
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {/* Autocomplete Suggestions */}
      {showSuggestions && value && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className={cn(
            "absolute top-full left-0 right-0 bg-white border border-border mt-1 shadow-lg z-50 max-h-60 overflow-y-auto rounded-md",
            compact ? "text-sm" : ""
          )}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => {
                onChange(suggestion)
                setShowSuggestions(false)
                onSearch()
              }}
              className={cn(
                "w-full text-left hover:bg-accent transition-colors text-foreground",
                compact ? "px-3 py-2" : "px-4 py-2.5",
                index === activeSuggestion ? "bg-accent" : ""
              )}
            >
              <HighlightedText text={suggestion} highlight={value} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) return <span>{text}</span>

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong key={i} className="font-semibold text-primary">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}
