import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-global-ai-localization',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './global-ai-localization.html',
  styleUrl: './global-ai-localization.scss'
})
export class GlobalAiLocalizationBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'Beyond Translation: The Future of RAG-Grounded Cultural Localization',
      description: 'Combining AI workflow automation with RAG-powered localization allows enterprises to scale globally without manual translation overhead.',
      keywords: 'RAG localization, cultural localization, enterprise translation, RAG translation, language models context, global expansion, Omega Technologies',
      url: '/blog/global-ai-localization',
      image: 'https://omegatechnologies.online/blog/global_ai_localization.png',
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
      { name: 'RAG Cultural Localization', url: '/blog/global-ai-localization' }
    ]);

    this.seoService.setArticleSchema({
      title: 'Beyond Translation: The Future of RAG-Grounded Cultural Localization',
      description: 'Combining AI workflow automation with RAG-powered localization allows enterprises to scale globally without manual translation overhead.',
      url: '/blog/global-ai-localization',
      image: 'https://omegatechnologies.online/blog/global_ai_localization.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'AI & Localization'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
