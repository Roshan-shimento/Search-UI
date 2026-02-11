"use client"

import { ExternalLink, Play, AlertTriangle } from "lucide-react"

export function AEMLandingPage() {
  return (
    <div className="min-h-[calc(100vh-180px)] bg-white">
      {/* Header Navigation */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-arctera-orange">{"'"}</span>
                <span className="text-2xl font-bold text-foreground">arctera</span>
              </div>
              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Solutions
                </a>
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Platform
                </a>
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Resources
                </a>
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Support
                </a>
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Partners
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-muted rounded-full transition-colors" title="Search">
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Contact us
              </a>
              <button className="p-2 hover:bg-muted rounded-full transition-colors" title="Account">
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="bg-[#fff4eb] border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0" />
            <span className="font-semibold text-foreground">April 15 deadline:</span>
            <span className="text-foreground">Update to Arctera Licensing Activation Service to avoid downtime.</span>
            <a href="#" className="text-primary hover:underline inline-flex items-center gap-1 font-medium ml-1">
              Read more
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#0052cc]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Secure the Work.
              </h1>
              <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Trust Arctera to deliver improved user experiences, more productivity, and tailored security at an optimized cost.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Learn more
              </a>
            </div>

            {/* Right Content - Video Thumbnail */}
            <div className="flex-1 w-full max-w-lg">
              <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-gray-200 to-gray-300">
                <div className="aspect-video flex items-center justify-center relative">
                  {/* Illustration placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Office desk illustration */}
                      <rect width="400" height="225" fill="#e8e8e8"/>
                      {/* Desk */}
                      <rect x="80" y="140" width="240" height="8" fill="#1a365d"/>
                      {/* Computer */}
                      <rect x="200" y="80" width="80" height="60" rx="4" fill="#ffffff" stroke="#1a365d" strokeWidth="2"/>
                      <rect x="230" y="140" width="20" height="20" fill="#1a365d"/>
                      {/* Chair */}
                      <ellipse cx="160" cy="180" rx="40" ry="20" fill="#4a5568"/>
                      <rect x="155" y="148" width="10" height="40" fill="#2d3748"/>
                      {/* Calendar */}
                      <rect x="300" y="60" width="60" height="70" rx="2" fill="#ffffff" stroke="#1a365d" strokeWidth="2"/>
                      <rect x="300" y="60" width="60" height="15" fill="#1a365d"/>
                      <line x1="310" y1="85" x2="350" y2="85" stroke="#1a365d" strokeWidth="1"/>
                      <line x1="310" y1="95" x2="350" y2="95" stroke="#1a365d" strokeWidth="1"/>
                      <line x1="310" y1="105" x2="350" y2="105" stroke="#1a365d" strokeWidth="1"/>
                      {/* Green folder */}
                      <rect x="240" y="90" width="30" height="40" rx="2" fill="#48bb78"/>
                      {/* Checkmark */}
                      <circle cx="320" cy="100" r="8" fill="#4299e1"/>
                      <path d="M316 100 L319 103 L324 97" stroke="#ffffff" strokeWidth="2" fill="none"/>
                      {/* Filing cabinet */}
                      <rect x="340" y="140" width="30" height="60" fill="#1a365d"/>
                      <rect x="345" y="150" width="20" height="12" fill="#2d3748"/>
                      <rect x="345" y="168" width="20" height="12" fill="#2d3748"/>
                    </svg>
                  </div>
                  
                  {/* Play button overlay */}
                  <button className="absolute z-10 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg hover:scale-105 transition-transform">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                    <span className="text-foreground font-medium pr-2">1:03</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground">
                Protect your organization with industry-leading security features and compliance certifications.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">High Performance</h3>
              <p className="text-muted-foreground">
                Experience lightning-fast performance with optimized infrastructure and intelligent caching.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Get help when you need it with our dedicated support team available around the clock.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
