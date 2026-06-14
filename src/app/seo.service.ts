import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: string; // 'website' | 'article'
  article?: {
    author?: string;
    datePublished?: string;
    dateModified?: string;
    section?: string;
  };
  geo?: {
    region?: string;
    placename?: string;
    position?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly baseUrl = 'https://omegatechnologies.online';
  private readonly defaultImage = 'https://omegatechnologies.online/OmegaTechnologies-full-ng-rem.png';
  private readonly siteName = 'Omega Technologies';
  private jsonLdScriptIds: string[] = [];

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Set comprehensive page meta tags (SEO + OG + Twitter + Geo)
   */
  setPageMeta(config: SeoConfig): void {
    const fullUrl = config.url ? `${this.baseUrl}${config.url}` : this.baseUrl;
    const image = config.image || this.defaultImage;
    const type = config.type || 'website';

    // Title
    this.title.setTitle(`${config.title} | ${this.siteName}`);

    // Standard meta
    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: fullUrl });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Article-specific OG tags
    if (config.article) {
      if (config.article.author) {
        this.meta.updateTag({ property: 'article:author', content: config.article.author });
      }
      if (config.article.datePublished) {
        this.meta.updateTag({ property: 'article:published_time', content: config.article.datePublished });
      }
      if (config.article.dateModified) {
        this.meta.updateTag({ property: 'article:modified_time', content: config.article.dateModified });
      }
      if (config.article.section) {
        this.meta.updateTag({ property: 'article:section', content: config.article.section });
      }
    }

    // Geo meta tags
    const geo = config.geo || { region: 'IN', placename: 'India', position: '20.5937;78.9629' };
    this.meta.updateTag({ name: 'geo.region', content: geo.region! });
    this.meta.updateTag({ name: 'geo.placename', content: geo.placename! });
    this.meta.updateTag({ name: 'geo.position', content: geo.position! });

    // Canonical URL
    this.setCanonical(fullUrl);
  }

  /**
   * Set canonical URL link element
   */
  setCanonical(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (link) {
      link.setAttribute('href', url);
    } else {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
    }
  }

  /**
   * Inject JSON-LD structured data into the DOM
   */
  setJsonLd(data: object, id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Remove existing script with same id
    const existing = this.document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', id);
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);

    if (!this.jsonLdScriptIds.includes(id)) {
      this.jsonLdScriptIds.push(id);
    }
  }

  /**
   * Set Article schema for blog posts
   */
  setArticleSchema(config: {
    title: string;
    description: string;
    url: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
    section?: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': config.title,
      'description': config.description,
      'image': config.image,
      'url': `${this.baseUrl}${config.url}`,
      'datePublished': config.datePublished,
      'dateModified': config.dateModified || config.datePublished,
      'author': {
        '@type': 'Organization',
        'name': this.siteName,
        'url': this.baseUrl
      },
      'publisher': {
        '@type': 'Organization',
        'name': this.siteName,
        'logo': {
          '@type': 'ImageObject',
          'url': `${this.baseUrl}/OmegaTechnologies-logo-bg-rem.png`
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `${this.baseUrl}${config.url}`
      }
    };

    this.setJsonLd(schema, 'article-schema');
  }

  /**
   * Set FAQ schema for AEO optimization
   */
  setFAQSchema(faqs: { question: string; answer: string }[]): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };

    this.setJsonLd(schema, 'faq-schema');
  }

  /**
   * Set BreadcrumbList schema
   */
  setBreadcrumbs(items: { name: string; url: string }[]): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': `${this.baseUrl}${item.url}`
      }))
    };

    this.setJsonLd(schema, 'breadcrumb-schema');
  }

  /**
   * Clean up dynamically injected JSON-LD scripts
   */
  cleanupJsonLd(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.jsonLdScriptIds.forEach(id => {
      const el = this.document.getElementById(id);
      if (el) el.remove();
    });
    this.jsonLdScriptIds = [];
  }
}
