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

/***/ "./src/shaders/fragment.wgsl":
/*!***********************************!*\
  !*** ./src/shaders/fragment.wgsl ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"@fragment\\r\\nfn main() -> @location(0) vec4<f32> {\\r\\n  return vec4(0.0, 0.0, 1.0, 1.0);\\r\\n}\");\n\n//# sourceURL=webpack://commander/./src/shaders/fragment.wgsl?");

/***/ }),

/***/ "./src/shaders/vertex.wgsl":
/*!*********************************!*\
  !*** ./src/shaders/vertex.wgsl ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"@vertex\\r\\nfn main(\\r\\n  @builtin(vertex_index) VertexIndex : u32\\r\\n) -> @builtin(position) vec4<f32> {\\r\\n  var pos = array<vec2<f32>, 3>(\\r\\n    vec2(0.0, 0.5),\\r\\n    vec2(-0.5, -0.5),\\r\\n    vec2(0.5, -0.5)\\r\\n  );\\r\\n\\r\\n  return vec4<f32>(pos[VertexIndex], 0.0, 1.0);\\r\\n}\");\n\n//# sourceURL=webpack://commander/./src/shaders/vertex.wgsl?");

/***/ }),

/***/ "./src/engine/main.ts":
/*!****************************!*\
  !*** ./src/engine/main.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   tick: () => (/* binding */ tick)\n/* harmony export */ });\nfunction tick(device, context, pipeline) {\n    const commandEncoder = device.createCommandEncoder();\n    const textureView = context.getCurrentTexture().createView();\n    const renderPassDescriptor = {\n        colorAttachments: [\n            {\n                view: textureView,\n                clearValue: { r: 0.0, g: 0.0, b: 0.3, a: 1.0 },\n                loadOp: \"clear\",\n                storeOp: \"store\",\n            },\n        ],\n    };\n    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);\n    passEncoder.setPipeline(pipeline);\n    passEncoder.draw(3, 1, 0, 0);\n    passEncoder.end();\n    device.queue.submit([commandEncoder.finish()]);\n}\n\n\n//# sourceURL=webpack://commander/./src/engine/main.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shaders_vertex_wgsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders/vertex.wgsl */ \"./src/shaders/vertex.wgsl\");\n/* harmony import */ var _shaders_fragment_wgsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/fragment.wgsl */ \"./src/shaders/fragment.wgsl\");\n/* harmony import */ var _engine_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./engine/main */ \"./src/engine/main.ts\");\n\n\n\nasync function initWebGPU() {\n    if (!navigator.gpu) {\n        console.error(\"WebGPU is not supported on this browser.\");\n        return;\n    }\n    const adapter = await navigator.gpu.requestAdapter();\n    if (!adapter) {\n        console.error(\"Failed to get GPU adapter.\");\n        return;\n    }\n    const device = await adapter.requestDevice();\n    console.log(\"Nuhh huh it seems to work nicely\", device);\n    const canvas = document.querySelector(\"#canvas\");\n    if (!canvas) {\n        console.error(\"Failed to canvas.\");\n        return;\n    }\n    const observer = new ResizeObserver(() => {\n        canvas.width = canvas.clientWidth;\n        canvas.height = canvas.clientHeight;\n        // Note: You might want to add logic to resize your render target textures here.\n    });\n    observer.observe(canvas);\n    const context = canvas.getContext(\"webgpu\");\n    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();\n    context.configure({\n        device,\n        format: presentationFormat,\n        alphaMode: \"opaque\",\n    });\n    const pipeline = device.createRenderPipeline({\n        layout: \"auto\",\n        vertex: {\n            module: device.createShaderModule({\n                code: _shaders_vertex_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n            }),\n            entryPoint: \"main\",\n        },\n        fragment: {\n            module: device.createShaderModule({\n                code: _shaders_fragment_wgsl__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n            }),\n            entryPoint: \"main\",\n            targets: [\n                {\n                    format: presentationFormat,\n                },\n            ],\n        },\n        primitive: {\n            topology: \"triangle-list\",\n        },\n    });\n    function frame() {\n        (0,_engine_main__WEBPACK_IMPORTED_MODULE_2__.tick)(device, context, pipeline);\n        requestAnimationFrame(frame);\n    }\n    requestAnimationFrame(frame);\n}\ninitWebGPU();\n\n\n//# sourceURL=webpack://commander/./src/index.ts?");

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