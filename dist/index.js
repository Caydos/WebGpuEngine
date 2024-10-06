/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/engines/engines.ts":
/*!********************************!*\
  !*** ./src/engines/engines.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Engines: () => (/* binding */ Engines)\n/* harmony export */ });\n/* harmony import */ var _rendering_classes_renderingManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rendering/classes/renderingManager */ \"./src/engines/rendering/classes/renderingManager.ts\");\n/* harmony import */ var _rendering_init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rendering/init */ \"./src/engines/rendering/init.ts\");\n/* harmony import */ var _rendering_classes_pipeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rendering/classes/pipeline */ \"./src/engines/rendering/classes/pipeline.ts\");\n/* harmony import */ var _scripting_classes_scriptManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripting/classes/scriptManager */ \"./src/engines/scripting/classes/scriptManager.ts\");\n/* harmony import */ var _scripting_classes_script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripting/classes/script */ \"./src/engines/scripting/classes/script.ts\");\n\n\n\n\n\nconst Engines = {\n    Rendering: {\n        manager: new _rendering_classes_renderingManager__WEBPACK_IMPORTED_MODULE_0__.RenderingManager(),\n        initialize: _rendering_init__WEBPACK_IMPORTED_MODULE_1__.initWebGPU,\n        Pipeline: _rendering_classes_pipeline__WEBPACK_IMPORTED_MODULE_2__.Pipeline,\n    },\n    Scripting: {\n        manager: new _scripting_classes_scriptManager__WEBPACK_IMPORTED_MODULE_3__.ScriptManager(),\n        script: _scripting_classes_script__WEBPACK_IMPORTED_MODULE_4__.Script,\n    },\n};\n\n\n//# sourceURL=webpack://commander/./src/engines/engines.ts?");

/***/ }),

/***/ "./src/engines/rendering/classes/pipeline.ts":
/*!***************************************************!*\
  !*** ./src/engines/rendering/classes/pipeline.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Pipeline: () => (/* binding */ Pipeline)\n/* harmony export */ });\n/* harmony import */ var _loader_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader/loader */ \"./src/engines/rendering/loader/loader.ts\");\n\n/**\n * ! Old comments\n * Used to create rendering pipeline with custom shaders and topology\n * @param device\n * @param canvasFormat -> color format depending on the GPU [\"bgra8unorm\",\"rgba8unorm\"]\n * @param shadersPath -> path to the folder where the vertex.wgsl and fragment.wgsl are located\n * @param drawTypology -> type GPUPrimitiveTopology = \"point-list\" | \"line-list\" | \"line-strip\" | \"triangle-list\" | \"triangle-strip\"\n * @returns\n */\nclass Pipeline {\n    constructor(device, canvasFormat, shadersPath, drawTypology = \"triangle-list\") {\n        this.device = device;\n        this.canvasFormat = canvasFormat;\n        this.shadersPath = shadersPath;\n        this.drawTypology = drawTypology;\n    }\n    async init() {\n        this.pipeline = this.device.createRenderPipeline({\n            layout: \"auto\",\n            vertex: {\n                module: this.device.createShaderModule({\n                    code: await _loader_loader__WEBPACK_IMPORTED_MODULE_0__.loader.shaders.fragment(this.shadersPath + \"/vertex.wgsl\"),\n                }),\n                entryPoint: \"main\",\n            },\n            fragment: {\n                module: this.device.createShaderModule({\n                    code: await _loader_loader__WEBPACK_IMPORTED_MODULE_0__.loader.shaders.fragment(this.shadersPath + \"/fragment.wgsl\"),\n                }),\n                entryPoint: \"main\",\n                targets: [\n                    {\n                        format: this.canvasFormat,\n                    },\n                ],\n            },\n            primitive: {\n                topology: this.drawTypology,\n            },\n        });\n    }\n    get() {\n        return this.pipeline;\n    }\n}\n\n\n//# sourceURL=webpack://commander/./src/engines/rendering/classes/pipeline.ts?");

/***/ }),

