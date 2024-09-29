import { Renderer } from "./renderer";

export class RenderingManager {
     private renderers: Map<string, Renderer>;

     constructor() {
          this.renderers = new Map<string, Renderer>();
     }

     public addRenderer(
          name: string,
          gpuDevice: GPUDevice,
          active: boolean
     ): Renderer {
          const renderer = new Renderer(name, gpuDevice, active);
          this.renderers.set(name, renderer);
          return renderer;
     }

     public removeRenderer(name: string) {
          if (this.renderers.has(name)) {
               this.renderers.delete(name);
               console.log(`Renderer ${name} removed.`);
          } else {
               console.log(`Renderer ${name} not found.`);
          }
     }

     public async renderAll() {
          // If needed add an "updater"
          this.renderers.forEach((renderer) => renderer.render());
     }
}
