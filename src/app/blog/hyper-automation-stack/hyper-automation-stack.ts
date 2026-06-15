import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-hyper-automation-stack',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hyper-automation-stack.html',
  styleUrl: './hyper-automation-stack.scss'
})
export class HyperAutomationStackBlog implements OnDestroy {
  constructor(private seoService: SeoService) {
    this.seoService.setPageMeta({
      title: 'n8n, LangGraph, RAG & MCP: How Omega Technologies Builds Your Enterprise AI Stack',
      description: 'Discover how Omega Technologies combines n8n workflow automation, LangGraph multi-agent AI, RAG knowledge systems, and MCP to cut costs and scale your business effortlessly.',
      keywords: 'n8n enterprise automation, LangGraph agentic workflows, RAG AI chatbots, Model Context Protocol MCP, AI workflow automation, Omega Technologies IT architecture, hyper-automation',
      url: '/blog/hyper-automation-stack',
      image: 'https://omegatechnologies.online/blog/hyper_automation_stack.png',
      type: 'article',
      article: {
        author: 'Omega Technologies',
        datePublished: '2026-06-14T00:00:00Z',
        section: 'AI & Automation'
      }
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs' },
      { name: 'Enterprise AI Stack', url: '/blog/hyper-automation-stack' }
    ]);

    this.seoService.setArticleSchema({
      title: 'n8n, LangGraph, RAG & MCP: How Omega Technologies Builds Your Enterprise AI Stack',
      description: 'Discover how Omega Technologies combines n8n workflow automation, LangGraph multi-agent AI, RAG knowledge systems, and MCP to cut costs and scale your business effortlessly.',
      url: '/blog/hyper-automation-stack',
      image: 'https://omegatechnologies.online/blog/hyper_automation_stack.png',
      datePublished: '2026-06-14T00:00:00Z',
      author: 'Omega Technologies',
      section: 'AI & Automation'
    });
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
