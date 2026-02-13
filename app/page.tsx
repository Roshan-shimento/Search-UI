
"use client"

import { useMemo, useState } from "react"
import { Pagination } from "@/components/arctera/pagination"
import { AEMLandingPage } from "@/components/arctera/aem-landing-page"
import { ResourceSections } from "@/components/arctera/resource-sections"
import { Header } from "@/components/arctera/header"
import { SearchViewsHeader } from "@/components/arctera/search-views-header"
import { SearchBar } from "@/components/arctera/search-bar"
import { SearchTabs } from "@/components/arctera/search-tabs"
import { FiltersSidebar } from "@/components/arctera/filters-sidebar"
import { AISummary } from "@/components/arctera/ai-summary"
import { SortDropdown } from "@/components/arctera/sort-dropdown"
import { SearchResult } from "@/components/arctera/search-result"
import { QuickViewModal } from "@/components/arctera/quick-view-modal"
import { VideoGrid } from "@/components/arctera/video-grid"
import { WolkenAgentPanel } from "@/components/arctera/wolken-agent-panel"
import { type SearchResultItem, type WolkenTabType, type SortOption, type SupportSiteTabType, type FilterGroup } from "@/lib/search-types"

// Main view type for top-level navigation
type MainViewType = "wolken-support" | "aem-site" | "community-invision" | "wolken-full" | "wolken-agent"

