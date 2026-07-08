import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CmsService } from './services/cms.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
}
