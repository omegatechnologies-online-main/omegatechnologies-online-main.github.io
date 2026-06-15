import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-enterprise-ai-synergies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './enterprise-ai-synergies.html',
  styleUrl: './enterprise-ai-synergies.scss'
})
export class EnterpriseAiSynergiesBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'How Omega Technologies Builds the Ultimate Architecture for Enterprise Growth',
      description: 'Learn how Omega Technologies connects AI, programmatic SEO, algorithmic advertising, and localization into one powerful growth engine for your enterprise.',
      keywords: 'enterprise AI solutions, cross-functional AI synergies, programmatic SEO infrastructure, AI localization, peak demand management, Omega Technologies, IT automation',
      url: '/blog/enterprise-ai-synergies',
      image: 'https://omegatechnologies.online/blog/enterprise_ai_synergies.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'Enterprise Solutions'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'Enterprise AI Architecture', url: '/blog/enterprise-ai-synergies' }
    ]);

    this.seoService.setArticleSchema({
      title: 'How Omega Technologies Builds the Ultimate Architecture for Enterprise Growth',
      description: 'Learn how Omega Technologies connects AI, programmatic SEO, algorithmic advertising, and localization into one powerful growth engine for your enterprise.',
      url: '/blog/enterprise-ai-synergies',
      image: 'https://omegatechnologies.online/blog/enterprise_ai_synergies.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'Enterprise Solutions'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