// Mock data for all searches
const mockSearchResults: SearchResultItem[] = [
  {
    id: "1",
    title: "Arctera™ Insight Management Console Help : v1.0",
    subtitle: "Resetting a forgotten password",
    url: "#",
    product: "Veritas Alta eDiscovery",
    date: "2026-01-18",
    summary:
      "If you've forgotten your password, you can reset it by clicking the 'Forgot Password' link on the login page. Check your email, including the spam or junk folder, for this message. This link expires after 30 minutes from you receive the email. Open the password reset email and click on the provided Reset Password...",
    type: "support-article",
    articleType: "how-to",
    highlight: "including the spam or junk folder, for this message. This link expires after 30 minutes",
    isAttachable: true,
  },
  {
    id: "2",
    title: "System Configuration Guide v2.5",
    subtitle: "Network setup and troubleshooting",
    url: "#",
    product: "Arctera Platform",
    date: "2026-01-15",
    summary:
      "Complete guide for configuring network settings in Arctera Platform. Includes step-by-step instructions for DNS configuration, firewall rules, and load balancer setup. Troubleshooting common network connectivity issues...",
    type: "documentation",
    highlight: "Network setup and troubleshooting",
    isAttachable: false,
  },
  {
    id: "3",
    title: "Security Alert: CVE-2026-0001",
    subtitle: "Critical vulnerability patch available",
    url: "#",
    product: "Arctera Security",
    date: "2026-01-20",
    summary:
      "A critical security vulnerability has been identified in Arctera Security versions 3.0-3.5. This vulnerability could allow unauthorized access to system resources. Immediate patching is recommended...",
    type: "security-alert",
    articleType: "security-bulletin",
    highlight: "Critical vulnerability patch available",
    isAttachable: true,
  },
  {
    id: "4",
    title: "Case: Customer Login Issue",
    subtitle: "CS-2026-001234",
    url: "#",
    product: "Arctera Console",
    date: "2026-01-21",
    summary: "Customer unable to log in after password reset. Issue resolved by clearing browser cache and cookies.",
    type: "case",
    highlight: "Login Issue",
    isAttachable: false,
  },
  {
    id: "5",
    title: "JIRA-12345: Database Performance Issue",
    subtitle: "High priority bug",
    url: "#",
    product: "Arctera Database",
    date: "2026-01-19",
    summary: "Database queries running slower than expected. Investigation shows missing index on frequently queried table.",
    type: "jira",
    highlight: "Database Performance Issue",
    isAttachable: false,
  },
  {
    id: "6",
    title: "Blog: Best Practices for Cloud Migration",
    subtitle: "Expert insights and tips",
    url: "#",
    product: "Arctera Cloud",
    date: "2026-01-17",
    summary:
      "Learn how to successfully migrate your infrastructure to the cloud with these proven strategies and best practices from our expert team...",
    type: "blog",
    highlight: "Best Practices for Cloud Migration",
    isAttachable: false,
  },
  {
    id: "7",
    title: "Video Tutorial: Getting Started with Arctera",
    subtitle: "15 minute introduction",
    url: "#",
    product: "Arctera Platform",
    date: "2026-01-16",
    summary: "Watch this comprehensive video tutorial to learn the basics of Arctera Platform in just 15 minutes...",
    type: "video",
    highlight: "Getting Started with Arctera",
    isAttachable: false,
  },
  {
    id: "8",
    title: "Troubleshooting Authentication Failures",
    subtitle: "Common authentication issues and solutions",
    url: "#",
    product: "Arctera Security",
    date: "2026-01-14",
    summary: "Step-by-step guide to diagnose and resolve authentication failures in Arctera Security. Covers LDAP, SAML, and OAuth issues...",
    type: "support-article",
    articleType: "problem-solution",
    highlight: "Authentication Failures",
    isAttachable: true,
  },
  {
    id: "9",
    title: "API Reference Documentation v3.0",
    subtitle: "Complete API guide",
    url: "#",
    product: "Arctera API",
    date: "2026-01-13",
    summary: "Comprehensive API documentation including endpoints, request/response formats, authentication methods, and code examples...",
    type: "documentation",
    highlight: "API Reference",
    isAttachable: false,
  },
  {
    id: "10",
    title: "Community Discussion: Performance Optimization Tips",
    subtitle: "Share your optimization strategies",
    url: "#",
    product: "Arctera Community",
    date: "2026-01-12",
    summary: "Join the discussion on performance optimization techniques. Community members share their experiences and best practices...",
    type: "community",
    highlight: "Performance Optimization",
    isAttachable: false,
  },
  {
    id: "11",
    title: "Blog: New Features in Arctera 4.0",
    subtitle: "What's new and exciting",
    url: "#",
    product: "Arctera Platform",
    date: "2026-01-11",
    summary: "Discover the latest features and improvements in Arctera 4.0, including enhanced security, better performance, and new integrations...",
    type: "blog",
    highlight: "New Features in Arctera 4.0",
    isAttachable: false,
  },
  {
    id: "12",
    title: "Video Tutorial: Advanced Configuration",
    subtitle: "30 minute deep dive",
    url: "#",
    product: "Arctera Platform",
    date: "2026-01-10",
    summary: "Learn advanced configuration techniques for Arctera Platform in this detailed 30-minute tutorial...",
    type: "video",
    highlight: "Advanced Configuration",
    isAttachable: false,
  },
  {
    id: "13",
    title: "Database Backup and Recovery Procedures",
    subtitle: "Ensuring data safety",
    url: "#",
    product: "Arctera Database",
    date: "2026-01-09",
    summary: "Complete guide to implementing robust backup and recovery procedures for Arctera Database. Includes automated backup scripts...",
    type: "support-article",
    articleType: "how-to",
    highlight: "Backup and Recovery",
    isAttachable: true,
  },
  {
    id: "14",
    title: "Installation Guide v4.0",
    subtitle: "Step-by-step installation",
    url: "#",
    product: "Arctera Platform",
    date: "2026-01-08",
    summary: "Detailed installation instructions for Arctera Platform 4.0. Covers system requirements, prerequisites, and post-installation configuration...",
    type: "documentation",
    highlight: "Installation Guide",
    isAttachable: false,
  },
  {
    id: "15",
    title: "Community Q&A: Deployment Best Practices",
    subtitle: "Expert answers to common questions",
    url: "#",
    product: "Arctera Community",
    date: "2026-01-07",
    summary: "Get expert answers to frequently asked questions about Arctera deployment strategies and best practices...",
    type: "community",
    highlight: "Deployment Best Practices",
    isAttachable: false,
  },
  {
    id: "16",
    title: "Blog: Security Hardening Checklist",
    subtitle: "Protect your Arctera installation",
    url: "#",
    product: "Arctera Security",
    date: "2026-01-06",
    summary: "Follow this comprehensive security hardening checklist to ensure your Arctera installation is protected against common threats...",
    type: "blog",
    highlight: "Security Hardening",
    isAttachable: false,
  },
  {
    id: "17",
    title: "Internal Article: Infrastructure Scaling Guidelines",
    subtitle: "Internal best practices",
    url: "/internal/infrastructure-scaling",
    product: "Arctera Infrastructure",
    date: "2026-01-22",
    summary: "Internal documentation for scaling Arctera infrastructure. Includes capacity planning, resource allocation, and performance benchmarks for enterprise deployments...",
    type: "internal-article",
    highlight: "Infrastructure Scaling",
    isAttachable: false,
  },
  {
    id: "18",
    title: "Internal Article: Troubleshooting Complex Issues",
    subtitle: "Advanced diagnostic techniques",
    url: "#",
    product: "Arctera Platform",
    date: "2026-01-21",
    summary: "Advanced troubleshooting guide for internal support teams. Covers diagnostic tools, log analysis, and root cause investigation methods...",
    type: "internal-article",
    highlight: "Advanced Diagnostics",
    isAttachable: false,
  },
  {
    id: "19",
    title: "Product Docs: API Integration Guide",
    subtitle: "RESTful API reference",
    url: "/docs/api-integration",
    product: "Arctera API",
    date: "2026-01-20",
    summary: "Complete product documentation for Arctera API integration. Includes authentication, endpoints, rate limits, and code samples in multiple languages...",
    type: "prod-doc",
    highlight: "API Integration",
    isAttachable: false,
  },
  {
    id: "20",
    title: "Product Docs: Database Schema Reference",
    subtitle: "Database structure guide",
    url: "#",
    product: "Arctera Database",
    date: "2026-01-19",
    summary: "Comprehensive database schema documentation including tables, relationships, indexes, and migration guides for version upgrades...",
    type: "prod-doc",
    highlight: "Database Schema",
    isAttachable: false,
  },
  {
    id: "21",
    title: "JIRA-45678: UI Rendering Issue in Dashboard",
    subtitle: "Medium priority bug",
    url: "https://jira.arctera.com/browse/JIRA-45678",
    product: "Arctera Dashboard",
    date: "2026-01-18",
    summary: "Dashboard widgets not rendering correctly on mobile devices. Issue tracked to CSS media query conflict. Fix in progress...",
    type: "jira",
    highlight: "UI Rendering Issue",
    isAttachable: false,
  },
  {
    id: "22",
    title: "JIRA-78901: Memory Leak in Background Service",
    subtitle: "High priority bug",
    url: "#",
    product: "Arctera Services",
    date: "2026-01-17",
    summary: "Background service consuming increasing memory over time. Memory leak identified in event listener cleanup. Patch scheduled for next release...",
    type: "jira",
    highlight: "Memory Leak",
    isAttachable: false,
  },
  {
    id: "23",
    title: "Confluence: Team Onboarding Process",
    subtitle: "New team member guide",
    url: "https://confluence.arctera.com/team-onboarding",
    product: "Arctera Team",
    date: "2026-01-16",
    summary: "Complete onboarding documentation for new team members. Includes account setup, tool access, training resources, and team contacts...",
    type: "confluence",
    highlight: "Team Onboarding",
    isAttachable: false,
  },
  {
    id: "24",
    title: "Confluence: Release Process Documentation",
    subtitle: "Release workflow guide",
    url: "#",
    product: "Arctera DevOps",
    date: "2026-01-15",
    summary: "Standard operating procedure for Arctera releases. Covers testing requirements, deployment steps, rollback procedures, and communication plan...",
    type: "confluence",
    highlight: "Release Process",
    isAttachable: false,
  },
  {
    id: "25",
    title: "Case: Performance Degradation After Upgrade",
    subtitle: "CS-2026-002456",
    url: "/cases/CS-2026-002456",
    product: "Arctera Platform",
    date: "2026-01-14",
    summary: "Customer reports significant performance degradation after upgrading to version 4.0. Investigation revealed misconfigured caching layer. Issue resolved by adjusting cache settings...",
    type: "case",
    highlight: "Performance Degradation",
    isAttachable: false,
  },
  {
    id: "26",
    title: "Case: Data Import Failure",
    subtitle: "CS-2026-003789",
    url: "/cases/CS-2026-003789",
    product: "Arctera Data",
    date: "2026-01-13",
    summary: "Bulk data import failing with timeout errors. Root cause was file size exceeding configured limits. Resolved by increasing timeout and chunk size...",
    type: "case",
    highlight: "Data Import Failure",
    isAttachable: false,
  },
  {
    id: "27",
    title: "Community: How to Optimize Query Performance",
    subtitle: "Community discussion",
    url: "/community/discussions/query-optimization",
    product: "Arctera Community",
    date: "2026-01-12",
    summary: "Active community discussion on database query optimization techniques. Members share indexing strategies, query patterns, and performance tuning tips...",
    type: "community",
    highlight: "Query Optimization",
    isAttachable: false,
  },
  {
    id: "28",
    title: "Community: Custom Integration Examples",
    subtitle: "Code samples and guides",
    url: "#",
    product: "Arctera Community",
    date: "2026-01-11",
    summary: "Community-contributed examples of custom integrations with third-party tools. Includes Slack, Jira, ServiceNow, and Salesforce integration code...",
    type: "community",
    highlight: "Custom Integrations",
    isAttachable: false,
  },
  {
    id: "29",
    title: "Blog: Arctera 5.0 Roadmap Preview",
    subtitle: "What's coming next",
    url: "/blog/arctera-5-roadmap",
    product: "Arctera Platform",
    date: "2026-01-10",
    summary: "Get a sneak peek at what's coming in Arctera 5.0. New features include enhanced AI capabilities, improved automation, and better scalability...",
    type: "blog",
    highlight: "Arctera 5.0 Roadmap",
    isAttachable: false,
  },
  {
    id: "30",
    title: "Blog: Microservices Architecture Best Practices",
    subtitle: "Enterprise architecture guide",
    url: "#",
    product: "Arctera Architecture",
    date: "2026-01-09",
    summary: "Learn how to design and implement microservices architecture with Arctera. Covers service decomposition, communication patterns, and deployment strategies...",
    type: "blog",
    highlight: "Microservices Architecture",
    isAttachable: false,
  },
  {
    id: "31",
    title: "Internal Article: Incident Response Playbook",
    subtitle: "Critical incident procedures",
    url: "#",
    product: "Arctera Operations",
    date: "2026-01-08",
    summary: "Internal playbook for handling critical incidents. Includes escalation procedures, communication templates, and post-incident review process...",
    type: "internal-article",
    highlight: "Incident Response",
    isAttachable: false,
  },
  {
    id: "32",
    title: "Product Docs: Security Configuration Guide",
    subtitle: "Securing your deployment",
    url: "#",
    product: "Arctera Security",
    date: "2026-01-07",
    summary: "Comprehensive security configuration guide covering authentication, authorization, encryption, and compliance requirements for Arctera...",
    type: "prod-doc",
    highlight: "Security Configuration",
    isAttachable: false,
  },
  {
    id: "33",
    title: "JIRA-11223: Export Functionality Not Working",
    subtitle: "Critical bug",
    url: "#",
    product: "Arctera Reports",
    date: "2026-01-06",
    summary: "Users unable to export reports to PDF format. Issue caused by missing font libraries. Hotfix deployed to production...",
    type: "jira",
    highlight: "Export Functionality",
    isAttachable: false,
  },
  {
    id: "34",
    title: "Confluence: Development Standards",
    subtitle: "Coding guidelines",
    url: "#",
    product: "Arctera Engineering",
    date: "2026-01-05",
    summary: "Team development standards and coding guidelines. Includes code review checklist, naming conventions, and testing requirements...",
    type: "confluence",
    highlight: "Development Standards",
    isAttachable: false,
  },
  {
    id: "35",
    title: "Case: Email Notification Not Sending",
    subtitle: "CS-2026-004567",
    url: "/cases/CS-2026-004567",
    product: "Arctera Notifications",
    date: "2026-01-04",
    summary: "Customer not receiving email notifications for system alerts. Investigation found SMTP configuration error. Corrected mail server settings...",
    type: "case",
    highlight: "Email Notifications",
    isAttachable: false,
  },
  {
    id: "36",
    title: "Case: Integration Connection Timeout",
    subtitle: "CS-2026-005123",
    url: "/cases/CS-2026-005123",
    product: "Arctera Integrations",
    date: "2026-01-03",
    summary: "Customer experiencing timeout errors when connecting to third-party API. Issue caused by proxy configuration. Updated network settings resolved the issue...",
    type: "case",
    highlight: "Connection Timeout",
    isAttachable: false,
  },
  {
    id: "37",
    title: "Case: User Permission Issues",
    subtitle: "CS-2026-006234",
    url: "/cases/CS-2026-006234",
    product: "Arctera Access Control",
    date: "2026-01-02",
    summary: "Users unable to access certain features despite having correct role assignments. Cache invalidation issue fixed by clearing authorization cache...",
    type: "case",
    highlight: "Permission Issues",
    isAttachable: false,
  },
  {
    id: "38",
    title: "JIRA-23456: API Rate Limiting Not Working",
    subtitle: "High priority bug",
    url: "https://jira.arctera.com/browse/JIRA-23456",
    product: "Arctera API",
    date: "2026-01-01",
    summary: "API rate limiting bypassed under certain conditions. Security issue requiring immediate fix. Patch deployed to address vulnerability...",
    type: "jira",
    highlight: "Rate Limiting",
    isAttachable: false,
  },
  {
    id: "39",
    title: "JIRA-34567: Dashboard Widget Crash",
    subtitle: "Medium priority bug",
    url: "https://jira.arctera.com/browse/JIRA-34567",
    product: "Arctera Dashboard",
    date: "2025-12-31",
    summary: "Custom dashboard widget crashes when displaying null values. Added null checks and error handling to prevent crashes...",
    type: "jira",
    highlight: "Widget Crash",
    isAttachable: false,
  },
  {
    id: "40",
    title: "Confluence: Security Best Practices",
    subtitle: "Security guidelines",
    url: "https://confluence.arctera.com/security-practices",
    product: "Arctera Security",
    date: "2025-12-30",
    summary: "Comprehensive security guidelines for Arctera deployments. Covers authentication, encryption, network security, and compliance requirements...",
    type: "confluence",
    highlight: "Security Practices",
    isAttachable: false,
  },
  {
    id: "41",
    title: "Confluence: API Design Guidelines",
    subtitle: "Development standards",
    url: "https://confluence.arctera.com/api-design",
    product: "Arctera Development",
    date: "2025-12-29",
    summary: "API design principles and standards for Arctera platform. Includes versioning, error handling, documentation, and testing requirements...",
    type: "confluence",
    highlight: "API Design",
    isAttachable: false,
  },
  {
    id: "42",
    title: "Internal Article: Customer Escalation Procedures",
    subtitle: "Support team guidelines",
    url: "/internal/escalation-procedures",
    product: "Arctera Support",
    date: "2025-12-28",
    summary: "Internal procedures for handling customer escalations. Includes severity definitions, response times, and escalation paths for critical issues...",
    type: "internal-article",
    highlight: "Escalation Procedures",
    isAttachable: false,
  },
  {
    id: "43",
    title: "Internal Article: Performance Tuning Guide",
    subtitle: "Advanced optimization",
    url: "/internal/performance-tuning",
    product: "Arctera Platform",
    date: "2025-12-27",
    summary: "Internal guide for performance optimization. Covers database tuning, caching strategies, load balancing, and monitoring for enterprise deployments...",
    type: "internal-article",
    highlight: "Performance Tuning",
    isAttachable: false,
  },
  {
    id: "44",
    title: "Product Docs: Backup and Recovery Guide",
    subtitle: "Data protection",
    url: "/docs/backup-recovery",
    product: "Arctera Data Management",
    date: "2025-12-26",
    summary: "Complete guide to backup and recovery procedures for Arctera. Includes automated backups, disaster recovery, and data restoration processes...",
    type: "prod-doc",
    highlight: "Backup and Recovery",
    isAttachable: false,
  },
  {
    id: "45",
    title: "Product Docs: High Availability Setup",
    subtitle: "Enterprise deployment",
    url: "/docs/high-availability",
    product: "Arctera Enterprise",
    date: "2025-12-25",
    summary: "High availability architecture guide for enterprise Arctera deployments. Covers clustering, failover, load balancing, and redundancy...",
    type: "prod-doc",
    highlight: "High Availability",
    isAttachable: false,
  },
  {
    id: "46",
    title: "Community: Custom Dashboard Examples",
    subtitle: "User contributions",
    url: "/community/discussions/custom-dashboards",
    product: "Arctera Community",
    date: "2025-12-24",
    summary: "Community members share creative custom dashboard implementations. Includes code samples, design patterns, and reusable components...",
    type: "community",
    highlight: "Custom Dashboards",
    isAttachable: false,
  },
  {
    id: "47",
    title: "Community: Automation Scripts Collection",
    subtitle: "Shared automation",
    url: "/community/discussions/automation-scripts",
    product: "Arctera Community",
    date: "2025-12-23",
    summary: "Collection of community-contributed automation scripts for common Arctera tasks. Includes deployment, monitoring, and maintenance scripts...",
    type: "community",
    highlight: "Automation Scripts",
    isAttachable: false,
  },
  {
    id: "48",
    title: "Blog: Machine Learning in Arctera",
    subtitle: "AI capabilities preview",
    url: "/blog/machine-learning-features",
    product: "Arctera AI",
    date: "2025-12-22",
    summary: "Discover how machine learning enhances Arctera capabilities. Predictive analytics, anomaly detection, and intelligent automation coming in v5.0...",
    type: "blog",
    highlight: "Machine Learning",
    isAttachable: false,
  },
  {
    id: "49",
    title: "Blog: Cloud Migration Success Stories",
    subtitle: "Customer case studies",
    url: "/blog/cloud-migration-stories",
    product: "Arctera Cloud",
    date: "2025-12-21",
    summary: "Real-world examples of successful cloud migrations with Arctera. Learn strategies, challenges, and best practices from actual customer experiences...",
    type: "blog",
    highlight: "Cloud Migration",
    isAttachable: false,
  },
  {
    id: "50",
    title: "Video Tutorial: Monitoring and Alerting Setup",
    subtitle: "Configure monitoring in 20 minutes",
    url: "#",
    product: "Arctera Monitoring",
    date: "2026-01-05",
    summary: "Learn how to set up comprehensive monitoring and alerting for your Arctera environment in this quick tutorial...",
    type: "video",
    highlight: "Monitoring and Alerting",
    isAttachable: false,
  },
  {
    id: "18",
    title: "Resolving Memory Leak Issues",
    subtitle: "Identify and fix memory leaks",
    url: "#",
    product: "Arctera Platform",
    date: "2026-01-04",
    summary: "Diagnostic guide for identifying and resolving memory leak issues in Arctera Platform. Includes profiling tools and techniques...",
    type: "support-article",
    articleType: "problem-solution",
    highlight: "Memory Leak Issues",
    isAttachable: true,
  },
  {
    id: "19",
    title: "Upgrade Guide: v3.x to v4.0",
    subtitle: "Smooth upgrade path",
    url: "#",
    product: "Arctera Platform",
    date: "2026-01-03",
    summary: "Complete upgrade guide for migrating from Arctera 3.x to 4.0. Includes compatibility notes, migration steps, and rollback procedures...",
    type: "documentation",
    highlight: "Upgrade Guide",
    isAttachable: false,
  },
  {
    id: "20",
    title: "Community Spotlight: User Success Stories",
    subtitle: "Real-world implementations",
    url: "#",
    product: "Arctera Community",
    date: "2026-01-02",
    summary: "Read inspiring success stories from Arctera users who have successfully implemented the platform in their organizations...",
    type: "community",
    highlight: "User Success Stories",
    isAttachable: false,
  },
  {
    id: "21",
    title: "Blog: Integration Patterns and Best Practices",
    subtitle: "Connect Arctera with your ecosystem",
    url: "#",
    product: "Arctera Integration",
    date: "2026-01-01",
    summary: "Explore common integration patterns and best practices for connecting Arctera with other systems in your infrastructure...",
    type: "blog",
    highlight: "Integration Patterns",
    isAttachable: false,
  },
  {
    id: "22",
    title: "Video: Troubleshooting Common Errors",
    subtitle: "Quick fixes for common issues",
    url: "#",
    product: "Arctera Support",
    date: "2025-12-31",
    summary: "Watch this video to learn quick fixes for the most common errors encountered in Arctera Platform...",
    type: "video",
    highlight: "Troubleshooting Common Errors",
    isAttachable: false,
  },
]