/***/ "./src/engines/rendering/classes/renderer.ts":
/*!***************************************************!*\
  !*** ./src/engines/rendering/classes/renderer.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Renderer: () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _pipeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipeline */ \"./src/engines/rendering/classes/pipeline.ts\");\n\nclass Renderer {\n    constructor(name, gpuDevice, active) {\n        this.created = false;\n        this.canvas = document.createElement(\"canvas\");\n        this.canvas.id = name;\n        this.canvas.width = 500;\n        this.canvas.height = 500;\n        this.active = active;\n        document.body.appendChild(this.canvas);\n        this.gpuDevice = gpuDevice;\n        const observer = new ResizeObserver(() => {\n            this.canvas.width = this.canvas.clientWidth;\n            this.canvas.height = this.canvas.clientHeight;\n            // Note: You might want to add logic to resize your render target textures here.\n        });\n        observer.observe(this.canvas);\n        this.gpuCanvasContext = this.canvas.getContext(\"webgpu\");\n        // Note: Cant' say why this is required\n        if (!navigator.gpu) {\n            console.error(\"WebGPU is not supported on this browser.\");\n            return;\n        }\n        this.gpuTextureFormat = navigator.gpu.getPreferredCanvasFormat();\n        if (!this.gpuTextureFormat) {\n            console.error(\"GPU Texture format not found in renderer constructor\");\n        }\n        this.gpuCanvasContext.configure({\n            device: this.gpuDevice,\n            format: this.gpuTextureFormat,\n            alphaMode: \"opaque\",\n        });\n    }\n    async render() {\n        if (!this.created) {\n            if (!this.gpuTextureFormat) {\n                console.error(\"GPU Texture format not found when trying to render\");\n                return;\n            }\n            this.pipeline = new _pipeline__WEBPACK_IMPORTED_MODULE_0__.Pipeline(this.gpuDevice, this.gpuTextureFormat, \"shaders/default\");\n            await this.pipeline.init();\n            this.created = true;\n        }\n        if (!this.pipeline) {\n            console.error(\"Failed to find rendering pipeline in render call\");\n            return;\n        }\n        const commandEncoder = this.gpuDevice.createCommandEncoder();\n        const textureView = this.gpuCanvasContext\n            .getCurrentTexture()\n            .createView();\n        const renderPassDescriptor = {\n            colorAttachments: [\n                {\n                    view: textureView,\n                    clearValue: { r: 0.5, g: 0.0, b: 0.0, a: 1.0 },\n                    loadOp: \"clear\",\n                    storeOp: \"store\",\n                },\n            ],\n        };\n        const pipeline = this.pipeline.get();\n        if (pipeline) {\n            const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);\n            passEncoder.setPipeline(pipeline); //temp solution\n            passEncoder.draw(3, 1, 0, 0);\n            passEncoder.end();\n            this.gpuDevice.queue.submit([commandEncoder.finish()]);\n        }\n        else {\n            console.log(\"No working pipeline detected\");\n        }\n    }\n}\n\n\n//# sourceURL=webpack://commander/./src/engines/rendering/classes/renderer.ts?");

/***/ }),

/***/ "./src/engines/rendering/classes/renderingManager.ts":
/*!***********************************************************!*\
  !*** ./src/engines/rendering/classes/renderingManager.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RenderingManager: () => (/* binding */ RenderingManager)\n/* harmony export */ });\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ \"./src/engines/rendering/classes/renderer.ts\");\n\nclass RenderingManager {\n    constructor() {\n        this.renderers = new Map();\n    }\n    addRenderer(name, gpuDevice, active) {\n        const renderer = new _renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer(name, gpuDevice, active);\n        this.renderers.set(name, renderer);\n        return renderer;\n    }\n    removeRenderer(name) {\n        if (this.renderers.has(name)) {\n            this.renderers.delete(name);\n            console.log(`Renderer ${name} removed.`);\n        }\n        else {\n            console.log(`Renderer ${name} not found.`);\n        }\n    }\n    async renderAll() {\n        // If needed add an \"updater\"\n        this.renderers.forEach((renderer) => renderer.render());\n    }\n}\n\n\n//# sourceURL=webpack://commander/./src/engines/rendering/classes/renderingManager.ts?");

/***/ }),

/***/ "./src/engines/rendering/init.ts":
/*!***************************************!*\
  !*** ./src/engines/rendering/init.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initWebGPU: () => (/* binding */ initWebGPU)\n/* harmony export */ });\n/**\n * Initialize webGPU\n * @returns {GPUAdapter, GPUDevice}\n */\nasync function initWebGPU() {\n    if (!navigator.gpu) {\n        console.error(\"WebGPU is not supported on this browser.\");\n        return;\n    }\n    const adapter = await navigator.gpu.requestAdapter();\n    if (!adapter) {\n        console.error(\"Failed to get GPU adapter.\");\n        return;\n    }\n    const device = await adapter.requestDevice();\n    console.log(\"Nuhh huh it seems to work nicely\", device);\n    return { adapter, device };\n}\n\n\n//# sourceURL=webpack://commander/./src/engines/rendering/init.ts?");

/***/ }),

