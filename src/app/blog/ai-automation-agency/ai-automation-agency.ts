import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-ai-automation-agency',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ai-automation-agency.html',
  styleUrl: './ai-automation-agency.scss'
})
export class AiAutomationAgencyBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'AI Automation Agency for Home Services',
      description: 'Learn how we automate lead capture and instant quoting for home service businesses, boosting conversions and saving time.',
      keywords: 'AI automation agency, home services automation, lead capture automation, instant quoting bot, workflow automation, Omega Technologies, sales automation',
      url: '/blog/ai-automation-agency',
      image: 'https://omegatechnologies.online/blog/ai_automation_agency.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'AI Automation'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'AI Automation Agency', url: '/blog/ai-automation-agency' }
    ]);

    this.seoService.setArticleSchema({
      title: 'AI Automation Agency for Home Services',
      description: 'Learn how we automate lead capture and instant quoting for home service businesses, boosting conversions and saving time.',
      url: '/blog/ai-automation-agency',
      image: 'https://omegatechnologies.online/blog/ai_automation_agency.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'AI Automation'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
