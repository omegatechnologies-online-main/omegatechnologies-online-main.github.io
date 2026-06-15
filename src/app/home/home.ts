import { Component, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SeoService } from '../seo.service';
import { ThreeHero } from '../three-hero/three-hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ThreeHero],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('counter') counters!: QueryList<ElementRef>;

  stats = [
    { label: 'Businesses Scaled', value: 50, current: 0, suffix: '+' },
    { label: 'Automated Workflows Deployed', value: 500, current: 0, suffix: '+' },
    { label: 'Years of Experience', value: 10, current: 0, suffix: '+' }
  ];

  services: { title: string, description: string, icon: SafeHtml }[] = [];

  partners = ['Gahranox', 'Ocean Blender', 'Brand Revenue', 'Carlos dreams', 'Aanchal Designs'];

  faqs = [
    {
      question: 'What services does Omega Technologies offer?',
      answer: 'Omega Technologies offers a full suite of digital growth services including AI-powered workflow automation, custom web development & SEO architecture, programmatic SEO (pSEO), conversational AI chatbots, custom POS & business analytics, AI-driven marketing & brand promotion, and product launch strategies.',
      open: false
    },
    {
      question: 'How does AI automation help scale my business?',
      answer: 'Our AI automation eliminates manual, repetitive tasks by deploying intelligent workflows using tools like n8n, LangGraph, and RAG systems. This reduces operational costs by up to 40%, accelerates response times, and lets your team focus on strategic growth instead of routine operations.',
      open: false
    },
    {
      question: 'What industries does Omega Technologies serve?',
      answer: 'We serve a diverse range of industries including e-commerce, home services, SaaS, real estate, healthcare, manufacturing, and professional services. Our solutions are customised for each industry vertical to ensure maximum ROI and measurable growth outcomes.',
      open: false
    },
    {
      question: 'How is Omega Technologies different from other agencies?',
      answer: 'Unlike typical agencies, we are operators — we have built, scaled, and exited our own businesses. We engineer the exact same systems we use to run elite brands. Our team combines AI engineers, full-stack developers, and growth strategists to deliver infrastructure that compounds.',
      open: false
    },
    {
      question: 'Where is Omega Technologies located?',
      answer: 'Omega Technologies operates globally with headquarters in India and presence in Australia and Dubai. We serve clients worldwide through our distributed remote operations team, ensuring 24/7 coverage and support across all major time zones.',
      open: false
    },
    {
      question: 'How do I get started with Omega Technologies?',
      answer: 'Getting started is simple — submit an enquiry through our contact page or email sales@omegatechnologies.online. Our team will schedule a discovery call within 24 hours to understand your needs, followed by a tailored proposal with clear timelines and ROI projections.',
      open: false
    }
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    // SEO Meta Tags
    this.seoService.setPageMeta({
      title: 'Omega Technologies — AI Automation, SEO & Digital Growth Engineering',
      description: 'Omega Technologies builds scalable AI automation, programmatic SEO engines, and enterprise digital infrastructure. We engineer systems that move your numbers — trusted by 50+ brands worldwide.',
      keywords: 'Omega Technologies, AI automation, programmatic SEO, digital transformation, enterprise growth, workflow automation, web development, brand marketing, India, Australia, Dubai',
      url: '/',
      type: 'website'
    });

    // Breadcrumbs
    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' }
    ]);

    // FAQ Schema for AEO
    this.seoService.setFAQSchema(
      this.faqs.map(f => ({ question: f.question, answer: f.answer }))
    );

    this.services = [
      {
        title: 'Web Development & SEO Architecture',
        description: 'Custom landing pages, full-scale web applications, technical SEO optimization, and secure cloud hosting.',
        icon: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>')
      },
      {
        title: 'Custom POS & Business Analytics',
        description: 'Modern Point of Sale (POS) software, automated billing systems, ERP/CRM integrations, and real-time data dashboards.',
        icon: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>')
      },
      {
        title: 'AI-Driven Marketing & Brand Promotion',
        description: 'Social media marketing, targeted promotion campaigns, PPC management, and data-backed brand positioning.',
        icon: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>')
      },
      {
        title: 'Product Launch & Visual Storytelling',
        description: 'Comprehensive product release strategies, high-end commercial photography, and digital asset creation.',
        icon: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>')
      },
      {
        title: 'Conversational AI & Customer Support',
        description: 'Intelligent 24/7 AI chatbots, virtual assistants, automated ticketing systems, and seamless support solutions.',
        icon: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>')
      },
      {
        title: 'Intelligent Workflow & Process Automation',
        description: 'AI pipeline development, robotic process automation (RPA), and streamlined business management systems.',
        icon: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>')
      }
    ];
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset['index']);
          this.animateValue(index);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.counters.forEach(counter => {
      observer.observe(counter.nativeElement);
    });
  }

  animateValue(index: number) {
    const stat = this.stats[index];
    const duration = 2000;
    const start = 0;
    const end = stat.value;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      stat.current = Math.floor(easeProgress * (end - start) + start);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        stat.current = end;
      }
    };

    requestAnimationFrame(step);
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
