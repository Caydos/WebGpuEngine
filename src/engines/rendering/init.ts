// import { tick } from "./tick";
// import { createPipeline } from "./pipeline";

/**
 * !Entry point of the program (need be changed)
 * @returns
 */

export async function initWebGPU() {
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

     // const context = canvas.getContext("webgpu") as GPUCanvasContext;

     // const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
     // context.configure({
     //      device,
     //      format: presentationFormat,
     //      alphaMode: "opaque",
     // });

     // const pipeline = await createPipeline(
     //      device,
     //      presentationFormat,
     //      "/shaders/default"
     // );

     // function frame() {
     //      tick(device!, context, pipeline);
     //      requestAnimationFrame(frame);
     // }
     // requestAnimationFrame(frame);
     return { adapter, device };
}
