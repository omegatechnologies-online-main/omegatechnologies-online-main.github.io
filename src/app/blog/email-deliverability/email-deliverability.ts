import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-email-deliverability',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './email-deliverability.html',
  styleUrl: './email-deliverability.scss'
})
export class EmailDeliverabilityBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'Email Deliverability & Inbox Placement: How Omega Technologies Fixes Your Spam Problem',
      description: 'Learn how Omega Technologies uses SPF, DKIM, DMARC, AI warmup, and horizontal scaling to guarantee enterprise email reaches the inbox, not the spam folder.',
      keywords: 'email deliverability, SPF DKIM DMARC, inbox placement, email warmup, horizontal scaling, Omega Technologies, AI email infrastructure, anti-spam',
      url: '/blog/email-deliverability',
      image: 'https://omegatechnologies.online/blog/email_deliverability.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'Email Deliverability'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'Email Deliverability', url: '/blog/email-deliverability' }
    ]);

    this.seoService.setArticleSchema({
      title: 'Email Deliverability & Inbox Placement: How Omega Technologies Fixes Your Spam Problem',
      description: 'Learn how Omega Technologies uses SPF, DKIM, DMARC, AI warmup, and horizontal scaling to guarantee enterprise email reaches the inbox, not the spam folder.',
      url: '/blog/email-deliverability',
      image: 'https://omegatechnologies.online/blog/email_deliverability.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'Email Deliverability'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
