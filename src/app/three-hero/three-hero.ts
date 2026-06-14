import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy,
  NgZone, PLATFORM_ID, Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-three-hero',
  standalone: true,
  template: `<canvas #heroCanvas class="three-hero-canvas" aria-hidden="true"></canvas>`,
  styles: [`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    .three-hero-canvas {
      width: 100%;
      height: 100%;
      display: block;
      opacity: 0;
      transition: opacity 1.5s ease-in-out;
    }
    .three-hero-canvas.loaded {
      opacity: 1;
    }
  `]
})
export class ThreeHero implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer: any;
  private scene: any;
  private camera: any;
  private animationId: number = 0;
  private mouseX = 0;
  private mouseY = 0;
  private particles: any[] = [];
  private lines: any[] = [];
  private clock: any;
  private destroyed = false;
  private boundMouseMove: ((e: MouseEvent) => void) | null = null;
  private boundResize: (() => void) | null = null;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScene();
  }

  private async initScene(): Promise<void> {
    try {
      const THREE = await import('three');
      if (this.destroyed) return;

      const canvas = this.canvasRef.nativeElement;
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      // Scene setup
      this.scene = new THREE.Scene();

      // Camera
      this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      this.camera.position.z = 50;

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);

      // Clock
      this.clock = new THREE.Clock();

      // Create particles
      const particleCount = Math.min(Math.floor(width / 12), 120);
      const brandColors = [
        new THREE.Color('#F05454'),
        new THREE.Color('#30475E'),
        new THREE.Color('#FF7A7A'),
        new THREE.Color('#4A6B8A'),
        new THREE.Color('#FFFFFF')
      ];

      for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(
          Math.random() * 0.4 + 0.15, 8, 8
        );
        const color = brandColors[Math.floor(Math.random() * brandColors.length)];
        const material = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: Math.random() * 0.5 + 0.3
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40
        );

        (mesh as any).velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        );
        (mesh as any).originalPosition = mesh.position.clone();

        this.scene.add(mesh);
        this.particles.push(mesh);
      }

      // Create connection lines
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color('#30475E'),
        transparent: true,
        opacity: 0.12
      });

      const maxConnections = 200;
      let connections = 0;

      for (let i = 0; i < this.particles.length && connections < maxConnections; i++) {
        for (let j = i + 1; j < this.particles.length && connections < maxConnections; j++) {
          const distance = this.particles[i].position.distanceTo(this.particles[j].position);
          if (distance < 18) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              this.particles[i].position,
              this.particles[j].position
            ]);
            const line = new THREE.Line(geometry, lineMaterial.clone());
            (line as any).particleA = i;
            (line as any).particleB = j;
            this.scene.add(line);
            this.lines.push(line);
            connections++;
          }
        }
      }

      // Add ambient glow spheres
      const glowColors = [0xF05454, 0x30475E];
      for (let i = 0; i < 3; i++) {
        const glowGeo = new THREE.SphereGeometry(8, 16, 16);
        const glowMat = new THREE.MeshBasicMaterial({
          color: glowColors[i % glowColors.length],
          transparent: true,
          opacity: 0.03
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          -20
        );
        this.scene.add(glow);
      }

      // Mouse tracking
      this.boundMouseMove = (e: MouseEvent) => {
        this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', this.boundMouseMove, { passive: true });

      // Resize handling
      this.boundResize = () => {
        if (this.destroyed) return;
        const w = canvas.parentElement?.clientWidth || window.innerWidth;
        const h = canvas.parentElement?.clientHeight || window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      };
      window.addEventListener('resize', this.boundResize, { passive: true });

      // Fade in
      requestAnimationFrame(() => {
        canvas.classList.add('loaded');
      });

      // Start animation loop outside Angular zone for performance
      this.ngZone.runOutsideAngular(() => {
        this.animate(THREE);
      });
    } catch (err) {
      console.warn('Three.js hero failed to initialize:', err);
    }
  }

  private animate(THREE: any): void {
    if (this.destroyed) return;

    this.animationId = requestAnimationFrame(() => this.animate(THREE));

    const elapsed = this.clock.getElapsedTime();

    // Animate particles
    for (const particle of this.particles) {
      particle.position.x += particle.velocity.x;
      particle.position.y += particle.velocity.y;
      particle.position.z += particle.velocity.z;

      // Gentle floating motion
      particle.position.y += Math.sin(elapsed + particle.originalPosition.x) * 0.003;
      particle.position.x += Math.cos(elapsed * 0.5 + particle.originalPosition.y) * 0.002;

      // Mouse parallax effect
      particle.position.x += (this.mouseX * 2 - particle.position.x) * 0.0005;
      particle.position.y += (this.mouseY * 2 - particle.position.y) * 0.0005;

      // Boundary bounce
      const bounds = { x: 45, y: 35, z: 25 };
      if (Math.abs(particle.position.x) > bounds.x) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > bounds.y) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > bounds.z) particle.velocity.z *= -1;
    }

    // Update connection lines
    for (const line of this.lines) {
      const posA = this.particles[line.particleA].position;
      const posB = this.particles[line.particleB].position;
      const distance = posA.distanceTo(posB);

      const positions = line.geometry.attributes.position.array;
      positions[0] = posA.x; positions[1] = posA.y; positions[2] = posA.z;
      positions[3] = posB.x; positions[4] = posB.y; positions[5] = posB.z;
      line.geometry.attributes.position.needsUpdate = true;

      // Fade lines based on distance
      line.material.opacity = Math.max(0, 0.15 - (distance / 18) * 0.15);
    }

    // Subtle camera movement
    this.camera.position.x += (this.mouseX * 3 - this.camera.position.x) * 0.01;
    this.camera.position.y += (this.mouseY * 2 - this.camera.position.y) * 0.01;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    cancelAnimationFrame(this.animationId);

    if (this.boundMouseMove) {
      window.removeEventListener('mousemove', this.boundMouseMove);
    }
    if (this.boundResize) {
      window.removeEventListener('resize', this.boundResize);
    }

    // Dispose Three.js resources
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      this.scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    }
  }
}
