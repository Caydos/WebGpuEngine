import { Engines } from "./engines/engines";
import { RenderingManager } from "./engines/rendering/classes/renderingManager";

async function main() {
     const renderingDetails = await Engines.Rendering.initialize();
     if (!renderingDetails) {
          console.error("Failed to get rendering details");
          return;
     }
     const renderingManager = new RenderingManager();
     renderingManager.addRenderer("main", renderingDetails.device, true);

     async function loop() {
          renderingManager.renderAll();

          requestAnimationFrame(loop);
     }
     loop();
}

main();
