import { RenderingManager } from "./rendering/classes/renderingManager";
import { initWebGPU } from "./rendering/init";
import { Pipeline } from "./rendering/classes/pipeline";
import { ScriptManager } from "./scripting/classes/scriptManager";
import { Script } from "./scripting/classes/script";

export const Engines = {
     Rendering: {
          manager: new RenderingManager(),
          initialize: initWebGPU,
          Pipeline: Pipeline,
     },
     Scripting: {
          manager: new ScriptManager(),
          script: Script,
     },
};
