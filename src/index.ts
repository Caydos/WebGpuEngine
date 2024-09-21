import vertexShader from "./shaders/vertex.wgsl";
import fragmentShader from "./shaders/fragment.wgsl";
import { tick } from "./engine/main";

async function initWebGPU() {
     if (!navigator.gpu) {
          console.error("WebGPU is not supported on this browser.");
          return;
     }

     const adapter = await navigator.gpu.requestAdapter();
     if (!adapter) {
          console.error("Failed to get GPU adapter.");
          return;
     }

     const device = await adapter.requestDevice();
     console.log("Nuhh huh it seems to work nicely", device);

     const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
     if (!canvas) {
          console.error("Failed to canvas.");
          return;
     }

     const observer = new ResizeObserver(() => {
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;

          // Note: You might want to add logic to resize your render target textures here.
     });
     observer.observe(canvas);
     const context = canvas.getContext("webgpu") as GPUCanvasContext;

     const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
     context.configure({
          device,
          format: presentationFormat,
          alphaMode: "opaque",
     });

     const pipeline = device.createRenderPipeline({
          layout: "auto",
          vertex: {
               module: device.createShaderModule({
                    code: vertexShader,
               }),
               entryPoint: "main",
          },
          fragment: {
               module: device.createShaderModule({
                    code: fragmentShader,
               }),
               entryPoint: "main",
               targets: [
                    {
                         format: presentationFormat,
                    },
               ],
          },
          primitive: {
               topology: "triangle-list",
          },
     });

     function frame() {
          tick(device!, context, pipeline);
          requestAnimationFrame(frame);
     }
     requestAnimationFrame(frame);
}

initWebGPU();
