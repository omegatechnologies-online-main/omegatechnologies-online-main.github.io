import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stories.html',
  styleUrl: './stories.scss'
})
export class Stories implements OnDestroy {
  storiesList = [
    {
      brand: 'Gahranox',
      story: 'They helped to reach top markets like hardware and other potential market where indian hardware is needed and internet reach was improved.'
    },
    {
      brand: 'brand Revenue',
      story: 'Helped to make everything centralised in internret like giveing proper advice for the landing page and ui is amazing.'
    },
    {
      brand: 'Aanchal Designs',
      story: 'Internet ecommerce was made easy now we have untapped intenet full of market for our cloths like this add big huge insprational stories.'
    }
  ];

  constructor(private seoService: SeoService) {
    // SEO Meta Tags
    this.seoService.setPageMeta({
      title: 'Client Success Stories — Omega Technologies Case Studies',
      description: 'Discover how Omega Technologies helped brands like Gahranox, Brand Revenue, and Aanchal Designs transform their digital presence, reach new markets, and scale with AI automation.',
      keywords: 'Omega Technologies case studies, client success stories, Gahranox, Brand Revenue, Aanchal Designs, digital transformation results, business scaling testimonials',
      url: '/stories',
      type: 'website'
    });

    // Breadcrumbs
    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Success Stories', url: '/stories' }
    ]);

    // JSON-LD Review schema for testimonials
    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Client Success Stories — Omega Technologies',
      'url': 'https://omegatechnologies.online/stories',
      'mainEntity': this.storiesList.map(item => ({
        '@type': 'Review',
        'author': {
          '@type': 'Organization',
          'name': item.brand
        },
        'reviewBody': item.story,
        'itemReviewed': {
          '@type': 'Organization',
          'name': 'Omega Technologies'
        },
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': '5',
          'bestRating': '5'
        }
      }))
    }, 'stories-schema');
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