const filterGroups: FilterGroup[] = [
  {
    id: "type",
    label: "Type of Content",
    expanded: true,
    options: [
      { value: "support-article", label: "Support Articles", count: 15 },
      { value: "documentation", label: "Documentation", count: 23 },
      { value: "security-alert", label: "Security Alerts", count: 5 },
      { value: "community", label: "Community Posts", count: 42 },
      { value: "blog", label: "Blogs", count: 18 },
      { value: "video", label: "Videos", count: 12 },
    ],
  },
  {
    id: "product",
    label: "Product Name",
    expanded: true,
    options: [
      { value: "arctera-platform", label: "Arctera Platform", count: 45 },
      { value: "veritas-alta", label: "Veritas Alta eDiscovery", count: 28 },
      { value: "arctera-security", label: "Arctera Security", count: 21 },
      { value: "arctera-console", label: "Arctera Console", count: 19 },
    ],
  },
  {
    id: "language",
    label: "Language",
    expanded: true,
    options: [
      { value: "english", label: "English", count: 156 },
      { value: "spanish", label: "Spanish", count: 32 },
      { value: "french", label: "French", count: 28 },
      { value: "german", label: "German", count: 24 },
    ],
  },
]

const supportSiteTabs = [
  { id: "all", label: "All" },
  { id: "support-articles", label: "Support Articles" },
  { id: "documentation", label: "Documentation" },
  { id: "community", label: "Community Posts" },
  { id: "blogs", label: "Blogs" },
  { id: "videos", label: "Videos" },
]

