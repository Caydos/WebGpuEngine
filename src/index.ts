import { rendering } from "./engines/engines";
import { RenderingManager } from "./engines/rendering/class/renderingManager";
async function main() {
     const renderingDetails = await rendering.initialize();
     if (!renderingDetails) {
          console.error("Failed to get rendering details");
          return;
     }
     const renderingManager = new RenderingManager();
     renderingManager.addRenderer("main", renderingDetails.device, true);

     renderingManager.renderAll();
}

main();
