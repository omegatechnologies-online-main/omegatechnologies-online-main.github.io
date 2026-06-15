import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-automation-roi-tracking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './automation-roi-tracking.html',
  styleUrl: './automation-roi-tracking.scss'
})
export class AutomationRoiTrackingBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'How to Measure the Real ROI of Business Automation',
      description: 'Learn how Omega Technologies uses dynamic time-saved tracking and ROI measurement frameworks to prove the exact business value of every automation workflow deployed.',
      keywords: 'automation ROI, workflow automation tracking, time saved automation, business automation value, n8n ROI, Omega Technologies IT solutions, automation metrics',
      url: '/blog/automation-roi-tracking',
      image: 'https://omegatechnologies.online/blog/automation_roi_tracking.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'ROI & Metrics'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'Automation ROI Tracking', url: '/blog/automation-roi-tracking' }
    ]);

    this.seoService.setArticleSchema({
      title: 'How to Measure the Real ROI of Business Automation',
      description: 'Learn how Omega Technologies uses dynamic time-saved tracking and ROI measurement frameworks to prove the exact business value of every automation workflow deployed.',
      url: '/blog/automation-roi-tracking',
      image: 'https://omegatechnologies.online/blog/automation_roi_tracking.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'ROI & Metrics'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
