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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   rendering: () => (/* binding */ rendering)\n/* harmony export */ });\n/* harmony import */ var _rendering_class_renderingManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rendering/class/renderingManager */ \"./src/engines/rendering/class/renderingManager.ts\");\n/* harmony import */ var _rendering_init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rendering/init */ \"./src/engines/rendering/init.ts\");\n/* harmony import */ var _rendering_pipeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rendering/pipeline */ \"./src/engines/rendering/pipeline.ts\");\n\n\n\nconst manager = new _rendering_class_renderingManager__WEBPACK_IMPORTED_MODULE_0__.RenderingManager();\nconst rendering = {\n    manager,\n    initialize: _rendering_init__WEBPACK_IMPORTED_MODULE_1__.initWebGPU,\n    pipeline: _rendering_pipeline__WEBPACK_IMPORTED_MODULE_2__.pipeline,\n};\n\n\n//# sourceURL=webpack://commander/./src/engines/engines.ts?");

/***/ }),

/***/ "./src/engines/rendering/class/renderer.ts":
/*!*************************************************!*\
  !*** ./src/engines/rendering/class/renderer.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Renderer: () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _pipeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pipeline */ \"./src/engines/rendering/pipeline.ts\");\n\nclass Renderer {\n    constructor(name, gpuDevice, active) {\n        // this.pipeline = new GPURenderPipeline();\n        this.created = false;\n        this.canvas = document.createElement(\"canvas\");\n        this.canvas.id = name;\n        this.canvas.width = 500;\n        this.canvas.height = 500;\n        this.active = active;\n        document.body.appendChild(this.canvas);\n        this.gpuDevice = gpuDevice;\n        const observer = new ResizeObserver(() => {\n            this.canvas.width = this.canvas.clientWidth;\n            this.canvas.height = this.canvas.clientHeight;\n            // Note: You might want to add logic to resize your render target textures here.\n        });\n        observer.observe(this.canvas);\n        this.gpuCanvasContext = this.canvas.getContext(\"webgpu\");\n        // Note: Cant' say why this is required\n        if (!navigator.gpu) {\n            console.error(\"WebGPU is not supported on this browser.\");\n            return;\n        }\n        this.gpuTextureFormat = navigator.gpu.getPreferredCanvasFormat();\n        if (!this.gpuTextureFormat) {\n            console.error(\"GPU Texture format not found in renderer constructor\");\n        }\n        this.gpuCanvasContext.configure({\n            device: this.gpuDevice,\n            format: this.gpuTextureFormat,\n            alphaMode: \"opaque\",\n        });\n    }\n    async render() {\n        if (!this.created) {\n            if (!this.gpuTextureFormat) {\n                console.error(\"GPU Texture format not found when trying to render\");\n                return;\n            }\n            this.pipeline = await _pipeline__WEBPACK_IMPORTED_MODULE_0__.pipeline.create(this.gpuDevice, this.gpuTextureFormat, \"shaders/default\");\n            this.created = true;\n        }\n        if (!this.pipeline) {\n            console.error(\"Failed to find rendering pipeline in render call\");\n            return;\n        }\n        const commandEncoder = this.gpuDevice.createCommandEncoder();\n        const textureView = this.gpuCanvasContext\n            .getCurrentTexture()\n            .createView();\n        const renderPassDescriptor = {\n            colorAttachments: [\n                {\n                    view: textureView,\n                    clearValue: { r: 0.5, g: 0.0, b: 0.0, a: 1.0 },\n                    loadOp: \"clear\",\n                    storeOp: \"store\",\n                },\n            ],\n        };\n        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);\n        passEncoder.setPipeline(this.pipeline); //temp solution\n        passEncoder.draw(3, 1, 0, 0);\n        passEncoder.end();\n        this.gpuDevice.queue.submit([commandEncoder.finish()]);\n    }\n}\n\n\n//# sourceURL=webpack://commander/./src/engines/rendering/class/renderer.ts?");

/***/ }),

/***/ "./src/engines/rendering/class/renderingManager.ts":
/*!*********************************************************!*\
  !*** ./src/engines/rendering/class/renderingManager.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RenderingManager: () => (/* binding */ RenderingManager)\n/* harmony export */ });\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ \"./src/engines/rendering/class/renderer.ts\");\n\nclass RenderingManager {\n    constructor() {\n        this.renderers = new Map();\n    }\n    addRenderer(name, gpuDevice, active) {\n        const renderer = new _renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer(name, gpuDevice, active);\n        this.renderers.set(name, renderer);\n        return renderer;\n    }\n    removeRenderer(name) {\n        if (this.renderers.has(name)) {\n            this.renderers.delete(name);\n            console.log(`Renderer ${name} removed.`);\n        }\n        else {\n            console.log(`Renderer ${name} not found.`);\n        }\n    }\n    renderAll() {\n        this.renderers.forEach((renderer) => renderer.render());\n        // Use requestAnimationFrame to keep the loop running\n        requestAnimationFrame(() => this.renderAll());\n    }\n}\n\n\n//# sourceURL=webpack://commander/./src/engines/rendering/class/renderingManager.ts?");

