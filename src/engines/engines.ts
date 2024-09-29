import { RenderingManager } from "./rendering/classes/renderingManager";
import { initWebGPU } from "./rendering/init";
import { Pipeline } from "./rendering/classes/pipeline";
/**
 * ! Later issues because this will need to be accessible in all scripts (checks needed for manager to make sure only one is created)
 */
export const Engines = {
     Rendering: {
          manager: new RenderingManager(),
          initialize: initWebGPU,
          Pipeline: Pipeline,
     },
     Scripting: {},
};