/***/ "./src/engines/rendering/loader/loader.ts":
/*!************************************************!*\
  !*** ./src/engines/rendering/loader/loader.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loader: () => (/* binding */ loader)\n/* harmony export */ });\n/* harmony import */ var _shaders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders */ \"./src/engines/rendering/loader/shaders.ts\");\n\nconst loader = {\n    shaders: _shaders__WEBPACK_IMPORTED_MODULE_0__,\n};\n\n\n//# sourceURL=webpack://commander/./src/engines/rendering/loader/loader.ts?");

/***/ }),

/***/ "./src/engines/rendering/loader/shaders.ts":
/*!*************************************************!*\
  !*** ./src/engines/rendering/loader/shaders.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fragment: () => (/* binding */ fragment),\n/* harmony export */   vertex: () => (/* binding */ vertex)\n/* harmony export */ });\n/**\n * Loads the vertex shader\n * @param path -> path from the .html file\n * @returns\n */\nasync function vertex(path) {\n    const response = await fetch(path);\n    if (!response.ok) {\n        throw new Error(`Failed to load vertex shader: ${path}`);\n    }\n    return await response.text();\n}\n/**\n * Loads the fragment shader\n * @param path -> path from the .html file\n * @returns\n */\nasync function fragment(path) {\n    const response = await fetch(path);\n    if (!response.ok) {\n        throw new Error(`Failed to load fragment shader: ${path}`);\n    }\n    return await response.text();\n}\n\n\n//# sourceURL=webpack://commander/./src/engines/rendering/loader/shaders.ts?");

/***/ }),

/***/ "./src/engines/scripting/classes/script.ts":
/*!*************************************************!*\
  !*** ./src/engines/scripting/classes/script.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Script: () => (/* binding */ Script)\n/* harmony export */ });\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/utils */ \"./src/utils/utils.ts\");\n\nclass Script {\n    log(...args) {\n        _utils_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.Logs.write(\"[Script:\", this.name, \"] - \", ...args);\n    }\n    constructor(path) {\n        /**\n         * Prevents ticks from overlapping\n         */\n        this.isTicking = false;\n        this.worker = new Worker(path);\n        this.name = _utils_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.Files.findNameFromPath(path);\n        this.worker.postMessage({ type: \"initialized\" });\n    }\n    getName() {\n        return this.name;\n    }\n    setName(name) {\n        this.name = name;\n    }\n    async tick() {\n        if (this.isTicking) {\n            // this.log(\"Tick is already running\");\n            return;\n        }\n        this.isTicking = true;\n        new Promise((resolve, reject) => {\n            this.worker.postMessage({ type: \"tick\" });\n            this.worker.onmessage = (event) => {\n                if (event.data.type === \"tickCompleted\") {\n                    this.isTicking = false;\n                    resolve();\n                }\n                if (event.data.type === \"log\") {\n                    this.log(event.data.message);\n                }\n            };\n            this.worker.onerror = (error) => {\n                this.log(\"Error in worker tick:\", error);\n                this.isTicking = false;\n                reject(error);\n            };\n        });\n    }\n}\n\n\n//# sourceURL=webpack://commander/./src/engines/scripting/classes/script.ts?");

/***/ }),