/***/ }),

/***/ "./src/engines/rendering/init.ts":
/*!***************************************!*\
  !*** ./src/engines/rendering/init.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initWebGPU: () => (/* binding */ initWebGPU)\n/* harmony export */ });\n// import { tick } from \"./tick\";\n// import { createPipeline } from \"./pipeline\";\n/**\n * !Entry point of the program (need be changed)\n * @returns\n */\nasync function initWebGPU() {\n    if (!navigator.gpu) {\n        console.error(\"WebGPU is not supported on this browser.\");\n        return;\n    }\n    const adapter = await navigator.gpu.requestAdapter();\n    if (!adapter) {\n        console.error(\"Failed to get GPU adapter.\");\n        return;\n    }\n    const device = await adapter.requestDevice();\n    console.log(\"Nuhh huh it seems to work nicely\", device);\n    // const context = canvas.getContext(\"webgpu\") as GPUCanvasContext;\n    // const presentationFormat = navigator.gpu.getPreferredCanvasFormat();\n    // context.configure({\n    //      device,\n    //      format: presentationFormat,\n    //      alphaMode: \"opaque\",\n    // });\n    // const pipeline = await createPipeline(\n    //      device,\n    //      presentationFormat,\n    //      \"/shaders/default\"\n    // );\n    // function frame() {\n    //      tick(device!, context, pipeline);\n    //      requestAnimationFrame(frame);\n    // }\n    // requestAnimationFrame(frame);\n    return { adapter, device };\n}\n\n\n//# sourceURL=webpack://commander/./src/engines/rendering/init.ts?");

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

/***/ "./src/engines/rendering/pipeline.ts":
/*!*******************************************!*\
  !*** ./src/engines/rendering/pipeline.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pipeline: () => (/* binding */ pipeline)\n/* harmony export */ });\n/* harmony import */ var _loader_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader/loader */ \"./src/engines/rendering/loader/loader.ts\");\n\nconst pipeline = {\n    /**\n     * Used to create rendering pipeline with custom shaders and topology\n     * @param device\n     * @param canvasFormat -> color format depending on the GPU [\"bgra8unorm\",\"rgba8unorm\"]\n     * @param shadersPath -> path to the folder where the vertex.wgsl and fragment.wgsl are located\n     * @param drawTypology -> type GPUPrimitiveTopology = \"point-list\" | \"line-list\" | \"line-strip\" | \"triangle-list\" | \"triangle-strip\"\n     * @returns\n     */\n    create: async function (device, canvasFormat, shadersPath, drawTypology = \"triangle-list\") {\n        const pipeline = device.createRenderPipeline({\n            layout: \"auto\",\n            vertex: {\n                module: device.createShaderModule({\n                    code: await _loader_loader__WEBPACK_IMPORTED_MODULE_0__.loader.shaders.fragment(shadersPath + \"/vertex.wgsl\"),\n                }),\n                entryPoint: \"main\",\n            },\n            fragment: {\n                module: device.createShaderModule({\n                    code: await _loader_loader__WEBPACK_IMPORTED_MODULE_0__.loader.shaders.fragment(shadersPath + \"/fragment.wgsl\"),\n                }),\n                entryPoint: \"main\",\n                targets: [\n                    {\n                        format: canvasFormat,\n                    },\n                ],\n            },\n            primitive: {\n                topology: drawTypology,\n            },\n        });\n        return pipeline;\n    },\n};\n\n\n//# sourceURL=webpack://commander/./src/engines/rendering/pipeline.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _engines_engines__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engines/engines */ \"./src/engines/engines.ts\");\n/* harmony import */ var _engines_rendering_class_renderingManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engines/rendering/class/renderingManager */ \"./src/engines/rendering/class/renderingManager.ts\");\n\n\nasync function main() {\n    const renderingDetails = await _engines_engines__WEBPACK_IMPORTED_MODULE_0__.rendering.initialize();\n    if (!renderingDetails) {\n        console.error(\"Failed to get rendering details\");\n        return;\n    }\n    const renderingManager = new _engines_rendering_class_renderingManager__WEBPACK_IMPORTED_MODULE_1__.RenderingManager();\n    renderingManager.addRenderer(\"main\", renderingDetails.device, true);\n    renderingManager.renderAll();\n}\nmain();\n\n\n//# sourceURL=webpack://commander/./src/index.ts?");

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