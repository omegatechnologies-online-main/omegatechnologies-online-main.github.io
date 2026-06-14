import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-algorithmic-pseo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './algorithmic-pseo.html',
  styleUrl: './algorithmic-pseo.scss'
})
export class AlgorithmicPseoBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'Algorithmic Market Capture via Programmatic SEO',
      description: 'Learn how Omega Technologies builds secure, AI-powered programmatic SEO engines to capture massive organic traffic and grow your enterprise.',
      keywords: 'programmatic SEO, pSEO, AI automation, Omega Technologies, enterprise growth, AI localization, AI workflow orchestration',
      url: '/blog/algorithmic-pseo',
      image: 'https://omegatechnologies.online/blog/algorithmic_pseo.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'Programmatic SEO'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'Algorithmic Programmatic SEO', url: '/blog/algorithmic-pseo' }
    ]);

    this.seoService.setArticleSchema({
      title: 'Algorithmic Market Capture via Programmatic SEO',
      description: 'Learn how Omega Technologies builds secure, AI-powered programmatic SEO engines to capture massive organic traffic and grow your enterprise.',
      url: '/blog/algorithmic-pseo',
      image: 'https://omegatechnologies.online/blog/algorithmic_pseo.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'Programmatic SEO'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
