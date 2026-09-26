import { useEffect } from 'react';
import { ProjectItem, BlogPostItem, ServiceItem, SkillItem, SiteSettings } from '../types';

export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogSiteName?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCreator?: string;
  twitterSite?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleTags?: string[];
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Truncate text cleanly to optimal SEO snippet length (120-160 characters)
 */
function cleanSeoDescription(text: string, maxLength: number = 155): string {
  if (!text) return '';
  // Strip Markdown characters and excessive whitespaces
  const clean = text
    .replace(/[#*`_[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength - 3).trim() + '...';
}

/**
 * Resolve an absolute canonical URL safely
 */
function resolveUrl(pathOrUrl: string, baseUrl?: string): string {
  if (!pathOrUrl) return baseUrl || window.location.origin;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const base = baseUrl || window.location.origin;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Automatically generate meta-tags and OpenGraph data for a Project case study
 */
export function generateProjectMeta(project: ProjectItem, siteSettings: SiteSettings): SeoMetadata {
  const siteUrl = siteSettings.siteUrl || window.location.origin;
  const ownerName = siteSettings.ownerName || 'Sameer Habib';
  const siteName = siteSettings.siteName || `${ownerName} Portfolio`;

  const fallbackTitle = `${project.title} — Case Study & Technical Architecture | ${ownerName}`;
  const title = project.seoTitle?.trim() || fallbackTitle;

  const fallbackDescription =
    project.shortDescription ||
    project.subtitle ||
    `${project.title} architectural case study, technical stack (${project.technologies?.slice(0, 4).join(', ') || 'Laravel, React'}), problem breakdown, and engineering results by ${ownerName}.`;
  const description = cleanSeoDescription(project.seoDescription?.trim() || fallbackDescription);

  const keywords =
    project.seoKeywords && project.seoKeywords.length > 0
      ? project.seoKeywords
      : [
          ...project.technologies,
          project.category,
          'Case Study',
          'Software Architecture',
          'Full Stack Engineering',
          ownerName
        ].filter(Boolean);

  const canonicalUrl = resolveUrl(`/#projects/${project.slug}`, siteUrl);
  const ogImage = project.ogImage || project.thumbnail || siteSettings.ogImage;

  // Schema.org SoftwareSourceCode / CreativeWork
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    headline: title,
    description: description,
    programmingLanguage: project.technologies,
    author: {
      '@type': 'Person',
      name: ownerName,
      url: siteUrl
    },
    publisher: {
      '@type': 'Person',
      name: ownerName,
      url: siteUrl
    },
    url: canonicalUrl,
    image: ogImage ? resolveUrl(ogImage, siteUrl) : undefined,
    codeRepository: project.githubUrl || undefined,
    runtimePlatform: project.category || 'Web Application',
    keywords: keywords.join(', ')
  };

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogType: 'website',
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogImageAlt: `${project.title} Interface & Architecture`,
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterCreator: '@sameerhabib',
    author: ownerName,
    jsonLd
  };
}

/**
 * Automatically generate meta-tags and OpenGraph data for a Blog Post
 */
export function generateBlogPostMeta(post: BlogPostItem, siteSettings: SiteSettings): SeoMetadata {
  const siteUrl = siteSettings.siteUrl || window.location.origin;
  const ownerName = siteSettings.ownerName || 'Sameer Habib';
  const siteName = siteSettings.siteName || `${ownerName} Portfolio`;

  const fallbackTitle = `${post.title} | ${ownerName} Technical Blog`;
  const title = post.seoTitle?.trim() || fallbackTitle;

  const fallbackDescription =
    post.quickAnswer ||
    post.excerpt ||
    `${post.title} — in-depth technical analysis, design patterns, and engineering insights by ${post.authorName || ownerName}.`;
  const description = cleanSeoDescription(post.seoDescription?.trim() || fallbackDescription);

  const keywords =
    post.seoKeywords && post.seoKeywords.length > 0
      ? post.seoKeywords
      : [...post.tags, post.category, 'Web Development', 'Software Architecture', 'Tutorial', ownerName].filter(Boolean);

  const canonicalUrl = resolveUrl(`/#blog/${post.slug}`, siteUrl);
  const ogImage = post.coverImage || siteSettings.ogImage;
  const author = post.authorName || ownerName;

  // Schema.org TechArticle / BlogPosting
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: description,
    image: ogImage ? resolveUrl(ogImage, siteUrl) : undefined,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
    author: {
      '@type': 'Person',
      name: author,
      url: siteUrl
    },
    publisher: {
      '@type': 'Person',
      name: ownerName,
      url: siteUrl
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    keywords: keywords.join(', ')
  };

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogType: 'article',
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogImageAlt: post.title,
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterCreator: '@sameerhabib',
    author,
    publishedTime: post.publishedDate,
    modifiedTime: post.updatedDate || post.publishedDate,
    articleTags: post.tags,
    jsonLd
  };
}