/***/ "./src/engines/scripting/classes/scriptManager.ts":
/*!********************************************************!*\
  !*** ./src/engines/scripting/classes/scriptManager.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ScriptManager: () => (/* binding */ ScriptManager)\n/* harmony export */ });\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ \"./src/engines/scripting/classes/script.ts\");\n\nclass ScriptManager {\n    constructor() {\n        this.scripts = [];\n    }\n    /**\n     * !Temporary public, waiting for the server API that will use start/stop/ensure cmds\n     * @param path\n     */\n    addScript(path) {\n        const newScript = new _script__WEBPACK_IMPORTED_MODULE_0__.Script(path);\n        this.scripts.push(newScript);\n    }\n    /**\n     * !Temporary public, waiting for the server API that will use start/stop/ensure cmds\n     * @param name\n     */\n    removeScript(name) { }\n    // public start(resourceName: string): void {\n    //      let alreadyRunning: boolean = false;\n    //      for (const script of this.scripts) {\n    //           if (script.getName() === resourceName) {\n    //                alreadyRunning = true;\n    //                break;\n    //           }\n    //      }\n    //      if (alreadyRunning) {\n    //           console.log(\n    //                `Script with name ${resourceName} is already running.`\n    //           );\n    //           return;\n    //      }\n    //      // this.addScript(\"\");\n    // }\n    tickAll() {\n        this.scripts.forEach((script) => {\n            script.tick();\n        });\n    }\n}\n\n\n//# sourceURL=webpack://commander/./src/engines/scripting/classes/scriptManager.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _engines_engines__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engines/engines */ \"./src/engines/engines.ts\");\n/* harmony import */ var _engines_rendering_classes_renderingManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engines/rendering/classes/renderingManager */ \"./src/engines/rendering/classes/renderingManager.ts\");\n\n\nasync function main() {\n    const renderingDetails = await _engines_engines__WEBPACK_IMPORTED_MODULE_0__.Engines.Rendering.initialize();\n    if (!renderingDetails) {\n        console.error(\"Failed to get rendering details\");\n        return;\n    }\n    const renderingManager = new _engines_rendering_classes_renderingManager__WEBPACK_IMPORTED_MODULE_1__.RenderingManager();\n    renderingManager.addRenderer(\"main\", renderingDetails.device, true);\n    /*\n     * Hardcoded for now, waiting for server API\n     */\n    _engines_engines__WEBPACK_IMPORTED_MODULE_0__.Engines.Scripting.manager.addScript(\"scripts/test/client/test.js\");\n    async function loop() {\n        _engines_engines__WEBPACK_IMPORTED_MODULE_0__.Engines.Scripting.manager.tickAll();\n        renderingManager.renderAll();\n        requestAnimationFrame(loop);\n    }\n    loop();\n}\nmain();\n\n\n//# sourceURL=webpack://commander/./src/index.ts?");

/***/ }),

/***/ "./src/utils/files/files.ts":
/*!**********************************!*\
  !*** ./src/utils/files/files.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Files: () => (/* binding */ Files)\n/* harmony export */ });\n/* harmony import */ var _functions_findNameFromPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/findNameFromPath */ \"./src/utils/files/functions/findNameFromPath.ts\");\n\nconst Files = {\n    findNameFromPath: _functions_findNameFromPath__WEBPACK_IMPORTED_MODULE_0__.findNameFromPath,\n};\n\n\n//# sourceURL=webpack://commander/./src/utils/files/files.ts?");

/***/ }),

/***/ "./src/utils/files/functions/findNameFromPath.ts":
/*!*******************************************************!*\
  !*** ./src/utils/files/functions/findNameFromPath.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   findNameFromPath: () => (/* binding */ findNameFromPath)\n/* harmony export */ });\nfunction findNameFromPath(path) {\n    const parts = path.split(/[/\\\\]/);\n    return parts[parts.length - 1];\n}\n\n\n//# sourceURL=webpack://commander/./src/utils/files/functions/findNameFromPath.ts?");

/***/ }),

/***/ "./src/utils/logs/functions/write.ts":
/*!*******************************************!*\
  !*** ./src/utils/logs/functions/write.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   write: () => (/* binding */ write)\n/* harmony export */ });\nfunction write(...args) {\n    console.log(...args);\n}\n\n\n//# sourceURL=webpack://commander/./src/utils/logs/functions/write.ts?");

/***/ }),

/***/ "./src/utils/logs/logs.ts":
/*!********************************!*\
  !*** ./src/utils/logs/logs.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Logs: () => (/* binding */ Logs)\n/* harmony export */ });\n/* harmony import */ var _functions_write__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/write */ \"./src/utils/logs/functions/write.ts\");\n\nconst Logs = {\n    write: _functions_write__WEBPACK_IMPORTED_MODULE_0__.write,\n};\n\n\n//# sourceURL=webpack://commander/./src/utils/logs/logs.ts?");

/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Utils: () => (/* binding */ Utils)\n/* harmony export */ });\n/* harmony import */ var _files_files__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./files/files */ \"./src/utils/files/files.ts\");\n/* harmony import */ var _logs_logs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logs/logs */ \"./src/utils/logs/logs.ts\");\n\n\nconst Utils = {\n    Files: _files_files__WEBPACK_IMPORTED_MODULE_0__.Files,\n    Logs: _logs_logs__WEBPACK_IMPORTED_MODULE_1__.Logs,\n};\n\n\n//# sourceURL=webpack://commander/./src/utils/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;