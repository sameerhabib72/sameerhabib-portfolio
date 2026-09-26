import React, { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import {
  generateProjectMeta,
  generateBlogPostMeta,
  generateBlogListMeta,
  generateServiceMeta,
  generateSkillMeta,
  generateHomeMeta,
  useSeoMeta,
  SeoMetadata
} from '../../utils/seoMeta';

/**
 * Global reactive SEO manager component that dynamically synchronizes
 * document <title>, standard <meta> tags, OpenGraph properties, Twitter cards,
 * canonical links, and Schema.org JSON-LD whenever navigation or CMS content updates.
 */
export const DynamicSeoManager: React.FC = () => {
  const { currentRoute, currentSlug, projects, blogPosts, services, skills, siteSettings } = useData();

  const seoData = useMemo<SeoMetadata>(() => {
    if (currentRoute === 'project-detail') {
      const project = projects.find((p) => p.slug === currentSlug) || projects[0];
      if (project) {
        return generateProjectMeta(project, siteSettings);
      }
    }

    if (currentRoute === 'service-detail') {
      const service = services.find((s) => s.slug === currentSlug || s.id === currentSlug) || services[0];
      if (service) {
        return generateServiceMeta(service, siteSettings);
      }
    }

    if (currentRoute === 'skill-detail') {
      const skill = skills.find((s) => s.slug === currentSlug || s.id === currentSlug) || skills[0];
      if (skill) {
        return generateSkillMeta(skill, siteSettings);
      }
    }

    if (currentRoute === 'admin') {
      return {
        title: `CMS Dashboard & Administration | ${siteSettings.ownerName || 'Sameer Habib'}`,
        description: `Secure administrative workspace to edit portfolio content, manage case studies, publish blog posts, and review inquiry messages.`,
        canonicalUrl: `${siteSettings.siteUrl || window.location.origin}/#admin`,
        ogType: 'website',
        ogTitle: `CMS Administration | ${siteSettings.ownerName || 'Sameer Habib'}`,
        ogDescription: `Administrative dashboard for portfolio content management.`,
        ogImage: siteSettings.ogImage,
        ogSiteName: siteSettings.siteName,
        twitterCard: 'summary',
        author: siteSettings.ownerName
      };
    }

    // Default: Home Page
    return generateHomeMeta(siteSettings);
  }, [currentRoute, currentSlug, projects, blogPosts, services, skills, siteSettings]);

  // Apply computed SEO metadata automatically to document <head>
  useSeoMeta(seoData);

  return null;
};
