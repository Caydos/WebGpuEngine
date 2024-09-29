import { loader } from "../loader/loader";

/**
 * ! Old comments
 * Used to create rendering pipeline with custom shaders and topology
 * @param device
 * @param canvasFormat -> color format depending on the GPU ["bgra8unorm","rgba8unorm"]
 * @param shadersPath -> path to the folder where the vertex.wgsl and fragment.wgsl are located
 * @param drawTypology -> type GPUPrimitiveTopology = "point-list" | "line-list" | "line-strip" | "triangle-list" | "triangle-strip"
 * @returns
 */
export class Pipeline {
     private pipeline: GPURenderPipeline | undefined;

     constructor(
          private device: GPUDevice,
          private canvasFormat: GPUTextureFormat,
          private shadersPath: string,
          private drawTypology: GPUPrimitiveTopology = "triangle-list"
     ) {}

     public async init(): Promise<void> {
          this.pipeline = this.device.createRenderPipeline({
               layout: "auto",
               vertex: {
                    module: this.device.createShaderModule({
                         code: await loader.shaders.fragment(
                              this.shadersPath + "/vertex.wgsl"
                         ),
                    }),
                    entryPoint: "main",
               },
               fragment: {
                    module: this.device.createShaderModule({
                         code: await loader.shaders.fragment(
                              this.shadersPath + "/fragment.wgsl"
                         ),
                    }),
                    entryPoint: "main",
                    targets: [
                         {
                              format: this.canvasFormat,
                         },
                    ],
               },
               primitive: {
                    topology: this.drawTypology,
               },
          });
     }

     public get(): GPURenderPipeline | undefined {
          return this.pipeline;
     }
}
