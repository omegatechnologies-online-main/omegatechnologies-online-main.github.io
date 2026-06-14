import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog implements OnDestroy {
  blogs = [
    { title: 'How Omega Technologies Accelerates Your Business Growth',
      excerpt: 'Discover how Omega Tech can help you achieve faster scaling, smarter automation, and global reach with real-world examples.',
      link: '/blog/omega-tech-help', image: '/blog/omega_tech_help.png' },
    { title: 'The Hidden Architecture of Scale: Domain Trust & Cryptographic Deliverability',
      excerpt: 'Explore how Omega Technologies safeguards growth with domain trust, SPF/DKIM/DMARC, and AI-driven email deliverability.',
      link: '/blog/hidden-architecture-scale', image: '/blog/hidden_architecture.png' },
    { title: 'AI Automation Agency for Home Services – Omega Technologies',
      excerpt: 'Learn how we automate lead capture and instant quoting for home service businesses, boosting conversions and saving time.',
      link: '/blog/ai-automation-agency', image: '/blog/ai_automation_agency.png' },
    { title: 'The AI Automation & Localization Paradigm',
      excerpt: 'Combining AI workflow automation with RAG-powered localization allows enterprises to scale globally without manual translation overhead.',
      link: '/blog/global-ai-localization', image: '/blog/global_ai_localization.png' },
    { title: 'Mastering Programmatic SEO (pSEO)',
      excerpt: 'Learn how Omega Technologies leverages AI and programmatic SEO to capture massive organic traffic and grow your enterprise.',
      link: '/blog/algorithmic-pseo', image: '/blog/algorithmic_pseo.png' },
    { title: 'Why Your Emails Go to Spam — and How Omega Technologies Fixes It',
      excerpt: 'Discover how Omega Technologies uses SPF, DKIM, DMARC, AI warmup, and horizontal scaling to guarantee inbox placement at enterprise scale.',
      link: '/blog/email-deliverability', image: '/blog/email_deliverability.png' },
    { title: 'The Ultimate Growth Machine: How Omega Technologies Connects AI, SEO & IT',
      excerpt: 'See how Omega Technologies merges programmatic SEO, algorithmic ads, AI localisation, and peak demand management into one unified growth architecture.',
      link: '/blog/enterprise-ai-synergies', image: '/blog/enterprise_ai_synergies.png' },
    { title: 'n8n, LangGraph, RAG & MCP: How Omega Technologies Builds Your Enterprise AI Stack',
      excerpt: 'Learn how Omega Technologies connects your tools using n8n automation, LangGraph AI agents, RAG knowledge systems, and MCP to eliminate manual work and scale effortlessly.',
      link: '/blog/hyper-automation-stack', image: '/blog/hyper_automation_stack.png' },
    { title: 'The Complete Growth Blueprint: AI, Automation & Algorithmic Infrastructure',
      excerpt: 'Discover how Omega Technologies connects all five growth pillars into one compounding enterprise growth engine.',
      link: '/blog/enterprise-growth-blueprint', image: '/blog/enterprise_growth_blueprint.png' },
    { title: 'Omnichannel Precision: Mastering Algorithmic Digital Advertising with AI',
      excerpt: 'Algorithmic digital advertising uses machine learning to automate media buying, test creatives, and target high‑intent audiences across multiple networks.',
      link: '/blog/algorithmic-digital-advertising', image: '/blog/algorithmic_digital_advertising.png' },
    { title: 'The AI Automation & Localization Paradigm',
      excerpt: 'Scaling workflows with Omega Technologies and enterprise AI workflow orchestration and RAG-powered localization for global growth.',
      link: '/blog/ai-automation-localization', image: '/blog/ai_automation_localization.png' },
    { title: 'How to Measure the Real ROI of Your Business Automation',
      excerpt: 'Stop guessing whether automation is working. Omega Technologies builds dynamic time-saved tracking into every workflow so you always know the exact return.',
      link: '/blog/automation-roi-tracking', image: '/blog/automation_roi_tracking.png' },
    { title: 'The No-Code Programmatic SEO Stack: Webflow, Airtable & Automation',
      excerpt: 'Learn how Omega Technologies connects Webflow and Airtable with sync middleware to publish thousands of SEO-optimised pages automatically — no engineering team needed.',
      link: '/blog/nocode-pseo-stack', image: '/blog/nocode_pseo_stack.png' }
  ];

  constructor(private seoService: SeoService) {
    // SEO Meta Tags
    this.seoService.setPageMeta({
      title: 'Omega Technologies Blog — AI Automation, SEO & Growth Insights',
      description: 'Explore the latest insights on AI automation, programmatic SEO, IT infrastructure, and algorithmic advertising from Omega Technologies. Expert guides and case studies.',
      keywords: 'Omega Technologies blog, AI automation articles, SEO insights, IT infrastructure guides, algorithmic advertising, enterprise growth strategies',
      url: '/blogs',
      image: 'https://omegatechnologies.online/blog/algorithmic_pseo.png',
      type: 'website'
    });

    // Breadcrumbs
    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' }
    ]);

    // JSON-LD CollectionPage schema
    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Omega Technologies Blog',
      'description': 'Expert insights on AI automation, programmatic SEO, IT infrastructure, and algorithmic advertising.',
      'url': 'https://omegatechnologies.online/blogs',
      'publisher': {
        '@type': 'Organization',
        'name': 'Omega Technologies',
        'url': 'https://omegatechnologies.online'
      },
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': this.blogs.map((blog, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'url': `https://omegatechnologies.online${blog.link}`,
          'name': blog.title
        }))
      }
    }, 'blog-collection-schema');
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
