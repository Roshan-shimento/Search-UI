"use client"

import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function CommunityLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Community Navigation Bar */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <nav className="flex items-center gap-6">
              <a href="#" className="text-white text-sm font-medium hover:text-white/90">
                Home
              </a>
              <a href="#" className="text-white text-sm font-medium hover:text-white/90">
                Discussions
              </a>
              <div className="relative group">
                <a href="#" className="text-white text-sm font-medium hover:text-white/90 flex items-center gap-1">
                  Tech Zone
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <a href="#" className="text-white text-sm font-medium hover:text-white/90">
                Tech Zone Blogs
              </a>
              <div className="relative group">
                <a href="#" className="text-white text-sm font-medium hover:text-white/90 flex items-center gap-1">
                  Resources
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <a href="#" className="text-white text-sm font-medium hover:text-white/90">
                Events
              </a>
              <div className="relative group">
                <a href="#" className="text-white text-sm font-medium hover:text-white/90 flex items-center gap-1">
                  Activity
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="text-white text-sm font-medium hover:text-white/90 flex items-center gap-1">
                  More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 rounded-md bg-primary-foreground/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-80">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/image.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4 text-balance">Welcome to the Citrix Community</h1>
            <p className="text-xl text-white/90">A forum to learn about secure application access.</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="font-medium">Home</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Featured Card 1 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-black">
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000"
                    alt="Featured item"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    Citrix Virtual Apps and Desktops Overview
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Technology Discussion</p>
                </div>
              </Card>

              {/* Featured Card 2 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000"
                    alt="Featured item"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2">Security Best Practices Guide</h3>
                  <p className="text-xs text-muted-foreground mt-1">Documentation</p>
                </div>
              </Card>

              {/* Featured Card 3 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000"
                    alt="Featured item"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    Performance Optimization Techniques
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Technical Article</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Join Community Card */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Join the Citrix Community</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Welcome! Sign up to connect with other IT professionals, share insights, and stay updated with the
                latest from Citrix. Get access to forums, events, exclusive resources, and more — it's free to join!
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                New User? Sign Up
              </Button>
            </Card>

            {/* Recent Activity Card */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="text-sm">
                  <p className="font-medium">Latest Discussion</p>
                  <p className="text-muted-foreground text-xs mt-1">Workspace App Configuration Tips</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Popular Topic</p>
                  <p className="text-muted-foreground text-xs mt-1">ADC SSL Certificate Management</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Trending Resource</p>
                  <p className="text-muted-foreground text-xs mt-1">Migration Guide to Cloud</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
