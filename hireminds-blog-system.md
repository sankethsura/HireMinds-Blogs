# HireMinds.in — Blog & Content Hub: Design System & Structure

> Feed this document to Claude Code to scaffold the full Blog/Content section of HireMinds.in.

---

## 1. Overview

HireMinds.in is an AI-powered hiring platform. The Content Hub serves as its thought leadership engine — publishing **Blogs**, **Case Studies**, **Testimonials**, **Guides**, and **News** to attract recruiters, HR teams, and job-seekers via SEO and brand trust.

**Tech Stack Assumptions**
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS
- CMS: MDX files OR a headless CMS (Contentful / Sanity — keep it swappable)
- Fonts: `Bricolage Grotesque` (headings) + `DM Sans` (body) via Google Fonts
- Icons: Lucide React
- Animations: Framer Motion

---

## 2. Design System

### 2.1 Color Palette

```css
/* globals.css */
:root {
  --brand-primary:   #1A56DB;   /* Electric Blue — CTAs, links, accents */
  --brand-secondary: #0E1726;   /* Deep Navy — hero backgrounds, dark sections */
  --brand-accent:    #38BDF8;   /* Sky Cyan — highlights, tags */
  --brand-warm:      #F59E0B;   /* Amber — Case Study badge, featured pill */

  --surface-0:  #FFFFFF;
  --surface-1:  #F8FAFC;        /* Light page background */
  --surface-2:  #EFF6FF;        /* Card hover tint */
  --surface-dark: #0E1726;

  --text-primary:   #0F172A;
  --text-secondary: #475569;
  --text-muted:     #94A3B8;
  --text-inverse:   #F1F5F9;

  --border-light: #E2E8F0;
  --border-focus: #1A56DB;

  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --radius-xl:  32px;
}
```

### 2.2 Typography Scale

| Token         | Size      | Weight | Usage                        |
|---------------|-----------|--------|------------------------------|
| `display-xl`  | 56px      | 800    | Hero headline                |
| `display-lg`  | 40px      | 700    | Section headings             |
| `heading-md`  | 28px      | 700    | Article title on card        |
| `heading-sm`  | 22px      | 600    | Sub-section headings         |
| `body-lg`     | 18px      | 400    | Article body                 |
| `body-md`     | 16px      | 400    | Default body, descriptions   |
| `label`       | 13px      | 600    | Tags, badges, metadata       |
| `caption`     | 12px      | 400    | Read time, timestamps        |

### 2.3 Post Type Badges

Each content type gets a distinct color badge for scannability.

| Post Type       | Badge Color         | Icon          |
|-----------------|---------------------|---------------|
| Blog            | `#1A56DB` (Blue)    | `BookOpen`    |
| Case Study      | `#F59E0B` (Amber)   | `BarChart2`   |
| Testimonial     | `#10B981` (Emerald) | `Star`        |
| Guide / How-To  | `#8B5CF6` (Violet)  | `Map`         |
| News & Updates  | `#EF4444` (Red)     | `Newspaper`   |
| Podcast         | `#EC4899` (Pink)    | `Mic`         |

### 2.4 Component Tokens

```css
/* Shadows */
--shadow-card:   0 2px 12px rgba(15,23,42,0.08);
--shadow-hover:  0 8px 32px rgba(26,86,219,0.15);
--shadow-hero:   0 24px 64px rgba(15,23,42,0.24);

/* Transitions */
--transition-fast:   150ms ease;
--transition-base:   250ms ease;
--transition-slow:   400ms cubic-bezier(0.22, 1, 0.36, 1);
```

---

## 3. Routing Structure

```
/blog                          → Content Hub listing page
/blog/[slug]                   → Individual post page
/blog/category/[category]      → Category filtered listing
/blog/tag/[tag]                → Tag filtered listing
/blog/author/[authorSlug]      → Author profile + posts
```

Post types are NOT separate routes — they all live under `/blog/*` but are visually differentiated by type badges and filterable via the tab/filter bar.

---

## 4. Content Schema (MDX / CMS)

Every post — regardless of type — shares this frontmatter schema:

```yaml
---
# REQUIRED
title: "How AI Reduced Our Time-to-Hire by 60%"
slug: "ai-reduced-time-to-hire"
type: blog           # blog | case-study | testimonial | guide | news | podcast
publishedAt: "2025-04-18"
excerpt: "A short 1–2 sentence summary shown in cards and meta tags."

# AUTHOR
author:
  name: "Priya Menon"
  role: "Head of Talent, TechCorp"
  avatar: "/authors/priya-menon.jpg"    # or CMS asset URL
  slug: "priya-menon"

# MEDIA
coverImage: "/blog/covers/ai-hire.jpg"
coverAlt: "Recruiter reviewing AI shortlist on laptop"

# CATEGORISATION
category: "AI in Hiring"
tags: ["AI", "Recruitment", "Case Study", "Time-to-Hire"]

# SEO
seoTitle: "AI Hiring Case Study — 60% Faster Recruitment | HireMinds"
seoDescription: "See how TechCorp cut time-to-hire in half using HireMinds AI screening."

# OPTIONAL EXTRAS
featured: true                  # pin to top of listing
readingTime: 6                  # minutes (auto-calc if omitted)
company: "TechCorp India"       # for case studies & testimonials
companyLogo: "/logos/techcorp.svg"
industry: "SaaS"
result:                         # for case studies (key metrics)
  - label: "Faster Hiring"
    value: "60%"
  - label: "Cost Saved"
    value: "₹4.2L/quarter"
rating: 5                       # for testimonials (1–5)
videoUrl: ""                    # optional video embed
podcastUrl: ""                  # for podcast type
---
```

---

## 5. Page Sections

### 5.1 Global Navbar

**File:** `components/layout/Navbar.tsx`

**Behaviour:**
- Sticky on scroll, background transitions from `transparent` → `white/blur` after 80px scroll
- Active link underline with `--brand-primary`
- Mobile: Hamburger menu → full-screen slide-in drawer

**Structure:**
```
[Logo: HireMinds]                    [Nav Links]              [CTA Button]
                     Home | Features | Blog | Pricing | About    Get Started →
```

**Blog nav link** should be highlighted / marked "New" with a small badge if there are posts in the last 7 days.

**Props / Config:**
```tsx
// nav.config.ts
export const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Features", href: "/features" },
  { label: "Blog",     href: "/blog" },       // active on /blog/*
  { label: "Pricing",  href: "/pricing" },
  { label: "About",    href: "/about" },
];
```

---

### 5.2 Global Footer

**File:** `components/layout/Footer.tsx`

**Layout:** 4-column grid on desktop, stacked on mobile

```
Col 1 — Brand
  Logo + tagline
  Social links (LinkedIn, Twitter/X, YouTube)
  © 2025 HireMinds.in

Col 2 — Product
  Features
  Pricing
  Integrations
  Changelog

Col 3 — Resources
  Blog
  Case Studies
  Guides
  FAQs

Col 4 — Company
  About Us
  Careers
  Contact
  Privacy Policy
  Terms of Service
```

Bottom strip: Cookie consent / GDPR notice (minimal, non-intrusive).

---

### 5.3 Blog Listing Page (`/blog`)

#### 5.3.1 Hero Section

```
Background: dark navy gradient (--brand-secondary) with subtle grid pattern
Headline: "Insights, Stories & Playbooks"
Subtext: "Hiring strategies, AI breakdowns, real case studies — everything recruiters need to stay ahead."
Search bar: Full-width rounded input with icon — "Search articles..."
```

#### 5.3.2 Type Filter Tabs

Horizontal scrollable tab bar below hero:

```
[All] [Blog] [Case Studies] [Guides] [Testimonials] [News] [Podcast]
```

- Active tab: `--brand-primary` background, white text
- Inactive: `--surface-1`, `--text-secondary`
- Each tab shows count badge: e.g. `Blog (24)`
- On mobile: horizontally scrollable (no wrap)

#### 5.3.3 Featured / Hero Post

Large card spanning full width — only shown when `featured: true` is set on the latest post.

```
┌─────────────────────────────────────────────────────────────┐
│  [Cover Image — right 40%]     │  Badge: CASE STUDY         │
│                                │  Title (display-lg)        │
│                                │  Excerpt                   │
│                                │  Author + Date + Read Time │
│                                │  [Read Article →]          │
└─────────────────────────────────────────────────────────────┘
```

#### 5.3.4 Post Grid

3-column grid (desktop) → 2-col (tablet) → 1-col (mobile)

Each **Post Card** contains:
- Cover image (16:9, object-cover)
- Type badge (top-left overlay on image)
- Category pill
- Title (2-line clamp)
- Excerpt (3-line clamp)
- Author avatar + name
- Date · Read time
- Hover: card lifts with `--shadow-hover`, image subtle zoom

#### 5.3.5 Sidebar (optional, desktop only)

```
- Newsletter signup widget
- Popular tags cloud
- "Featured Case Study" mini card
- Social follow buttons
```

#### 5.3.6 Pagination / Load More

- Default: Show 9 posts
- "Load More" button → append next 9 (or use page-based `/blog?page=2`)
- URL reflects current page for SEO

---

### 5.4 Individual Post Page (`/blog/[slug]`)

#### Layout

