import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-nocode-pseo-stack',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nocode-pseo-stack.html',
  styleUrl: './nocode-pseo-stack.scss'
})
export class NocodePseoStackBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'The No-Code Programmatic SEO Stack: Webflow, Airtable & Automation',
      description: 'Discover how Omega Technologies builds the no-code programmatic SEO stack using Webflow, Airtable, and sync middleware to generate thousands of SEO pages without an engineering team.',
      keywords: 'no-code programmatic SEO, Webflow Airtable SEO, pSEO stack, CMS database sync, automated landing pages, Omega Technologies SEO infrastructure, Whalesync programmatic SEO',
      url: '/blog/nocode-pseo-stack',
      image: 'https://omegatechnologies.online/blog/nocode_pseo_stack.png',
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
      { name: 'No-Code Programmatic SEO Stack', url: '/blog/nocode-pseo-stack' }
    ]);

    this.seoService.setArticleSchema({
      title: 'The No-Code Programmatic SEO Stack: Webflow, Airtable & Automation',
      description: 'Discover how Omega Technologies builds the no-code programmatic SEO stack using Webflow, Airtable, and sync middleware to generate thousands of SEO pages without an engineering team.',
      url: '/blog/nocode-pseo-stack',
      image: 'https://omegatechnologies.online/blog/nocode_pseo_stack.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'Programmatic SEO'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
