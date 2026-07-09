import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsService } from '../services/cms.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private cms = inject(CmsService);

  heroTitle$!: Observable<string>;
  heroSubtitle$!: Observable<string>;
  heroImage$!: Observable<string>;
  aboutText$!: Observable<string>;

  ngOnInit() {
    this.heroTitle$ = this.cms.getContentWithFallback('home.hero.title', 'Engineering the Future');
    this.heroSubtitle$ = this.cms.getContentWithFallback('home.hero.subtitle', 'Benest Dynamics delivers world-class, AI-driven software architectures that redefine what is possible.');
    this.heroImage$ = this.cms.getContentWithFallback('home.hero.image', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop');
    this.aboutText$ = this.cms.getContentWithFallback('home.about.text', 'We are a collective of senior engineers, researchers, and designers committed to pushing the boundaries of technology. From complex natural language processing portals to high-frequency trading reconciliation engines, we build systems that scale.');
  }

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        this.submitSuccess = true;
        form.reset();
      } else {
        this.submitError = true;
      }
    } catch (error) {
      this.submitError = true;
    } finally {
      this.isSubmitting = false;
      
      if (this.submitSuccess) {
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      }
    }
  }
}
