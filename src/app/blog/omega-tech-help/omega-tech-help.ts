import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-omega-tech-help',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './omega-tech-help.html',
  styleUrl: './omega-tech-help.scss'
})
export class OmegaTechHelpBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'How Omega Technologies Accelerates Your Business Growth',
      description: 'Discover how Omega Technologies can help you achieve faster scaling, smarter automation, and global reach with real-world examples.',
      keywords: 'Omega Technologies, business scaling, automation, digital transformation, AI, global reach',
      url: '/blog/omega-tech-help',
      image: 'https://omegatechnologies.online/blog/omega_tech_help.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'Business Growth'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'Accelerating Business Growth', url: '/blog/omega-tech-help' }
    ]);

    this.seoService.setArticleSchema({
      title: 'How Omega Technologies Accelerates Your Business Growth',
      description: 'Discover how Omega Technologies can help you achieve faster scaling, smarter automation, and global reach with real-world examples.',
      url: '/blog/omega-tech-help',
      image: 'https://omegatechnologies.online/blog/omega_tech_help.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'Business Growth'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
