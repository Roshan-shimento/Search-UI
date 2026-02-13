"use client"

import { useMemo, useState } from "react"
import { ChevronDown, Search, Settings, RefreshCw, Download, MoreVertical, X, ChevronLeft, ChevronRight } from "lucide-react"
import { SearchTabs, supportSiteTabs } from "./search-tabs"
import { FiltersSidebar } from "./filters-sidebar"
import { AISummary } from "./ai-summary"
import { SortDropdown } from "./sort-dropdown"
import { SearchResult } from "./search-result"
import { VideoGrid } from "./video-grid"
import { ResourceSections } from "./resource-sections"
import { mockSearchResults, filterGroups } from "@/lib/search-data"
import type { SupportSiteTabType, SortOption } from "@/lib/search-types"

interface Ticket {
  id: string
  subject: string
  priority: string
  status: string
  substatus: string
  requester: string
  team: string
}

const mockTickets: Ticket[] = [
  { id: "INC1205643", subject: "Testing for Demo", priority: "NA", status: "Open", substatus: "Unassigned", requester: "Gurpreet", team: "Service Desk" },
  { id: "OUT1205642", subject: "Windows Server me...", priority: "NA", status: "Open", substatus: "Unassigned", requester: "Gurpreet Singh", team: "Service Desk" },
  { id: "INC1205641", subject: "Testing for Demodddi", priority: "Medium - P3", status: "Open", substatus: "Assigned", requester: "Gurpreet", team: "Service Desk" },
  { id: "INC1205640", subject: "Testing for Demo", priority: "Medium - P3", status: "Open", substatus: "Unassigned", requester: "Gurpreet", team: "Service Desk" },
  { id: "INC1205639", subject: "Testing for Demo", priority: "NA", status: "Resolved", substatus: "Resolved", requester: "Gurpreet", team: "Service Desk" },
  { id: "INC1205638", subject: "Testing for Demo", priority: "NA", status: "Resolved", substatus: "Resolved", requester: "Gurpreet", team: "Service Desk" },
  { id: "INC1205637", subject: "Testing for Demo", priority: "NA", status: "Open", substatus: "Assigned", requester: "Gurpreet", team: "Service Desk" },
  { id: "INC1205635", subject: "Virtual Assistant cas...", priority: "Critical - P1", status: "Open", substatus: "Unassigned", requester: "Rahul Tagadur", team: "Service Desk" },
  { id: "INC1205631", subject: "Windows Server me...", priority: "Medium - P3", status: "Resolved", substatus: "Resolved", requester: "Gurpreet", team: "Service Desk" },
  { id: "INC1205630", subject: "Test", priority: "Medium - P3", status: "Open", substatus: "Unassigned", requester: "Gurpreet", team: "Service Desk" },
  { id: "INC1205628", subject: "Windows Server me...", priority: "Medium - P3", status: "Open", substatus: "Unassigned", requester: "Gurpreet Singh", team: "GTC" },
]

