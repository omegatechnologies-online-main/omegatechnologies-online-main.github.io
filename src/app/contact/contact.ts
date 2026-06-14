import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from '../seo.service';
import { ThreeFloating } from '../three-floating/three-floating';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ThreeFloating],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnDestroy {
  contactForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private seoService: SeoService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      interest: ['', Validators.required],
      message: ['', Validators.required]
    });

    // SEO Meta Tags
    this.seoService.setPageMeta({
      title: 'Contact Omega Technologies — Get a Free Consultation',
      description: 'Reach out to Omega Technologies for AI automation, web development, programmatic SEO, and enterprise growth solutions. Email sales@omegatechnologies.online or call +91 98403 67253.',
      keywords: 'contact Omega Technologies, AI automation consultation, web development enquiry, digital growth consultation, India, Australia, Dubai',
      url: '/contact',
      type: 'website'
    });

    // Breadcrumbs
    this.seoService.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' }
    ]);

    // JSON-LD ContactPage schema
    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact Omega Technologies',
      'description': 'Get in touch with Omega Technologies for AI automation, web development, and digital growth solutions.',
      'url': 'https://omegatechnologies.online/contact',
      'mainEntity': {
        '@type': 'Organization',
        'name': 'Omega Technologies',
        'telephone': ['+91-98403-67253', '+91-99628-54042'],
        'email': ['support@omegatechnologies.online', 'sales@omegatechnologies.online'],
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': ['IN', 'AU', 'AE']
        }
      }
    }, 'contact-schema');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitted = true;
      // In a real app, this would send data to an API
      setTimeout(() => {
        this.contactForm.reset();
        this.isSubmitted = false;
        alert('Application submitted successfully! We will be in touch soon.');
      }, 1500);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.seoService.cleanupJsonLd();
  }
}
