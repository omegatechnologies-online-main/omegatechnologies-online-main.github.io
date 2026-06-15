import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-algorithmic-digital-advertising',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './algorithmic-digital-advertising.html',
  styleUrl: './algorithmic-digital-advertising.scss'
})
export class AlgorithmicDigitalAdvertisingBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'Omnichannel Precision: Mastering Algorithmic Digital Advertising with AI',
      description: 'Algorithmic digital advertising uses machine learning to automate media buying and target high-intent audiences.',
      keywords: 'algorithmic digital advertising, AI media buying, machine learning ads, omnichannel advertising, Omega Technologies, ad optimization',
      url: '/blog/algorithmic-digital-advertising',
      image: 'https://omegatechnologies.online/blog/algorithmic_digital_advertising.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'Digital Advertising'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'Algorithmic Digital Advertising', url: '/blog/algorithmic-digital-advertising' }
    ]);

    this.seoService.setArticleSchema({
      title: 'Omnichannel Precision: Mastering Algorithmic Digital Advertising with AI',
      description: 'Algorithmic digital advertising uses machine learning to automate media buying and target high-intent audiences.',
      url: '/blog/algorithmic-digital-advertising',
      image: 'https://omegatechnologies.online/blog/algorithmic_digital_advertising.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'Digital Advertising'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
