import { Renderer } from "./renderer";

export class RenderingManager {
     private renderers: Map<string, Renderer>;

     constructor() {
          this.renderers = new Map<string, Renderer>();
     }

     addRenderer(
          name: string,
          gpuDevice: GPUDevice,
          active: boolean
     ): Renderer {
          const renderer = new Renderer(name, gpuDevice, active);
          this.renderers.set(name, renderer);
          return renderer;
     }

     removeRenderer(name: string): void {
          if (this.renderers.has(name)) {
               this.renderers.delete(name);
               console.log(`Renderer ${name} removed.`);
          } else {
               console.log(`Renderer ${name} not found.`);
          }
     }

     renderAll(): void {
          this.renderers.forEach((renderer) => renderer.render());

          // Use requestAnimationFrame to keep the loop running
          requestAnimationFrame(() => this.renderAll());
     }
}
