import { loader } from "./loader/loader";

export const pipeline = {
     /**
      * Used to create rendering pipeline with custom shaders and topology
      * @param device
      * @param canvasFormat -> color format depending on the GPU ["bgra8unorm","rgba8unorm"]
      * @param shadersPath -> path to the folder where the vertex.wgsl and fragment.wgsl are located
      * @param drawTypology -> type GPUPrimitiveTopology = "point-list" | "line-list" | "line-strip" | "triangle-list" | "triangle-strip"
      * @returns
      */
     create: async function (
          device: GPUDevice,
          canvasFormat: GPUTextureFormat,
          shadersPath: string,
          drawTypology: GPUPrimitiveTopology = "triangle-list"
     ): Promise<GPURenderPipeline> {
          const pipeline = device.createRenderPipeline({
               layout: "auto",
               vertex: {
                    module: device.createShaderModule({
                         code: await loader.shaders.fragment(
                              shadersPath + "/vertex.wgsl"
                         ),
                    }),
                    entryPoint: "main",
               },
               fragment: {
                    module: device.createShaderModule({
                         code: await loader.shaders.fragment(
                              shadersPath + "/fragment.wgsl"
                         ),
                    }),
                    entryPoint: "main",
                    targets: [
                         {
                              format: canvasFormat,
                         },
                    ],
               },
               primitive: {
                    topology: drawTypology,
               },
          });
          return pipeline;
     },
};