```
Full-width hero (cover image) with gradient overlay
  └── Breadcrumb: Home > Blog > Category
  └── Type Badge | Category
  └── Title (display-xl)
  └── Author Card inline + Date + Read Time + Share icons

Body: 2-column (article 65% + sidebar 30%) on desktop, single col mobile
  Left: MDX Article Content
  Right: Sticky Sidebar
```

#### Article Content Sections (in order)

1. **Article Header** — already in hero above
2. **Key Takeaways Box** — optional, shown if frontmatter has `keyTakeaways: []`
3. **Body Content** — MDX rendered with custom components
4. **Results Block** — for Case Studies: big number stat cards
5. **Quote / Testimonial Block** — pull quote with brand styling
6. **Author Bio Card** — avatar, name, role, short bio, social links
7. **Tags Row** — clickable tags
8. **Share Bar** — LinkedIn, Twitter, Copy Link
9. **Related Posts** — 3 cards (same category or tags)
10. **CTA Banner** — "Try HireMinds Free" → links to signup

#### Sticky Sidebar Contents

```
- Table of Contents (auto-generated from H2/H3)
- Newsletter mini-signup
- "Book a Demo" CTA card
- Popular Posts list
```

#### MDX Custom Components

Define these as custom MDX components:

```tsx
// components/mdx/
- Callout.tsx       // Info / Warning / Tip boxes
- StatCard.tsx      // Big metric display (for case studies)
- QuoteBlock.tsx    // Styled pull quote
- CompanyCard.tsx   // Company logo + info (case studies)
- VideoEmbed.tsx    // YouTube/Loom embed
- PodcastPlayer.tsx // Audio embed for podcasts
- AuthorCard.tsx    // Inline author card
- TableOfContents.tsx
- CodeBlock.tsx     // Syntax highlighted code
```

---

### 5.5 Case Study Specific Layout

When `type: case-study`, the post page gets additional sections:

**At the top (before body):**
```
┌─────────────────────────────────────────────────────────────┐
│  Company Logo   |  Industry: SaaS  |  Company: TechCorp     │
├─────────────────────────────────────────────────────────────┤
│   📊 60% Faster   |   💰 ₹4.2L Saved   |   ⏱ 3 Weeks      │
└─────────────────────────────────────────────────────────────┘
```

**Body structure for case studies:**
1. The Challenge
2. The Solution (HireMinds features used)
3. Implementation Timeline
4. Results & Metrics
5. What They Said (quote)
6. Next Steps / CTA

---

### 5.6 Testimonial Specific Layout

When `type: testimonial`:
- Star rating displayed prominently
- Large pull quote as the main content
- Company logo + person's photo side by side
- CTA: "See how we helped [Company] →" links to related case study

---

### 5.7 Author Profile Page (`/blog/author/[slug]`)

```
Hero: Avatar (large) | Name | Role | Bio | Social links
Stats: X Articles Published | Y Total Reads
Grid: All posts by this author (same post card component)
```

---

### 5.8 Category / Tag Pages

**`/blog/category/[category]`**
- Reuses the same listing layout
- Hero adapted: "Articles in: AI in Hiring"
- No featured post override — just the grid

**`/blog/tag/[tag]`**
- Same as category page
- Tag displayed as breadcrumb

---

## 6. SEO & Meta

Every post page must implement:

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  return {
    title: post.seoTitle || post.title + " | HireMinds Blog",
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: `https://hireminds.in/blog/${post.slug}`,
    },
  };
}
```

Also implement:
- `sitemap.xml` — auto-generated from all post slugs
- `robots.txt` — allow all blog pages
- JSON-LD structured data (Article schema) on each post page

---

## 7. Component File Structure

```
src/
├── app/
│   └── blog/
│       ├── page.tsx                     # /blog listing
│       ├── [slug]/
│       │   └── page.tsx                 # /blog/[slug]
│       ├── category/
│       │   └── [category]/page.tsx
│       ├── tag/
│       │   └── [tag]/page.tsx
│       └── author/
│           └── [slug]/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── blog/
│   │   ├── PostCard.tsx                 # Reusable post card
│   │   ├── FeaturedPost.tsx             # Hero featured post card
│   │   ├── PostGrid.tsx                 # Grid wrapper with loading
│   │   ├── FilterTabs.tsx               # Type filter tabs
│   │   ├── SearchBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── Sidebar.tsx
│   │   ├── AuthorCard.tsx
│   │   ├── RelatedPosts.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── TagCloud.tsx
│   │   ├── NewsletterWidget.tsx
│   │   └── CTABanner.tsx
│   └── mdx/
│       ├── Callout.tsx
│       ├── StatCard.tsx
│       ├── QuoteBlock.tsx
│       ├── CompanyCard.tsx
│       ├── VideoEmbed.tsx
│       ├── PodcastPlayer.tsx
│       ├── TableOfContents.tsx
│       └── CodeBlock.tsx
│
├── content/
│   └── blog/
│       ├── ai-hiring-guide.mdx
│       └── techcorp-case-study.mdx
│
├── lib/
│   ├── posts.ts                         # getAllPosts, getPostBySlug, getPostsByType
│   ├── mdx.ts                           # MDX compilation
│   └── seo.ts                           # generateMetadata helpers
│
└── types/
    └── post.ts                          # Post, Author, PostType types
