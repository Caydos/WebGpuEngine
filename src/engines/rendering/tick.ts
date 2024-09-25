/**
 * Main tick function to run the whole rendering process
 * @param device -> GPU Device used
 * @param context
 * @param pipeline -> Used pipeline
 */

export function tick(
     device: GPUDevice,
     context: GPUCanvasContext,
     pipeline: GPURenderPipeline
) {
     const commandEncoder = device.createCommandEncoder();
     const textureView = context.getCurrentTexture().createView();

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

     const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
     passEncoder.setPipeline(pipeline);
     passEncoder.draw(3, 1, 0, 0);
     passEncoder.end();

     device.queue.submit([commandEncoder.finish()]);
}
