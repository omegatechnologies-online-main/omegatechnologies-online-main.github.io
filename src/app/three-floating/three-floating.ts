import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy,
  NgZone, PLATFORM_ID, Inject, Input
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-three-floating',
  standalone: true,
  template: `<canvas #floatingCanvas class="three-floating-canvas" aria-hidden="true"></canvas>`,
  styles: [`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .three-floating-canvas {
      width: 100%;
      height: 100%;
      display: block;
      opacity: 0;
      transition: opacity 2s ease-in-out;
    }
    .three-floating-canvas.loaded {
      opacity: 1;
    }
  `]
})
export class ThreeFloating implements AfterViewInit, OnDestroy {
  @ViewChild('floatingCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() variant: 'contact' | 'team' = 'contact';

  private renderer: any;
  private scene: any;
  private camera: any;
  private animationId: number = 0;
  private shapes: any[] = [];
  private clock: any;
  private destroyed = false;
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
      this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      this.camera.position.z = 40;

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

      // Create floating shapes based on variant
      const shapeConfigs = this.variant === 'contact'
        ? this.getContactShapes(THREE)
        : this.getTeamShapes(THREE);

      for (const config of shapeConfigs) {
        const material = new THREE.MeshPhysicalMaterial({
          color: config.color,
          transparent: true,
          opacity: config.opacity || 0.15,
          roughness: 0.1,
          metalness: 0.3,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          wireframe: config.wireframe || false,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(config.geometry, material);
        mesh.position.set(config.x, config.y, config.z);
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        (mesh as any).rotationSpeed = {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.003
        };
        (mesh as any).floatSpeed = Math.random() * 0.5 + 0.3;
        (mesh as any).floatAmplitude = Math.random() * 1.5 + 0.5;
        (mesh as any).originalY = config.y;

        this.scene.add(mesh);
        this.shapes.push(mesh);
      }

      // Soft lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xF05454, 0.4);
      directionalLight.position.set(10, 10, 10);
      this.scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0x30475E, 0.6, 100);
      pointLight.position.set(-10, -10, 5);
      this.scene.add(pointLight);

      // Resize
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

      // Animate
      this.ngZone.runOutsideAngular(() => {
        this.animate();
      });
    } catch (err) {
      console.warn('Three.js floating failed to initialize:', err);
    }
  }

  private getContactShapes(THREE: any): any[] {
    return [
      { geometry: new THREE.IcosahedronGeometry(4, 0), color: 0xF05454, opacity: 0.12, x: -18, y: 8, z: -10 },
      { geometry: new THREE.TorusKnotGeometry(2.5, 0.7, 64, 8), color: 0x30475E, opacity: 0.1, x: 20, y: -5, z: -15 },
      { geometry: new THREE.OctahedronGeometry(3, 0), color: 0xF05454, opacity: 0.08, x: 15, y: 12, z: -8, wireframe: true },
      { geometry: new THREE.TetrahedronGeometry(2.5, 0), color: 0x30475E, opacity: 0.1, x: -12, y: -10, z: -12 },
      { geometry: new THREE.DodecahedronGeometry(2, 0), color: 0xFF7A7A, opacity: 0.06, x: 25, y: 6, z: -20 },
      { geometry: new THREE.TorusGeometry(3, 0.8, 16, 32), color: 0x30475E, opacity: 0.07, x: -22, y: -8, z: -18, wireframe: true },
    ];
  }

  private getTeamShapes(THREE: any): any[] {
    return [
      { geometry: new THREE.IcosahedronGeometry(5, 1), color: 0xF05454, opacity: 0.1, x: -20, y: 10, z: -12, wireframe: true },
      { geometry: new THREE.SphereGeometry(3, 16, 16), color: 0x30475E, opacity: 0.08, x: 22, y: -8, z: -10 },
      { geometry: new THREE.ConeGeometry(2.5, 5, 6), color: 0xF05454, opacity: 0.1, x: 18, y: 12, z: -15 },
      { geometry: new THREE.TorusKnotGeometry(2, 0.6, 64, 8, 2, 3), color: 0x30475E, opacity: 0.12, x: -15, y: -6, z: -8 },
      { geometry: new THREE.OctahedronGeometry(2.5, 0), color: 0xFF7A7A, opacity: 0.07, x: 8, y: -12, z: -20 },
      { geometry: new THREE.RingGeometry(2, 4, 32), color: 0x30475E, opacity: 0.06, x: -8, y: 15, z: -18, wireframe: true },
    ];
  }

  private animate(): void {
    if (this.destroyed) return;

    this.animationId = requestAnimationFrame(() => this.animate());
    const elapsed = this.clock.getElapsedTime();

    for (const shape of this.shapes) {
      shape.rotation.x += shape.rotationSpeed.x;
      shape.rotation.y += shape.rotationSpeed.y;
      shape.rotation.z += shape.rotationSpeed.z;

      // Floating motion
      shape.position.y = shape.originalY + Math.sin(elapsed * shape.floatSpeed) * shape.floatAmplitude;
    }

    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    cancelAnimationFrame(this.animationId);

    if (this.boundResize) {
      window.removeEventListener('resize', this.boundResize);
    }

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