```

---

## 8. Data Utilities (`lib/posts.ts`)

```ts
export type PostType = "blog" | "case-study" | "testimonial" | "guide" | "news" | "podcast";

export interface Author {
  name: string;
  role: string;
  avatar: string;
  slug: string;
  bio?: string;
}

export interface Post {
  slug: string;
  title: string;
  type: PostType;
  publishedAt: string;
  excerpt: string;
  author: Author;
  coverImage: string;
  coverAlt: string;
  category: string;
  tags: string[];
  featured?: boolean;
  readingTime?: number;
  content: string; // compiled MDX
  // case-study specific
  company?: string;
  companyLogo?: string;
  industry?: string;
  result?: { label: string; value: string }[];
  // testimonial specific
  rating?: number;
}

// Key functions to implement:
export async function getAllPosts(): Promise<Post[]>
export async function getPostBySlug(slug: string): Promise<Post>
export async function getPostsByType(type: PostType): Promise<Post[]>
export async function getPostsByCategory(category: string): Promise<Post[]>
export async function getPostsByTag(tag: string): Promise<Post[]>
export async function getFeaturedPost(): Promise<Post | null>
export async function getRelatedPosts(post: Post, limit?: number): Promise<Post[]>
export async function getAllCategories(): Promise<string[]>
export async function getAllTags(): Promise<string[]>
export async function getAllAuthors(): Promise<Author[]>
```

---

## 9. Key UI Interactions

| Interaction | Behaviour |
|---|---|
| Filter tab click | Smooth fade-in of filtered cards (Framer Motion `AnimatePresence`) |
| Post card hover | Lift shadow + image scale 1.03 + title color change |
| Search | Debounced (300ms), filters posts client-side (or API route for large datasets) |
| Table of Contents | Highlights active section on scroll (Intersection Observer) |
| Share buttons | LinkedIn / Twitter open in popup; Copy Link shows toast |
| Newsletter form | Inline success state, no page reload |
| Load More | Appends posts with fade-in animation |
| Navbar scroll | Background blur/white transition after 80px |

---

## 10. Newsletter Integration

Connect to Resend, Mailchimp, or ConvertKit via API route:

```
POST /api/newsletter/subscribe
Body: { email: string, source: "blog-sidebar" | "post-cta" | "footer" }
```

Show success/error states inline. No redirect.

---

## 11. Analytics Events (Mixpanel / PostHog / GA4)

Track these events:

```ts
blog_post_viewed       // { slug, type, category, author }
blog_filter_changed    // { filter: PostType }
blog_searched          // { query }
blog_post_shared       // { slug, platform: "linkedin" | "twitter" | "copy" }
blog_newsletter_signup // { source }
blog_cta_clicked       // { slug, cta: "demo" | "signup" }
```

---

## 12. Performance Checklist

- [ ] All post listing pages use Next.js `generateStaticParams` (SSG)
- [ ] Cover images use `next/image` with `priority` on above-fold images
- [ ] MDX compiled at build time, not runtime
- [ ] Sidebar and related posts lazy-loaded
- [ ] Font: `display: swap` to avoid FOIT
- [ ] OG images auto-generated using `@vercel/og` or `next/og`
- [ ] Reading progress bar on post pages (lightweight JS)

---

## 13. Sample Mock Posts (Seed Data)

Create these 5 starter posts in `content/blog/`:

| File | Type | Title |
|---|---|---|
| `ai-screening-guide.mdx` | guide | "The Complete Guide to AI-Powered Candidate Screening" |
| `techcorp-case-study.mdx` | case-study | "How TechCorp Cut Time-to-Hire by 60% with HireMinds" |
| `hr-lead-testimonial.mdx` | testimonial | "HireMinds Changed How We Think About Shortlisting" |
| `future-of-hiring-2025.mdx` | blog | "5 Hiring Trends That Will Define 2025" |
| `resume-parsing-update.mdx` | news | "HireMinds Now Supports 12 Regional Language Resumes" |

---

*End of HireMinds Blog & Content Hub Design Spec*
*Version 1.0 — Generated for Claude Code scaffolding*
