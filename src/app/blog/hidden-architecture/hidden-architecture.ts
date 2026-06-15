import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-hidden-architecture',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hidden-architecture.html',
  styleUrl: './hidden-architecture.scss'
})
export class HiddenArchitectureBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'The Hidden Architecture of Scale: Domain Trust & Cryptographic Deliverability',
      description: 'Explore how Omega Technologies safeguards your growth with domain trust, SPF/DKIM/DMARC, and AI-driven email deliverability.',
      keywords: 'domain trust, email deliverability, SPF, DKIM, DMARC, Omega Technologies, digital growth, AI automation',
      url: '/blog/hidden-architecture-scale',
      image: 'https://omegatechnologies.online/blog/hidden_architecture.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'Domain Architecture'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'Hidden Architecture of Scale', url: '/blog/hidden-architecture-scale' }
    ]);

    this.seoService.setArticleSchema({
      title: 'The Hidden Architecture of Scale: Domain Trust & Cryptographic Deliverability',
      description: 'Explore how Omega Technologies safeguards your growth with domain trust, SPF/DKIM/DMARC, and AI-driven email deliverability.',
      url: '/blog/hidden-architecture-scale',
      image: 'https://omegatechnologies.online/blog/hidden_architecture.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'Domain Architecture'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
