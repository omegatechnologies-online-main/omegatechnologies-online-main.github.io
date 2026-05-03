import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { PreloaderComponent } from './preloader/preloader';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, PreloaderComponent],
  template: `
    <app-preloader></app-preloader>
    <app-header></app-header>
    <main class="min-h-screen bg-[#F5F5F5] text-[#121212] overflow-hidden">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  ngOnInit() {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50
    });
  }
}
