import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-enterprise-growth-blueprint',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './enterprise-growth-blueprint.html',
  styleUrl: './enterprise-growth-blueprint.scss'
})
export class EnterpriseGrowthBlueprintBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'The Complete Enterprise Growth Blueprint: AI, Automation & Algorithmic Infrastructure',
      description: 'Discover how Omega Technologies connects AI automation, RAG localisation, programmatic SEO, algorithmic advertising, and cryptographic IT infrastructure into one exponential growth engine for your business.',
      keywords: 'enterprise growth blueprint, AI automation, programmatic SEO, algorithmic advertising, RAG localisation, email deliverability, SPF DKIM DMARC, n8n LangGraph, Omega Technologies IT solutions, business expansion strategy',
      url: '/blog/enterprise-growth-blueprint',
      image: 'https://omegatechnologies.online/blog/enterprise_growth_blueprint.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'Enterprise Blueprint'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'Enterprise Growth Blueprint', url: '/blog/enterprise-growth-blueprint' }
    ]);

    this.seoService.setArticleSchema({
      title: 'The Complete Enterprise Growth Blueprint: AI, Automation & Algorithmic Infrastructure',
      description: 'Discover how Omega Technologies connects AI automation, RAG localisation, programmatic SEO, algorithmic advertising, and cryptographic IT infrastructure into one exponential growth engine for your business.',
      url: '/blog/enterprise-growth-blueprint',
      image: 'https://omegatechnologies.online/blog/enterprise_growth_blueprint.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'Enterprise Blueprint'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
