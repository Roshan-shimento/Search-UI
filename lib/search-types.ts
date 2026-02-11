// Shared types for Arctera Search

export type SupportSiteTabType =
  | "all"
  | "support-articles"
  | "documentation"
  | "community"
  | "blogs"
  | "videos"

export type WolkenTabType =
  | "all"
  | "cases"
  | "support-articles"
  | "internal-articles"
  | "prod-docs"
  | "jira"
  | "confluence"
  | "community"
  | "blogs"

export type ContentType =
  | "support-article"
  | "documentation"
  | "security-alert"
  | "community"
  | "blog"
  | "video"
  | "case"
  | "internal-article"
  | "prod-doc"
  | "jira"
  | "confluence"

export type ArticleType = "how-to" | "problem-solution" | "security-bulletin" | "general"

export interface SearchResultItem {
  id: string
  title: string
  subtitle?: string
  url: string
  product?: string
  date: string
  summary: string
  type: ContentType
  articleType?: ArticleType
  highlight?: string
  isAttachable?: boolean
  isAttached?: boolean
}

export interface FilterOption {
  id: string
  label: string
  count: number
}

export interface FilterGroup {
  id: string
  label: string
  options: FilterOption[]
  expanded?: boolean
}

export interface SourceLink {
  title: string
  url: string
}

export type SortOption = "relevance" | "latest"

// Icon mapping for content types
export const contentTypeLabels: Record<ContentType, string> = {
  "support-article": "Support Article",
  documentation: "Documentation",
  "security-alert": "Security Alert",
  community: "Community",
  blog: "Blog",
  video: "Video",
  case: "Case",
  "internal-article": "Internal Article",
  "prod-doc": "Product Documentation",
  jira: "Jira",
  confluence: "Confluence",
}
