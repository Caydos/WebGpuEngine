import { Pipeline } from "./pipeline";

export class Renderer {
     private canvas: HTMLCanvasElement;
     private gpuDevice: GPUDevice;
     private gpuCanvasContext: GPUCanvasContext;
     private gpuTextureFormat: GPUTextureFormat | undefined;
     private active: boolean;

     /*
          !Temp solutions
     */
     private created: boolean;
     private pipeline: Pipeline | undefined;

     constructor(name: string, gpuDevice: GPUDevice, active: boolean) {
          this.created = false;

          this.canvas = document.createElement("canvas");
          this.canvas.id = name;
          this.canvas.width = 500;
          this.canvas.height = 500;
          this.active = active;

          document.body.appendChild(this.canvas);
          this.gpuDevice = gpuDevice;
          const observer = new ResizeObserver(() => {
               this.canvas.width = this.canvas.clientWidth;
               this.canvas.height = this.canvas.clientHeight;

               // Note: You might want to add logic to resize your render target textures here.
          });
          observer.observe(this.canvas);

          this.gpuCanvasContext = this.canvas.getContext(
               "webgpu"
          ) as GPUCanvasContext;

          // Note: Cant' say why this is required
          if (!navigator.gpu) {
               console.error("WebGPU is not supported on this browser.");
               return;
          }
          this.gpuTextureFormat = navigator.gpu.getPreferredCanvasFormat();
          if (!this.gpuTextureFormat) {
               console.error(
                    "GPU Texture format not found in renderer constructor"
               );
          }
          this.gpuCanvasContext.configure({
               device: this.gpuDevice,
               format: this.gpuTextureFormat,
               alphaMode: "opaque",
          });
     }

     public async render() {
          if (!this.created) {
               if (!this.gpuTextureFormat) {
                    console.error(
                         "GPU Texture format not found when trying to render"
                    );
                    return;
               }
               this.pipeline = new Pipeline(
                    this.gpuDevice,
                    this.gpuTextureFormat,
                    "shaders/default"
               );
               await this.pipeline.init();

               this.created = true;
          }
          if (!this.pipeline) {
               console.error(
                    "Failed to find rendering pipeline in render call"
               );
               return;
          }
          const commandEncoder = this.gpuDevice.createCommandEncoder();
          const textureView = this.gpuCanvasContext
               .getCurrentTexture()
               .createView();

          const renderPassDescriptor: GPURenderPassDescriptor = {
               colorAttachments: [
                    {
                         view: textureView,
                         clearValue: { r: 0.5, g: 0.0, b: 0.0, a: 1.0 },
                         loadOp: "clear",
                         storeOp: "store",
                    },
               ],
          };

          const pipeline = this.pipeline.get();
          if (pipeline) {
               const passEncoder =
                    commandEncoder.beginRenderPass(renderPassDescriptor);
               passEncoder.setPipeline(pipeline); //temp solution
               passEncoder.draw(3, 1, 0, 0);
               passEncoder.end();
               this.gpuDevice.queue.submit([commandEncoder.finish()]);
          } else {
               console.log("No working pipeline detected");
          }
     }
}
