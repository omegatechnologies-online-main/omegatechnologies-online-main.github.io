import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-ai-automation-localization',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ai-automation-localization.html',
  styleUrl: './ai-automation-localization.scss'
})
export class AiAutomationLocalizationBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'The AI Automation & Localization Paradigm',
      description: 'Discover how Omega Technologies transforms task automation into enterprise AI workflow orchestration and RAG-powered localization for global growth.',
      keywords: 'AI automation, workflow orchestration, RAG localization, Omega Technologies, enterprise AI, global scaling',
      url: '/blog/ai-automation-localization',
      image: 'https://omegatechnologies.online/blog/ai_automation_localization.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'AI & Localization'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'AI Automation & Localization', url: '/blog/ai-automation-localization' }
    ]);

    this.seoService.setArticleSchema({
      title: 'The AI Automation & Localization Paradigm',
      description: 'Discover how Omega Technologies transforms task automation into enterprise AI workflow orchestration and RAG-powered localization for global growth.',
      url: '/blog/ai-automation-localization',
      image: 'https://omegatechnologies.online/blog/ai_automation_localization.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'AI & Localization'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