export function WolkenAgentPanel() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>("INC1205631")
  const [showDetailView, setShowDetailView] = useState(false)
  const [workbenchTickets] = useState(["INC1205628", "OUT1205642", "INC1205607", "INC1205624"])
  const [sortColumn, setSortColumn] = useState<string>("ticketId")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [activeMainTab, setActiveMainTab] = useState<"notes" | "search" | "resolution">("search")
  const [searchQuery, setSearchQuery] = useState("Testing for Demo")

  // Support-style search state for the Search tab (matches Wolken Support Site)
  const [supportActiveTab, setSupportActiveTab] = useState<SupportSiteTabType>("all")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    language: ["english"],
  })
  const [sortBy, setSortBy] = useState<SortOption>("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleTicketClick = (ticketId: string) => {
    setSelectedTicket(ticketId)
    setShowDetailView(true)
  }

  const handleBackToList = () => {
    setShowDetailView(false)
  }

  const handleFilterChange = (groupId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const current = prev[groupId] || []
      const updated = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId]
      return { ...prev, [groupId]: updated }
    })
  }

  const tabToTypeMap: Record<SupportSiteTabType, string | null> = {
    all: null,
    "support-articles": "support-article",
    documentation: "documentation",
    community: "community",
    blogs: "blog",
    videos: "video",
  }

  const filteredResults = useMemo(() => {
    return mockSearchResults.filter((item) => {
      if (supportActiveTab !== "all") {
        const expectedType = tabToTypeMap[supportActiveTab]
        if (expectedType && item.type !== expectedType) return false
      }
      if (selectedFilters.type?.length > 0 && !selectedFilters.type.includes(item.type)) return false
      return true
    })
  }, [supportActiveTab, selectedFilters])

  const sortedResults = useMemo(() => {
    return [...filteredResults].sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })
  }, [filteredResults, sortBy])

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedResults.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedResults, currentPage, itemsPerPage])

  if (showDetailView && selectedTicket) {
    const ticket = mockTickets.find(t => t.id === selectedTicket)
    if (!ticket) return null

    return (
      <div className="h-screen flex flex-col bg-background">
        {/* Header - Same as list view */}
        <div className="border-b bg-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted/50 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <svg className="h-8" viewBox="0 0 120 30" fill="none">
              <rect x="4" y="4" width="22" height="22" rx="4" fill="#00A3E0" />
              <text x="35" y="20" fill="#333" fontSize="18" fontWeight="600" fontFamily="Arial">wolken</text>
            </svg>
            <button className="p-2 hover:bg-muted/50 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
          </div>
          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="cases"
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm">
                Search
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
              <span className="text-lg">+</span>
              CREATE TICKET
            </button>
            <button className="px-4 py-2 border rounded hover:bg-muted/50 transition-colors text-sm">
              Online
            </button>
            <button className="w-10 h-10 rounded-full bg-primary text-white font-semibold flex items-center justify-center">
              GS
            </button>
          </div>
        </div>

        {/* Case Header Bar */}
        <div className="border-b bg-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="p-1.5 hover:bg-muted/50 rounded transition-colors" title="View">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button className="p-1.5 hover:bg-muted/50 rounded transition-colors" title="Attach">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <button className="p-1.5 hover:bg-muted/50 rounded transition-colors" title="Edit">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button className="p-1.5 hover:bg-muted/50 rounded transition-colors" title="History">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button className="p-1.5 hover:bg-muted/50 rounded transition-colors" title="Star">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{ticket.id}</span>
              <span className="px-2 py-0.5 bg-muted rounded text-sm">{ticket.status}/{ticket.substatus}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span><strong className="text-foreground">Requester:</strong> {ticket.requester}</span>
              <span><strong className="text-foreground">Owner:</strong></span>
              <span><strong className="text-foreground">Created On:</strong> 27-August-2025 11:02:11</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button onClick={handleBackToList} className="p-1.5 hover:bg-muted/50 rounded transition-colors text-red-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar Icons */}
          <div className="w-12 border-r bg-white flex flex-col items-center py-4 gap-3">
            <button className="p-2 hover:bg-muted/50 rounded transition-colors" title="Info">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2 hover:bg-muted/50 rounded transition-colors" title="Attach">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <button className="p-2 hover:bg-muted/50 rounded transition-colors" title="Document">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-muted/50 rounded transition-colors" title="Link">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            <button className="p-2 hover:bg-muted/50 rounded transition-colors" title="Time">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-muted/50 rounded transition-colors" title="List">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button className="p-2 hover:bg-muted/50 rounded transition-colors" title="Layers">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </button>
            <button className="p-2 hover:bg-muted/50 rounded transition-colors" title="Calendar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-muted/50 rounded transition-colors" title="Bell">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="p-2 hover:bg-muted/50 rounded transition-colors" title="History">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Main Content Area - Ticket Summary */}
          <div className="flex-1 overflow-auto bg-white">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Ticket Summary</h2>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column - Ticket */}
                <div>
                  <h3 className="text-base font-semibold mb-4 pb-2 border-b">Ticket</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Ticket ID:</div>
                      <div className="font-medium">{ticket.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Ticket Type:</div>
                      <div className="font-medium">Incident</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Status/Substatus:</div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{ticket.status}/{ticket.substatus}</span>
                        <button className="text-muted-foreground hover:text-foreground">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Owner:</div>
                      <button className="text-primary hover:underline">
                        <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Team:</div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-medium">{ticket.team}</span>
                        <button className="text-primary hover:underline">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Urgency</div>
                      <div className="font-medium">-</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Impact</div>
                      <div className="font-medium">-</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Priority:</div>
                      <div className="font-medium">{ticket.priority}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Ticket Origin:</div>
                      <div className="font-medium">AI Chatbot</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Created On:</div>
                      <div className="font-medium">27-August-2025 11:02:11</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - User */}
                <div>
                  <h3 className="text-base font-semibold mb-4 pb-2 border-b">User</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Requester:</div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-medium">{ticket.requester}</span>
                        <button className="text-primary hover:underline">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </button>
                        <button className="text-primary hover:underline">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Special Handling Notes:</div>
                      <div className="font-medium">-</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Requester Email:</div>
                      <div className="font-medium">gurpreet.singh@wolkensoftware.com</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Requester Phone:</div>
                      <div className="font-medium">Not Provided</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Created by:</div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-medium">Wolken Service Account</span>
                        <button className="text-primary hover:underline">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </button>
                        <button className="text-primary hover:underline">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Search */}
          <div className="w-[500px] border-l bg-background flex flex-col">
            {/* Tabs */}
            <div className="border-b bg-white">
              <div className="flex px-6">
                <button
                  onClick={() => setActiveMainTab("notes")}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    activeMainTab === "notes"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Notes
                </button>
                <button
                  onClick={() => setActiveMainTab("search")}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    activeMainTab === "search"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Search
                </button>
                <button
                  onClick={() => setActiveMainTab("resolution")}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    activeMainTab === "resolution"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Resolution Information
                </button>
              </div>
            </div>

            {activeMainTab === "search" && (
              <div className="flex-1 flex flex-col p-6 overflow-auto">
                {/* Search Input */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-20 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button className="p-1 hover:bg-muted/50 rounded transition-colors">
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted/50 rounded transition-colors">
                      <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <span className="text-xs text-muted-foreground ml-1">16/250</span>
                  </div>
                </div>

                {/* Support-style tabs (same as Wolken Support Site) */}
                <div className="-mx-6 mb-3 bg-white border-b">
                  <SearchTabs
                    tabs={supportSiteTabs}
                    activeTab={supportActiveTab}
                    onTabChange={(tab) => {
                      setSupportActiveTab(tab)
                      setCurrentPage(1)
                    }}
                    compact
                  />
                </div>

                {/* Support-style layout: filters left, AI summary + results right (match Wolken Support Site) */}
                <div className="flex-1 flex flex-col md:flex-row gap-4">
                  {/* Filters sidebar - hidden in ticket detail view */}
                  {!showDetailView && (
                    <aside className="w-full md:w-56 shrink-0 md:shrink-0">
                      <FiltersSidebar
                        filters={filterGroups}
                        selectedFilters={selectedFilters}
                        onFilterChange={handleFilterChange}
                        compact
                      />
                    </aside>
                  )}

                  {/* Main content: AI summary on top, results below */}
                  <div className={`flex-1 min-w-0 flex flex-col mt-4 md:mt-0 ${showDetailView ? 'w-full' : ''}`}>
                    <div className="mb-3">
                      <AISummary
                        summary="Search results from Wolken Support documentation. Find guides, tutorials, troubleshooting tips, and best practices."
                        sources={[
                          { title: "Support Documentation", url: "#" },
                          { title: "Knowledge Base", url: "#" },
                        ]}
                      />
                    </div>

                    {/* Results area */}
                    {supportActiveTab === "all" ? (
                      <div>
                        <ResourceSections
                          results={sortedResults}
                          onViewAll={(type) => {
                            setSupportActiveTab(type as SupportSiteTabType)
                            setCurrentPage(1)
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-2 text-xs">
                          <div className="text-muted-foreground">
                            {sortedResults.length === 0
                              ? "0 results"
                              : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                                  currentPage * itemsPerPage,
                                  sortedResults.length
                                )} of ${sortedResults.length}`}
                          </div>
                          {!showDetailView && <SortDropdown value={sortBy} onChange={setSortBy} resultCount={sortedResults.length} />}
                        </div>

                        {supportActiveTab === "videos" ? (
                          <VideoGrid videos={paginatedResults} />
                        ) : (
                          <div className="border rounded-md bg-white divide-y">
                            {paginatedResults.map((result) => (
                              <SearchResult
                                key={result.id}
                                item={result}
                                searchQuery={searchQuery}
                                compact
                              />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeMainTab === "notes" && (
              <div className="flex-1 flex items-center justify-center p-6">
                <p className="text-muted-foreground">Notes content goes here</p>
              </div>
            )}

            {activeMainTab === "resolution" && (
              <div className="flex-1 flex items-center justify-center p-6">
                <p className="text-muted-foreground">Resolution Information content goes here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-muted/50 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <svg className="h-8" viewBox="0 0 120 30" fill="none">
            <rect x="4" y="4" width="22" height="22" rx="4" fill="#00A3E0" />
            <text x="35" y="20" fill="#333" fontSize="18" fontWeight="600" fontFamily="Arial">wolken</text>
          </svg>
          <button className="p-2 hover:bg-muted/50 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
        </div>
        <div className="flex-1 max-w-2xl mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Global Search"
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
            <span className="text-lg">+</span>
            CREATE TICKET
          </button>
          <button className="px-4 py-2 border rounded hover:bg-muted/50 transition-colors text-sm">
            Online
          </button>
          <button className="w-10 h-10 rounded-full bg-primary text-white font-semibold flex items-center justify-center">
            GS
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="px-6 py-3 bg-white border-b flex items-center gap-2 text-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span className="font-medium">Home</span>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="text-primary font-medium">Ticket Views</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filters Bar */}
          <div className="px-6 py-4 bg-white border-b">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <span>Filters</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-muted/50 transition-colors text-sm">
                  All (Excluding Closed Ticket)
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="p-2 border rounded hover:bg-muted/50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </button>
                <button className="p-2 border rounded hover:bg-muted/50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </button>
                <button className="p-2 border rounded hover:bg-muted/50 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter to search"
                    className="w-full pl-10 pr-4 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-muted/50 transition-colors text-sm">
                  Business Service
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="p-2 border rounded hover:bg-muted/50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button className="p-2 border rounded hover:bg-muted/50 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 border rounded hover:bg-muted/50 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 border rounded hover:bg-muted/50 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">All (Excluding Closed Ticket):</span> Status != Closed
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="bg-muted/30 sticky top-0 z-10">
                <tr className="border-b">
                  <th className="w-12 p-3">
                    <Settings className="w-5 h-5 text-primary cursor-pointer" />
                  </th>
                  <th className="p-3 text-left text-sm font-semibold">
                    <button
                      onClick={() => handleSort("ticketId")}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Search className="w-4 h-4" />
                      TICKET ID
                      {sortColumn === "ticketId" && (
                        <span className="text-primary">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </button>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold">
                    <button
                      onClick={() => handleSort("subject")}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Search className="w-4 h-4" />
                      SUBJECT
                      {sortColumn === "subject" && (
                        <span className="text-primary">{sortDirection === "asc" ? "↑" : "↑"}</span>
                      )}
                    </button>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold">
                    <button
                      onClick={() => handleSort("priority")}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Search className="w-4 h-4" />
                      PRIORITY
                      {sortColumn === "priority" && (
                        <span className="text-primary">{sortDirection === "asc" ? "↑" : "↑"}</span>
                      )}
                    </button>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Search className="w-4 h-4" />
                      STATUS/SUB STATUS
                      {sortColumn === "status" && (
                        <span className="text-primary">{sortDirection === "asc" ? "↑" : "↑"}</span>
                      )}
                    </button>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold">
                    <button
                      onClick={() => handleSort("requester")}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Search className="w-4 h-4" />
                      REQUESTER
                      {sortColumn === "requester" && (
                        <span className="text-primary">{sortDirection === "asc" ? "↑" : "↑"}</span>
                      )}
                    </button>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold">
                    <button
                      onClick={() => handleSort("team")}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Search className="w-4 h-4" />
                      TEAM
                      {sortColumn === "team" && (
                        <span className="text-primary">{sortDirection === "asc" ? "↑" : "↑"}</span>
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => handleTicketClick(ticket.id)}
                    className={`border-b cursor-pointer transition-colors ${
                      selectedTicket === ticket.id
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <td className="p-3 text-center">
                      <button className="p-1 rounded-full hover:bg-muted/50">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                    <td className="p-3">
                      <span className={`font-medium ${selectedTicket === ticket.id ? "text-white" : "text-primary"}`}>
                        {ticket.id}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{ticket.subject}</td>
                    <td className="p-3 text-sm">{ticket.priority}</td>
                    <td className="p-3 text-sm">{ticket.status}/{ticket.substatus}</td>
                    <td className="p-3">
                      <span className={`text-sm ${selectedTicket === ticket.id ? "text-white" : "text-primary"}`}>
                        {ticket.requester}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-sm ${selectedTicket === ticket.id ? "text-white" : "text-primary"}`}>
                        {ticket.team}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-3 bg-white border-t flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Go To page</span>
              <input
                type="number"
                defaultValue="1"
                className="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="p-1 border rounded-full hover:bg-muted/50 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Items per page:</span>
                <button className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-muted/50 transition-colors font-medium">
                  100
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-muted-foreground">
                1 – 38 of 38
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 border rounded hover:bg-muted/50 transition-colors disabled:opacity-50" disabled>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-1 border rounded hover:bg-muted/50 transition-colors disabled:opacity-50" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 border rounded hover:bg-muted/50 transition-colors disabled:opacity-50" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="p-1 border rounded hover:bg-muted/50 transition-colors disabled:opacity-50" disabled>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Workbench Sidebar */}
        <div className="w-56 border-l bg-gray-50 flex flex-col">
          <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Workbench</span>
            <button className="p-1 hover:bg-muted/50 rounded transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {workbenchTickets.map((ticketId) => (
              <div
                key={ticketId}
                className="px-4 py-3 border-b cursor-pointer transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-primary">{ticketId}</span>
                  <button className="p-0.5 hover:bg-gray-200 rounded transition-colors">
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