const wolkenTabs = [
  { id: "all", label: "All" },
  { id: "cases", label: "Cases" },
  { id: "support-articles", label: "Support Articles" },
  { id: "internal-articles", label: "Internal Articles" },
  { id: "prod-docs", label: "Prod Docs" },
  { id: "jira", label: "Jira" },
  { id: "confluence", label: "Confluence" },
  { id: "community", label: "Community" },
  { id: "blogs", label: "Blogs" },
]

export default function Page() {
  const [mainView, setMainView] = useState<MainViewType>("wolken-support")

  // States for each search view
  const [wolkenSupportSearchActive, setWolkenSupportSearchActive] = useState(true)
  
  // Reset search states when changing views
  const handleViewChange = (view: MainViewType) => {
    setMainView(view)
  }

  // Wolken Support Site state
  const [searchQuery, setSearchQuery] = useState("open cases")
  const [activeTab, setActiveTab] = useState<SupportSiteTabType>("all")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    language: ["english"],
  })
  const [sortBy, setSortBy] = useState<SortOption>("relevance")
  const [quickViewItem, setQuickViewItem] = useState<SearchResultItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)

  // AEM Site state
  const [aemSearchQuery, setAemSearchQuery] = useState("")
  const [aemActiveTab, setAemActiveTab] = useState<SupportSiteTabType>("all")
  const [aemSelectedFilters, setAemSelectedFilters] = useState<Record<string, string[]>>({
    language: ["english"],
  })
  const [aemSortBy, setAemSortBy] = useState<SortOption>("relevance")
  const [aemCurrentPage, setAemCurrentPage] = useState(1)
  const [aemItemsPerPage] = useState(20)

  // Community/Invision state
  const [communitySearchQuery, setCommunitySearchQuery] = useState("")
  const [communityActiveTab, setCommunityActiveTab] = useState<SupportSiteTabType>("all")
  const [communitySelectedFilters, setCommunitySelectedFilters] = useState<Record<string, string[]>>({
    language: ["english"],
  })
  const [communitySortBy, setCommunitySortBy] = useState<SortOption>("relevance")
  const [communityCurrentPage, setCommunityCurrentPage] = useState(1)
  const [communityItemsPerPage] = useState(20)

  // Wolken Full Search state
  const [wolkenSearchQuery, setWolkenSearchQuery] = useState("database")
  const [wolkenActiveTab, setWolkenActiveTab] = useState<WolkenTabType>("all")
  const [wolkenSelectedFilters, setWolkenSelectedFilters] = useState<Record<string, string[]>>({
    language: ["english"],
  })
  const [wolkenSortBy, setWolkenSortBy] = useState<SortOption>("relevance")
  const [wolkenCurrentPage, setWolkenCurrentPage] = useState(1)
  const [wolkenItemsPerPage] = useState(20)

  // Filter handlers
  const handleFilterChange = (groupId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const current = prev[groupId] || []
      const updated = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId]
      return { ...prev, [groupId]: updated }
    })
  }

  const handleAemFilterChange = (groupId: string, optionId: string) => {
    setAemSelectedFilters((prev) => {
      const current = prev[groupId] || []
      const updated = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId]
      return { ...prev, [groupId]: updated }
    })
  }

  const handleCommunityFilterChange = (groupId: string, optionId: string) => {
    setCommunitySelectedFilters((prev) => {
      const current = prev[groupId] || []
      const updated = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId]
      return { ...prev, [groupId]: updated }
    })
  }

  const handleWolkenFilterChange = (groupId: string, optionId: string) => {
    setWolkenSelectedFilters((prev) => {
      const current = prev[groupId] || []
      const updated = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId]
      return { ...prev, [groupId]: updated }
    })
  }

  // Map tab IDs to content types
  const tabToTypeMap: Record<string, string> = {
    "support-articles": "support-article",
    "security-alerts": "security-alert",
    "documentation": "documentation",
    "community": "community",
    "blogs": "blog",
    "videos": "video",
    "cases": "case",
    "internal-articles": "internal-article",
    "prod-docs": "prod-doc",
    "jira": "jira",
    "confluence": "confluence",
  }

  // Filter results
  const filteredResults = useMemo(() => {
    return mockSearchResults.filter((item) => {
      if (activeTab !== "all") {
        const expectedType = tabToTypeMap[activeTab]
        if (expectedType && item.type !== expectedType) return false
      }
      if (selectedFilters.type?.length > 0 && !selectedFilters.type.includes(item.type)) return false
      return true
    })
  }, [activeTab, selectedFilters])

  const filteredAemResults = useMemo(() => {
    return mockSearchResults.filter((item) => {
      if (aemActiveTab !== "all") {
        const expectedType = tabToTypeMap[aemActiveTab]
        if (expectedType && item.type !== expectedType) return false
      }
      if (aemSelectedFilters.type?.length > 0 && !aemSelectedFilters.type.includes(item.type)) return false
      return true
    })
  }, [aemActiveTab, aemSelectedFilters])

  const filteredCommunityResults = useMemo(() => {
    return mockSearchResults.filter((item) => {
      if (communityActiveTab !== "all") {
        const expectedType = tabToTypeMap[communityActiveTab]
        if (expectedType && item.type !== expectedType) return false
      }
      if (communitySelectedFilters.type?.length > 0 && !communitySelectedFilters.type.includes(item.type))
        return false
      return true
    })
  }, [communityActiveTab, communitySelectedFilters])

  const filteredWolkenResults = useMemo(() => {
    return mockSearchResults.filter((item) => {
      if (wolkenActiveTab !== "all") {
        const expectedType = tabToTypeMap[wolkenActiveTab]
        if (expectedType && item.type !== expectedType) return false
      }
      if (wolkenSelectedFilters.type?.length > 0 && !wolkenSelectedFilters.type.includes(item.type)) return false
      return true
    })
  }, [wolkenActiveTab, wolkenSelectedFilters])

  // Sort results
  const sortedResults = useMemo(() => {
    return [...filteredResults].sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })
  }, [filteredResults, sortBy])

  const sortedAemResults = useMemo(() => {
    return [...filteredAemResults].sort((a, b) => {
      if (aemSortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })
  }, [filteredAemResults, aemSortBy])

  const sortedCommunityResults = useMemo(() => {
    return [...filteredCommunityResults].sort((a, b) => {
      if (communitySortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })
  }, [filteredCommunityResults, communitySortBy])

  const sortedWolkenResults = useMemo(() => {
    return [...filteredWolkenResults].sort((a, b) => {
      if (wolkenSortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })
  }, [filteredWolkenResults, wolkenSortBy])

  // Paginate results
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedResults.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedResults, currentPage, itemsPerPage])

  const paginatedAemResults = useMemo(() => {
    const startIndex = (aemCurrentPage - 1) * aemItemsPerPage
    return sortedAemResults.slice(startIndex, startIndex + aemItemsPerPage)
  }, [sortedAemResults, aemCurrentPage, aemItemsPerPage])

  const paginatedCommunityResults = useMemo(() => {
    const startIndex = (communityCurrentPage - 1) * communityItemsPerPage
    return sortedCommunityResults.slice(startIndex, startIndex + communityItemsPerPage)
  }, [sortedCommunityResults, communityCurrentPage, communityItemsPerPage])

  const paginatedWolkenResults = useMemo(() => {
    const startIndex = (wolkenCurrentPage - 1) * wolkenItemsPerPage
    return sortedWolkenResults.slice(startIndex, startIndex + wolkenItemsPerPage)
  }, [sortedWolkenResults, wolkenCurrentPage, wolkenItemsPerPage])

  const handleFeedback = (positive: boolean) => {
    console.log("[v0] AI Summary feedback:", positive ? "positive" : "negative")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchViewsHeader activeView={mainView} onViewChange={handleViewChange} />

      {/* Wolken Support Site */}
      {mainView === "wolken-support" && (
        <div className="bg-background">
          {!wolkenSupportSearchActive ? (
            <>
              <AEMLandingPage />
              <button
                onClick={() => setWolkenSupportSearchActive(true)}
                className="fixed bottom-8 right-8 z-10 p-4 bg-primary rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
                title="Search Support"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </>
          ) : (
            <div className="bg-background">
              {/* Hero Search Section */}
              <div className="bg-gradient-to-br from-primary/5 via-accent/30 to-background border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                  <div className="max-w-3xl mx-auto">
                    <div className="mt-3">
                      <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSearch={() => console.log("[v0] Search:", searchQuery)}
                        placeholder="Search Arctera™ Insight Management Console Help..."
                        compact
                      />
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-1 text-xs sm:text-sm text-muted-foreground">
                      <span>Powered by</span>
                      <img src="/kore-ai-logo.svg" alt="Kore.ai" className="h-6" />
                      <button
                        onClick={() => setWolkenSupportSearchActive(false)}
                        className="ml-4 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                      >
                        ← Back to Support Site
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b">
                <div className="max-w-7xl mx-auto px-4">
                  <SearchTabs
                    tabs={supportSiteTabs}
                    activeTab={activeTab}
                    onTabChange={(tab) => {
                      setActiveTab(tab)
                      setCurrentPage(1)
                    }}
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-6">
                  <aside className="w-64 flex-shrink-0">
                    <FiltersSidebar
                      filters={filterGroups}
                      selectedFilters={selectedFilters}
                      onFilterChange={handleFilterChange}
                    />
                  </aside>

                  <div className="flex-1 min-w-0">
                    <div className="mb-6">
                      <AISummary
                        summary="Search results from Wolken Support documentation. Find guides, tutorials, troubleshooting tips, and best practices."
                        sources={[
                          { title: "Support Documentation", url: "#" },
                          { title: "Knowledge Base", url: "#" },
                        ]}
                        onFeedback={handleFeedback}
                      />
                    </div>

                    {activeTab === "all" ? (
                      <ResourceSections
                        results={sortedResults}
                        onViewAll={(type) => {
                          setActiveTab(type as SupportSiteTabType)
                          setCurrentPage(1)
                        }}
                      />
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-muted-foreground">
                            {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, sortedResults.length)} of {sortedResults.length}
                          </div>
                          <SortDropdown value={sortBy} onChange={setSortBy} resultCount={sortedResults?.length ?? 0} />
                        </div>

                        {activeTab === "videos" ? (
                          <div className="mb-6">
                            <VideoGrid videos={paginatedResults} />
                          </div>
                        ) : (
                          <div className="space-y-4 mb-6">
                            {paginatedResults.map((result) => (
                              <SearchResult
                                key={result.id}
                                item={result}
                                searchQuery={searchQuery}
                                onQuickView={setQuickViewItem}
                              />
                            ))}
                          </div>
                        )}

                        {sortedResults.length > itemsPerPage && (
                          <div className="flex justify-center">
                            <Pagination
                              currentPage={currentPage}
                              totalItems={sortedResults.length}
                              itemsPerPage={itemsPerPage}
                              onPageChange={setCurrentPage}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AEM Site */}
      {mainView === "aem-site" && (
        <div className="bg-background">
        {/* Hero Search Section */}
        <div className="bg-gradient-to-br from-primary/5 via-accent/30 to-background border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-base font-semibold text-foreground">
                AEM Site Search
              </h1>
      
              <div className="mt-2">
                <SearchBar
                  value={aemSearchQuery}
                  onChange={setAemSearchQuery}
                  onSearch={() =>
                    console.log("[v0] AEM Search:", aemSearchQuery)
                  }
                  placeholder="Search AEM content..."
                  compact
                />
              </div>
      
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>Powered by</span>
                <img
                  src="/kore-ai-logo.svg"
                  alt="Kore.ai"
                  className="h-5"
                />
              </div>
            </div>
          </div>
        </div>
      
        {/* Tabs */}
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4">
            <SearchTabs
              tabs={supportSiteTabs}
              activeTab={aemActiveTab}
              onTabChange={(tab) => {
                setAemActiveTab(tab);
                setAemCurrentPage(1);
              }}
            />
          </div>
        </div>
      
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            <aside className="w-64 flex-shrink-0">
              <FiltersSidebar
                filters={filterGroups}
                selectedFilters={aemSelectedFilters}
                onFilterChange={handleAemFilterChange}
              />
            </aside>
      
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <AISummary
                  summary="Search results from AEM content repository. Find documentation, tutorials, and resources about Adobe Experience Manager and related technologies."
                  sources={[
                    { title: "AEM Documentation", url: "#" },
                    { title: "Developer Guide", url: "#" },
                  ]}
                  onFeedback={handleFeedback}
                />
              </div>
      
              {aemActiveTab === "all" ? (
                <ResourceSections
                  results={sortedAemResults}
                  onViewAll={(type) => {
                    setAemActiveTab(type as SupportSiteTabType);
                    setAemCurrentPage(1);
                  }}
                />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-muted-foreground">
                      {((aemCurrentPage - 1) * aemItemsPerPage) + 1}-
                      {Math.min(
                        aemCurrentPage * aemItemsPerPage,
                        sortedAemResults.length
                      )}{" "}
                      of {sortedAemResults.length}
                    </div>
      
                    <SortDropdown
                      value={aemSortBy}
                      onChange={setAemSortBy}
                      resultCount={sortedAemResults?.length ?? 0}
                    />
                  </div>
      
                  {aemActiveTab === "videos" ? (
                    <div className="mb-6">
                      <VideoGrid videos={paginatedAemResults} />
                    </div>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {paginatedAemResults.map((result) => (
                        <SearchResult
                          key={result.id}
                          item={result}
                          searchQuery={aemSearchQuery}
                          onQuickView={setQuickViewItem}
                        />
                      ))}
                    </div>
                  )}
      
                  {sortedAemResults.length > aemItemsPerPage && (
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={aemCurrentPage}
                        totalItems={sortedAemResults.length}
                        itemsPerPage={aemItemsPerPage}
                        onPageChange={setAemCurrentPage}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>      
      )}

      {/* Community/Invision */}
      {mainView === "community-invision" && (
        <div className="bg-background">
        {/* Hero Search Section */}
        <div className="bg-gradient-to-br from-primary/5 via-accent/30 to-background border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-base font-semibold text-foreground">
                Community Search
              </h1>
      
              <div className="mt-2">
                <SearchBar
                  value={communitySearchQuery}
                  onChange={setCommunitySearchQuery}
                  onSearch={() =>
                    console.log("[v0] Community Search:", communitySearchQuery)
                  }
                  placeholder="Search community discussions..."
                  compact
                />
              </div>
      
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>Powered by</span>
                <img
                  src="/kore-ai-logo.svg"
                  alt="Kore.ai"
                  className="h-5"
                />
              </div>
            </div>
          </div>
        </div>
      
        {/* Tabs */}
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4">
            <SearchTabs
              tabs={supportSiteTabs}
              activeTab={communityActiveTab}
              onTabChange={(tab) => {
                setCommunityActiveTab(tab);
                setCommunityCurrentPage(1);
              }}
            />
          </div>
        </div>
      
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Left Sidebar - Filters */}
            <aside className="w-64 flex-shrink-0">
              <FiltersSidebar
                filters={filterGroups}
                selectedFilters={communitySelectedFilters}
                onFilterChange={(groupId, value) => {
                  setCommunitySelectedFilters((prev) => {
                    const current = prev[groupId] || [];
                    const updated = current.includes(value)
                      ? current.filter((v) => v !== value)
                      : [...current, value];
                    return { ...prev, [groupId]: updated };
                  });
                  setCommunityCurrentPage(1);
                }}
              />
            </aside>
      
            {/* Results Section */}
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <AISummary
                  summary="Search results from community forums and discussions. Connect with other users, share insights, and find solutions to common questions."
                  sources={[
                    { title: "Community Guidelines", url: "#" },
                    { title: "Popular Discussions", url: "#" },
                  ]}
                  onFeedback={handleFeedback}
                />
              </div>
      
              {communityActiveTab === "all" ? (
                <ResourceSections
                  results={sortedCommunityResults}
                  onViewAll={(type) => {
                    setCommunityActiveTab(type as SupportSiteTabType);
                    setCommunityCurrentPage(1);
                  }}
                />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-muted-foreground">
                      {((communityCurrentPage - 1) * communityItemsPerPage) + 1}-
                      {Math.min(
                        communityCurrentPage * communityItemsPerPage,
                        sortedCommunityResults.length
                      )}{" "}
                      of {sortedCommunityResults.length}
                    </div>
      
                    <SortDropdown
                      value={communitySortBy}
                      onChange={setCommunitySortBy}
                      resultCount={sortedCommunityResults?.length ?? 0}
                    />
                  </div>
      
                  {communityActiveTab === "videos" ? (
                    <div className="mb-6">
                      <VideoGrid videos={paginatedCommunityResults} />
                    </div>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {paginatedCommunityResults.map((result) => (
                        <SearchResult
                          key={result.id}
                          item={result}
                          searchQuery={communitySearchQuery}
                          onQuickView={setQuickViewItem}
                        />
                      ))}
                    </div>
                  )}
      
                  {sortedCommunityResults.length > communityItemsPerPage && (
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={communityCurrentPage}
                        totalItems={sortedCommunityResults.length}
                        itemsPerPage={communityItemsPerPage}
                        onPageChange={setCommunityCurrentPage}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>      
      )}

      {/* Wolken Full Search */}
      {mainView === "wolken-full" && (
        <div className="bg-background">
        {/* Hero Search Section */}
        <div className="bg-gradient-to-br from-primary/5 via-accent/30 to-background border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="max-w-3xl mx-auto text-center">
              <h4 className="text-base font-semibold text-foreground">
                Search All Resources
              </h4>
      
              <div className="mt-2">
                <SearchBar
                  value={wolkenSearchQuery}
                  onChange={setWolkenSearchQuery}
                  onSearch={() =>
                    console.log("[v0] Wolken Search:", wolkenSearchQuery)
                  }
                  placeholder="Search across all resources..."
                  compact
                />
              </div>
      
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>Powered by</span>
                <img
                  src="/kore-ai-logo.svg"
                  alt="Kore.ai"
                  className="h-5"
                />
              </div>
            </div>
          </div>
        </div>
      
        {/* Tabs */}
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4">
            <SearchTabs
              tabs={wolkenTabs}
              activeTab={wolkenActiveTab}
              onTabChange={(tab) => {
                setWolkenActiveTab(tab);
                setWolkenCurrentPage(1);
              }}
            />
          </div>
        </div>
      
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Left Sidebar - Filters */}
            <aside className="w-64 flex-shrink-0">
              <FiltersSidebar
                filters={filterGroups}
                selectedFilters={wolkenSelectedFilters}
                onFilterChange={(groupId, value) => {
                  setWolkenSelectedFilters((prev) => {
                    const current = prev[groupId] || [];
                    const updated = current.includes(value)
                      ? current.filter((v) => v !== value)
                      : [...current, value];
                    return { ...prev, [groupId]: updated };
                  });
                }}
              />
            </aside>
      
            {/* Results Section */}
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <AISummary
                  summary="Search results from all available resources including cases, support articles, internal articles, prod docs, Jira, Confluence, community discussions, and blogs."
                  sources={[
                    { title: "All Documentation", url: "#" },
                    { title: "Support Resources", url: "#" },
                    { title: "Community Forums", url: "#" },
                  ]}
                  onFeedback={handleFeedback}
                />
              </div>
      
              {wolkenActiveTab === "all" ? (
                <ResourceSections
                  results={sortedWolkenResults}
                  onViewAll={(type) => {
                    setWolkenActiveTab(type as SupportSiteTabType);
                    setWolkenCurrentPage(1);
                  }}
                />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-muted-foreground">
                      {((wolkenCurrentPage - 1) * wolkenItemsPerPage) + 1}-
                      {Math.min(
                        wolkenCurrentPage * wolkenItemsPerPage,
                        sortedWolkenResults.length
                      )}{" "}
                      of {sortedWolkenResults.length}
                    </div>
                    <SortDropdown
                      value={wolkenSortBy}
                      onChange={setWolkenSortBy}
                      resultCount={sortedWolkenResults?.length ?? 0}
                    />
                  </div>
      
                  {wolkenActiveTab === "videos" ? (
                    <div className="mb-6">
                      <VideoGrid videos={paginatedWolkenResults} />
                    </div>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {paginatedWolkenResults.map((result) => (
                        <SearchResult
                          key={result.id}
                          item={result}
                          searchQuery={wolkenSearchQuery}
                          onQuickView={setQuickViewItem}
                        />
                      ))}
                    </div>
                  )}
      
                  {sortedWolkenResults.length > wolkenItemsPerPage && (
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={wolkenCurrentPage}
                        totalItems={sortedWolkenResults.length}
                        itemsPerPage={wolkenItemsPerPage}
                        onPageChange={setWolkenCurrentPage}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>      
      )}

      {/* Wolken Agent Panel */}
      {mainView === "wolken-agent" && <WolkenAgentPanel />}

      {/* Quick View Modal */}
      {quickViewItem && <QuickViewModal item={quickViewItem} onClose={() => setQuickViewItem(null)} />}
    </div>
  )
}
