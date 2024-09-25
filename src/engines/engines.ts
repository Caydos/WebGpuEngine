import { RenderingManager } from "./rendering/class/renderingManager";
import { initWebGPU } from "./rendering/init";
import { pipeline } from "./rendering/pipeline";

const manager = new RenderingManager();

export const rendering = {
     manager,
     initialize: initWebGPU,
     pipeline: pipeline,
};
