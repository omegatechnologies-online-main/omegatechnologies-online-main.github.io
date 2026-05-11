import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible()" class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121212] transition-opacity duration-1000" [ngClass]="{'opacity-0 pointer-events-none': isFadingOut()}">

      <!-- AI Marketing Themed Background Pattern/Image -->
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" class="w-full h-full object-cover mix-blend-luminosity blur-sm scale-105 animate-[pulse_4s_ease-in-out_infinite]" alt="Digital Infrastructure"/>
        <div class="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent"></div>
      </div>

      <!-- Preloader Content -->
      <div class="relative z-10 flex flex-col items-center">
        <!-- Logo Animation -->
        <div class="relative w-32 h-32 mb-8 flex items-center justify-center">
          <div class="absolute inset-0 border-t-2 border-r-2 border-[#F05454] rounded-full animate-spin"></div>
          <div class="absolute inset-2 border-b-2 border-l-2 border-[#30475E] rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
          <img src="OmegaTechnologies-logo-bg-rem.png" alt="Omega Technologies" class="w-16 h-16 rounded-sm object-contain z-10 shadow-lg">
        </div>

        <h2 class="text-white text-2xl md:text-4xl font-bold tracking-tight mb-3 opacity-0 animate-[fadeUp_1s_ease-out_ forwards]">
          Initializing Growth
        </h2>

        <div class="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
          <div class="h-full bg-gradient-to-r from-[#F05454] to-[#ff7a7a] rounded-full w-0 animate-[loadingBar_2s_ease-in-out_forwards]"></div>
        </div>

        <p class="text-gray-400 text-sm mt-6 font-mono opacity-0 animate-[fadeUp_1s_ease-out_0.5s_forwards]">
          Compiling Digital Infrastructure...
        </p>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes loadingBar {
      0% { width: 0%; }
      50% { width: 70%; }
      100% { width: 100%; }
    }
  `]
})
export class PreloaderComponent implements OnInit {
  isVisible = signal(true);
  isFadingOut = signal(false);

  ngOnInit() {
    // Simulate loading time for visual impact (2.5 seconds)
    setTimeout(() => {
      this.isFadingOut.set(true);

      // Remove from DOM after fade transition completes
      setTimeout(() => {
        this.isVisible.set(false);
      }, 1000);
    }, 2500);
  }
}
