/**
 * Initialize webGPU
 * @returns {GPUAdapter, GPUDevice}
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
     return { adapter, device };
}