/**
 * Generate meta-tags for the Blog Listing / Archive page
 */
export function generateBlogListMeta(siteSettings: SiteSettings): SeoMetadata {
  const siteUrl = siteSettings.siteUrl || window.location.origin;
  const ownerName = siteSettings.ownerName || 'Sameer Habib';
  const siteName = siteSettings.siteName || `${ownerName} Portfolio`;

  const title = `Technical Articles & Engineering Deep Dives | ${ownerName}`;
  const description = cleanSeoDescription(
    `Explore in-depth architectural guides, Laravel backend engineering, React patterns, and full-stack performance solutions written by ${ownerName}.`
  );
  const canonicalUrl = resolveUrl('/#blog', siteUrl);

  return {
    title,
    description,
    keywords: ['Web Development Blog', 'Laravel Architecture', 'React Patterns', 'MySQL Optimization', 'Tech Articles', ownerName],
    canonicalUrl,
    ogType: 'website',
    ogTitle: title,
    ogDescription: description,
    ogImage: siteSettings.ogImage,
    ogImageAlt: 'Technical Articles by Sameer Habib',
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: siteSettings.ogImage,
    author: ownerName
  };
}

/**
 * Generate meta-tags for the Service Detail page
 */
export function generateServiceMeta(service: ServiceItem, siteSettings: SiteSettings): SeoMetadata {
  const siteUrl = siteSettings.siteUrl || window.location.origin;
  const ownerName = siteSettings.ownerName || 'Sameer Habib';
  const siteName = siteSettings.siteName || `${ownerName} Portfolio`;

  const title = service.seoTitle?.trim() || `${service.title} Services | ${ownerName}`;
  const description = cleanSeoDescription(service.seoDescription?.trim() || service.description);
  const canonicalUrl = resolveUrl(`/#services/${service.slug || service.id}`, siteUrl);

  return {
    title,
    description,
    keywords: [...service.technologies, ...service.features, 'Consulting', 'Full Stack Development', ownerName],
    canonicalUrl,
    ogType: 'website',
    ogTitle: title,
    ogDescription: description,
    ogImage: siteSettings.ogImage,
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: siteSettings.ogImage,
    author: ownerName
  };
}

/**
 * Generate meta-tags for the Skill Detail page
 */
export function generateSkillMeta(skill: SkillItem, siteSettings: SiteSettings): SeoMetadata {
  const siteUrl = siteSettings.siteUrl || window.location.origin;
  const ownerName = siteSettings.ownerName || 'Sameer Habib';
  const siteName = siteSettings.siteName || `${ownerName} Portfolio`;

  const title = `${skill.name} Architecture & Engineering Expertise | ${ownerName}`;
  const description = cleanSeoDescription(
    skill.description ||
      `In-depth overview of ${skill.name} technical mastery (${skill.proficiency}%), production experience (${skill.experienceYears}), and system architectures by ${ownerName}.`
  );
  const canonicalUrl = resolveUrl(`/#skills/${skill.slug || skill.id}`, siteUrl);

  return {
    title,
    description,
    keywords: [skill.name, skill.category, 'Skill Expertise', 'Software Engineering', ownerName],
    canonicalUrl,
    ogType: 'website',
    ogTitle: title,
    ogDescription: description,
    ogImage: siteSettings.ogImage,
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: siteSettings.ogImage,
    author: ownerName
  };
}

/**
 * Generate meta-tags for the Home / Landing Page
 */
export function generateHomeMeta(siteSettings: SiteSettings): SeoMetadata {
  const siteUrl = siteSettings.siteUrl || window.location.origin;
  const ownerName = siteSettings.ownerName || 'Sameer Habib';
  const siteName = siteSettings.siteName || `${ownerName} Portfolio`;

  const title = siteSettings.metaTitle || `${ownerName} | Full Stack Developer Portfolio & CMS`;
  const description = cleanSeoDescription(
    siteSettings.metaDescription ||
      `Production-ready personal portfolio platform and CMS for ${ownerName}, Full Stack Developer specializing in Laravel, PHP, React, Next.js, and modern web applications.`
  );
  const canonicalUrl = resolveUrl('/', siteUrl);

  return {
    title,
    description,
    keywords: siteSettings.keywords || [
      'Sameer Habib',
      'Full Stack Developer',
      'Laravel Specialist',
      'PHP Developer',
      'React.js',
      'Next.js',
      'MySQL',
      'REST APIs'
    ],
    canonicalUrl,
    ogType: 'profile',
    ogTitle: title,
    ogDescription: description,
    ogImage: siteSettings.ogImage,
    ogImageAlt: `${ownerName} Full Stack Developer Portfolio`,
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: siteSettings.ogImage,
    twitterCreator: '@sameerhabib',
    author: ownerName
  };
}

