import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../seo.service';
import { ThreeFloating } from '../three-floating/three-floating';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink, ThreeFloating],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team implements OnDestroy {
  teamMembers = [
    {
      name: 'Abdul Faheem',
      role: 'Co-Founder & Lead AI Engineer',
      bio: 'Expert in designing autonomous AI workflows and scalable digital infrastructure. Abdul specializes in bridging the gap between complex business requirements and cutting-edge technical solutions.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faheem',
      tags: ['AI Flow Expert', 'Tech Lead']
    },
    {
      name: 'Tharun',
      role: 'Co-Founder & Full-Stack Architect',
      bio: 'Visionary developer focused on high-performance web systems and brand growth engineering. Tharun has a track record of building elite platforms that drive measurable business results.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tharun',
      tags: ['AI Flow Expert', 'Tech Lead']
    }
  ];

  departments = [
    {
      name: 'AI & Workflow Automation',
      count: '35+',
      description: 'Specialists in n8n, LangGraph, custom agentic workflows, and multi-agent system orchestration.',
      skills: ['n8n', 'LangGraph', 'RAG Systems', 'MCP', 'LLM Fine-tuning', 'Vector DBs']
    },
    {
      name: 'Programmatic SEO & Web',
      count: '28+',
      description: 'Architects of scale publishing programmatic content pipelines and building high-performance SPAs.',
      skills: ['pSEO Engines', 'Next.js / Angular', 'Headless CMS', 'Airtable Sync', 'Semantic HTML', 'SEO Audit']
    },
    {
      name: 'Deliverability & Infrastructure',
      count: '18+',
      description: 'DNS protocols, domain trust, cold email warmup infrastructure, and horizontal server scaling.',
      skills: ['SPF/DKIM/DMARC', 'IP Warmup', 'DNS Monitoring', 'AWS / GCP', 'Kubernetes', 'CI/CD']
    },
    {
      name: 'Algorithmic Ads & Growth',
      count: '22+',
      description: 'Data-driven advertisers automating media buying and programmatic ad creatives testing.',
      skills: ['Meta Ads API', 'Google Ads API', 'ROAS Analytics', 'Dynamic Creatives', 'Funnel Optimization']
    }
  ];

  constructor(private seoService: SeoService) {
    // SEO Meta Tags
    this.seoService.setPageMeta({
      title: 'Meet the Team — Omega Technologies Founders & Engineers',
      description: 'Meet Abdul Faheem (Lead AI Engineer) and Tharun (Full-Stack Architect), the co-founders of Omega Technologies. Backed by a vetted global network of 100+ elite technical operators.',
      keywords: 'Omega Technologies team, Abdul Faheem, Tharun, AI engineer, full-stack architect, co-founders, digital growth operators, programmatic SEO, workflow automation',
      url: '/team',
      type: 'website'
    });

    // Breadcrumbs
    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Team', url: '/team' }
    ]);

    // JSON-LD Person schemas
    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'Omega Technologies Team',
      'url': 'https://omegatechnologies.online/team',
      'mainEntity': this.teamMembers.map(member => ({
        '@type': 'Person',
        'name': member.name,
        'jobTitle': member.role,
        'description': member.bio,
        'image': member.image,
        'worksFor': {
          '@type': 'Organization',
          'name': 'Omega Technologies',
          'url': 'https://omegatechnologies.online'
        }
      }))
    }, 'team-schema');
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
