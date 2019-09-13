/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".bundle.js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"./pkg/bls2brs_bg.wasm": function() {
/******/ 			return {
/******/ 				"./bls2brs.js": {
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules["./pkg/bls2brs.js"].exports["__wbindgen_object_drop_ref"](p0i32);
/******/ 					},
/******/ 					"__wbg_getTime_48254521f4a36c7e": function(p0i32) {
/******/ 						return installedModules["./pkg/bls2brs.js"].exports["__wbg_getTime_48254521f4a36c7e"](p0i32);
/******/ 					},
/******/ 					"__wbg_new0_d4cd03346884f97f": function() {
/******/ 						return installedModules["./pkg/bls2brs.js"].exports["__wbg_new0_d4cd03346884f97f"]();
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/bls2brs.js"].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":["./pkg/bls2brs_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"./pkg/bls2brs_bg.wasm":"78751a344ab1f3107639"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "public/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const wasm = __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../pkg/bls2brs.js */ \"./pkg/bls2brs.js\"))\n  .catch(console.error);\n\nconst $ = document.querySelector.bind(document);\n\n// Have to transcode the utf-8 javascript text to \"Windows-1252\" format just for the degree symbol for ramps\n// GG Torque\nconst windows1252 = {\"\\u0000\":0,\"\\u0001\":1,\"\\u0002\":2,\"\\u0003\":3,\"\\u0004\":4,\"\\u0005\":5,\"\\u0006\":6,\"\\u0007\":7,\"\\u0008\":8,\"\\u0009\":9,\"\\u000a\":10,\"\\u000b\":11,\"\\u000c\":12,\"\\u000d\":13,\"\\u000e\":14,\"\\u000f\":15,\"\\u0010\":16,\"\\u0011\":17,\"\\u0012\":18,\"\\u0013\":19,\"\\u0014\":20,\"\\u0015\":21,\"\\u0016\":22,\"\\u0017\":23,\"\\u0018\":24,\"\\u0019\":25,\"\\u001a\":26,\"\\u001b\":27,\"\\u001c\":28,\"\\u001d\":29,\"\\u001e\":30,\"\\u001f\":31,\"\\u0020\":32,\"\\u0021\":33,\"\\u0022\":34,\"\\u0023\":35,\"\\u0024\":36,\"\\u0025\":37,\"\\u0026\":38,\"\\u0027\":39,\"\\u0028\":40,\"\\u0029\":41,\"\\u002a\":42,\"\\u002b\":43,\"\\u002c\":44,\"\\u002d\":45,\"\\u002e\":46,\"\\u002f\":47,\"\\u0030\":48,\"\\u0031\":49,\"\\u0032\":50,\"\\u0033\":51,\"\\u0034\":52,\"\\u0035\":53,\"\\u0036\":54,\"\\u0037\":55,\"\\u0038\":56,\"\\u0039\":57,\"\\u003a\":58,\"\\u003b\":59,\"\\u003c\":60,\"\\u003d\":61,\"\\u003e\":62,\"\\u003f\":63,\"\\u0040\":64,\"\\u0041\":65,\"\\u0042\":66,\"\\u0043\":67,\"\\u0044\":68,\"\\u0045\":69,\"\\u0046\":70,\"\\u0047\":71,\"\\u0048\":72,\"\\u0049\":73,\"\\u004a\":74,\"\\u004b\":75,\"\\u004c\":76,\"\\u004d\":77,\"\\u004e\":78,\"\\u004f\":79,\"\\u0050\":80,\"\\u0051\":81,\"\\u0052\":82,\"\\u0053\":83,\"\\u0054\":84,\"\\u0055\":85,\"\\u0056\":86,\"\\u0057\":87,\"\\u0058\":88,\"\\u0059\":89,\"\\u005a\":90,\"\\u005b\":91,\"\\u005c\":92,\"\\u005d\":93,\"\\u005e\":94,\"\\u005f\":95,\"\\u0060\":96,\"\\u0061\":97,\"\\u0062\":98,\"\\u0063\":99,\"\\u0064\":100,\"\\u0065\":101,\"\\u0066\":102,\"\\u0067\":103,\"\\u0068\":104,\"\\u0069\":105,\"\\u006a\":106,\"\\u006b\":107,\"\\u006c\":108,\"\\u006d\":109,\"\\u006e\":110,\"\\u006f\":111,\"\\u0070\":112,\"\\u0071\":113,\"\\u0072\":114,\"\\u0073\":115,\"\\u0074\":116,\"\\u0075\":117,\"\\u0076\":118,\"\\u0077\":119,\"\\u0078\":120,\"\\u0079\":121,\"\\u007a\":122,\"\\u007b\":123,\"\\u007c\":124,\"\\u007d\":125,\"\\u007e\":126,\"\\u007f\":127,\"\\u20ac\":128,\"\\u0081\":129,\"\\u201a\":130,\"\\u0192\":131,\"\\u201e\":132,\"\\u2026\":133,\"\\u2020\":134,\"\\u2021\":135,\"\\u02c6\":136,\"\\u2030\":137,\"\\u0160\":138,\"\\u2039\":139,\"\\u0152\":140,\"\\u008d\":141,\"\\u017d\":142,\"\\u008f\":143,\"\\u0090\":144,\"\\u2018\":145,\"\\u2019\":146,\"\\u201c\":147,\"\\u201d\":148,\"\\u2022\":149,\"\\u2013\":150,\"\\u2014\":151,\"\\u02dc\":152,\"\\u2122\":153,\"\\u0161\":154,\"\\u203a\":155,\"\\u0153\":156,\"\\u009d\":157,\"\\u017e\":158,\"\\u0178\":159,\"\\u00a0\":160,\"\\u00a1\":161,\"\\u00a2\":162,\"\\u00a3\":163,\"\\u00a4\":164,\"\\u00a5\":165,\"\\u00a6\":166,\"\\u00a7\":167,\"\\u00a8\":168,\"\\u00a9\":169,\"\\u00aa\":170,\"\\u00ab\":171,\"\\u00ac\":172,\"\\u00ad\":173,\"\\u00ae\":174,\"\\u00af\":175,\"\\u00b0\":176,\"\\u00b1\":177,\"\\u00b2\":178,\"\\u00b3\":179,\"\\u00b4\":180,\"\\u00b5\":181,\"\\u00b6\":182,\"\\u00b7\":183,\"\\u00b8\":184,\"\\u00b9\":185,\"\\u00ba\":186,\"\\u00bb\":187,\"\\u00bc\":188,\"\\u00bd\":189,\"\\u00be\":190,\"\\u00bf\":191,\"\\u00c0\":192,\"\\u00c1\":193,\"\\u00c2\":194,\"\\u00c3\":195,\"\\u00c4\":196,\"\\u00c5\":197,\"\\u00c6\":198,\"\\u00c7\":199,\"\\u00c8\":200,\"\\u00c9\":201,\"\\u00ca\":202,\"\\u00cb\":203,\"\\u00cc\":204,\"\\u00cd\":205,\"\\u00ce\":206,\"\\u00cf\":207,\"\\u00d0\":208,\"\\u00d1\":209,\"\\u00d2\":210,\"\\u00d3\":211,\"\\u00d4\":212,\"\\u00d5\":213,\"\\u00d6\":214,\"\\u00d7\":215,\"\\u00d8\":216,\"\\u00d9\":217,\"\\u00da\":218,\"\\u00db\":219,\"\\u00dc\":220,\"\\u00dd\":221,\"\\u00de\":222,\"\\u00df\":223,\"\\u00e0\":224,\"\\u00e1\":225,\"\\u00e2\":226,\"\\u00e3\":227,\"\\u00e4\":228,\"\\u00e5\":229,\"\\u00e6\":230,\"\\u00e7\":231,\"\\u00e8\":232,\"\\u00e9\":233,\"\\u00ea\":234,\"\\u00eb\":235,\"\\u00ec\":236,\"\\u00ed\":237,\"\\u00ee\":238,\"\\u00ef\":239,\"\\u00f0\":240,\"\\u00f1\":241,\"\\u00f2\":242,\"\\u00f3\":243,\"\\u00f4\":244,\"\\u00f5\":245,\"\\u00f6\":246,\"\\u00f7\":247,\"\\u00f8\":248,\"\\u00f9\":249,\"\\u00fa\":250,\"\\u00fb\":251,\"\\u00fc\":252,\"\\u00fd\":253,\"\\u00fe\":254,\"\\u00ff\":255};\n\ndocument.addEventListener('DOMContentLoaded', async () => {\n  const { load_file } = await wasm;\n\n  // Given a File object, read it, pass it into wasm to be converted, resolve a blob \n  function convertFile(file) {\n    return file.arrayBuffer()\n      .then(buff =>\n        new Uint8Array(buff).map(c => windows1252[String.fromCharCode(c)]))\n      .then(buff => \n        new Blob([load_file(buff)], {type: 'octet/stream'}))\n  }\n\n  $('#file').addEventListener('change', event => {\n    event.preventDefault();\n\n    const fileInput = event.target;\n\n    Array.from(fileInput.files)\n      .forEach(f => {\n        const newName = f.name.replace(/(.bls|)$/, '.brs');\n        const isBls = f.name.match(/\\.bls$/);\n\n        /*\n          I'm too lazy to setup the boilerplate for\n          React or Vue but not lazy enough to not\n          make all the elements by hand :|\n         */\n        \n\n        // Element creation helper function\n        const makeElem = (tag='div', className='', ...children) => {\n          const el = document.createElement(tag);\n          el.className = className;\n\n          // Append all the child nodes\n          children.forEach(c => {\n            const child = typeof c === 'string'\n              ? document.createTextNode(c) \n              : c;\n            el.appendChild(child);\n          });\n\n          return el;\n        }\n\n        // Icon helper function\n        const icon = name => makeElem('i', 'icon ' + name);\n\n        // Close warning icon\n        const closeIcon = icon('close');\n        \n        // Create file message\n        const elem = makeElem('div', 'ui message', closeIcon);\n\n        closeIcon.addEventListener('click', () => {\n          $('#converted').removeChild(elem);\n        });\n\n        if(isBls) {\n          elem.className += ' icon';\n          const loadingIcon = icon('notched circle loading');\n          const loadingMsg = makeElem('div', 'content',\n            makeElem('div', 'header', 'Converting File...'),\n            makeElem('p', '',\n              makeElem('code', '', f.name),\n              ' is being converted'\n            )\n          );\n\n          elem.appendChild(loadingIcon);\n          elem.appendChild(loadingMsg);\n\n          convertFile(f)\n            .then(blob => {\n              elem.removeChild(loadingMsg);\n              elem.removeChild(loadingIcon);\n\n              const successIcon = icon('check');\n              const downloadButton = makeElem('a', 'ui icon button primary', icon('download'));\n\n              downloadButton.href = window.URL.createObjectURL(blob);\n              downloadButton.download = newName;\n\n              const successMsg = makeElem('div', 'content',\n                makeElem('div', 'header', newName),\n                makeElem('p', '',\n                  'Conversion Succeeded!',\n                  downloadButton,\n                )\n              );\n              elem.className += ' info';\n              elem.appendChild(successIcon);\n              elem.appendChild(successMsg);\n              // Success!\n              // downloadFile(blob, newName)\n            })\n            .catch(e => {\n              console.error('Conversion Error', f.name, e);\n\n              // Remove old text\n              elem.removeChild(loadingMsg);\n              elem.removeChild(loadingIcon);\n\n              // Populate with very vague error message\n              elem.className = 'ui message error';\n              elem.appendChild(makeElem('div', 'header', 'Error Converting File'));\n              elem.appendChild(makeElem('p', '',\n                makeElem('u', '', f.name),\n                ' could not be converted'\n              ));\n            });\n        } else {\n          // Provide invalid format warning message\n          elem.className += ' warning';\n          elem.appendChild(makeElem('div', 'header', 'Invalid File Format'));\n          elem.appendChild(makeElem('p', '',\n            makeElem('u', '', f.name),\n            ' is not the correct format (.bls)'\n          ));\n        }\n\n        $('#converted').appendChild(elem);\n      });\n    fileInput.value = '';\n  });\n});\n\n\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })

/******/ });