/**
 * Helper to update or create a `<meta>` element in `<head>`
 */
function setMetaTag(attribute: 'name' | 'property', key: string, content?: string): void {
  if (typeof document === 'undefined') return;

  const selector = `meta[${attribute}="${key}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;

  if (content !== undefined && content !== null && content !== '') {
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  } else if (element) {
    element.remove();
  }
}

/**
 * Helper to update or create a `<link rel="canonical">` element in `<head>`
 */
function setCanonicalLink(href?: string): void {
  if (typeof document === 'undefined') return;

  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (href) {
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  } else if (link) {
    link.remove();
  }
}

/**
 * Helper to inject or update JSON-LD Structured Data in `<head>`
 */
function setJsonLdScript(data?: Record<string, unknown> | Array<Record<string, unknown>>): void {
  if (typeof document === 'undefined') return;

  const SCRIPT_ID = 'dynamic-seo-jsonld';
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (data) {
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data, null, 2);
  } else if (script) {
    script.remove();
  }
}

/**
 * Imperatively apply all SEO meta tags, OpenGraph properties, Twitter cards, and Schema.org JSON-LD to document.head
 */
export function applySeoMetadata(meta: SeoMetadata): () => void {
  if (typeof document === 'undefined') return () => {};

  // Store previous title for rollback if desired
  const prevTitle = document.title;

  // 1. Page Title
  if (meta.title) {
    document.title = meta.title;
  }

  // 2. Standard Meta Tags
  setMetaTag('name', 'description', meta.description);
  if (meta.keywords && meta.keywords.length > 0) {
    setMetaTag('name', 'keywords', meta.keywords.join(', '));
  }
  if (meta.author) {
    setMetaTag('name', 'author', meta.author);
  }
  setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // 3. Canonical URL
  setCanonicalLink(meta.canonicalUrl);

  // 4. OpenGraph Tags
  setMetaTag('property', 'og:type', meta.ogType || 'website');
  setMetaTag('property', 'og:title', meta.ogTitle || meta.title);
  setMetaTag('property', 'og:description', meta.ogDescription || meta.description);
  setMetaTag('property', 'og:url', meta.canonicalUrl || window.location.href);
  setMetaTag('property', 'og:image', meta.ogImage);
  if (meta.ogImageAlt) {
    setMetaTag('property', 'og:image:alt', meta.ogImageAlt);
  }
  if (meta.ogSiteName) {
    setMetaTag('property', 'og:site_name', meta.ogSiteName);
  }

  // Article-specific OpenGraph tags
  if (meta.ogType === 'article') {
    if (meta.publishedTime) {
      setMetaTag('property', 'article:published_time', meta.publishedTime);
    }
    if (meta.modifiedTime) {
      setMetaTag('property', 'article:modified_time', meta.modifiedTime);
    }
    if (meta.author) {
      setMetaTag('property', 'article:author', meta.author);
    }
    if (meta.articleTags && meta.articleTags.length > 0) {
      setMetaTag('property', 'article:tag', meta.articleTags.join(', '));
    }
  } else {
    // Clear article tags if not article
    setMetaTag('property', 'article:published_time', undefined);
    setMetaTag('property', 'article:modified_time', undefined);
    setMetaTag('property', 'article:author', undefined);
    setMetaTag('property', 'article:tag', undefined);
  }

  // 5. Twitter Card Tags
  setMetaTag('name', 'twitter:card', meta.twitterCard || 'summary_large_image');
  setMetaTag('name', 'twitter:title', meta.twitterTitle || meta.title);
  setMetaTag('name', 'twitter:description', meta.twitterDescription || meta.description);
  if (meta.twitterImage || meta.ogImage) {
    setMetaTag('name', 'twitter:image', meta.twitterImage || meta.ogImage);
  }
  if (meta.twitterCreator) {
    setMetaTag('name', 'twitter:creator', meta.twitterCreator);
  }
  if (meta.twitterSite) {
    setMetaTag('name', 'twitter:site', meta.twitterSite);
  }

  // 6. Schema.org JSON-LD
  setJsonLdScript(meta.jsonLd);

  // Return reset/cleanup function
  return () => {
    document.title = prevTitle;
  };
}

/**
 * React Hook to automatically apply dynamic SEO metadata on mount / update
 */
export function useSeoMeta(meta: SeoMetadata | null | undefined): void {
  useEffect(() => {
    if (!meta) return;
    const cleanup = applySeoMetadata(meta);
    return cleanup;
  }, [
    meta?.title,
    meta?.description,
    meta?.canonicalUrl,
    meta?.ogType,
    meta?.ogImage,
    meta?.publishedTime,
    meta?.modifiedTime
  ]);
}
