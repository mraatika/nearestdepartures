/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24).default;
module.exports.default = module.exports;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return find; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getNowInSeconds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return findFrom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return padNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return toTimeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return uniq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return sortBy; });
function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}/** @module Utils *//**
 * Find polyfill
 * @param {Function} fn Iteratee
 * @return {Function}
 */var findPolyfill=function findPolyfill(fn){return(/**
 * @private
 * @param {Array} list
 * @returns {*|undefined}
 */function(list){for(var i=0;i<list.length;i++){if(fn(list[i]))return list[i];}return undefined;});};/**
 * Curried native Array.prototype.find
 * @private
 * @param {Function} fn Iteratee
 * @returns {Function}
 */var nativeFind=function nativeFind(fn){return(/**
 * @param {Array} list
 * @returns {*|undefined}
 */function(list){return list.find(fn);});};/**
 * Find element from array running values through an iteratee function
 */var find=typeof Array.prototype.find==='function'?nativeFind:findPolyfill;/**
 * Get current time in seconds
 * @returns {number}
 */var getNowInSeconds=function getNowInSeconds(){return Math.floor(new Date().getTime()/1000);};/**
 * Find a value or some of values from list
 * @param {Array} list
 * @param {string} [prop] If defined will compare subject[prop] with entry[prop]
 * @returns {Function}
 */var findFrom=function findFrom(){var list=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var prop=arguments[1];// get entity[prop] if prop defined else return entity
var getProp=prop?function(e){return e[prop];}:function(e){return e;};// array comparator
var compareArray=function compareArray(subject){return function(e){return subject.indexOf(getProp(e))>-1;};};// single comparator
var compareProp=function compareProp(subject){return function(e){return getProp(e)===subject;};};/**
     * @param {*} subject
     * @returns {*}
     */return function(subject){var subjectValue=getProp(subject);var comparator=Array.isArray(subject)?compareArray:compareProp;return find(comparator(subjectValue))(list);};};/**
 * Pad number with leading zero if necessary
 * @private
 * @param {number} num
 */var padNumber=function padNumber(num){return(''+num).length<2?'0'+num:num;};/**
 * Format date to time string
 * @param {Date} time
 * @returns {String}
 */var toTimeString=function toTimeString(){var time=arguments.length>0&&arguments[0]!==undefined?arguments[0]:new Date();return padNumber(time.getHours())+':'+padNumber(time.getMinutes())+':'+padNumber(time.getSeconds());};/**
 * Select unique values from an array
 * @param {Function} [fn]
 * @returns {Function}
 */var uniq=function uniq(){var fn=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(val){return val;};return(/**
 * @param {Array} list
 * @returns {Array} Unique values
 */function(){var list=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var findFromUniques=function findFromUniques(val,uniques){return find(function(u){return fn(u)===val;})(uniques);};return list.reduce(function(uniques,val){if(!findFromUniques(fn(val),uniques))uniques.push(val);return uniques;},[]);});};/**
 * Sort list in ascending order by results of running each value thru iteratee fn
 * @param {Function} iteratee
 * @returns {Function}
 */var sortBy=function sortBy(){var iteratee=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(val){return val;};return(/**
 * @param {Array} list
 * @returns {Array} Sorted list
 */function(){var list=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var copy=[].concat(_toConsumableArray(list));return copy.sort(function(a,b){if(iteratee(a)<iteratee(b))return-1;if(iteratee(a)>iteratee(b))return 1;return 0;});});};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return VEHICLE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return VEHICLE_TYPE_TRANSLATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LOCATION_MAGIC_WORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEFAULT_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return MIN_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return MAX_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return RANGE_STEP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MAX_ADDRESS_SUGGESTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BATCH_INTERVAL; });
/** @module Constants *//**
 * Vehicle types
 * @type {Object}
 */var VEHICLE_TYPE={BUS:'BUS',TRAM:'TRAM',RAIL:'RAIL',SUBWAY:'SUBWAY',FERRY:'FERRY'};/**
 * Vehicle type ranslations from english to finnish
 * @type {Object}
 */var VEHICLE_TYPE_TRANSLATIONS={BUS:'Bussi',TRAM:'Raitiovaunu',RAIL:'Juna',SUBWAY:'Metro',FERRY:'Lautta'};/**
 * If address is this word then search by location
 * @type {string}
 */var LOCATION_MAGIC_WORD='oma sijainti';/**
 * Default range filter value
 * @type {number}
 */var DEFAULT_RANGE=400;/**
 * Minimum range value
 * @type {number}
 */var MIN_RANGE=100;/**
 * Maximum range value
 * @type {number}
 */var MAX_RANGE=2000;/**
 * Range change step
 * @type {number}
 */var RANGE_STEP=100;/**
 * Max amount of address suggestions to display
 * @type {number}
 */var MAX_ADDRESS_SUGGESTIONS=10;/**
 * Interval between departure update in ms
 * @type {number}
 */var BATCH_INTERVAL=30*1000;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(178);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(26).default;
module.exports.default = module.exports;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_1_liners__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_1_liners___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_1_liners__);
function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}/** @module FPUtils *//**
 * All functions that should not be auto curried
 * @private
 * @type {string[]}
 */var unCurried=['curry','compose','composeAll','ifThenElse','pipe','pipeAll'];var rightCurried=['assign','or'];/**
 * Compose a curry function to curry multiple times (e.g sum(1)(2)(3))
 * @private
 * @type {Function}
 * @param {number} arity
 * @returns {Function}
 */var curryMany=function curryMany(arity){return __WEBPACK_IMPORTED_MODULE_0_1_liners__["reduce"](__WEBPACK_IMPORTED_MODULE_0_1_liners__["compose"],[].concat(_toConsumableArray(new Array(arity-1))).map(function(){return __WEBPACK_IMPORTED_MODULE_0_1_liners__["curry"];}));};/**
 * Proxy for 1-liners utility functions. Auto curries all functions except ones
 * defined in unCurried list.
 * @type {Object}
 *//* harmony default export */ __webpack_exports__["a"] = (Object.keys(__WEBPACK_IMPORTED_MODULE_0_1_liners__).reduce(function(obj,key){var orig=__WEBPACK_IMPORTED_MODULE_0_1_liners__[key];var arity=orig.length;var fn=void 0;// do not curry if
// a) property is not a function
// b) property is listed in list of fns that should not be curried
// c) fn's arity is one or less
if(typeof orig!=='function'||unCurried.indexOf(key)>-1||arity<2){fn=orig;// some fn should be curried right (such as assign)
}else if(rightCurried.indexOf(key)>-1){fn=__WEBPACK_IMPORTED_MODULE_0_1_liners__["curryRight"](orig);}else{fn=curryMany(arity)(orig);}obj[key]=fn;return obj;},{}));

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icons_svg__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icons_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__icons_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inferno__);
/**
 * Vehicle type icon component
 * @constructs VehicleIcon
 * @param {string} iconName
 * @returns {VehicleIcon}
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var iconName=_ref.iconName;return Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(128,"svg","icon",Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,"use",null,null,{"xlink:href":__WEBPACK_IMPORTED_MODULE_0__icons_svg___default.a+("#icon-icon_"+iconName),"style":{fill:'currentColor'}}),{"viewBox":"0 0 100 100"});});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var asap = __webpack_require__(19);

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._75 = 0;
  this._83 = 0;
  this._18 = null;
  this._38 = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._47 = null;
Promise._71 = null;
Promise._44 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}
function handle(self, deferred) {
  while (self._83 === 3) {
    self = self._18;
  }
  if (Promise._47) {
    Promise._47(self);
  }
  if (self._83 === 0) {
    if (self._75 === 0) {
      self._75 = 1;
      self._38 = deferred;
      return;
    }
    if (self._75 === 1) {
      self._75 = 2;
      self._38 = [self._38, deferred];
      return;
    }
    self._38.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._83 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._83 === 1) {
        resolve(deferred.promise, self._18);
      } else {
        reject(deferred.promise, self._18);
      }
      return;
    }
    var ret = tryCallOne(cb, self._18);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._83 = 3;
      self._18 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._83 = 1;
  self._18 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._83 = 2;
  self._18 = newValue;
  if (Promise._71) {
    Promise._71(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._75 === 1) {
    handle(self, self._38);
    self._38 = null;
  }
  if (self._75 === 2) {
    for (var i = 0; i < self._38.length; i++) {
      handle(self, self._38[i]);
    }
    self._38 = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  });
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(167);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(10);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return findGPSLocation; });
/* harmony export (immutable) */ __webpack_exports__["b"] = stopLocating;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_formaterror__ = __webpack_require__(180);
/**
* Promise wrapper for geolocation.getCurrentPosition
* @private
* @async
* @returns {Promise}
*/var getCurrentPosition=function(){var _ref=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(){return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:return _context.abrupt('return',new Promise(function(resolve,reject){watcherId=navigator.geolocation.watchPosition(onLocationResult(resolve),reject,POSITION_OPTIONS);}));case 1:case'end':return _context.stop();}}},_callee,this);}));return function getCurrentPosition(){return _ref.apply(this,arguments);};}();/**
* Find current position using geolocation api
* @async
* @returns {Promise}
*/function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{return Promise.resolve(value).then(function(value){step("next",value);},function(err){step("throw",err);});}}return step("next");});};}/** @module LocationService *//**
* Options for getCurrentPosition
* @private
* @type {Object}
*/var POSITION_OPTIONS={// use gps
enableHighAccuracy:true,// time out in one minute
timeout:1*60*1000};/**
* Current watcher's id
* @private
* @type {number}
*/var watcherId=null;/**
* Create callback for watchPosition success
* @private
* @param {Function} resolve
* @returns {Function}
*/function onLocationResult(resolve){/**
  * Callback for watchPosition success resolves if
  * acquired location is precise enough
  * @param {Object} position object
  */return function(position){stopLocating(watcherId);resolve(position);};};var findGPSLocation=function(){var _ref2=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(){var position;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:if(navigator.geolocation){_context2.next=2;break;}throw new Error('Selain ei tue paikannusta');case 2:if(watcherId){_context2.next=13;break;}_context2.prev=3;_context2.next=6;return getCurrentPosition();case 6:position=_context2.sent;return _context2.abrupt('return',position.coords);case 10:_context2.prev=10;_context2.t0=_context2['catch'](3);throw new Error(Object(__WEBPACK_IMPORTED_MODULE_1__utils_formaterror__["b" /* default */])(__WEBPACK_IMPORTED_MODULE_1__utils_formaterror__["a" /* POSITION_ERROR */],_context2.t0));case 13:case'end':return _context2.stop();}}},_callee2,this,[[3,10]]);}));return function findGPSLocation(){return _ref2.apply(this,arguments);};}();/**
* Cancel location search
*/function stopLocating(){if(watcherId){navigator.geolocation.clearWatch(watcherId);watcherId=null;}}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iconbutton_css__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iconbutton_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__iconbutton_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inferno__);
function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}/**
 * A button without background
 * @param {object} props
 * @param {string} props.text
 * @param {string} props.className
 * @param {...*}
 */var IconButton=function IconButton(_ref){var text=_ref.text,className=_ref.className,rest=_objectWithoutProperties(_ref,['text','className']);return Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,'button','icon-button'+(className?' '+className:''),text,Object.assign({},rest));};/* harmony default export */ __webpack_exports__["a"] = (IconButton);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return areLocationsEqual; });
var areLocationsEqual=function areLocationsEqual(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var b=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return a.label===b.label;};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
module.exports = __webpack_require__(23);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where Inferno gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes Inferno's erratic future behavior.
  __webpack_require__(18).enable();
  window.Promise = __webpack_require__(20);
}

// fetch() polyfill for making API calls.
__webpack_require__(21);

// Object.assign() is commonly used with Inferno.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = __webpack_require__(22);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(7);

var DEFAULT_WHITELIST = [
  ReferenceError,
  TypeError,
  RangeError
];

var enabled = false;
exports.disable = disable;
function disable() {
  enabled = false;
  Promise._47 = null;
  Promise._71 = null;
}

exports.enable = enable;
function enable(options) {
  options = options || {};
  if (enabled) disable();
  enabled = true;
  var id = 0;
  var displayId = 0;
  var rejections = {};
  Promise._47 = function (promise) {
    if (
      promise._83 === 2 && // IS REJECTED
      rejections[promise._56]
    ) {
      if (rejections[promise._56].logged) {
        onHandled(promise._56);
      } else {
        clearTimeout(rejections[promise._56].timeout);
      }
      delete rejections[promise._56];
    }
  };
  Promise._71 = function (promise, err) {
    if (promise._75 === 0) { // not yet handled
      promise._56 = id++;
      rejections[promise._56] = {
        displayId: null,
        error: err,
        timeout: setTimeout(
          onUnhandled.bind(null, promise._56),
          // For reference errors and type errors, this almost always
          // means the programmer made a mistake, so log them after just
          // 100ms
          // otherwise, wait 2 seconds to see if they get handled
          matchWhitelist(err, DEFAULT_WHITELIST)
            ? 100
            : 2000
        ),
        logged: false
      };
    }
  };
  function onUnhandled(id) {
    if (
      options.allRejections ||
      matchWhitelist(
        rejections[id].error,
        options.whitelist || DEFAULT_WHITELIST
      )
    ) {
      rejections[id].displayId = displayId++;
      if (options.onUnhandled) {
        rejections[id].logged = true;
        options.onUnhandled(
          rejections[id].displayId,
          rejections[id].error
        );
      } else {
        rejections[id].logged = true;
        logError(
          rejections[id].displayId,
          rejections[id].error
        );
      }
    }
  }
  function onHandled(id) {
    if (rejections[id].logged) {
      if (options.onHandled) {
        options.onHandled(rejections[id].displayId, rejections[id].error);
      } else if (!rejections[id].onUnhandled) {
        console.warn(
          'Promise Rejection Handled (id: ' + rejections[id].displayId + '):'
        );
        console.warn(
          '  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id ' +
          rejections[id].displayId + '.'
        );
      }
    }
  }
}

function logError(id, error) {
  console.warn('Possible Unhandled Promise Rejection (id: ' + id + '):');
  var errStr = (error && (error.stack || error)) + '';
  errStr.split('\n').forEach(function (line) {
    console.warn('  ' + line);
  });
}

function matchWhitelist(error, list) {
  return list.some(function (cls) {
    return error instanceof cls;
  });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = __webpack_require__(7);

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._44);
  p._83 = 1;
  p._18 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._83 === 3) {
            val = val._18;
          }
          if (val._83 === 1) return res(i, val._18);
          if (val._83 === 2) reject(val._18);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inferno__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app_app__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__index_css__);
Object(__WEBPACK_IMPORTED_MODULE_0_inferno__["render"])(Object(__WEBPACK_IMPORTED_MODULE_0_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_1__components_app_app__["a" /* default */]),document.getElementById('app'));

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @module Inferno-Shared
 */ /** TypeDoc Comment */
var NO_OP = "$NO_OP";
var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
// This should be boolean and not reference to window.document
var isBrowser = !!(typeof window !== "undefined" && window.document);
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}
function isStringOrNumber(o) {
    var type = typeof o;
    return type === "string" || type === "number";
}
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isFunction(o) {
    return typeof o === "function";
}
function isString(o) {
    return typeof o === "string";
}
function isNumber(o) {
    return typeof o === "number";
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function isObject(o) {
    return typeof o === "object";
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}
function warning(message) {
    // tslint:disable-next-line:no-console
    console.warn(message);
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}
function Lifecycle() {
    this.listeners = [];
}
Lifecycle.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle.prototype.trigger = function trigger() {
    var listeners = this.listeners;
    var listener;
    // We need to remove current listener from array when calling it, because more listeners might be added
    while ((listener = listeners.shift())) {
        listener();
    }
};

/**
 * @module Inferno
 */ /** TypeDoc Comment */
var options = {
    afterMount: null,
    afterRender: null,
    afterUpdate: null,
    beforeRender: null,
    beforeUnmount: null,
    createVNode: null,
    findDOMNodeEnabled: false,
    recyclingEnabled: false,
    roots: []
};

/**
 * @module Inferno
 */ /** TypeDoc Comment */
var xlinkNS = "http://www.w3.org/1999/xlink";
var xmlNS = "http://www.w3.org/XML/1998/namespace";
var svgNS = "http://www.w3.org/2000/svg";
var strictProps = new Set();
strictProps.add("volume");
strictProps.add("defaultChecked");
var booleanProps = new Set();
booleanProps.add("muted");
booleanProps.add("scoped");
booleanProps.add("loop");
booleanProps.add("open");
booleanProps.add("checked");
booleanProps.add("default");
booleanProps.add("capture");
booleanProps.add("disabled");
booleanProps.add("readOnly");
booleanProps.add("required");
booleanProps.add("autoplay");
booleanProps.add("controls");
booleanProps.add("seamless");
booleanProps.add("reversed");
booleanProps.add("allowfullscreen");
booleanProps.add("novalidate");
booleanProps.add("hidden");
booleanProps.add("autoFocus");
booleanProps.add("selected");
booleanProps.add("indeterminate");
var namespaces = new Map();
namespaces.set("xlink:href", xlinkNS);
namespaces.set("xlink:arcrole", xlinkNS);
namespaces.set("xlink:actuate", xlinkNS);
namespaces.set("xlink:show", xlinkNS);
namespaces.set("xlink:role", xlinkNS);
namespaces.set("xlink:title", xlinkNS);
namespaces.set("xlink:type", xlinkNS);
namespaces.set("xml:base", xmlNS);
namespaces.set("xml:lang", xmlNS);
namespaces.set("xml:space", xmlNS);
var isUnitlessNumber = new Set();
isUnitlessNumber.add("animationIterationCount");
isUnitlessNumber.add("borderImageOutset");
isUnitlessNumber.add("borderImageSlice");
isUnitlessNumber.add("borderImageWidth");
isUnitlessNumber.add("boxFlex");
isUnitlessNumber.add("boxFlexGroup");
isUnitlessNumber.add("boxOrdinalGroup");
isUnitlessNumber.add("columnCount");
isUnitlessNumber.add("flex");
isUnitlessNumber.add("flexGrow");
isUnitlessNumber.add("flexPositive");
isUnitlessNumber.add("flexShrink");
isUnitlessNumber.add("flexNegative");
isUnitlessNumber.add("flexOrder");
isUnitlessNumber.add("gridRow");
isUnitlessNumber.add("gridColumn");
isUnitlessNumber.add("fontWeight");
isUnitlessNumber.add("lineClamp");
isUnitlessNumber.add("lineHeight");
isUnitlessNumber.add("opacity");
isUnitlessNumber.add("order");
isUnitlessNumber.add("orphans");
isUnitlessNumber.add("tabSize");
isUnitlessNumber.add("widows");
isUnitlessNumber.add("zIndex");
isUnitlessNumber.add("zoom");
isUnitlessNumber.add("fillOpacity");
isUnitlessNumber.add("floodOpacity");
isUnitlessNumber.add("stopOpacity");
isUnitlessNumber.add("strokeDasharray");
isUnitlessNumber.add("strokeDashoffset");
isUnitlessNumber.add("strokeMiterlimit");
isUnitlessNumber.add("strokeOpacity");
isUnitlessNumber.add("strokeWidth");
var skipProps = new Set();
skipProps.add("children");
skipProps.add("childrenType");
skipProps.add("defaultValue");
skipProps.add("ref");
skipProps.add("key");
skipProps.add("checked");
skipProps.add("multiple");
var delegatedEvents = new Set();
delegatedEvents.add("onClick");
delegatedEvents.add("onMouseDown");
delegatedEvents.add("onMouseUp");
delegatedEvents.add("onMouseMove");
delegatedEvents.add("onSubmit");
delegatedEvents.add("onDblClick");
delegatedEvents.add("onKeyDown");
delegatedEvents.add("onKeyUp");
delegatedEvents.add("onKeyPress");

/**
 * @module Inferno
 */ /** TypeDoc Comment */
var isiOS = isBrowser &&
    !!navigator.platform &&
    /iPad|iPhone|iPod/.test(navigator.platform);
var delegatedEvents$1 = new Map();
function handleEvent(name, lastEvent, nextEvent, dom) {
    var delegatedRoots = delegatedEvents$1.get(name);
    if (nextEvent) {
        if (!delegatedRoots) {
            delegatedRoots = { items: new Map(), docEvent: null };
            delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
            delegatedEvents$1.set(name, delegatedRoots);
        }
        if (!lastEvent) {
            if (isiOS && name === "onClick") {
                trapClickOnNonInteractiveElement(dom);
            }
        }
        delegatedRoots.items.set(dom, nextEvent);
    }
    else if (delegatedRoots) {
        var items = delegatedRoots.items;
        if (items.delete(dom)) {
            // If any items were deleted, check if listener need to be removed
            if (items.size === 0) {
                document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
                delegatedEvents$1.delete(name);
            }
        }
    }
}
function dispatchEvents(event, target, items, count, isClick, eventData) {
    var dom = target;
    while (count > 0) {
        if (isClick && dom.disabled) {
            return;
        }
        var eventsToTrigger = items.get(dom);
        if (eventsToTrigger) {
            count--;
            // linkEvent object
            eventData.dom = dom;
            if (eventsToTrigger.event) {
                eventsToTrigger.event(eventsToTrigger.data, event);
            }
            else {
                eventsToTrigger(event);
            }
            if (event.cancelBubble) {
                return;
            }
        }
        dom = dom.parentNode;
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (dom === null) {
            return;
        }
    }
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function stopPropagation() {
    this.cancelBubble = true;
    this.stopImmediatePropagation();
}
function attachEventToDocument(name, delegatedRoots) {
    var docEvent = function (event) {
        var count = delegatedRoots.items.size;
        if (count > 0) {
            event.stopPropagation = stopPropagation;
            // Event data needs to be object to save reference to currentTarget getter
            var eventData = {
                dom: document
            };
            try {
                Object.defineProperty(event, "currentTarget", {
                    configurable: true,
                    get: function get() {
                        return eventData.dom;
                    }
                });
            }
            catch (e) {
                /* safari7 and phantomJS will crash */
            }
            dispatchEvents(event, event.target, delegatedRoots.items, count, event.type === "click", eventData);
        }
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}
// tslint:disable-next-line:no-empty
function emptyFn() { }
function trapClickOnNonInteractiveElement(dom) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    // Just set it using the onclick property so that we don't have to manage any
    // bookkeeping for it. Not sure if we need to clear it when the listener is
    // removed.
    // TODO: Only do this for the relevant Safaris maybe?
    dom.onclick = emptyFn;
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function isCheckedType(type) {
    return type === "checkbox" || type === "radio";
}
function onTextInputChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event = props.onInput;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newProps, dom);
    }
}
function wrappedOnChange(e) {
    var props = this.vNode.props || EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onCheckboxChange(e) {
    e.stopPropagation(); // This click should not propagate its for internal use
    var vNode = this.vNode;
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    if (props.onClick) {
        var event = props.onClick;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    else if (props.onclick) {
        props.onclick(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    applyValue(newProps, dom);
}
function processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(nextPropsOrEmpty, dom);
    if (isControlled) {
        dom.vNode = vNode; // TODO: Remove this when implementing Fiber's
        if (mounting) {
            if (isCheckedType(nextPropsOrEmpty.type)) {
                dom.onclick = onCheckboxChange;
                dom.onclick.wrapped = true;
            }
            else {
                dom.oninput = onTextInputChange;
                dom.oninput.wrapped = true;
            }
            if (nextPropsOrEmpty.onChange) {
                dom.onchange = wrappedOnChange;
                dom.onchange.wrapped = true;
            }
        }
    }
}
function applyValue(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute("type", type);
    }
    if (multiple && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + "";
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.defaultValue = value;
            dom.value = value;
        }
        else if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function updateChildOptionGroup(vNode, value) {
    var type = vNode.type;
    if (type === "optgroup") {
        var children = vNode.children;
        if (isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOption(children[i], value);
            }
        }
        else if (isVNode(children)) {
            updateChildOption(children, value);
        }
    }
    else {
        updateChildOption(vNode, value);
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if ((isArray(value) && value.indexOf(props.value) !== -1) ||
        props.value === value) {
        dom.selected = true;
    }
    else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
function onSelectChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onChange) {
        var event = props.onChange;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    else if (props.onchange) {
        props.onchange(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue$1(newVNode, dom, newProps, false);
    }
}
function processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue$1(vNode, dom, nextPropsOrEmpty, mounting);
    if (isControlled) {
        dom.vNode = vNode; // TODO: Remove this when implementing Fiber's
        if (mounting) {
            dom.onchange = onSelectChange;
            dom.onchange.wrapped = true;
        }
    }
}
function applyValue$1(vNode, dom, nextPropsOrEmpty, mounting) {
    if (nextPropsOrEmpty.multiple !== dom.multiple) {
        dom.multiple = nextPropsOrEmpty.multiple;
    }
    var children = vNode.children;
    if (!isInvalid(children)) {
        var value = nextPropsOrEmpty.value;
        if (mounting && isNullOrUndef(value)) {
            value = nextPropsOrEmpty.defaultValue;
        }
        if (isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOptionGroup(children[i], value);
            }
        }
        else if (isVNode(children)) {
            updateChildOptionGroup(children, value);
        }
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function wrappedOnChange$1(e) {
    var props = this.vNode.props || EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onTextareaInputChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || EMPTY_OBJ;
    var previousValue = props.value;
    if (props.onInput) {
        var event = props.onInput;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue$2(newVNode, vNode.dom, false);
    }
}
function processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue$2(nextPropsOrEmpty, dom, mounting);
    if (isControlled) {
        dom.vNode = vNode; // TODO: Remove this when implementing Fiber's
        if (mounting) {
            dom.oninput = onTextareaInputChange;
            dom.oninput.wrapped = true;
            if (nextPropsOrEmpty.onChange) {
                dom.onchange = wrappedOnChange$1;
                dom.onchange.wrapped = true;
            }
        }
    }
}
function applyValue$2(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;
    if (isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = nextPropsOrEmpty.defaultValue;
            if (!isNullOrUndef(defaultValue)) {
                if (defaultValue !== domValue) {
                    dom.defaultValue = defaultValue;
                    dom.value = defaultValue;
                }
            }
            else if (domValue !== "") {
                dom.defaultValue = "";
                dom.value = "";
            }
        }
    }
    else {
        /* There is value so keep it controlled */
        if (domValue !== value) {
            dom.defaultValue = value;
            dom.value = value;
        }
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */
function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if ((flags & 512 /* InputElement */) > 0) {
        processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    else if ((flags & 2048 /* SelectElement */) > 0) {
        processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    else if ((flags & 1024 /* TextareaElement */) > 0) {
        processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
}
function isControlledFormElement(nextPropsOrEmpty) {
    return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type)
        ? !isNullOrUndef(nextPropsOrEmpty.checked)
        : !isNullOrUndef(nextPropsOrEmpty.value);
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function normalizeChildNodes(parentDom) {
    var dom = parentDom.firstChild;
    while (dom) {
        if (dom.nodeType === 8) {
            if (dom.data === "!") {
                var placeholder = document.createTextNode("");
                parentDom.replaceChild(placeholder, dom);
                dom = dom.nextSibling;
            }
            else {
                var lastDom = dom.previousSibling;
                parentDom.removeChild(dom);
                dom = lastDom || parentDom.firstChild;
            }
        }
        else {
            dom = dom.nextSibling;
        }
    }
}
function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
    var type = vNode.type;
    var ref = vNode.ref;
    var props = vNode.props || EMPTY_OBJ;
    if (isClass) {
        var _isSVG = dom.namespaceURI === svgNS;
        var instance = createClassComponentInstance(vNode, type, props, context, _isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
        vNode.dom = input.dom;
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false; // Mount finished allow going sync
        if (options.findDOMNodeEnabled) {
            componentToDOMNodeMap.set(instance, dom);
        }
    }
    else {
        var input$1 = createFunctionalComponentInput(vNode, type, props, context);
        hydrate(input$1, dom, lifecycle, context, isSVG);
        vNode.children = input$1;
        vNode.dom = input$1.dom;
        mountFunctionalComponentCallbacks(props, ref, dom, lifecycle);
    }
    return dom;
}
function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var flags = vNode.flags;
    var ref = vNode.ref;
    isSVG = isSVG || (flags & 128 /* SvgElement */) > 0;
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        if (true) {
            warning("Inferno hydration: Server-side markup doesn't match client-side markup or Initial render target is not empty");
        }
        var newDom = mountElement(vNode, null, lifecycle, context, isSVG);
        vNode.dom = newDom;
        replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    vNode.dom = dom;
    if (!isInvalid(children)) {
        hydrateChildren(children, dom, lifecycle, context, isSVG);
    }
    else if (dom.firstChild !== null && !isSamePropsInnerHTML(dom, props)) {
        dom.textContent = ""; // dom has content, but VNode has no children remove everything from DOM
    }
    if (props) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (!isNullOrUndef(className)) {
        if (isSVG) {
            dom.setAttribute("class", className);
        }
        else {
            dom.className = className;
        }
    }
    else {
        if (dom.className !== "") {
            dom.removeAttribute("class");
        }
    }
    if (ref) {
        mountRef(dom, ref, lifecycle);
    }
    return dom;
}
function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
    normalizeChildNodes(parentDom);
    var dom = parentDom.firstChild;
    if (isStringOrNumber(children)) {
        if (!isNull(dom) && dom.nodeType === 3) {
            if (dom.nodeValue !== children) {
                dom.nodeValue = children;
            }
        }
        else if (children === "") {
            parentDom.appendChild(document.createTextNode(""));
        }
        else {
            parentDom.textContent = children;
        }
        if (!isNull(dom)) {
            dom = dom.nextSibling;
        }
    }
    else if (isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isNull(child) && isObject(child)) {
                if (!isNull(dom)) {
                    var nextSibling = dom.nextSibling;
                    hydrate(child, dom, lifecycle, context, isSVG);
                    dom = nextSibling;
                }
                else {
                    mount(child, parentDom, lifecycle, context, isSVG);
                }
            }
        }
    }
    else {
        // It's VNode
        if (!isNull(dom)) {
            hydrate(children, dom, lifecycle, context, isSVG);
            dom = dom.nextSibling;
        }
        else {
            mount(children, parentDom, lifecycle, context, isSVG);
        }
    }
    // clear any other DOM nodes, there should be only a single entry for the root
    while (dom) {
        var nextSibling$1 = dom.nextSibling;
        parentDom.removeChild(dom);
        dom = nextSibling$1;
    }
}
function hydrateText(vNode, dom) {
    if (dom.nodeType !== 3) {
        var newDom = mountText(vNode, null);
        vNode.dom = newDom;
        replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    var text = vNode.children;
    if (dom.nodeValue !== text) {
        dom.nodeValue = text;
    }
    vNode.dom = dom;
    return dom;
}
function hydrateVoid(vNode, dom) {
    vNode.dom = dom;
    return dom;
}
function hydrate(vNode, dom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        hydrateComponent(vNode, dom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
    }
    else if (flags & 3970 /* Element */) {
        hydrateElement(vNode, dom, lifecycle, context, isSVG);
    }
    else if (flags & 1 /* Text */) {
        hydrateText(vNode, dom);
    }
    else if (flags & 4096 /* Void */) {
        hydrateVoid(vNode, dom);
    }
    else {
        if (true) {
            throwError(("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
        }
        throwError();
    }
}
function hydrateRoot(input, parentDom, lifecycle) {
    if (!isNull(parentDom)) {
        var dom = parentDom.firstChild;
        if (!isNull(dom)) {
            hydrate(input, dom, lifecycle, EMPTY_OBJ, false);
            dom = parentDom.firstChild;
            // clear any other DOM nodes, there should be only a single entry for the root
            while ((dom = dom.nextSibling)) {
                parentDom.removeChild(dom);
            }
            return true;
        }
    }
    return false;
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
var componentPools = new Map();
var elementPools = new Map();
function recycleElement(vNode, lifecycle, context, isSVG) {
    var tag = vNode.type;
    var pools = elementPools.get(tag);
    if (!isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!isUndefined(recycledVNode)) {
                patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                return vNode.dom;
            }
        }
    }
    return null;
}
function poolElement(vNode) {
    var tag = vNode.type;
    var key = vNode.key;
    var pools = elementPools.get(tag);
    if (isUndefined(pools)) {
        pools = {
            keyed: new Map(),
            nonKeyed: []
        };
        elementPools.set(tag, pools);
    }
    if (isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
function recycleComponent(vNode, lifecycle, context, isSVG) {
    var type = vNode.type;
    var pools = componentPools.get(type);
    if (!isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!isUndefined(recycledVNode)) {
                var flags = vNode.flags;
                var failed = patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0, true);
                if (!failed) {
                    return vNode.dom;
                }
            }
        }
    }
    return null;
}
function poolComponent(vNode) {
    var hooks = vNode.ref;
    var nonRecycleHooks = hooks &&
        (hooks.onComponentWillMount ||
            hooks.onComponentWillUnmount ||
            hooks.onComponentDidMount ||
            hooks.onComponentWillUpdate ||
            hooks.onComponentDidUpdate);
    if (nonRecycleHooks) {
        return;
    }
    var type = vNode.type;
    var key = vNode.key;
    var pools = componentPools.get(type);
    if (isUndefined(pools)) {
        pools = {
            keyed: new Map(),
            nonKeyed: []
        };
        componentPools.set(type, pools);
    }
    if (isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var flags = vNode.flags;
    var dom = vNode.dom;
    if (flags & 28 /* Component */) {
        var instance = vNode.children;
        var isStatefulComponent$$1 = (flags & 4 /* ComponentClass */) > 0;
        var props = vNode.props || EMPTY_OBJ;
        var ref = vNode.ref;
        if (!isRecycling) {
            if (isStatefulComponent$$1) {
                if (!instance._unmounted) {
                    if (!isNull(options.beforeUnmount)) {
                        options.beforeUnmount(vNode);
                    }
                    if (!isUndefined(instance.componentWillUnmount)) {
                        instance.componentWillUnmount();
                    }
                    if (ref && !isRecycling) {
                        ref(null);
                    }
                    instance._unmounted = true;
                    if (options.findDOMNodeEnabled) {
                        componentToDOMNodeMap.delete(instance);
                    }
                    unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
                }
            }
            else {
                if (!isNullOrUndef(ref)) {
                    if (!isNullOrUndef(ref.onComponentWillUnmount)) {
                        ref.onComponentWillUnmount(dom, props);
                    }
                }
                unmount(instance, null, lifecycle, false, isRecycling);
            }
        }
        if (options.recyclingEnabled &&
            !isStatefulComponent$$1 &&
            (parentDom || canRecycle)) {
            poolComponent(vNode);
        }
    }
    else if (flags & 3970 /* Element */) {
        var ref$1 = vNode.ref;
        var props$1 = vNode.props;
        if (!isRecycling && isFunction(ref$1)) {
            ref$1(null);
        }
        var children = vNode.children;
        if (!isNullOrUndef(children)) {
            if (isArray(children)) {
                for (var i = 0, len = children.length; i < len; i++) {
                    var child = children[i];
                    if (!isInvalid(child) && isObject(child)) {
                        unmount(child, null, lifecycle, false, isRecycling);
                    }
                }
            }
            else if (isObject(children)) {
                unmount(children, null, lifecycle, false, isRecycling);
            }
        }
        if (!isNull(props$1)) {
            for (var name in props$1) {
                // do not add a hasOwnProperty check here, it affects performance
                if (props$1[name] !== null && isAttrAnEvent(name)) {
                    patchEvent(name, props$1[name], null, dom);
                    // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                    props$1[name] = null;
                }
            }
        }
        if (options.recyclingEnabled && (parentDom || canRecycle)) {
            poolElement(vNode);
        }
    }
    if (!isNull(parentDom)) {
        removeChild(parentDom, dom);
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
// rather than use a Map, like we did before, we can use an array here
// given there shouldn't be THAT many roots on the page, the difference
// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
var componentToDOMNodeMap = new Map();
var roots = options.roots;
/**
 * When inferno.options.findDOMNOdeEnabled is true, this function will return DOM Node by component instance
 * @param ref Component instance
 * @returns {*|null} returns dom node
 */
function findDOMNode(ref) {
    if (!options.findDOMNodeEnabled) {
        if (true) {
            throwError("findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!");
        }
        throwError();
    }
    var dom = ref && ref.nodeType ? ref : null;
    return componentToDOMNodeMap.get(ref) || dom;
}
function getRoot(dom) {
    for (var i = 0, len = roots.length; i < len; i++) {
        var root = roots[i];
        if (root.dom === dom) {
            return root;
        }
    }
    return null;
}
function setRoot(dom, input, lifecycle) {
    var root = {
        dom: dom,
        input: input,
        lifecycle: lifecycle
    };
    roots.push(root);
    return root;
}
function removeRoot(root) {
    for (var i = 0, len = roots.length; i < len; i++) {
        if (roots[i] === root) {
            roots.splice(i, 1);
            return;
        }
    }
}
if (true) {
    if (isBrowser && document.body === null) {
        warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
    }
}
var documentBody = isBrowser ? document.body : null;
/**
 * Renders virtual node tree into parent node.
 * @param {VNode | null | string | number} input vNode to be rendered
 * @param parentDom DOM node which content will be replaced by virtual node
 * @returns {InfernoChildren} rendered virtual node
 */
function render(input, parentDom) {
    if (documentBody === parentDom) {
        if (true) {
            throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
        }
        throwError();
    }
    if (input === NO_OP) {
        return;
    }
    var root = getRoot(parentDom);
    if (isNull(root)) {
        var lifecycle = new Lifecycle();
        if (!isInvalid(input)) {
            if (input.dom) {
                input = directClone(input);
            }
            if (!hydrateRoot(input, parentDom, lifecycle)) {
                mount(input, parentDom, lifecycle, EMPTY_OBJ, false);
            }
            root = setRoot(parentDom, input, lifecycle);
            lifecycle.trigger();
        }
    }
    else {
        var lifecycle$1 = root.lifecycle;
        lifecycle$1.listeners = [];
        if (isNullOrUndef(input)) {
            unmount(root.input, parentDom, lifecycle$1, false, false);
            removeRoot(root);
        }
        else {
            if (input.dom) {
                input = directClone(input);
            }
            patch(root.input, input, parentDom, lifecycle$1, EMPTY_OBJ, false, false);
        }
        root.input = input;
        lifecycle$1.trigger();
    }
    if (root) {
        var rootInput = root.input;
        if (rootInput && rootInput.flags & 28 /* Component */) {
            return rootInput.children;
        }
    }
}
function createRenderer(parentDom) {
    return function renderer(lastInput, nextInput) {
        if (!parentDom) {
            parentDom = lastInput;
        }
        render(nextInput, parentDom);
    };
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    if (lastVNode !== nextVNode) {
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        if (nextFlags & 28 /* Component */) {
            var isClass = (nextFlags & 4 /* ComponentClass */) > 0;
            if (lastFlags & 28 /* Component */) {
                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling);
            }
            else {
                replaceVNode(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, isClass), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 3970 /* Element */) {
            if (lastFlags & 3970 /* Element */) {
                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            }
            else {
                replaceVNode(parentDom, mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 1 /* Text */) {
            if (lastFlags & 1 /* Text */) {
                patchText(lastVNode, nextVNode);
            }
            else {
                replaceVNode(parentDom, mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 4096 /* Void */) {
            if (lastFlags & 4096 /* Void */) {
                patchVoid(lastVNode, nextVNode);
            }
            else {
                replaceVNode(parentDom, mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else {
            // Error case: mount new one replacing old one
            replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
function unmountChildren(children, dom, lifecycle, isRecycling) {
    if (isVNode(children)) {
        unmount(children, dom, lifecycle, true, isRecycling);
    }
    else if (isArray(children)) {
        removeAllChildren(dom, children, lifecycle, isRecycling);
    }
    else {
        dom.textContent = "";
    }
}
function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    var nextTag = nextVNode.type;
    var lastTag = lastVNode.type;
    if (lastTag !== nextTag) {
        replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
    }
    else {
        var dom = lastVNode.dom;
        var lastProps = lastVNode.props;
        var nextProps = nextVNode.props;
        var lastChildren = lastVNode.children;
        var nextChildren = nextVNode.children;
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        var nextRef = nextVNode.ref;
        var lastClassName = lastVNode.className;
        var nextClassName = nextVNode.className;
        nextVNode.dom = dom;
        isSVG = isSVG || (nextFlags & 128 /* SvgElement */) > 0;
        if (lastChildren !== nextChildren) {
            var childrenIsSVG = isSVG === true && nextVNode.type !== "foreignObject";
            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, childrenIsSVG, isRecycling);
        }
        // inlined patchProps  -- starts --
        if (lastProps !== nextProps) {
            var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
            var nextPropsOrEmpty = nextProps || EMPTY_OBJ;
            var hasControlledValue = false;
            if (nextPropsOrEmpty !== EMPTY_OBJ) {
                var isFormElement = (nextFlags & 3584 /* FormElement */) > 0;
                if (isFormElement) {
                    hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
                }
                for (var prop in nextPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    var nextValue = nextPropsOrEmpty[prop];
                    var lastValue = lastPropsOrEmpty[prop];
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                }
                if (isFormElement) {
                    // When inferno is recycling form element, we need to process it like it would be mounting
                    processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, isRecycling, hasControlledValue);
                }
            }
            if (lastPropsOrEmpty !== EMPTY_OBJ) {
                for (var prop$1 in lastPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (isNullOrUndef(nextPropsOrEmpty[prop$1]) &&
                        !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
                        removeProp(prop$1, lastPropsOrEmpty[prop$1], dom, nextFlags);
                    }
                }
            }
        }
        // inlined patchProps  -- ends --
        if (lastClassName !== nextClassName) {
            if (isNullOrUndef(nextClassName)) {
                dom.removeAttribute("class");
            }
            else {
                if (isSVG) {
                    dom.setAttribute("class", nextClassName);
                }
                else {
                    dom.className = nextClassName;
                }
            }
        }
        if (nextRef) {
            if (lastVNode.ref !== nextRef || isRecycling) {
                mountRef(dom, nextRef, lifecycle);
            }
        }
    }
}
function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var patchArray = false;
    var patchKeyed = false;
    if (nextFlags & 64 /* HasNonKeyedChildren */) {
        patchArray = true;
    }
    else if ((lastFlags & 32 /* HasKeyedChildren */) > 0 &&
        (nextFlags & 32 /* HasKeyedChildren */) > 0) {
        patchKeyed = true;
        patchArray = true;
    }
    else if (isInvalid(nextChildren)) {
        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
    }
    else if (isInvalid(lastChildren)) {
        if (isStringOrNumber(nextChildren)) {
            setTextContent(dom, nextChildren);
        }
        else {
            if (isArray(nextChildren)) {
                mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
            else {
                mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
    }
    else if (isStringOrNumber(nextChildren)) {
        if (isStringOrNumber(lastChildren)) {
            updateTextContent(dom, nextChildren);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            setTextContent(dom, nextChildren);
        }
    }
    else if (isArray(nextChildren)) {
        if (isArray(lastChildren)) {
            patchArray = true;
            if (isKeyed(lastChildren, nextChildren)) {
                patchKeyed = true;
            }
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    else if (isArray(lastChildren)) {
        removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        mount(nextChildren, dom, lifecycle, context, isSVG);
    }
    else if (isVNode(nextChildren)) {
        if (isVNode(lastChildren)) {
            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mount(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    if (patchArray) {
        var lastLength = lastChildren.length;
        var nextLength = nextChildren.length;
        // Fast path's for both algorithms
        if (lastLength === 0) {
            if (nextLength > 0) {
                mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
        else if (nextLength === 0) {
            removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        }
        else if (patchKeyed) {
            patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling, lastLength, nextLength);
        }
        else {
            patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling, lastLength, nextLength);
        }
    }
}
function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
    var lastType = lastVNode.type;
    var nextType = nextVNode.type;
    var lastKey = lastVNode.key;
    var nextKey = nextVNode.key;
    if (lastType !== nextType || lastKey !== nextKey) {
        replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        return false;
    }
    else {
        var nextProps = nextVNode.props || EMPTY_OBJ;
        if (isClass) {
            var instance = lastVNode.children;
            instance._updating = true;
            if (instance._unmounted) {
                if (isNull(parentDom)) {
                    return true;
                }
                replaceChild(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, (nextVNode.flags & 4 /* ComponentClass */) > 0), lastVNode.dom);
            }
            else {
                var hasComponentDidUpdate = !isUndefined(instance.componentDidUpdate);
                var nextState = instance.state;
                // When component has componentDidUpdate hook, we need to clone lastState or will be modified by reference during update
                var lastState = hasComponentDidUpdate
                    ? combineFrom(nextState, null)
                    : nextState;
                var lastProps = instance.props;
                nextVNode.children = instance;
                instance._isSVG = isSVG;
                var lastInput = instance._lastInput;
                var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                // If this component was destroyed by its parent do nothing, this is no-op
                // It can happen by using external callback etc during render / update
                if (instance._unmounted) {
                    return false;
                }
                var didUpdate = true;
                // Update component before getting child context
                var childContext;
                if (!isNullOrUndef(instance.getChildContext)) {
                    childContext = instance.getChildContext();
                }
                if (isNullOrUndef(childContext)) {
                    childContext = context;
                }
                else {
                    childContext = combineFrom(context, childContext);
                }
                instance._childContext = childContext;
                if (isInvalid(nextInput)) {
                    nextInput = createVoidVNode();
                }
                else if (nextInput === NO_OP) {
                    nextInput = lastInput;
                    didUpdate = false;
                }
                else if (isStringOrNumber(nextInput)) {
                    nextInput = createTextVNode(nextInput, null);
                }
                else if (isArray(nextInput)) {
                    if (true) {
                        throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
                    }
                    throwError();
                }
                else if (isObject(nextInput)) {
                    if (!isNull(nextInput.dom)) {
                        nextInput = directClone(nextInput);
                    }
                }
                if (nextInput.flags & 28 /* Component */) {
                    nextInput.parentVNode = nextVNode;
                }
                else if (lastInput.flags & 28 /* Component */) {
                    lastInput.parentVNode = nextVNode;
                }
                instance._lastInput = nextInput;
                instance._vNode = nextVNode;
                if (didUpdate) {
                    patch(lastInput, nextInput, parentDom, lifecycle, childContext, isSVG, isRecycling);
                    if (hasComponentDidUpdate && instance.componentDidUpdate) {
                        instance.componentDidUpdate(lastProps, lastState);
                    }
                    if (!isNull(options.afterUpdate)) {
                        options.afterUpdate(nextVNode);
                    }
                    if (options.findDOMNodeEnabled) {
                        componentToDOMNodeMap.set(instance, nextInput.dom);
                    }
                }
                nextVNode.dom = nextInput.dom;
            }
            instance._updating = false;
        }
        else {
            var shouldUpdate = true;
            var lastProps$1 = lastVNode.props;
            var nextHooks = nextVNode.ref;
            var nextHooksDefined = !isNullOrUndef(nextHooks);
            var lastInput$1 = lastVNode.children;
            var nextInput$1 = lastInput$1;
            nextVNode.dom = lastVNode.dom;
            nextVNode.children = lastInput$1;
            if (lastKey !== nextKey) {
                shouldUpdate = true;
            }
            else {
                if (nextHooksDefined &&
                    !isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps$1, nextProps);
                }
            }
            if (shouldUpdate !== false) {
                if (nextHooksDefined &&
                    !isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                    nextHooks.onComponentWillUpdate(lastProps$1, nextProps);
                }
                nextInput$1 = nextType(nextProps, context);
                if (isInvalid(nextInput$1)) {
                    nextInput$1 = createVoidVNode();
                }
                else if (isStringOrNumber(nextInput$1) && nextInput$1 !== NO_OP) {
                    nextInput$1 = createTextVNode(nextInput$1, null);
                }
                else if (isArray(nextInput$1)) {
                    if (true) {
                        throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
                    }
                    throwError();
                }
                else if (isObject(nextInput$1)) {
                    if (!isNull(nextInput$1.dom)) {
                        nextInput$1 = directClone(nextInput$1);
                    }
                }
                if (nextInput$1 !== NO_OP) {
                    patch(lastInput$1, nextInput$1, parentDom, lifecycle, context, isSVG, isRecycling);
                    nextVNode.children = nextInput$1;
                    if (nextHooksDefined &&
                        !isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                        nextHooks.onComponentDidUpdate(lastProps$1, nextProps);
                    }
                    nextVNode.dom = nextInput$1.dom;
                }
            }
            if (nextInput$1.flags & 28 /* Component */) {
                nextInput$1.parentVNode = nextVNode;
            }
            else if (lastInput$1.flags & 28 /* Component */) {
                lastInput$1.parentVNode = nextVNode;
            }
        }
    }
    return false;
}
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    nextVNode.dom = dom;
    if (lastVNode.children !== nextText) {
        dom.nodeValue = nextText;
    }
}
function patchVoid(lastVNode, nextVNode) {
    nextVNode.dom = lastVNode.dom;
}
function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling, lastChildrenLength, nextChildrenLength) {
    var commonLength = lastChildrenLength > nextChildrenLength
        ? nextChildrenLength
        : lastChildrenLength;
    var i = 0;
    for (; i < commonLength; i++) {
        var nextChild = nextChildren[i];
        if (nextChild.dom) {
            nextChild = nextChildren[i] = directClone(nextChild);
        }
        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; i++) {
            var nextChild$1 = nextChildren[i];
            if (nextChild$1.dom) {
                nextChild$1 = nextChildren[i] = directClone(nextChild$1);
            }
            appendChild(dom, mount(nextChild$1, null, lifecycle, context, isSVG));
        }
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; i++) {
            unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
        }
    }
}
function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling, aLength, bLength) {
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var aStart = 0;
    var bStart = 0;
    var i;
    var j;
    var aNode;
    var bNode;
    var nextNode;
    var nextPos;
    var node;
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    if (bStartNode.dom) {
        b[bStart] = bStartNode = directClone(bStartNode);
    }
    if (bEndNode.dom) {
        b[bEnd] = bEndNode = directClone(bEndNode);
    }
    // Step 1
    // tslint:disable-next-line
    outer: {
        // Sync nodes with the same key at the beginning.
        while (aStartNode.key === bStartNode.key) {
            patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aStartNode = a[aStart];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = directClone(bStartNode);
            }
        }
        // Sync nodes with the same key at the end.
        while (aEndNode.key === bEndNode.key) {
            patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aEndNode = a[aEnd];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = directClone(bEndNode);
            }
        }
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < bLength ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = directClone(node);
                }
                bStart++;
                insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
            }
        }
    }
    else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmount(a[aStart++], dom, lifecycle, false, isRecycling);
        }
    }
    else {
        var aLeft = aEnd - aStart + 1;
        var bLeft = bEnd - bStart + 1;
        var sources = new Array(bLeft);
        // Mark all nodes as inserted.
        for (i = 0; i < bLeft; i++) {
            sources[i] = -1;
        }
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if (bLeft <= 4 || aLeft * bLeft <= 16) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLeft) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = directClone(bNode);
                            }
                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                            patched++;
                            a[i] = null;
                            break;
                        }
                    }
                }
            }
        }
        else {
            var keyIndex = new Map();
            // Map keys by their index in array
            for (i = bStart; i <= bEnd; i++) {
                keyIndex.set(b[i].key, i);
            }
            // Try to patch same keys
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLeft) {
                    j = keyIndex.get(aNode.key);
                    if (!isUndefined(j)) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.dom) {
                            b[j] = bNode = directClone(bNode);
                        }
                        patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                        patched++;
                        a[i] = null;
                    }
                }
            }
        }
        // fast-path: if nothing patched remove all old and add all new
        if (aLeft === aLength && patched === 0) {
            removeAllChildren(dom, a, lifecycle, isRecycling);
            while (bStart < bLeft) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = directClone(node);
                }
                bStart++;
                insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), null);
            }
        }
        else {
            i = aLeft - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (!isNull(aNode)) {
                    unmount(aNode, dom, lifecycle, true, isRecycling);
                    i--;
                }
            }
            if (moved) {
                var seq = lis_algorithm(sources);
                j = seq.length - 1;
                for (i = bLeft - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = directClone(node);
                        }
                        nextPos = pos + 1;
                        insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextPos < bLength ? b[nextPos].dom : null);
                    }
                    else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            insertOrAppend(dom, node.dom, nextPos < bLength ? b[nextPos].dom : null);
                        }
                        else {
                            j--;
                        }
                    }
                }
            }
            else if (patched !== bLeft) {
                // when patched count doesn't match b length we need to insert those new ones
                // loop backwards so we can use insertBefore
                for (i = bLeft - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = directClone(node);
                        }
                        nextPos = pos + 1;
                        insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextPos < bLength ? b[nextPos].dom : null);
                    }
                }
            }
        }
    }
}
// // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function lis_algorithm(arr) {
    var p = arr.slice(0);
    var result = [0];
    var i;
    var j;
    var u;
    var v;
    var c;
    var len = arr.length;
    for (i = 0; i < len; i++) {
        var arrI = arr[i];
        if (arrI !== -1) {
            j = result[result.length - 1];
            if (arr[j] < arrI) {
                p[i] = j;
                result.push(i);
                continue;
            }
            u = 0;
            v = result.length - 1;
            while (u < v) {
                c = ((u + v) / 2) | 0;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                }
                else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1];
                }
                result[u] = i;
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
function isAttrAnEvent(attr) {
    return attr[0] === "o" && attr[1] === "n";
}
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
    if (lastValue !== nextValue) {
        if (skipProps.has(prop) || (hasControlledValue && prop === "value")) {
            return;
        }
        else if (booleanProps.has(prop)) {
            prop = prop === "autoFocus" ? prop.toLowerCase() : prop;
            dom[prop] = !!nextValue;
        }
        else if (strictProps.has(prop)) {
            var value = isNullOrUndef(nextValue) ? "" : nextValue;
            if (dom[prop] !== value) {
                dom[prop] = value;
            }
        }
        else if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, dom);
        }
        else if (isNullOrUndef(nextValue)) {
            dom.removeAttribute(prop);
        }
        else if (prop === "style") {
            patchStyle(lastValue, nextValue, dom);
        }
        else if (prop === "dangerouslySetInnerHTML") {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
                    dom.innerHTML = nextHtml;
                }
            }
        }
        else {
            // We optimize for NS being boolean. Its 99.9% time false
            if (isSVG && namespaces.has(prop)) {
                // If we end up in this path we can read property again
                dom.setAttributeNS(namespaces.get(prop), prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
        }
    }
}
function patchEvent(name, lastValue, nextValue, dom) {
    if (lastValue !== nextValue) {
        if (delegatedEvents.has(name)) {
            handleEvent(name, lastValue, nextValue, dom);
        }
        else {
            var nameLowerCase = name.toLowerCase();
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (domEvent && domEvent.wrapped) {
                return;
            }
            if (!isFunction(nextValue) && !isNullOrUndef(nextValue)) {
                var linkEvent = nextValue.event;
                if (linkEvent && isFunction(linkEvent)) {
                    dom[nameLowerCase] = function (e) {
                        linkEvent(nextValue.data, e);
                    };
                }
                else {
                    if (true) {
                        throwError(("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent."));
                    }
                    throwError();
                }
            }
            else {
                dom[nameLowerCase] = nextValue;
            }
        }
    }
}
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    var style;
    var value;
    if (isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
        for (style in nextAttrValue) {
            // do not add a hasOwnProperty check here, it affects performance
            value = nextAttrValue[style];
            if (value !== lastAttrValue[style]) {
                domStyle[style] =
                    !isNumber(value) || isUnitlessNumber.has(style)
                        ? value
                        : value + "px";
            }
        }
        for (style in lastAttrValue) {
            if (isNullOrUndef(nextAttrValue[style])) {
                domStyle[style] = "";
            }
        }
    }
    else {
        for (style in nextAttrValue) {
            value = nextAttrValue[style];
            domStyle[style] =
                !isNumber(value) || isUnitlessNumber.has(style) ? value : value + "px";
        }
    }
}
function removeProp(prop, lastValue, dom, nextFlags) {
    if (prop === "value") {
        // When removing value of select element, it needs to be set to null instead empty string, because empty string is valid value for option which makes that option selected
        // MS IE/Edge don't follow html spec for textArea and input elements and we need to set empty string to value in those cases to avoid "null" and "undefined" texts
        dom.value = nextFlags & 2048 /* SelectElement */ ? null : "";
    }
    else if (prop === "style") {
        dom.removeAttribute("style");
    }
    else if (isAttrAnEvent(prop)) {
        handleEvent(prop, lastValue, null, dom);
    }
    else {
        dom.removeAttribute(prop);
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function mount(vNode, parentDom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 3970 /* Element */) {
        return mountElement(vNode, parentDom, lifecycle, context, isSVG);
    }
    else if (flags & 28 /* Component */) {
        return mountComponent(vNode, parentDom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
    }
    else if (flags & 4096 /* Void */) {
        return mountVoid(vNode, parentDom);
    }
    else if (flags & 1 /* Text */) {
        return mountText(vNode, parentDom);
    }
    else {
        if (true) {
            if (typeof vNode === "object") {
                throwError(("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + (JSON.stringify(vNode)) + "\"."));
            }
            else {
                throwError(("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
            }
        }
        throwError();
    }
}
function mountText(vNode, parentDom) {
    var dom = document.createTextNode(vNode.children);
    vNode.dom = dom;
    if (!isNull(parentDom)) {
        appendChild(parentDom, dom);
    }
    return dom;
}
function mountVoid(vNode, parentDom) {
    var dom = document.createTextNode("");
    vNode.dom = dom;
    if (!isNull(parentDom)) {
        appendChild(parentDom, dom);
    }
    return dom;
}
function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
    var dom;
    if (options.recyclingEnabled) {
        dom = recycleElement(vNode, lifecycle, context, isSVG);
        if (!isNull(dom)) {
            if (!isNull(parentDom)) {
                appendChild(parentDom, dom);
            }
            return dom;
        }
    }
    var flags = vNode.flags;
    isSVG = isSVG || (flags & 128 /* SvgElement */) > 0;
    dom = documentCreateElement(vNode.type, isSVG);
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    vNode.dom = dom;
    if (!isInvalid(children)) {
        if (isStringOrNumber(children)) {
            setTextContent(dom, children);
        }
        else {
            var childrenIsSVG = isSVG === true && vNode.type !== "foreignObject";
            if (isArray(children)) {
                mountArrayChildren(children, dom, lifecycle, context, childrenIsSVG);
            }
            else if (isVNode(children)) {
                mount(children, dom, lifecycle, context, childrenIsSVG);
            }
        }
    }
    if (!isNull(props)) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (className !== null) {
        if (isSVG) {
            dom.setAttribute("class", className);
        }
        else {
            dom.className = className;
        }
    }
    if (!isNull(ref)) {
        mountRef(dom, ref, lifecycle);
    }
    if (!isNull(parentDom)) {
        appendChild(parentDom, dom);
    }
    return dom;
}
function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
        if (!isInvalid(child)) {
            if (child.dom) {
                children[i] = child = directClone(child);
            }
            mount(children[i], dom, lifecycle, context, isSVG);
        }
    }
}
function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
    var dom;
    if (options.recyclingEnabled) {
        dom = recycleComponent(vNode, lifecycle, context, isSVG);
        if (!isNull(dom)) {
            if (!isNull(parentDom)) {
                appendChild(parentDom, dom);
            }
            return dom;
        }
    }
    var type = vNode.type;
    var props = vNode.props || EMPTY_OBJ;
    var ref = vNode.ref;
    if (isClass) {
        var instance = createClassComponentInstance(vNode, type, props, context, isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false;
        if (options.findDOMNodeEnabled) {
            componentToDOMNodeMap.set(instance, dom);
        }
    }
    else {
        var input$1 = createFunctionalComponentInput(vNode, type, props, context);
        vNode.dom = dom = mount(input$1, null, lifecycle, context, isSVG);
        vNode.children = input$1;
        mountFunctionalComponentCallbacks(props, ref, dom, lifecycle);
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
    }
    return dom;
}
function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
    if (ref) {
        if (isFunction(ref)) {
            ref(instance);
        }
        else {
            if (true) {
                if (isStringOrNumber(ref)) {
                    throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                }
                else if (isObject(ref) && vNode.flags & 4 /* ComponentClass */) {
                    throwError("functional component lifecycle events are not supported on ES2015 class components.");
                }
                else {
                    throwError(("a bad value for \"ref\" was used on component: \"" + (JSON.stringify(ref)) + "\""));
                }
            }
            throwError();
        }
    }
    var hasDidMount = !isUndefined(instance.componentDidMount);
    var afterMount = options.afterMount;
    if (hasDidMount || !isNull(afterMount)) {
        lifecycle.addListener((function () {
            instance._updating = true;
            if (afterMount) {
                afterMount(vNode);
            }
            if (hasDidMount) {
                instance.componentDidMount();
            }
            instance._updating = false;
        }));
    }
}
function mountFunctionalComponentCallbacks(props, ref, dom, lifecycle) {
    if (ref) {
        if (!isNullOrUndef(ref.onComponentWillMount)) {
            ref.onComponentWillMount(props);
        }
        if (!isNullOrUndef(ref.onComponentDidMount)) {
            lifecycle.addListener((function () { return ref.onComponentDidMount(dom, props); }));
        }
    }
}
function mountRef(dom, value, lifecycle) {
    if (isFunction(value)) {
        lifecycle.addListener((function () { return value(dom); }));
    }
    else {
        if (isInvalid(value)) {
            return;
        }
        if (true) {
            throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        throwError();
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
var EMPTY_OBJ = {};
if (true) {
    Object.freeze(EMPTY_OBJ);
}
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    if (isUndefined(context)) {
        context = EMPTY_OBJ; // Context should not be mutable
    }
    var instance = new Component(props, context);
    vNode.children = instance;
    instance._blockSetState = false;
    instance.context = context;
    if (instance.props === EMPTY_OBJ) {
        instance.props = props;
    }
    // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
    instance._lifecycle = lifecycle;
    instance._unmounted = false;
    instance._isSVG = isSVG;
    if (!isNullOrUndef(instance.componentWillMount)) {
        instance._blockRender = true;
        instance.componentWillMount();
        if (instance._pendingSetState) {
            var state = instance.state;
            var pending = instance._pendingState;
            if (state === null) {
                instance.state = pending;
            }
            else {
                for (var key in pending) {
                    state[key] = pending[key];
                }
            }
            instance._pendingSetState = false;
            instance._pendingState = null;
        }
        instance._blockRender = false;
    }
    var childContext;
    if (!isNullOrUndef(instance.getChildContext)) {
        childContext = instance.getChildContext();
    }
    if (isNullOrUndef(childContext)) {
        instance._childContext = context;
    }
    else {
        instance._childContext = combineFrom(context, childContext);
    }
    if (!isNull(options.beforeRender)) {
        options.beforeRender(instance);
    }
    var input = instance.render(props, instance.state, context);
    if (!isNull(options.afterRender)) {
        options.afterRender(instance);
    }
    if (isArray(input)) {
        if (true) {
            throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
        }
        throwError();
    }
    else if (isInvalid(input)) {
        input = createVoidVNode();
    }
    else if (isStringOrNumber(input)) {
        input = createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    instance._lastInput = input;
    return instance;
}
function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
    replaceVNode(parentDom, mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
}
function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
    unmount(vNode, null, lifecycle, false, isRecycling);
    replaceChild(parentDom, dom, vNode.dom);
}
function createFunctionalComponentInput(vNode, component, props, context) {
    var input = component(props, context);
    if (isArray(input)) {
        if (true) {
            throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
        }
        throwError();
    }
    else if (isInvalid(input)) {
        input = createVoidVNode();
    }
    else if (isStringOrNumber(input)) {
        input = createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    return input;
}
function setTextContent(dom, text) {
    if (text !== "") {
        dom.textContent = text;
    }
    else {
        dom.appendChild(document.createTextNode(""));
    }
}
function updateTextContent(dom, text) {
    var textNode = dom.firstChild;
    // Guard against external change on DOM node.
    if (isNull(textNode)) {
        setTextContent(dom, text);
    }
    else {
        textNode.nodeValue = text;
    }
}
function appendChild(parentDom, dom) {
    parentDom.appendChild(dom);
}
function insertOrAppend(parentDom, newNode, nextNode) {
    if (isNullOrUndef(nextNode)) {
        appendChild(parentDom, newNode);
    }
    else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
function documentCreateElement(tag, isSVG) {
    if (isSVG === true) {
        return document.createElementNS(svgNS, tag);
    }
    else {
        return document.createElement(tag);
    }
}
function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    unmount(lastNode, null, lifecycle, false, isRecycling);
    var dom = mount(nextNode, null, lifecycle, context, isSVG);
    nextNode.dom = dom;
    replaceChild(parentDom, dom, lastNode.dom);
}
function replaceChild(parentDom, newDom, lastDom) {
    if (!parentDom) {
        parentDom = lastDom.parentNode;
    }
    parentDom.replaceChild(newDom, lastDom);
}
function removeChild(parentDom, dom) {
    parentDom.removeChild(dom);
}
function removeAllChildren(dom, children, lifecycle, isRecycling) {
    if (!options.recyclingEnabled || (options.recyclingEnabled && !isRecycling)) {
        removeChildren(null, children, lifecycle, isRecycling);
    }
    dom.textContent = "";
}
function removeChildren(dom, children, lifecycle, isRecycling) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (!isInvalid(child)) {
            unmount(child, dom, lifecycle, true, isRecycling);
        }
    }
}
function isKeyed(lastChildren, nextChildren) {
    return (nextChildren.length > 0 &&
        !isNullOrUndef(nextChildren[0]) &&
        !isNullOrUndef(nextChildren[0].key) &&
        lastChildren.length > 0 &&
        !isNullOrUndef(lastChildren[0]) &&
        !isNullOrUndef(lastChildren[0].key));
}
function isSameInnerHTML(dom, innerHTML) {
    var tempdom = document.createElement("i");
    tempdom.innerHTML = innerHTML;
    return tempdom.innerHTML === dom.innerHTML;
}
function isSamePropsInnerHTML(dom, props) {
    return Boolean(props &&
        props.dangerouslySetInnerHTML &&
        props.dangerouslySetInnerHTML.__html &&
        isSameInnerHTML(dom, props.dangerouslySetInnerHTML.__html));
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
/**
 * Creates virtual node
 * @param {number} flags
 * @param {string|Function|null} type
 * @param {string|null=} className
 * @param {object=} children
 * @param {object=} props
 * @param {*=} key
 * @param {object|Function=} ref
 * @param {boolean=} noNormalise
 * @returns {VNode} returns new virtual node
 */
function createVNode(flags, type, className, children, props, key, ref, noNormalise) {
    if (flags & 16 /* ComponentUnknown */) {
        flags = isStatefulComponent(type)
            ? 4 /* ComponentClass */
            : 8 /* ComponentFunction */;
    }
    var vNode = {
        children: children === void 0 ? null : children,
        className: className === void 0 ? null : className,
        dom: null,
        flags: flags,
        key: key === void 0 ? null : key,
        props: props === void 0 ? null : props,
        ref: ref === void 0 ? null : ref,
        type: type
    };
    if (noNormalise !== true) {
        normalize(vNode);
    }
    if (options.createVNode !== null) {
        options.createVNode(vNode);
    }
    return vNode;
}
function directClone(vNodeToClone) {
    var newVNode;
    var flags = vNodeToClone.flags;
    if (flags & 28 /* Component */) {
        var props;
        var propsToClone = vNodeToClone.props;
        if (isNull(propsToClone)) {
            props = EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, null, null, props, vNodeToClone.key, vNodeToClone.ref, true);
        var newProps = newVNode.props;
        var newChildren = newProps.children;
        // we need to also clone component children that are in props
        // as the children may also have been hoisted
        if (newChildren) {
            if (isArray(newChildren)) {
                var len = newChildren.length;
                if (len > 0) {
                    var tmpArray = [];
                    for (var i = 0; i < len; i++) {
                        var child = newChildren[i];
                        if (isStringOrNumber(child)) {
                            tmpArray.push(child);
                        }
                        else if (!isInvalid(child) && isVNode(child)) {
                            tmpArray.push(directClone(child));
                        }
                    }
                    newProps.children = tmpArray;
                }
            }
            else if (isVNode(newChildren)) {
                newProps.children = directClone(newChildren);
            }
        }
        newVNode.children = null;
    }
    else if (flags & 3970 /* Element */) {
        var children = vNodeToClone.children;
        var props$1;
        var propsToClone$1 = vNodeToClone.props;
        if (propsToClone$1 === null) {
            props$1 = EMPTY_OBJ;
        }
        else {
            props$1 = {};
            for (var key$1 in propsToClone$1) {
                props$1[key$1] = propsToClone$1[key$1];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props$1, vNodeToClone.key, vNodeToClone.ref, !children);
    }
    else if (flags & 1 /* Text */) {
        newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
    }
    return newVNode;
}
/*
 directClone is preferred over cloneVNode and used internally also.
 This function makes Inferno backwards compatible.
 And can be tree-shaked by modern bundlers

 Would be nice to combine this with directClone but could not do it without breaking change
 */
/**
 * Clones given virtual node by creating new instance of it
 * @param {VNode} vNodeToClone virtual node to be cloned
 * @param {Props=} props additional props for new virtual node
 * @param {...*} _children new children for new virtual node
 * @returns {VNode} new virtual node
 */
function cloneVNode(vNodeToClone, props) {
    var _children = [], len$2 = arguments.length - 2;
    while ( len$2-- > 0 ) _children[ len$2 ] = arguments[ len$2 + 2 ];

    var children = _children;
    var childrenLen = _children.length;
    if (childrenLen > 0 && !isUndefined(_children[0])) {
        if (!props) {
            props = {};
        }
        if (childrenLen === 1) {
            children = _children[0];
        }
        if (!isUndefined(children)) {
            props.children = children;
        }
    }
    var newVNode;
    if (isArray(vNodeToClone)) {
        var tmpArray = [];
        for (var i = 0, len = vNodeToClone.length; i < len; i++) {
            tmpArray.push(directClone(vNodeToClone[i]));
        }
        newVNode = tmpArray;
    }
    else {
        var flags = vNodeToClone.flags;
        var className = vNodeToClone.className;
        var key = vNodeToClone.key;
        var ref = vNodeToClone.ref;
        if (props) {
            if (props.hasOwnProperty("className")) {
                className = props.className;
            }
            if (props.hasOwnProperty("ref")) {
                ref = props.ref;
            }
            if (props.hasOwnProperty("key")) {
                key = props.key;
            }
        }
        if (flags & 28 /* Component */) {
            newVNode = createVNode(flags, vNodeToClone.type, className, null, !vNodeToClone.props && !props
                ? EMPTY_OBJ
                : combineFrom(vNodeToClone.props, props), key, ref, true);
            var newProps = newVNode.props;
            if (newProps) {
                var newChildren = newProps.children;
                // we need to also clone component children that are in props
                // as the children may also have been hoisted
                if (newChildren) {
                    if (isArray(newChildren)) {
                        var len$1 = newChildren.length;
                        if (len$1 > 0) {
                            var tmpArray$1 = [];
                            for (var i$1 = 0; i$1 < len$1; i$1++) {
                                var child = newChildren[i$1];
                                if (isStringOrNumber(child)) {
                                    tmpArray$1.push(child);
                                }
                                else if (!isInvalid(child) && isVNode(child)) {
                                    tmpArray$1.push(directClone(child));
                                }
                            }
                            newProps.children = tmpArray$1;
                        }
                    }
                    else if (isVNode(newChildren)) {
                        newProps.children = directClone(newChildren);
                    }
                }
            }
            newVNode.children = null;
        }
        else if (flags & 3970 /* Element */) {
            children =
                props && !isUndefined(props.children)
                    ? props.children
                    : vNodeToClone.children;
            newVNode = createVNode(flags, vNodeToClone.type, className, children, !vNodeToClone.props && !props
                ? EMPTY_OBJ
                : combineFrom(vNodeToClone.props, props), key, ref, false);
        }
        else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, key);
        }
    }
    return newVNode;
}
function createVoidVNode() {
    return createVNode(4096 /* Void */, null);
}
function createTextVNode(text, key) {
    return createVNode(1 /* Text */, null, null, text, null, key);
}
function isVNode(o) {
    return !!o.flags;
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
function applyKey(key, vNode) {
    vNode.key = key;
    return vNode;
}
function applyKeyIfMissing(key, vNode) {
    if (isNumber(key)) {
        key = "." + key;
    }
    if (isNull(vNode.key) || vNode.key[0] === ".") {
        return applyKey(key, vNode);
    }
    return vNode;
}
function applyKeyPrefix(key, vNode) {
    vNode.key = key + vNode.key;
    return vNode;
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        var key = currentKey + "." + index;
        if (!isInvalid(n)) {
            if (isArray(n)) {
                _normalizeVNodes(n, result, 0, key);
            }
            else {
                if (isStringOrNumber(n)) {
                    n = createTextVNode(n, null);
                }
                else if ((isVNode(n) && n.dom) || (n.key && n.key[0] === ".")) {
                    n = directClone(n);
                }
                if (isNull(n.key) || n.key[0] === ".") {
                    n = applyKey(key, n);
                }
                else {
                    n = applyKeyPrefix(currentKey, n);
                }
                result.push(n);
            }
        }
    }
}
function normalizeVNodes(nodes) {
    var newNodes;
    // we assign $ which basically means we've flagged this array for future note
    // if it comes back again, we need to clone it, as people are using it
    // in an immutable way
    // tslint:disable
    if (nodes["$"] === true) {
        nodes = nodes.slice();
    }
    else {
        nodes["$"] = true;
    }
    // tslint:enable
    for (var i = 0, len = nodes.length; i < len; i++) {
        var n = nodes[i];
        if (isInvalid(n) || isArray(n)) {
            var result = (newNodes || nodes).slice(0, i);
            _normalizeVNodes(nodes, result, i, "");
            return result;
        }
        else if (isStringOrNumber(n)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, createTextVNode(n, null)));
        }
        else if ((isVNode(n) && n.dom !== null) ||
            (isNull(n.key) && (n.flags & 64 /* HasNonKeyedChildren */) === 0)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, directClone(n)));
        }
        else if (newNodes) {
            newNodes.push(applyKeyIfMissing(i, directClone(n)));
        }
    }
    return newNodes || nodes;
}
function normalizeChildren(children) {
    if (isArray(children)) {
        return normalizeVNodes(children);
    }
    else if (isVNode(children) && children.dom !== null) {
        return directClone(children);
    }
    return children;
}
function normalizeProps(vNode, props, children) {
    if (vNode.flags & 3970 /* Element */) {
        if (isNullOrUndef(children) && props.hasOwnProperty("children")) {
            vNode.children = props.children;
        }
        if (props.hasOwnProperty("className")) {
            vNode.className = props.className || null;
            delete props.className;
        }
    }
    if (props.hasOwnProperty("ref")) {
        vNode.ref = props.ref;
        delete props.ref;
    }
    if (props.hasOwnProperty("key")) {
        vNode.key = props.key;
        delete props.key;
    }
}
function getFlagsForElementVnode(type) {
    if (type === "svg") {
        return 128 /* SvgElement */;
    }
    else if (type === "input") {
        return 512 /* InputElement */;
    }
    else if (type === "select") {
        return 2048 /* SelectElement */;
    }
    else if (type === "textarea") {
        return 1024 /* TextareaElement */;
    }
    else if (type === "media") {
        return 256 /* MediaElement */;
    }
    return 2 /* HtmlElement */;
}
function normalize(vNode) {
    var props = vNode.props;
    var children = vNode.children;
    // convert a wrongly created type back to element
    // Primitive node doesn't have defaultProps, only Component
    if (vNode.flags & 28 /* Component */) {
        // set default props
        var type = vNode.type;
        var defaultProps = type.defaultProps;
        if (!isNullOrUndef(defaultProps)) {
            if (!props) {
                props = vNode.props = defaultProps; // Create new object if only defaultProps given
            }
            else {
                for (var prop in defaultProps) {
                    if (isUndefined(props[prop])) {
                        props[prop] = defaultProps[prop];
                    }
                }
            }
        }
        if (isString(type)) {
            vNode.flags = getFlagsForElementVnode(type);
            if (props && props.children) {
                vNode.children = props.children;
                children = props.children;
            }
        }
    }
    if (props) {
        normalizeProps(vNode, props, children);
        if (!isInvalid(props.children)) {
            props.children = normalizeChildren(props.children);
        }
    }
    if (!isInvalid(children)) {
        vNode.children = normalizeChildren(children);
    }
    if (true) {
        // This code will be stripped out from production CODE
        // It helps users to track errors in their applications.
        var verifyKeys = function (vNodes) {
            var keyValues = vNodes.map((function (vnode) {
                return vnode.key;
            }));
            keyValues.some((function (item, idx) {
                var hasDuplicate = keyValues.indexOf(item) !== idx;
                if (hasDuplicate) {
                    warning("Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:" +
                        item);
                }
                return hasDuplicate;
            }));
        };
        if (vNode.children && Array.isArray(vNode.children)) {
            verifyKeys(vNode.children);
        }
    }
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
/**
 * Links given data to event as first parameter
 * @param {*} data data to be linked, it will be available in function as first parameter
 * @param {Function} event Function to be called when event occurs
 * @returns {{data: *, event: Function}}
 */
function linkEvent(data, event) {
    if (isFunction(event)) {
        return { data: data, event: event };
    }
    return null; // Return null when event is invalid, to avoid creating unnecessary event handlers
}

/**
 * @module Inferno
 */ /** TypeDoc Comment */
/* tslint:disable:object-literal-sort-keys */
if (true) {
    /* tslint:disable-next-line:no-empty */
    var testFunc = function testFn() { };
    if ((testFunc.name || testFunc.toString()).indexOf("testFn") ===
        -1) {
        warning("It looks like you're using a minified copy of the development build " +
            "of Inferno. When deploying Inferno apps to production, make sure to use " +
            "the production build which skips development warnings and is faster. " +
            "See http://infernojs.org for more details.");
    }
}
var version = "3.10.1";
// we duplicate it so it plays nicely with different module loading systems
var index = {
    EMPTY_OBJ: EMPTY_OBJ,
    NO_OP: NO_OP,
    cloneVNode: cloneVNode,
    createRenderer: createRenderer,
    createVNode: createVNode,
    findDOMNode: findDOMNode,
    getFlagsForElementVnode: getFlagsForElementVnode,
    internal_DOMNodeMap: componentToDOMNodeMap,
    internal_isUnitlessNumber: isUnitlessNumber,
    internal_normalize: normalize,
    internal_patch: patch,
    linkEvent: linkEvent,
    options: options,
    render: render,
    version: version
};

exports['default'] = index;
exports.EMPTY_OBJ = EMPTY_OBJ;
exports.NO_OP = NO_OP;
exports.cloneVNode = cloneVNode;
exports.createRenderer = createRenderer;
exports.createVNode = createVNode;
exports.findDOMNode = findDOMNode;
exports.getFlagsForElementVnode = getFlagsForElementVnode;
exports.internal_DOMNodeMap = componentToDOMNodeMap;
exports.internal_isUnitlessNumber = isUnitlessNumber;
exports.internal_normalize = normalize;
exports.internal_patch = patch;
exports.linkEvent = linkEvent;
exports.options = options;
exports.render = render;
exports.version = version;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno_component__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inferno_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__departureslist_departureslist__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__departurefilter_departurefilter__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errormessage_errormessage__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__addresssearch_addresssearch__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__header_header__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__footer_footer__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_accuracyindicator__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_css__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__app_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_inferno__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
 * Default app state
 * @type {Object}
 */var DEFAULT_STATE={loading:true,address:undefined,error:null,filters:{range:__WEBPACK_IMPORTED_MODULE_5__constants_constants__["b" /* DEFAULT_RANGE */],vehicleTypes:__WEBPACK_IMPORTED_MODULE_6__model__["a" /* allVehicleTypes */]}};/**
 * @class App
 * @extends {Inferno.Component}
 */var App=function(_Component){_inherits(App,_Component);/**
   * Creates an instance of App.
   * @constructs App
   */function App(){_classCallCheck(this,App);var _this=_possibleConstructorReturn(this,(App.__proto__||Object.getPrototypeOf(App)).call(this));_this.state=Object.assign({},DEFAULT_STATE);return _this;}/**
   * Find location and fetch departures when component has mounted
   */_createClass(App,[{key:'componentDidMount',value:function componentDidMount(){var _this2=this;// batch departures in every x seconds
setInterval(function(){return _this2.batchDeparturesToState();},__WEBPACK_IMPORTED_MODULE_5__constants_constants__["a" /* BATCH_INTERVAL */]);}/**
   * Batch departures and add them to state. Apply filters and also set filtered result to state.
   */},{key:'batchDeparturesToState',value:function batchDeparturesToState(){__WEBPACK_IMPORTED_MODULE_6__model__["b" /* batchDeparturesToState */](this.state).then(this.setState.bind(this)).catch(this.onError.bind(this));}},{key:'onFilterToggle',value:function onFilterToggle(type,multiselect){this.onFilterChange(__WEBPACK_IMPORTED_MODULE_6__model__["e" /* updateVehicleFilters */](type,multiselect,this.state));}/**
   * Callback for range filter change
   * @param {number} range
   */},{key:'onRangeChange',value:function onRangeChange(range){this.onFilterChange(Object.assign({},this.state.filters,{range:range}));}/**
   * Filter departures and set them and updated filters to the state
   * @param {object} filters
   */},{key:'onFilterChange',value:function onFilterChange(filters){this.setState({filters:filters,filtered:__WEBPACK_IMPORTED_MODULE_6__model__["c" /* filterDepartures */](filters,this.state.departures)});}/**
   * Remove address from the state
   */},{key:'clearAddress',value:function clearAddress(){this.setState({address:undefined});}/**
   * Search coordinates for given address/poi/etc.
   * @param {string} [address]
   */},{key:'searchForDepartures',value:function searchForDepartures(address){this.setState({address:address,loading:true});__WEBPACK_IMPORTED_MODULE_6__model__["d" /* findDepartures */](this.state,address.location).then(this.setState.bind(this)).catch(this.onError.bind(this));}/**
   * Adds error to the state and clears departures
   * @param {string} error Error message
   */},{key:'onError',value:function onError(error){console.error(error);this.setState({error:error,loading:false,departures:[],filtered:[]});}/**
   * Hides the error message
   * @param {string} error Error message
   */},{key:'hideError',value:function hideError(){this.setState({error:undefined});}/**
   * Renders App
   * @returns {string} markup
   */},{key:'render',value:function render(){var _state=this.state,filtered=_state.filtered,filters=_state.filters,error=_state.error,address=_state.address,loading=_state.loading,departureUpdateTime=_state.departureUpdateTime;return Object(__WEBPACK_IMPORTED_MODULE_11_inferno__["createVNode"])(2,'div','app-content',[Object(__WEBPACK_IMPORTED_MODULE_11_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_7__header_header__["a" /* default */],null,null,{'address':address,'selectLocation':this.searchForDepartures.bind(this)}),Object(__WEBPACK_IMPORTED_MODULE_11_inferno__["createVNode"])(2,'main',null,[error&&Object(__WEBPACK_IMPORTED_MODULE_11_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_3__errormessage_errormessage__["a" /* default */],null,null,{'message':error.message,'onClick':this.hideError.bind(this)}),Object(__WEBPACK_IMPORTED_MODULE_11_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_4__addresssearch_addresssearch__["a" /* default */],null,null,{'address':address,'onSearch':this.searchForDepartures.bind(this),'onError':this.onError.bind(this),'clearAddress':this.clearAddress.bind(this)}),address&&address.location&&Object(__WEBPACK_IMPORTED_MODULE_11_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_9__common_accuracyindicator__["a" /* default */],null,null,{'accuracy':address.location.accuracy}),Object(__WEBPACK_IMPORTED_MODULE_11_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_2__departurefilter_departurefilter__["a" /* default */],null,null,{'filters':__WEBPACK_IMPORTED_MODULE_6__model__["a" /* allVehicleTypes */],'activeFilters':filters.vehicleTypes,'range':filters.range,'onFilterToggle':this.onFilterToggle.bind(this),'onRangeChange':this.onRangeChange.bind(this)}),Object(__WEBPACK_IMPORTED_MODULE_11_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_1__departureslist_departureslist__["a" /* default */],null,null,{'isLoading':loading,'departures':filtered})]),Object(__WEBPACK_IMPORTED_MODULE_11_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_8__footer_footer__["a" /* default */],null,null,{'departureUpdateTime':departureUpdateTime})]);}}]);return App;}(__WEBPACK_IMPORTED_MODULE_0_inferno_component___default.a);/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var inferno = __webpack_require__(0);

/**
 * @module Inferno-Shared
 */ /** TypeDoc Comment */
var NO_OP = "$NO_OP";
var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;
function isStringOrNumber(o) {
    var type = typeof o;
    return type === "string" || type === "number";
}
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isFunction(o) {
    return typeof o === "function";
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}
function Lifecycle() {
    this.listeners = [];
}
Lifecycle.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle.prototype.trigger = function trigger() {
    var listeners = this.listeners;
    var listener;
    // We need to remove current listener from array when calling it, because more listeners might be added
    while ((listener = listeners.shift())) {
        listener();
    }
};

/**
 * @module Inferno-Component
 */ /** TypeDoc Comment */
// Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference
var noOp = ERROR_MSG;
if (true) {
    noOp =
        "Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.";
}
var componentCallbackQueue = new Map();
var resolvedPromise = Promise.resolve();
function addToQueue(component, force, callback) {
    var queue = componentCallbackQueue.get(component);
    if (queue === void 0) {
        queue = [];
        componentCallbackQueue.set(component, queue);
        resolvedPromise.then((function () {
            componentCallbackQueue.delete(component);
            component._updating = true;
            applyState(component, force, (function () {
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i].call(component);
                }
            }));
            component._updating = false;
        }));
    }
    if (!isNullOrUndef(callback)) {
        queue.push(callback);
    }
}
function queueStateChanges(component, newState, callback) {
    if (isFunction(newState)) {
        newState = newState(component.state, component.props, component.context);
    }
    var pending = component._pendingState;
    if (isNullOrUndef(pending)) {
        component._pendingState = newState;
    }
    else {
        for (var stateKey in newState) {
            pending[stateKey] = newState[stateKey];
        }
    }
    if (!component._pendingSetState && !component._blockRender) {
        if (!component._updating) {
            component._pendingSetState = true;
            component._updating = true;
            applyState(component, false, callback);
            component._updating = false;
        }
        else {
            addToQueue(component, false, callback);
        }
    }
    else {
        component._pendingSetState = true;
        if (isFunction(callback) && component._blockRender) {
            component._lifecycle.addListener(callback.bind(component));
        }
    }
}
function applyState(component, force, callback) {
    if (component._unmounted) {
        return;
    }
    if (force || !component._blockRender) {
        component._pendingSetState = false;
        var pendingState = component._pendingState;
        var prevState = component.state;
        var nextState = combineFrom(prevState, pendingState);
        var props = component.props;
        var context = component.context;
        component._pendingState = null;
        var nextInput;
        var renderOutput = component._updateComponent(prevState, nextState, props, props, context, force, true);
        var didUpdate = true;
        if (isInvalid(renderOutput)) {
            nextInput = inferno.createVNode(4096 /* Void */, null);
        }
        else if (renderOutput === NO_OP) {
            nextInput = component._lastInput;
            didUpdate = false;
        }
        else if (isStringOrNumber(renderOutput)) {
            nextInput = inferno.createVNode(1 /* Text */, null, null, renderOutput);
        }
        else if (isArray(renderOutput)) {
            if (true) {
                throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
            }
            return throwError();
        }
        else {
            nextInput = renderOutput;
        }
        var lastInput = component._lastInput;
        var vNode = component._vNode;
        var parentDom = (lastInput.dom && lastInput.dom.parentNode) ||
            (lastInput.dom = vNode.dom);
        if (nextInput.flags & 28 /* Component */) {
            nextInput.parentVNode = vNode;
        }
        component._lastInput = nextInput;
        if (didUpdate) {
            var childContext;
            if (!isNullOrUndef(component.getChildContext)) {
                childContext = component.getChildContext();
            }
            if (isNullOrUndef(childContext)) {
                childContext = component._childContext;
            }
            else {
                childContext = combineFrom(context, childContext);
            }
            var lifeCycle = component._lifecycle;
            inferno.internal_patch(lastInput, nextInput, parentDom, lifeCycle, childContext, component._isSVG, false);
            // If this component was unmounted by its parent, do nothing. This is no-op
            if (component._unmounted) {
                return;
            }
            lifeCycle.trigger();
            if (!isNullOrUndef(component.componentDidUpdate)) {
                component.componentDidUpdate(props, prevState, context);
            }
            if (!isNull(inferno.options.afterUpdate)) {
                inferno.options.afterUpdate(vNode);
            }
        }
        var dom = (vNode.dom = nextInput.dom);
        if (inferno.options.findDOMNodeEnabled) {
            inferno.internal_DOMNodeMap.set(component, nextInput.dom);
        }
        while (!isNullOrUndef((vNode = vNode.parentVNode))) {
            if ((vNode.flags & 28 /* Component */) > 0) {
                vNode.dom = dom;
            }
        }
    }
    else {
        component.state = component._pendingState;
        component._pendingState = null;
    }
    if (isFunction(callback)) {
        callback.call(component);
    }
}
var Component = function Component(props, context) {
    this.state = null;
    this._blockRender = false;
    this._blockSetState = true;
    this._pendingSetState = false;
    this._pendingState = null;
    this._lastInput = null;
    this._vNode = null;
    this._unmounted = false;
    this._lifecycle = null;
    this._childContext = null;
    this._isSVG = false;
    this._updating = true;
    /** @type {object} */
    this.props = props || inferno.EMPTY_OBJ;
    /** @type {object} */
    this.context = context || inferno.EMPTY_OBJ; // context should not be mutable
};
Component.prototype.forceUpdate = function forceUpdate (callback) {
    if (this._unmounted) {
        return;
    }
    applyState(this, true, callback);
};
Component.prototype.setState = function setState (newState, callback) {
    if (this._unmounted) {
        return;
    }
    if (!this._blockSetState) {
        queueStateChanges(this, newState, callback);
    }
    else {
        if (true) {
            throwError("cannot update state via setState() in componentWillUpdate() or constructor.");
        }
        throwError();
    }
};
Component.prototype._updateComponent = function _updateComponent (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
    if (this._unmounted === true) {
        if (true) {
            throwError(noOp);
        }
        throwError();
    }
    if (prevProps !== nextProps ||
        nextProps === inferno.EMPTY_OBJ ||
        prevState !== nextState ||
        force) {
        if (prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ) {
            if (!isNullOrUndef(this.componentWillReceiveProps) && !fromSetState) {
                this._blockRender = true;
                this.componentWillReceiveProps(nextProps, context);
                // If this component was removed during its own update do nothing...
                if (this._unmounted) {
                    return NO_OP;
                }
                this._blockRender = false;
            }
            if (this._pendingSetState) {
                nextState = combineFrom(nextState, this._pendingState);
                this._pendingSetState = false;
                this._pendingState = null;
            }
        }
        /* Update if scu is not defined, or it returns truthy value or force */
        if (force ||
            isNullOrUndef(this.shouldComponentUpdate) ||
            (this.shouldComponentUpdate &&
                this.shouldComponentUpdate(nextProps, nextState, context))) {
            if (!isNullOrUndef(this.componentWillUpdate)) {
                this._blockSetState = true;
                this.componentWillUpdate(nextProps, nextState, context);
                this._blockSetState = false;
            }
            this.props = nextProps;
            this.state = nextState;
            this.context = context;
            if (inferno.options.beforeRender) {
                inferno.options.beforeRender(this);
            }
            var render = this.render(nextProps, nextState, context);
            if (inferno.options.afterRender) {
                inferno.options.afterRender(this);
            }
            return render;
        }
        else {
            this.props = nextProps;
            this.state = nextState;
            this.context = context;
        }
    }
    return NO_OP;
};
// tslint:disable-next-line:no-empty
Component.prototype.render = function render (nextProps, nextState, nextContext) { };

exports['default'] = Component;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno_component__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inferno_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__departurerow__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loadingoverlay_loadingoverlay__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__departureslistsortheader__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_departuresorter__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__departureslist_css__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__departureslist_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__departureslist_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_inferno__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
 * Generate a row for each departure
 * @private
 * @param {Object[]} departures
 * @returns {Function[]}
 */var generateDepartureRows=function generateDepartureRows(departures){return departures.map(function(departure){return Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_1__departurerow__["a" /* default */],null,null,Object.assign({},departure),departure.id);});};/**
 * Generate a placeholder row
 * @private
 * @returns {Function}
 */var generateEmptyRow=function generateEmptyRow(){return Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(2,'div','departures-list-row no-results','L\xE4ht\xF6j\xE4 ei l\xF6ytynyt annetuilla hakukriteereill\xE4 tai suodattimilla.');};/**
 * A component for displaying a list of departures
 * @class DeparturesList
 * @extends {Inferno.Component}
 */var DeparturesList=function(_Component){_inherits(DeparturesList,_Component);/**
   * Creates an instance of DeparturesList.
   * @param {Object} props
   * @param {Object[]} props.departures
   */function DeparturesList(){var props=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,DeparturesList);var _this=_possibleConstructorReturn(this,(DeparturesList.__proto__||Object.getPrototypeOf(DeparturesList)).call(this,props));_this.state={sortProp:'time',sortDir:1};return _this;}/**
   * Sorts departures by prop and set to state
   * @param {string} propName Name of the prop to sort by
   */_createClass(DeparturesList,[{key:'updateSortProps',value:function updateSortProps(propName){// if sorted with same prop as before then switch sort mode asc <--> desc
var sortDir=this.state.sortProp===propName?this.state.sortDir*-1:1;// set sort props to state and then sort departures
this.setState({sortProp:propName,sortDir:sortDir});}},{key:'render',value:function render(){var _state=this.state,sortProp=_state.sortProp,sortDir=_state.sortDir;// sort departures using sort props from state
var sorted=Object(__WEBPACK_IMPORTED_MODULE_4__utils_departuresorter__["a" /* default */])(this.props.departures,sortProp,sortDir);// display rows or a placeholder row when there are no departures to display
var rows=sorted.length?generateDepartureRows(sorted):generateEmptyRow();// bound callback
var boundUpdateSortProps=this.updateSortProps.bind(this);return Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(2,'div','departures-list',[Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_2__loadingoverlay_loadingoverlay__["a" /* default */],null,null,{'show':this.props.isLoading}),Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(2,'div','departures-list-header',[Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_3__departureslistsortheader__["a" /* default */],null,null,{'propName':'time','active':sortProp==='time','onClick':boundUpdateSortProps,'text':'L\xE4htee'}),Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_3__departureslistsortheader__["a" /* default */],null,null,{'propName':'routeName','active':sortProp==='routeName','onClick':boundUpdateSortProps,'text':'Linja'}),Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_3__departureslistsortheader__["a" /* default */],null,null,{'propName':'destination','active':sortProp==='destination','onClick':boundUpdateSortProps,'text':'M\xE4\xE4r\xE4np\xE4\xE4'}),Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_3__departureslistsortheader__["a" /* default */],null,null,{'propName':'distance','active':sortProp==='distance','onClick':boundUpdateSortProps,'text':'Pys\xE4kille'})]),Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(2,'div','departures-list-body',rows)]);}}]);return DeparturesList;}(__WEBPACK_IMPORTED_MODULE_0_inferno_component___default.a);/* harmony default export */ __webpack_exports__["a"] = (DeparturesList);;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__time__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routeidentifier__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__distance__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_inferno__);
/**
 * Displays a single departure in the departures table
 * @constructs DepartureRow
 * @param {Object} props
 * @param {boolean} props.realtime
 * @param {number} props.realtimeDeparture
 * @param {string} props.routeName
 * @param {number} props.distance
 * @param {string} props.destination
 * @param {string} props.vehicleType
 * @returns {DepartureRow}
 *//* harmony default export */ __webpack_exports__["a"] = (function(){var _ref=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{},realtime=_ref.realtime,realtimeDeparture=_ref.realtimeDeparture,routeName=_ref.routeName,distance=_ref.distance,destination=_ref.destination,vehicleType=_ref.vehicleType,url=_ref.url;return Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'a','departures-list-row',[Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'div','time'+(realtime?' realtime':''),Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_0__time__["a" /* default */],null,null,{'time':realtimeDeparture})),Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'div','routename',Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_1__routeidentifier__["a" /* default */],null,null,{'vehicleType':vehicleType,'routeName':routeName})),Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'div','destination',destination),Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'div','distance',Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_2__distance__["a" /* default */],null,null,{'distance':distance}))],{'href':url,'target':'_blank'});});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inferno__);
/**
 * Get time as string containing hours and minutes separated by a colon
 * @private
 * @param {Date} date
 * @returns {string}
 */var getTimeAsText=function getTimeAsText(date){return Object(__WEBPACK_IMPORTED_MODULE_0__utils_utils__["d" /* padNumber */])(date.getHours())+':'+Object(__WEBPACK_IMPORTED_MODULE_0__utils_utils__["d" /* padNumber */])(date.getMinutes());};/**
 * Component for displaying time in human readable form
 * @constructs Time
 * @param {Object} props
 * @param {number} props.time Time in seconds
 * @return {Time}
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var time=_ref.time;var now=Date.now();var date=new Date(time*1000);var timeLeftInMins=Math.floor((date-now)/1000/60);var timeText='';if(date>now&&timeLeftInMins<10){timeText=timeLeftInMins<1?'Now':timeLeftInMins+' min';}else{timeText=getTimeAsText(date);}return Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,'span',null,timeText);});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_vehicleicon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inferno__);
/**
 * Component for displaying a vehicle icon and route number
 * @constructs RouteIdentifier
 * @param {Object} props
 * @param {string} [routeName=""]
 * @param {string} [vehicleType=""]
 * @returns {RouteIdentifier}
 *//* harmony default export */ __webpack_exports__["a"] = (function(){var _ref=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{},_ref$routeName=_ref.routeName,routeName=_ref$routeName===undefined?'':_ref$routeName,_ref$vehicleType=_ref.vehicleType,vehicleType=_ref$vehicleType===undefined?'':_ref$vehicleType;return Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,'span',vehicleType.toLowerCase(),[Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_0__common_vehicleicon__["a" /* default */],null,null,{'iconName':vehicleType.toLocaleLowerCase()}),Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,'span','route-identifier',routeName)]);});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/icons.7cc3ba83.svg";

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inferno__);
/**
 * A component for displaying distance in human readable form
 * @constructs Distance
 * @param {Object} props
 * @param {number} props.distance distance in meters
 * @returns {Distance}
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var distance=_ref.distance;var displayedDistance='';if(distance){// if distance is more than km then display kilometers with single decimal
if(distance>=1000){var rounded=Math.round(distance/1000*10)/10;displayedDistance=rounded+' km';}else{displayedDistance=distance+' m';}}return Object(__WEBPACK_IMPORTED_MODULE_0_inferno__["createVNode"])(2,'span',null,displayedDistance);});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spinner_svg__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spinner_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__spinner_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loadingoverlay_css__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loadingoverlay_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__loadingoverlay_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_inferno__);
/**
 * Overlay component with spinner image
 * @constructs LoadingOverlay
 * @param {Object} props
 * @param {boolean} props.show
 * @returns {LoadingOverlay}
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var show=_ref.show;return Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'div','loading-overlay',Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'img','spinner',null,{'src':__WEBPACK_IMPORTED_MODULE_0__spinner_svg___default.a,'alt':'spinner'}),{'style':{display:show?'block':'none'},'role':'dialog','aria-label':'Odotetaan','aria-busy':show});});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/spinner.8fd60d77.svg";

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inferno__);
/**
 * Creates a callback for keypress event
 * @private
 * @param {Function} callback
 * @param {string} propName
 * @return {Function}
 */var keyPressHandler=function keyPressHandler(callback,propName){return function(e){var keyCode=e.keyCode;// act if key was space or enter
if([13,32].indexOf(keyCode)>-1){e.preventDefault();callback(propName);}};};/**
 * Departures list sorting header component
 * @constructs DepartureListSortHeader
 * @param {Object} props
 * @param {Function} props.onClick
 * @param {string} [props.propName=""]
 * @param {boolean} [props.active=false]
 * @param {string} [props.text=""]
 * @returns {DepartureListSortHeader}
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var _ref$propName=_ref.propName,propName=_ref$propName===undefined?'':_ref$propName,_ref$active=_ref.active,active=_ref$active===undefined?false:_ref$active,_ref$text=_ref.text,text=_ref$text===undefined?'':_ref$text,_onClick=_ref.onClick;return Object(__WEBPACK_IMPORTED_MODULE_0_inferno__["createVNode"])(2,'div','header '+propName.toLowerCase(),Object(__WEBPACK_IMPORTED_MODULE_0_inferno__["createVNode"])(2,'span',active?'active':'',text),{'tabindex':'0','role':'button','aria-pressed':active?'true':'false','aria-label':'J\xE4rjest\xE4 lista '+text+' mukaan','onClick':function onClick(){return _onClick(propName);},'onKeyPress':keyPressHandler(_onClick,propName)});});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sort;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fputils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/** @module DepartureSorter *//**
 * Return sorter function for departures
 * @private
 * @param {Object[]} list List of departures
 * @param {string} propName Property to sort by
 * @param {number} sortDir 1=ascending, -1=descending
 * @returns {Object[]} Sorted departures
 */function sort(list,propName,sortDir){var iteratee=propName==='time'?__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].property('realtimeDeparture'):__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].property(propName);var sorted=Object(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* sortBy */])(iteratee)(list);return sortDir===-1?sorted.reverse():sorted;}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _always = __webpack_require__(39);

var _always2 = _interopRequireDefault(_always);

var _and = __webpack_require__(40);

var _and2 = _interopRequireDefault(_and);

var _assign = __webpack_require__(41);

var _assign2 = _interopRequireDefault(_assign);

var _average = __webpack_require__(42);

var _average2 = _interopRequireDefault(_average);

var _between = __webpack_require__(43);

var _between2 = _interopRequireDefault(_between);

var _bind = __webpack_require__(44);

var _bind2 = _interopRequireDefault(_bind);

var _bitAnd = __webpack_require__(45);

var _bitAnd2 = _interopRequireDefault(_bitAnd);

var _bitOr = __webpack_require__(46);

var _bitOr2 = _interopRequireDefault(_bitOr);

var _butLast = __webpack_require__(47);

var _butLast2 = _interopRequireDefault(_butLast);

var _by = __webpack_require__(48);

var _by2 = _interopRequireDefault(_by);

var _charAt = __webpack_require__(49);

var _charAt2 = _interopRequireDefault(_charAt);

var _charCodeAt = __webpack_require__(50);

var _charCodeAt2 = _interopRequireDefault(_charCodeAt);

var _codePointAt = __webpack_require__(51);

var _codePointAt2 = _interopRequireDefault(_codePointAt);

var _compose = __webpack_require__(52);

var _compose2 = _interopRequireDefault(_compose);

var _composeAll = __webpack_require__(53);

var _composeAll2 = _interopRequireDefault(_composeAll);

var _concat = __webpack_require__(54);

var _concat2 = _interopRequireDefault(_concat);

var _converge = __webpack_require__(55);

var _converge2 = _interopRequireDefault(_converge);

var _curry = __webpack_require__(56);

var _curry2 = _interopRequireDefault(_curry);

var _curryRight = __webpack_require__(57);

var _curryRight2 = _interopRequireDefault(_curryRight);

var _dec = __webpack_require__(58);

var _dec2 = _interopRequireDefault(_dec);

var _drop = __webpack_require__(59);

var _drop2 = _interopRequireDefault(_drop);

var _endsWith = __webpack_require__(60);

var _endsWith2 = _interopRequireDefault(_endsWith);

var _endsWithAt = __webpack_require__(61);

var _endsWithAt2 = _interopRequireDefault(_endsWithAt);

var _equal = __webpack_require__(62);

var _equal2 = _interopRequireDefault(_equal);

var _every = __webpack_require__(63);

var _every2 = _interopRequireDefault(_every);

var _exec = __webpack_require__(64);

var _exec2 = _interopRequireDefault(_exec);

var _explode = __webpack_require__(65);

var _explode2 = _interopRequireDefault(_explode);

var _filter = __webpack_require__(66);

var _filter2 = _interopRequireDefault(_filter);

var _flatMap = __webpack_require__(67);

var _flatMap2 = _interopRequireDefault(_flatMap);

var _flip = __webpack_require__(68);

var _flip2 = _interopRequireDefault(_flip);

var _fold = __webpack_require__(69);

var _fold2 = _interopRequireDefault(_fold);

var _foldRight = __webpack_require__(70);

var _foldRight2 = _interopRequireDefault(_foldRight);

var _forEach = __webpack_require__(71);

var _forEach2 = _interopRequireDefault(_forEach);

var _greaterOrEqual = __webpack_require__(72);

var _greaterOrEqual2 = _interopRequireDefault(_greaterOrEqual);

var _greaterThan = __webpack_require__(73);

var _greaterThan2 = _interopRequireDefault(_greaterThan);

var _hasOwnProperty = __webpack_require__(74);

var _hasOwnProperty2 = _interopRequireDefault(_hasOwnProperty);

var _head = __webpack_require__(75);

var _head2 = _interopRequireDefault(_head);

var _identity = __webpack_require__(76);

var _identity2 = _interopRequireDefault(_identity);

var _ifThen = __webpack_require__(77);

var _ifThen2 = _interopRequireDefault(_ifThen);

var _ifThenElse = __webpack_require__(78);

var _ifThenElse2 = _interopRequireDefault(_ifThenElse);

var _implode = __webpack_require__(79);

var _implode2 = _interopRequireDefault(_implode);

var _inc = __webpack_require__(80);

var _inc2 = _interopRequireDefault(_inc);

var _includes = __webpack_require__(81);

var _includes2 = _interopRequireDefault(_includes);

var _indexOf = __webpack_require__(82);

var _indexOf2 = _interopRequireDefault(_indexOf);

var _isBetween = __webpack_require__(83);

var _isBetween2 = _interopRequireDefault(_isBetween);

var _isBoolean = __webpack_require__(84);

var _isBoolean2 = _interopRequireDefault(_isBoolean);

var _isFalse = __webpack_require__(85);

var _isFalse2 = _interopRequireDefault(_isFalse);

var _isFalsy = __webpack_require__(86);

var _isFalsy2 = _interopRequireDefault(_isFalsy);

var _isFunction = __webpack_require__(87);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isNull = __webpack_require__(88);

var _isNull2 = _interopRequireDefault(_isNull);

var _isNumber = __webpack_require__(89);

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isObject = __webpack_require__(90);

var _isObject2 = _interopRequireDefault(_isObject);

var _isPlainObject = __webpack_require__(91);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isString = __webpack_require__(92);

var _isString2 = _interopRequireDefault(_isString);

var _isTrue = __webpack_require__(93);

var _isTrue2 = _interopRequireDefault(_isTrue);

var _isTruthy = __webpack_require__(94);

var _isTruthy2 = _interopRequireDefault(_isTruthy);

var _isTypeOf = __webpack_require__(95);

var _isTypeOf2 = _interopRequireDefault(_isTypeOf);

var _isUndefined = __webpack_require__(96);

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isUnknown = __webpack_require__(97);

var _isUnknown2 = _interopRequireDefault(_isUnknown);

var _join = __webpack_require__(98);

var _join2 = _interopRequireDefault(_join);

var _keys = __webpack_require__(99);

var _keys2 = _interopRequireDefault(_keys);

var _last = __webpack_require__(100);

var _last2 = _interopRequireDefault(_last);

var _lastIndexOf = __webpack_require__(101);

var _lastIndexOf2 = _interopRequireDefault(_lastIndexOf);

var _length = __webpack_require__(102);

var _length2 = _interopRequireDefault(_length);

var _lessOrEqual = __webpack_require__(103);

var _lessOrEqual2 = _interopRequireDefault(_lessOrEqual);

var _lessThan = __webpack_require__(104);

var _lessThan2 = _interopRequireDefault(_lessThan);

var _localeCompare = __webpack_require__(105);

var _localeCompare2 = _interopRequireDefault(_localeCompare);

var _looseEqual = __webpack_require__(106);

var _looseEqual2 = _interopRequireDefault(_looseEqual);

var _map = __webpack_require__(107);

var _map2 = _interopRequireDefault(_map);

var _match = __webpack_require__(108);

var _match2 = _interopRequireDefault(_match);

var _max = __webpack_require__(109);

var _max2 = _interopRequireDefault(_max);

var _method = __webpack_require__(110);

var _method2 = _interopRequireDefault(_method);

var _min = __webpack_require__(111);

var _min2 = _interopRequireDefault(_min);

var _minus = __webpack_require__(112);

var _minus2 = _interopRequireDefault(_minus);

var _nand = __webpack_require__(113);

var _nand2 = _interopRequireDefault(_nand);

var _noop = __webpack_require__(114);

var _noop2 = _interopRequireDefault(_noop);

var _nor = __webpack_require__(115);

var _nor2 = _interopRequireDefault(_nor);

var _normalize = __webpack_require__(116);

var _normalize2 = _interopRequireDefault(_normalize);

var _not = __webpack_require__(117);

var _not2 = _interopRequireDefault(_not);

var _nth = __webpack_require__(118);

var _nth2 = _interopRequireDefault(_nth);

var _omit = __webpack_require__(119);

var _omit2 = _interopRequireDefault(_omit);

var _or = __webpack_require__(120);

var _or2 = _interopRequireDefault(_or);

var _pick = __webpack_require__(121);

var _pick2 = _interopRequireDefault(_pick);

var _pipe = __webpack_require__(122);

var _pipe2 = _interopRequireDefault(_pipe);

var _pipeAll = __webpack_require__(123);

var _pipeAll2 = _interopRequireDefault(_pipeAll);

var _plus = __webpack_require__(124);

var _plus2 = _interopRequireDefault(_plus);

var _product = __webpack_require__(125);

var _product2 = _interopRequireDefault(_product);

var _property = __webpack_require__(126);

var _property2 = _interopRequireDefault(_property);

var _push = __webpack_require__(127);

var _push2 = _interopRequireDefault(_push);

var _put = __webpack_require__(128);

var _put2 = _interopRequireDefault(_put);

var _reduce = __webpack_require__(129);

var _reduce2 = _interopRequireDefault(_reduce);

var _reduceRight = __webpack_require__(130);

var _reduceRight2 = _interopRequireDefault(_reduceRight);

var _repeat = __webpack_require__(131);

var _repeat2 = _interopRequireDefault(_repeat);

var _replace = __webpack_require__(132);

var _replace2 = _interopRequireDefault(_replace);

var _search = __webpack_require__(133);

var _search2 = _interopRequireDefault(_search);

var _shallowClone = __webpack_require__(134);

var _shallowClone2 = _interopRequireDefault(_shallowClone);

var _shave = __webpack_require__(135);

var _shave2 = _interopRequireDefault(_shave);

var _signum = __webpack_require__(136);

var _signum2 = _interopRequireDefault(_signum);

var _slice = __webpack_require__(137);

var _slice2 = _interopRequireDefault(_slice);

var _some = __webpack_require__(138);

var _some2 = _interopRequireDefault(_some);

var _split = __webpack_require__(139);

var _split2 = _interopRequireDefault(_split);

var _startsWith = __webpack_require__(140);

var _startsWith2 = _interopRequireDefault(_startsWith);

var _startsWithAt = __webpack_require__(141);

var _startsWithAt2 = _interopRequireDefault(_startsWithAt);

var _sum = __webpack_require__(142);

var _sum2 = _interopRequireDefault(_sum);

var _tail = __webpack_require__(143);

var _tail2 = _interopRequireDefault(_tail);

var _take = __webpack_require__(144);

var _take2 = _interopRequireDefault(_take);

var _takeUntil = __webpack_require__(145);

var _takeUntil2 = _interopRequireDefault(_takeUntil);

var _takeWhile = __webpack_require__(146);

var _takeWhile2 = _interopRequireDefault(_takeWhile);

var _test = __webpack_require__(147);

var _test2 = _interopRequireDefault(_test);

var _times = __webpack_require__(148);

var _times2 = _interopRequireDefault(_times);

var _toLowerCase = __webpack_require__(149);

var _toLowerCase2 = _interopRequireDefault(_toLowerCase);

var _toUpperCase = __webpack_require__(150);

var _toUpperCase2 = _interopRequireDefault(_toUpperCase);

var _trim = __webpack_require__(151);

var _trim2 = _interopRequireDefault(_trim);

var _uncurry = __webpack_require__(152);

var _uncurry2 = _interopRequireDefault(_uncurry);

var _uncurry3 = __webpack_require__(153);

var _uncurry32 = _interopRequireDefault(_uncurry3);

var _unfold = __webpack_require__(154);

var _unfold2 = _interopRequireDefault(_unfold);

var _values = __webpack_require__(155);

var _values2 = _interopRequireDefault(_values);

var _xor = __webpack_require__(156);

var _xor2 = _interopRequireDefault(_xor);

exports.always = _always2['default'];
exports.and = _and2['default'];
exports.assign = _assign2['default'];
exports.average = _average2['default'];
exports.between = _between2['default'];
exports.bind = _bind2['default'];
exports.bitAnd = _bitAnd2['default'];
exports.bitOr = _bitOr2['default'];
exports.butLast = _butLast2['default'];
exports.by = _by2['default'];
exports.charAt = _charAt2['default'];
exports.charCodeAt = _charCodeAt2['default'];
exports.codePointAt = _codePointAt2['default'];
exports.compose = _compose2['default'];
exports.composeAll = _composeAll2['default'];
exports.concat = _concat2['default'];
exports.converge = _converge2['default'];
exports.curry = _curry2['default'];
exports.curryRight = _curryRight2['default'];
exports.dec = _dec2['default'];
exports.drop = _drop2['default'];
exports.endsWith = _endsWith2['default'];
exports.endsWithAt = _endsWithAt2['default'];
exports.equal = _equal2['default'];
exports.every = _every2['default'];
exports.exec = _exec2['default'];
exports.explode = _explode2['default'];
exports.filter = _filter2['default'];
exports.flatMap = _flatMap2['default'];
exports.flip = _flip2['default'];
exports.fold = _fold2['default'];
exports.foldRight = _foldRight2['default'];
exports.forEach = _forEach2['default'];
exports.greaterOrEqual = _greaterOrEqual2['default'];
exports.greaterThan = _greaterThan2['default'];
exports.hasOwnProperty = _hasOwnProperty2['default'];
exports.head = _head2['default'];
exports.identity = _identity2['default'];
exports.ifThen = _ifThen2['default'];
exports.ifThenElse = _ifThenElse2['default'];
exports.implode = _implode2['default'];
exports.inc = _inc2['default'];
exports.includes = _includes2['default'];
exports.indexOf = _indexOf2['default'];
exports.isBetween = _isBetween2['default'];
exports.isBoolean = _isBoolean2['default'];
exports.isFalse = _isFalse2['default'];
exports.isFalsy = _isFalsy2['default'];
exports.isFunction = _isFunction2['default'];
exports.isNull = _isNull2['default'];
exports.isNumber = _isNumber2['default'];
exports.isObject = _isObject2['default'];
exports.isPlainObject = _isPlainObject2['default'];
exports.isString = _isString2['default'];
exports.isTrue = _isTrue2['default'];
exports.isTruthy = _isTruthy2['default'];
exports.isTypeOf = _isTypeOf2['default'];
exports.isUndefined = _isUndefined2['default'];
exports.isUnknown = _isUnknown2['default'];
exports.join = _join2['default'];
exports.keys = _keys2['default'];
exports.last = _last2['default'];
exports.lastIndexOf = _lastIndexOf2['default'];
exports.length = _length2['default'];
exports.lessOrEqual = _lessOrEqual2['default'];
exports.lessThan = _lessThan2['default'];
exports.localeCompare = _localeCompare2['default'];
exports.looseEqual = _looseEqual2['default'];
exports.map = _map2['default'];
exports.match = _match2['default'];
exports.max = _max2['default'];
exports.method = _method2['default'];
exports.min = _min2['default'];
exports.minus = _minus2['default'];
exports.nand = _nand2['default'];
exports.noop = _noop2['default'];
exports.nor = _nor2['default'];
exports.normalize = _normalize2['default'];
exports.not = _not2['default'];
exports.nth = _nth2['default'];
exports.omit = _omit2['default'];
exports.or = _or2['default'];
exports.pick = _pick2['default'];
exports.pipe = _pipe2['default'];
exports.pipeAll = _pipeAll2['default'];
exports.plus = _plus2['default'];
exports.product = _product2['default'];
exports.property = _property2['default'];
exports.push = _push2['default'];
exports.put = _put2['default'];
exports.reduce = _reduce2['default'];
exports.reduceRight = _reduceRight2['default'];
exports.repeat = _repeat2['default'];
exports.replace = _replace2['default'];
exports.search = _search2['default'];
exports.shallowClone = _shallowClone2['default'];
exports.shave = _shave2['default'];
exports.signum = _signum2['default'];
exports.slice = _slice2['default'];
exports.some = _some2['default'];
exports.split = _split2['default'];
exports.startsWith = _startsWith2['default'];
exports.startsWithAt = _startsWithAt2['default'];
exports.sum = _sum2['default'];
exports.tail = _tail2['default'];
exports.take = _take2['default'];
exports.takeUntil = _takeUntil2['default'];
exports.takeWhile = _takeWhile2['default'];
exports.test = _test2['default'];
exports.times = _times2['default'];
exports.toLowerCase = _toLowerCase2['default'];
exports.toUpperCase = _toUpperCase2['default'];
exports.trim = _trim2['default'];
exports.uncurry = _uncurry2['default'];
exports.uncurry3 = _uncurry32['default'];
exports.unfold = _unfold2['default'];
exports.values = _values2['default'];
exports.xor = _xor2['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/always
 *
 * @description
 *
 * Creates a function that always returns a given value
 *
 * @example
 *
 * 	const always = require('1-liners/always');
 *
 * 	const T = always(true);
 * 	T(); // => true
 * 	T(); // => true
 *
 * 	const fortyTwo = always(42);
 * 	fortyTwo(); // => 42
 * 	fortyTwo(); // => 42
 *
 */


exports.__esModule = true;

exports["default"] = function (val) {
  return function () {
    return val;
  };
};

module.exports = exports["default"];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/and
 * 
 * @description
 *
 * Same as `a && b`.
 * 
 * @example
 * 
 * 	const and = require('1-liners/and');
 * 
 * 	and(true, true); // => true
 * 	and(false, true); // => false
 * 
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return x && y;
};

module.exports = exports["default"];

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/assign
 *
 * @description
 *
 * Returns a new object and assigns `assign` to `object`.
 *
 * @example
 *
 * 	const assign = require('1-liners/assign');
 *
 * 	const yedi = { id: 1, age: 100 };
 *
 * 	assign({ name: 'Yoda', age: 900 }, yedi);  // => { id: 1, name: 'Yoda', 900 }
 *
 */


exports.__esModule = true;
// istanbul ignore next

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = function (assign, object) {
  return _extends({}, object, assign);
};

module.exports = exports["default"];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/average
 *
 * @description
 *
 * Returns the average of all items of an `array`.
 *
 * @example
 *
 * 	const average = require('1-liners/average');
 *
 * 	average([2, 3, 4]);        // => 3
 * 	average([]);               // => NaN
 *
 */


exports.__esModule = true;

exports["default"] = function (array) {
  return array.reduce(function (a, b) {
    return a + b;
  }, 0) / array.length;
};

module.exports = exports["default"];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/between
 *
 * @description
 *
 * Return `number` if it’s greater than `min` and lower than `max`. Else return `min` or `max` respectively.
 *
 * @example
 *
 * 	const between = require('1-liners/between');
 *
 * 	between(1, 10, 2.5);  // => 2.5
 * 	between(1, 10, -5);   // => 1
 * 	between(1, 10, 25);   // => 10
 *
 */


exports.__esModule = true;

exports["default"] = function (min, max, number) {
  return number < min ? min : number > max ? max : number;
};

module.exports = exports["default"];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/bind
 *
 * @description
 *
 * Binds a context to a function. Same as [`fun.bind(thisArg[, arg1[, arg2[, ...]]])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
 *
 * @example
 *
 * 	const bind = require('1-liners/bind');
 *
 * 	setTimeout(bind(console, ['Hello'], console.log), 2000); // => 'Hello' (after 2s)
 *
 */


exports.__esModule = true;

exports["default"] = function (thisArg, args, fun) {
  return fun.bind.apply(fun, [thisArg].concat(args));
};

module.exports = exports["default"];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/bitAnd
 * 
 * @description
 *
 * Same as `a & b`.
 * 
 * @example
 * 
 * 	const bitAnd = require('1-liners/bitAnd');
 * 
 * 	bitAnd(1, 2); // => 0
 * 	bitAnd(2, 2); // => 2
 * 
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return x & y;
};

module.exports = exports["default"];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/bitOr
 * 
 * @description
 *
 * Same as `a | b`.
 * 
 * @example
 * 
 * 	const bitOr = require('1-liners/bitOr');
 * 
 * 	bitOr(0, 1); // => 1
 * 	bitOr(1, 1); // => 1
 * 
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return x | y;
};

module.exports = exports["default"];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/butLast
 *
 * @description
 *
 * Return a copy of `array`, without the last item.
 *
 * @example
 *
 * 	import butLast from '1-liners/butLast';
 *
 * 	const array = [1, 2, 3];
 *
 * 	butLast(array);  // => [1, 2]
 * 	array;           // => [1, 2, 3]
 *
 */


exports.__esModule = true;

exports["default"] = function (array) {
  return array.slice(0, -1);
};

module.exports = exports["default"];

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/by
 * 
 * @description
 *
 * Same as `a / b`
 * 
 * @example
 * 
 * 	const by = require('1-liners/by');
 * 
 * 	by(6, 2); // => 3
 * 
 */


exports.__esModule = true;

exports["default"] = function (a, b) {
  return a / b;
};

module.exports = exports["default"];

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/charAt
 *
 * @description
 *
 * Same as `'STR'.charAt(0)`.
 *
 * @example
 *
 * 	const charAt = require('1-liners/charAt');
 *
 * 	charAt(0, 'super') // => s
 *
 */


exports.__esModule = true;

exports["default"] = function (index, str) {
  return str.charAt(index);
};

module.exports = exports["default"];

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/charCodeAt
 * 
 * @description
 *
 * Same as `'STR'.charCodeAt(0)`.
 * 
 * @example
 * 
 * 	const charCodeAt = require('1-liners/charCodeAt');
 * 
 * 	charCodeAt(0, 'super') // => 115
 * 
 */


exports.__esModule = true;

exports["default"] = function (index, str) {
  return str.charCodeAt(index);
};

module.exports = exports["default"];

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/codePointAt
 * 
 * @description
 *
 * Same as `'STR'.codePointAt(0)`.
 * 
 * @example
 * 
 * 	const codePointAt = require('1-liners/codePointAt');
 * 
 * 	codePointAt(0, 'super') // => 115
 * 
 */


exports.__esModule = true;

exports["default"] = function (index, str) {
  return str.codePointAt(index);
};

module.exports = exports["default"];

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/compose
 * 
 * @description
 *
 * Compose a new function from two given functions.
 * 
 * @example
 * 
 * 	const compose = require('1-liners/compose');
 * 
 * 	compose(f, g)(1, 2) === f(g(1, 2));
 * 
 */


exports.__esModule = true;

exports["default"] = function (f, g) {
  return function () {
    return f(g.apply(undefined, arguments));
  };
};

module.exports = exports["default"];

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/composeAll
 * 
 * @description
 *
 * Compose a new function with a given array of functions.
 * 
 * @example
 * 
 * 	const composeAll = require('1-liners/composeAll');
 * 
 * 	composeAll([f, g, h])(1, 2) === f(g(h(1, 2)));
 * 
 */


exports.__esModule = true;

exports["default"] = function (fns) {
  return fns.reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  });
};

module.exports = exports["default"];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/concat
 *
 * @description
 *
 * Returns a copy of `array` with `values` or `value` appended at the end. Same as [`array.concat(values)` or `array.concat(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).
 *
 * @example
 *
 * 	const concat = require('1-liners/concat');
 *
 * 	concat(['c', 'd'], ['a', 'b']);  // => ['a', 'b', 'c', 'd']
 * 	concat(['c'], ['a', 'b']);       // => ['a', 'b', 'c']
 * 	concat('c', ['a', 'b']);         // => ['a', 'b', 'c']
 *
 */


exports.__esModule = true;

exports["default"] = function (values, array) {
  return array.concat(values);
};

module.exports = exports["default"];

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/converge
 *
 * @description
 *
 * Converge two functions into one.
 *
 * @example
 *
 * 	const converge = require('1-liners/converge');
 *
 * 	converge(f, g, h)(1, 2) === f(g(1, 2), h(1, 2));
 *
 */


exports.__esModule = true;

exports["default"] = function (f, g, h) {
  return function () {
    return f(g.apply(undefined, arguments), h.apply(undefined, arguments));
  };
};

module.exports = exports["default"];

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/curry
 *
 * @description
 *
 * Curry a function – split its list of parameters into 2 lists.
 *
 * @example
 *
 * 	import curry from '1-liners/curry';
 * 	import reduce from '1-liners/reduce';
 * 	import compose from '1-liners/compose';
 *
 * 	// You can use reduce and compose to create curry3,4 and so on.
 * 	const curry3 = compose(curry, curry);
 * 	const curry4 = reduce(compose, [curry, curry, curry]);
 *
 * 	const f = (a, b, c, d) => a * b * c * d;
 * 	const fβ = curry(f);  // ~= curry2
 * 	const fγ = curry3(f); // ~= curry3
 * 	const fδ = curry4(f); // ~= curry4
 *
 * 	f(1, 2, 3, 4)  === 24
 *
 * 	fβ(1)(2, 3, 4) === 24
 * 	fβ(1, 2)(3, 4) === 24
 * 	fβ(1, 2, 3)(4) === 24
 *
 * 	fγ(1)(2)(3, 4) === 24
 * 	fγ(1)(2, 3)(4) === 24
 *
 * 	fδ(1)(2)(3)(4) === 24
 *
 */


exports.__esModule = true;

exports["default"] = function (f) {
  return function () {
    for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
      a[_key] = arguments[_key];
    }

    return function () {
      for (var _len2 = arguments.length, b = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        b[_key2] = arguments[_key2];
      }

      return f.apply(undefined, a.concat(b));
    };
  };
};

module.exports = exports["default"];

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/curryRight
 *
 * @description
 *
 * Curry a function from the right – split its parameters into 2 lists. Apply the second list of parameters first, without changing the order within the lists.
 *
 * @example
 *
 * 	import curryRight from '1-liners/curryRight';
 *
 * 	const g = (a, b, c, d) => a + b * c - d;
 * 	g(1, 2, 3, 4);  // => 3
 *
 * 	const gλ = curryRight(g);
 * 	gλ(4)(1, 2, 3);  // => 3
 * 	gλ(3, 4)(1, 2);  // => 3
 * 	gλ(2, 3, 4)(1);  // => 3
 *
 */


exports.__esModule = true;

exports["default"] = function (f) {
  return function () {
    for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
      a[_key] = arguments[_key];
    }

    return function () {
      for (var _len2 = arguments.length, b = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        b[_key2] = arguments[_key2];
      }

      return f.apply(undefined, b.concat(a));
    };
  };
};

module.exports = exports["default"];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/dec
 * 
 * @description
 *
 * Same as `a - 1`
 * 
 * @example
 * 
 * 	const dec = require('1-liners/dec');
 * 
 * 	dec(1); // => 0
 * 
 */


exports.__esModule = true;

exports["default"] = function (val) {
  return val - 1;
};

module.exports = exports["default"];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/drop
 *
 * @description
 *
 * Returns the tail of `array` after dropping the first `n` elements.
 * Use this in place of String's `.substr(startIndex)` and `.substring(startIndex)`
 *
 * @example
 *
 * 	const drop = require('1-liners/drop');
 *
 * 	const array = [1, 2, 3, 4, 5];
 * 	const string = 'Hello World';
 *
 * 	drop(2, array);  // => [3, 4, 5]
 * 	drop(6, string); // => 'World'
 *
 */


exports.__esModule = true;

exports["default"] = function (n, array) {
  return array.slice(Math.max(n, 0), Infinity);
};

module.exports = exports["default"];

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/endsWith
 *
 * @description
 *
 * Same as [`str.endsWith(searchString)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith).
 *
 * @example
 *
 * 	const endsWith = require('1-liners/endsWith');
 *
 * 	endsWith('liners', '1-liners');  // => true
 * 	endsWith('stoeffel', 'nope');  // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (searchString, str) {
  return str.endsWith(searchString);
};

module.exports = exports["default"];

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/endsWithAt
 *
 * @description
 *
 * Same as [`str.endsWith(searchString, position)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith).
 *
 * @example
 *
 * 	const endsWithAt = require('1-liners/endsWithAt');
 *
 * 	endsWithAt(8, 'liners', '1-liners/endsWithAt');  // => true
 * 	endsWithAt(2, 'stoeffel', 'nope');  // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (position, searchString, str) {
  return str.endsWith(searchString, position);
};

module.exports = exports["default"];

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/equal
 * 
 * @description
 *
 * Same as `a === b`.
 * 
 * @example
 * 
 * 	const equal = require('1-liners/equal');
 * 
 * 	equal(true, true); // => true
 * 	equal(false, true); // => false
 * 	equal(1, true); // => false
 * 
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return x === y;
};

module.exports = exports["default"];

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/every
 * 
 * @description
 *
 * Same as `[1,2,3].every(GreaterThan16)`.
 * 
 * @example
 * 
 * 	const every = require('1-liners/every');
 * 
 * 	every(elem => elem > 16, [16,17,18]); // => false
 * 
 */


exports.__esModule = true;

exports["default"] = function (every, arr) {
  return arr.every(every);
};

module.exports = exports["default"];

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/exec
 *
 * @description
 *
 * Same as [`regexObj.exec(str)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).
 *
 * @example
 *
 * 	const exec = require('1-liners/exec');
 * 	const haystack = 'hAyHAYhayneEdLEHayHAy';
 *
 * 	exec(haystack, /needle/i);  // => ['neEdLE']
 * 	exec(haystack, /n(.+)e/i);  // => ['neEdLE', 'eEdL']
 * 	exec(haystack, /needle/);   // => null
 *
 */


exports.__esModule = true;

exports["default"] = function (str, regexObj) {
  return regexObj.exec(str);
};

module.exports = exports["default"];

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/explode
 * 
 * @description
 *
 * The opposite of [implode](#implode).
 * 
 * @example
 * 
 * 	const explode = require('1-liners/explode');
 * 
 * 	const sum = (numbers) => numbers.reduce((a, b) => a + b);
 * 
 * 	explode(sum)(1, 2, 3, 4);  // => 10
 * 
 */


exports.__esModule = true;

exports["default"] = function (func) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return func(args);
  };
};

module.exports = exports["default"];

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/filter
 * 
 * @description
 *
 * Same as `[1, 2, 3].filter(isOdd)`.
 * 
 * @example
 * 
 * 	const filter = require('1-liners/filter');
 * 
 * 	filter(isOdd, [1, 2, 3]); // => [1, 3]
 * 
 */


exports.__esModule = true;

exports["default"] = function (filter, arr) {
  return arr.filter(filter);
};

module.exports = exports["default"];

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/flatMap
 * 
 * @description
 *
 * Map a function over a collection and flatten the result by one-level.
 * 
 * @example
 * 
 * 	const flatMap = require('1-liners/flatMap');
 * 
 * 	flatMap((x) => [x, x], [1, 2, 3]); // => [1, 1, 2, 2, 3, 3]
 * 
 */


exports.__esModule = true;

exports["default"] = function (fn, array) {
  return [].concat.apply([], array.map(fn));
};

module.exports = exports["default"];

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/flip
 * 
 * @description
 *
 * Flip a function’s arguments.
 * 
 * @example
 * 
 * 	const flip = require('1-liners/flip');
 * 
 * 	const f = (a, b) => a / b;
 * 
 * 	flip(f)(2, 6);        // => 3
 * 	flip(flip(f))(6, 2);  // => 3
 * 
 */


exports.__esModule = true;

exports["default"] = function (f) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return f.apply(undefined, args.reverse());
  };
};

module.exports = exports["default"];

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/fold
 *
 * @description
 *
 * Same as [`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/reduce).
 *
 * @example
 *
 * 	const fold = require('1-liners/fold');
 *
 * 	fold(sum, 8, [1, 2, 3]); // => 2
 *
 */


exports.__esModule = true;

exports["default"] = function (fold, initial, arr) {
  return arr.reduce(fold, initial);
};

module.exports = exports["default"];

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/foldRight
 *
 * @description
 *
 * Same as [`array.reduceRight`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/reduceRight).
 *
 * @example
 *
 * 	const foldRight = require('1-liners/foldRight');
 *
 * 	foldRight(sub, 1, [1, 2, 3]); // => -5
 *
 */


exports.__esModule = true;

exports["default"] = function (fold, initial, arr) {
  return arr.reduceRight(fold, initial);
};

module.exports = exports["default"];

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/forEach
 *
 * @description
 *
 * Same as `[1, 2, 3].forEach(Math.sqrt)`.
 *
 * @example
 *
 * 	const forEach = require('1-liners/forEach');
 *
 * 	forEach(i => console.log('Item: ' + i), [9, 25]); // => logs "Item: 9" and "Item: 25"
 *
 */


exports.__esModule = true;

exports["default"] = function (forEach, arr) {
  return arr.forEach(forEach);
};

module.exports = exports["default"];

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/greaterOrEqual
 *
 * @description
 *
 * Same as `a >= b`.
 *
 * @example
 *
 * 	const greaterOrEqual = require('1-liners/greaterOrEqual');
 *
 * 	greaterOrEqual(2, 1); // => true
 * 	greaterOrEqual(2, 2); // => true
 * 	greaterOrEqual(1, 2); // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return x >= y;
};

module.exports = exports["default"];

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/greaterThan
 *
 * @description
 *
 * Same as `a > b`.
 *
 * @example
 *
 * 	const greaterThan = require('1-liners/greaterThan');
 *
 * 	greaterThan(2, 1); // => true
 * 	greaterThan(2, 2); // => false
 * 	greaterThan(1, 2); // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return x > y;
};

module.exports = exports["default"];

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/hasOwnProperty
 *
 * @description
 *
 * Same as [`obj.hasOwnProperty(prop)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
 *
 * @example
 *
 * 	const hasOwnProperty = require('1-liners/hasOwnProperty');
 *
 * 	hasOwnProperty('a', {a: 1, b: 2});  // => true
 * 	hasOwnProperty('c', {a: 1, b: 2});  // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (prop, obj) {
  return obj.hasOwnProperty(prop);
};

module.exports = exports["default"];

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/head
 *
 * @description
 *
 * Returns the first item of an array.
 *
 * @example
 *
 * 	const head = require('1-liners/head');
 *
 * 	head([1, 2, 3]); // => 1
 *
 */


exports.__esModule = true;

exports["default"] = function (_ref) {
  var head = _ref[0];
  return head;
};

module.exports = exports["default"];

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/identity
 *
 * @description
 *
 * Returns the value you pass to the function
 *
 * @example
 *
 * 	const identity = require('1-liners/identity');
 *
 * 	identity(true); // => true
 * 	identity(1); // => 1
 * 	identity({ foo: 1 }); // => { foo: 1 }
 * 	identity("1-liners"); // => "1-liners"
 *
 */


exports.__esModule = true;

exports["default"] = function (I) {
  return I;
};

module.exports = exports["default"];

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/ifThen
 *
 * @description
 *
 * Creates a function which calls `then` if the `predicate` is true
 * and returns `undefined` if the `predicate` is false.
 *
 * @example
 *
 * 	const ifThen = require('1-liners/ifThen');
 *
 * 	const eq = (a, b) => a === b;
 * 	const add = (a, b) => a + b;
 * 	const sub = (a, b) => a - b;
 *
 * 	const words = ifThen((str) => typeof str === 'string', (str) => str.split(' '));
 *
 * 	words('Hello ES2015'); // => ['Hello', 'ES2015']
 *
 */


exports.__esModule = true;

exports["default"] = function (perdicate, then) {
  return function () {
    return perdicate.apply(undefined, arguments) ? then.apply(undefined, arguments) : undefined;
  };
};

module.exports = exports["default"];

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/ifThenElse
 *
 * @description
 *
 * Creates a function which calls `then` if the `predicate` is true
 * and `otherwise` if the `predicate` is false.
 *
 * @example
 *
 * 	const ifThenElse = require('1-liners/ifThenElse');
 *
 * 	const eq = (a, b) => a === b;
 * 	const add = (a, b) => a + b;
 * 	const sub = (a, b) => a - b;
 *
 * 	const addIfEq = ifThenElse(eq, add, sub);
 *
 * 	addIfEq(1, 1); // => 2
 * 	addIfEq(2, 1); // => 1
 *
 */


exports.__esModule = true;

exports["default"] = function (predicate, then, otherwise) {
  return function () {
    return predicate.apply(undefined, arguments) ? then.apply(undefined, arguments) : otherwise.apply(undefined, arguments);
  };
};

module.exports = exports["default"];

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/implode
 * 
 * @description
 *
 * Collapse a list of arguments into an array of arguments.
 * 
 * @example
 * 
 * 	const implode = require('1-liners/implode');
 * 
 * 	const f = (a, b) => a + b;
 * 
 * 	[
 * 		[1, 2],
 * 		[3, 4],
 * 		[5, 6],
 * 	].map(implode(f));  // => [3, 7, 11]
 * 
 */


exports.__esModule = true;

exports["default"] = function (func) {
  return function (args) {
    return func.apply(undefined, args);
  };
};

module.exports = exports["default"];

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/inc
 * 
 * @description
 *
 * Same as `a + 1`
 * 
 * @example
 * 
 * 	const inc = require('1-liners/inc');
 * 
 * 	inc(1); // => 2
 * 
 */


exports.__esModule = true;

exports["default"] = function (val) {
  return val + 1;
};

module.exports = exports["default"];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/includes
 *
 * @description
 *
 * Same as `'Blue Whale'.includes('blue')`.
 *
 * @example
 *
 * 	const includes = require('1-liners/includes');
 *
 * 	includes('blue', 'Blue Whale') // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (searchString, str) {
  return str.includes(searchString);
};

module.exports = exports["default"];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/indexOf
 * 
 * @description
 *
 * Same as `'str'.indexOf('t')`.
 * 
 * @example
 * 
 * 	const indexOf = require('1-liners/indexOf');
 * 
 * 	indexOf('a', 'hallo') // => 1
 * 
 */


exports.__esModule = true;

exports["default"] = function (searchValue, str) {
  return str.indexOf(searchValue);
};

module.exports = exports["default"];

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isBetween
 *
 * @description
 *
 * Check if the `number` lies between `min` and `max`, inclusive.
 *
 * @example
 *
 * 	const isBetween = require('1-liners/isBetween');
 *
 * 	isBetween(1, 10, 2.5);  // => true
 * 	isBetween(1, 10, -5);   // => false
 * 	isBetween(1, 10, 25);   // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (min, max, number) {
  return min <= number && number <= max;
};

module.exports = exports["default"];

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isBoolean
 *
 * @description
 *
 * Same as `typeof value === 'boolean'`.
 *
 * @example
 *
 * 	const isBoolean = require('1-liners/isBoolean');
 *
 * 	isBoolean(false);            // => true
 * 	isBoolean(true);             // => true
 *
 * 	isBoolean(null);             // => false
 * 	isBoolean(/anything else/);  // => false
 *
 */


exports.__esModule = true;

exports['default'] = function (value) {
  return typeof value === 'boolean';
};

module.exports = exports['default'];

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isFalse
 *
 * @description
 *
 * Same as `x === false`.
 *
 * @example
 *
 * 	const isFalse = require('1-liners/isFalse');
 *
 * 	isFalse(false);  // => true
 *
 * 	isFalse('yes');  // => false
 * 	isFalse(true);   // => false
 * 	isFalse([]);     // => false
 * 	isFalse('');     // => false
 * 	isFalse(0);      // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (x) {
  return x === false;
};

module.exports = exports["default"];

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isFalsy
 *
 * @description
 *
 * Same as `!`.
 *
 * @example
 *
 * 	const isFalsy = require('1-liners/isFalsy');
 *
 * 	isFalsy('yes');  // => false
 * 	isFalsy(true);   // => false
 * 	isFalsy([]);     // => false
 *
 * 	isFalsy('');     // => true
 * 	isFalsy(0);      // => true
 * 	isFalsy(false);  // => true
 *
 */


exports.__esModule = true;

exports["default"] = function (x) {
  return !x;
};

module.exports = exports["default"];

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isFunction
 *
 * @description
 *
 * Same as `typeof value === 'function'`.
 *
 * @example
 *
 * 	const isFunction = require('1-liners/isFunction');
 *
 * 	isFunction(function() {});        // => true
 * 	isFunction(function named() {});  // => true
 *
 * 	isFunction('any other value');    // => false
 *
 */


exports.__esModule = true;

exports['default'] = function (value) {
  return typeof value === 'function';
};

module.exports = exports['default'];

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isNull
 *
 * @description
 *
 * Same as `=== null`.
 *
 * @example
 *
 * 	const isNull = require('1-liners/isNull');
 *
 * 	isNull(null);             // => true
 *
 * 	isNull(undefined);        // => false
 * 	isNull(NaN);              // => false
 * 	isNull('anything else');  // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (value) {
  return value === null;
};

module.exports = exports["default"];

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isNumber
 *
 * @description
 *
 * Same as `typeof value === 'number'`. Use [`Number.isFinite`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) instead if you want to filter out `NaN` and `Infinity`.
 *
 * @example
 *
 * 	const isNumber = require('1-liners/isNumber');
 *
 * 	isNumber(1);                // => true
 * 	isNumber(3.14);             // => true
 * 	isNumber(NaN);              // => true
 * 	isNumber(Infinity);         // => true
 *
 * 	isNumber('3.14');           // => false
 * 	isNumber(/anything else/);  // => false
 *
 */


exports.__esModule = true;

exports['default'] = function (value) {
  return typeof value === 'number';
};

module.exports = exports['default'];

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isObject
 *
 * @description
 *
 * Same as `value !== null && typeof value === 'object'`.
 *
 * @example
 *
 * 	const isObject = require('1-liners/isObject');
 *
 * 	isObject({});               // => true
 * 	isObject([]);               // => true
 * 	isObject(/anything/);       // => true
 *
 * 	isObject(null);             // => false
 * 	isObject('anything else');  // => false
 *
 */


exports.__esModule = true;

exports['default'] = function (value) {
  return value !== null && typeof value === 'object';
};

module.exports = exports['default'];

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isPlainObject
 *
 * @description
 *
 * Checks if an object inherits directly from `null` or `Object.prototype` – like an object literal (`{...}`) does.
 *
 * Heads up! This function is [not supported on IE 10 and below](https://babeljs.io/docs/usage/caveats/).
 *
 * @example
 *
 * 	const isPlainObject = require('1-liners/isPlainObject');
 *
 * 	isPlainObject({});                   // => true
 * 	isPlainObject(Object.create(null));  // => true
 *
 * 	isPlainObject(null);                 // => false
 * 	isPlainObject([]);                   // => false
 * 	isPlainObject(/anything else/);      // => false
 *
 */


exports.__esModule = true;

exports['default'] = function (value) {
  return value && typeof value === 'object' && (value.__proto__ == null || value.__proto__ === Object.prototype);
};

module.exports = exports['default'];

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isString
 *
 * @description
 *
 * Same as `typeof value === 'string'`.
 *
 * @example
 *
 * 	const isString = require('1-liners/isString');
 *
 * 	isString('');               // => true
 * 	isString('anything');       // => true
 *
 * 	isString(/anything else/);  // => false
 *
 */


exports.__esModule = true;

exports['default'] = function (value) {
  return typeof value === 'string';
};

module.exports = exports['default'];

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isTrue
 *
 * @description
 *
 * Same as `x === true`.
 *
 * @example
 *
 * 	const isTrue = require('1-liners/isTrue');
 *
 * 	isTrue(true);   // => true
 *
 * 	isTrue('yes');  // => false
 * 	isTrue([]);     // => false
 * 	isTrue('');     // => false
 * 	isTrue(0);      // => false
 * 	isTrue(false);  // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (x) {
  return x === true;
};

module.exports = exports["default"];

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isTruthy
 * 
 * @description
 *
 * Same as `!!`.
 * 
 * @example
 * 
 * 	const isTruthy = require('1-liners/isTruthy');
 * 
 * 	isTruthy('yes');  // => true
 * 	isTruthy(true);   // => true
 * 	isTruthy([]);     // => true
 * 
 * 	isTruthy('');     // => false
 * 	isTruthy(0);      // => false
 * 	isTruthy(false);  // => false
 * 
 */


exports.__esModule = true;

exports["default"] = function (x) {
  return !!x;
};

module.exports = exports["default"];

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isTypeOf
 *
 * @description
 *
 * Same as `typeof value === TYPE`.
 *
 * @example
 *
 * 	const isTypeOf = require('1-liners/isTypeOf');
 *
 * 	isTypeOf('boolean', false);            // => true
 * 	isTypeOf('boolean', true);             // => true
 *
 * 	isTypeOf('boolean', null);             // => false
 * 	isTypeOf('boolean', /anything else/);  // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (type, value) {
  return typeof value === type;
};

module.exports = exports["default"];

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isUndefined
 *
 * @description
 *
 * Returns `true` if a value or reference is `undefined`.
 *
 * @example
 *
 * 	const isUndefined = require('1-liners/isUndefined');
 *
 * 	isUndefined(undefined);        // => true
 *
 * 	isUndefined(null);             // => false
 * 	isUndefined(false);            // => false
 * 	isUndefined(NaN);              // => false
 * 	isUndefined('anything else');  // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (value) {
  return value === void 0;
};

module.exports = exports["default"];

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/isUnknown
 *
 * @description
 *
 * Same as `== null`.
 *
 * @example
 *
 * 	const isUnknown = require('1-liners/isUnknown');
 *
 * 	isUnknown(null);             // => true
 * 	isUnknown(undefined);        // => true
 *
 * 	isUnknown(false);            // => false
 * 	isUnknown('');               // => false
 * 	isUnknown(NaN);              // => false
 * 	isUnknown(/anything else/);  // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (value) {
  return value == null;
};

module.exports = exports["default"];

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/join
 * 
 * @description
 *
 * Same as `[1, 'liners'].join('-')`
 * 
 * @example
 * 
 * 	const join = require('1-liners/join');
 * 
 * 	join('-', [1, 'liners']); // => '1-liners'
 * 
 */


exports.__esModule = true;

exports["default"] = function (superglue, arr) {
  return arr.join(superglue);
};

module.exports = exports["default"];

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/keys
 *
 * @description
 *
 * Same as [`Object.keys(obj)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).
 *
 * @example
 *
 * 	const keys = require('1-liners/keys');
 *
 * 	keys({ 100: 'a', 2: 'b', 7: 'c' }); // => ['2', '7', '100']
 * 	keys([1, 2, 3]); // => [0, 1, 2]
 */


exports.__esModule = true;

exports["default"] = function (obj) {
  return Object.keys(obj);
};

module.exports = exports["default"];

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/last
 *
 * @description
 *
 * Returns the last item of `array`.
 *
 * @example
 *
 * 	const last = require('1-liners/last');
 *
 * 	last([1, 2, 3]);  // => 3
 *
 */


exports.__esModule = true;

exports["default"] = function (array) {
  return array[array.length - 1];
};

module.exports = exports["default"];

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/lastIndexOf
 * 
 * @description
 *
 * Same as `'wow'.lastIndexOf('w')`.
 * 
 * @example
 * 
 * 	const lastIndexOf = require('1-liners/lastIndexOf');
 * 
 * 	lastIndexOf('f', 'waffle') // => 3
 * 
 */


exports.__esModule = true;

exports["default"] = function (searchValue, str) {
  return str.lastIndexOf(searchValue);
};

module.exports = exports["default"];

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module length
 *
 * @description
 *
 * Returns the length of an array.
 *
 * @example
 *
 * 	const length = require('1-liners/length');
 *
 * 	length([0, 1, 2]); // => 3
 *
 */


exports.__esModule = true;

exports["default"] = function (arr) {
  return arr.length;
};

module.exports = exports["default"];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/lessOrEqual
 *
 * @description
 *
 * Same as `a <= b`.
 *
 * @example
 *
 * 	const lessOrEqual = require('1-liners/lessOrEqual');
 *
 * 	lessOrEqual(1, 2); // => true
 * 	lessOrEqual(1, 1); // => true
 * 	lessOrEqual(2, 1); // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return x <= y;
};

module.exports = exports["default"];

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/lessThan
 *
 * @description
 *
 * Same as `a < b`.
 *
 * @example
 *
 * 	const lessThan = require('1-liners/lessThan');
 *
 * 	lessThan(1, 2); // => true
 * 	lessThan(1, 1); // => false
 * 	lessThan(2, 1); // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return x < y;
};

module.exports = exports["default"];

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/localeCompare
 *
 * @description
 *
 * Same as `'A'.localeCompare('B')`.
 *
 * @example
 *
 * 	const localeCompare = require('1-liners/localeCompare');
 *
 * 	localeCompare('B', 'A') // => -1
 *
 */


exports.__esModule = true;

exports["default"] = function (compareString, str) {
  return str.localeCompare(compareString);
};

module.exports = exports["default"];

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/looseEqual
 * 
 * @description
 *
 * Same as `a == b`.
 * 
 * @example
 * 
 * 	const looseEqual = require('1-liners/looseEqual');
 * 
 * 	looseEqual(true, true); // => true
 * 	looseEqual(false, true); // => false
 * 	looseEqual(1, true); // => true
 * 
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return x == y;
};

module.exports = exports["default"];

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/map
 * 
 * @description
 *
 * Same as `[1, 2, 3].map(Math.sqrt)`.
 * 
 * @example
 * 
 * 	const map = require('1-liners/map');
 * 
 * 	map(Math.sqrt, [9, 25]); // => [3, 5]
 * 
 */


exports.__esModule = true;

exports["default"] = function (map, arr) {
  return arr.map(map);
};

module.exports = exports["default"];

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/match
 *
 * @description
 *
 * Same as `haystack.match(needle)`.
 *
 * @example
 *
 * 	const match = require('1-liners/match');
 *
 * 	match(/\d+/g, 'Items: 3,2'); // => ["3", "2"]
 *
 */


exports.__esModule = true;

exports["default"] = function (needle, haystack) {
  return haystack.match(needle);
};

module.exports = exports["default"];

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/max
 * 
 * @description
 *
 * Same as `Math.max` – but with a stable number of arguments.
 * 
 * @example
 * 
 * 	const max = require('1-liners/max');
 * 
 * 	max(3, 6);  // => 6
 * 
 * 	[3, 6, 9].reduce(max);       // => 9
 * 	[3, 6, 9].reduce(Math.max);  // => NaN
 * 
 */


exports.__esModule = true;

exports["default"] = function (a, b) {
  return a > b ? a : b;
};

module.exports = exports["default"];

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/method
 *
 * @description
 *
 * Same as `object[method](...args)`
 *
 * @example
 *
 * 	const method = require('1-liners/method');
 *
 * 	const object = {
 * 		base: 1,
 * 		add(number) { return this.base + number; },
 * 	};
 *
 * 	method('add', object)(5);  // => 6
 *
 */


exports.__esModule = true;

exports["default"] = function (method, object) {
  return function () {
    return object[method].apply(object, arguments);
  };
};

module.exports = exports["default"];

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/min
 * 
 * @description
 *
 * Same as `Math.min` – but with a stable number of arguments.
 * 
 * @example
 * 
 * 	const min = require('1-liners/min');
 * 
 * 	min(3, 6);  // => 3
 * 
 * 	[3, 6, 1].reduce(min);       // => 1
 * 	[3, 6, 1].reduce(Math.min);  // => NaN
 * 
 */


exports.__esModule = true;

exports["default"] = function (a, b) {
  return a > b ? b : a;
};

module.exports = exports["default"];

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/minus
 * 
 * @description
 *
 * Same as `a - b`
 * 
 * @example
 * 
 * 	const minus = require('1-liners/minus');
 * 
 * 	minus(3, 2); // => 1
 * 
 */


exports.__esModule = true;

exports["default"] = function (a, b) {
  return a - b;
};

module.exports = exports["default"];

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/nand
 * 
 * @description
 *
 * Same as `!(a && b)`.
 * 
 * @example
 * 
 * 	const nand = require('1-liners/nand');
 * 
 * 	nand(0, 0); // => true
 * 	nand(1, 1); // => false
 * 
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return !(x && y);
};

module.exports = exports["default"];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/noop
 * 
 * @description
 *
 * Same as `function(){}`.
 * 
 * @example
 * 
 * 	const noop = require('1-liners/noop');
 * 
 * 	window.console = {
 * 			log: noop,
 * 			error: noop,
 * 			warn: noop,
 * 			table: noop
 * 	};
 * 
 */


exports.__esModule = true;

exports["default"] = function () {};

module.exports = exports["default"];

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/nor
 * 
 * @description
 *
 * Same as `!(a || b)`.
 * 
 * @example
 * 
 * 	const nor = require('1-liners/nor');
 * 
 * 	nor(0, 0); // => true
 * 	nor(1, 0); // => false
 * 
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return !(x || y);
};

module.exports = exports["default"];

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/normalize
 *
 * @description
 *
 * Same as `'STR'.normalize()`.
 *
 * @example
 *
 * 	const normalize = require('1-liners/normalize');
 *
 * 	normalize('NFD', '\u1E9B\u0323') // => ẛ̣
 *
 */


exports.__esModule = true;

exports["default"] = function (form, str) {
  return str.normalize(form);
};

module.exports = exports["default"];

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/not
 * 
 * @description
 *
 * Same as `!a`.
 * 
 * @example
 * 
 * 	const not = require('1-liners/not');
 * 
 * 	not(true); // => false
 * 	not(false); // => true
 * 
 */


exports.__esModule = true;

exports["default"] = function (a) {
  return !a;
};

module.exports = exports["default"];

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/nth
 * 
 * @description
 *
 * Returns the nth item of an array.
 * 
 * @example
 * 
 * 	const nth = require('1-liners/nth');
 * 
 * 	nth(1, [1, 2, 3]); // => 2
 * 

 */


exports.__esModule = true;

exports["default"] = function (n, arr) {
  return arr[n];
};

module.exports = exports["default"];

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/omit
 *
 * @description
 *
 * Creates a copy of the `object` without the given `props`.
 *
 * @example
 *
 * 	const omit = require('1-liners/omit');
 *
 * 	const object = {foo: 1, bar: 2, baz: 3};
 *
 * 	omit(['foo', 'baz'], object);  // => {bar: 2}
 *
 *
 */


exports.__esModule = true;
// istanbul ignore next

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports["default"] = function (props, obj) {
  return props.reduce(function (newObj, val) {
    return (function (_ref) {
      var dropped = _ref[val];

      var rest = _objectWithoutProperties(_ref, [val]);

      return rest;
    })(newObj);
  }, obj);
};

module.exports = exports["default"];

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/or
 * 
 * @description
 *
 * Same as `a || b`.
 * 
 * @example
 * 
 * 	const or = require('1-liners/or');
 * 
 * 	or(true, true); // => true
 * 	or(false, true); // => true
 * 	or(false, false); // => false
 * 
 */


exports.__esModule = true;

exports["default"] = function (a, b) {
  return a || b;
};

module.exports = exports["default"];

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/pick
 *
 * @description
 *
 * Copies only specified `properties` from an `object` into a new object.
 *
 * @example
 *
 * 	const pick = require('1-liners/pick');
 *
 * 	const object = {foo: 1, bar: 2, baz: 3};
 *
 * 	pick(['foo', 'baz'], object);  // => {foo: 1, baz: 3}
 *
 */


exports.__esModule = true;
// istanbul ignore next

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = function (properties, object) {
  return _extends.apply(undefined, [{}].concat(properties.map(function (key) {
    // istanbul ignore next

    var _ref;

    return _ref = {}, _ref[key] = object[key], _ref;
  })));
};

module.exports = exports["default"];

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/pipe
 * 
 * @description
 *
 * Pipe arguments through functions.
 * 
 * @example
 * 
 * 	const pipe = require('1-liners/pipe');
 * 
 * 	pipe(f, g)(1, 2) === g(f(1, 2));
 * 
 */


exports.__esModule = true;

exports["default"] = function (f, g) {
  return function () {
    return g(f.apply(undefined, arguments));
  };
};

module.exports = exports["default"];

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/pipeAll
 * 
 * @description
 *
 * Pipe arguments through an array of functions.
 * 
 * @example
 * 
 * 	const pipeAll = require('1-liners/pipeAll');
 * 
 * 	pipeAll([f, g, h])(1, 2) === h(g(f(1, 2)));
 * 
 */


exports.__esModule = true;

exports["default"] = function (fns) {
  return fns.reverse().reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  });
};

module.exports = exports["default"];

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/plus
 *
 * @description
 *
 * Same as `a + b`.
 *
 * @example
 *
 * 	const plus = require('1-liners/plus');
 *
 * 	plus(2, 8);      // => 10
 * 	plus('a', 'b');  // => 'ab'
 *
 */


exports.__esModule = true;

exports["default"] = function (a, b) {
  return a + b;
};

module.exports = exports["default"];

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/product
 *
 * @description
 *
 * Returns the product of all items of an `array`.
 *
 * @example
 *
 * 	const product = require('1-liners/product');
 *
 * 	product([2, 3, 4]);        // => 24
 * 	product([]);               // => 1
 *
 */


exports.__esModule = true;

exports["default"] = function (array) {
  return array.reduce(function (a, b) {
    return a * b;
  }, 1);
};

module.exports = exports["default"];

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/property
 *
 * @description
 *
 * Same as `object[property]`
 *
 * @example
 *
 * 	const property = require('1-liners/property');
 *
 * 	const object = {foo: 1};
 *
 * 	property('foo', object);  // => 1
 *
 */


exports.__esModule = true;

exports["default"] = function (property, object) {
  return object[property];
};

module.exports = exports["default"];

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/push
 *
 * @description
 *
 * Same as [push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) but immutable.
 *
 * @example
 *
 * 	const push = require('1-liners/push');
 *
 * 	push(4, [1, 2, 3]); // => [1, 2, 3, 4]
 *
 */


exports.__esModule = true;

exports["default"] = function (element, arr) {
  return [].concat(arr, [element]);
};

module.exports = exports["default"];

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/put
 *
 * @description
 *
 * Same as `Object.assign({}, obj, {[key]: val})`
 *
 * @example
 *
 * 	const put = require('1-liners/put');
 *
 * 	const object = {id: 1};
 *
 * 	put('name', 'stoeffel', object);  // => { id: 1, name: 'stoeffel' }
 *
 */


exports.__esModule = true;
// istanbul ignore next

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = function (key, val, obj) {
  // istanbul ignore next

  var _extends2;

  return _extends({}, obj, (_extends2 = {}, _extends2[key] = val, _extends2));
};

module.exports = exports["default"];

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/reduce
 * 
 * @description
 *
 * Same as `[1, 2, 3].reduce(sum)`.
 * 
 * @example
 * 
 * 	const reduce = require('1-liners/reduce');
 * 
 * 	reduce(sum, [1, 2, 3]); // => 6
 * 
 */


exports.__esModule = true;

exports["default"] = function (reduce, arr) {
  return arr.reduce(reduce);
};

module.exports = exports["default"];

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/reduceRight
 * 
 * @description
 *
 * Same as `[1, 2, 3].reduceRight(sub)`.
 * 
 * @example
 * 
 * 	const reduceRight = require('1-liners/reduceRight');
 * 
 * 	reduceRight(sub, [1, 2, 3]); // => -4
 * 
 */


exports.__esModule = true;

exports["default"] = function (reduce, arr) {
  return arr.reduceRight(reduce);
};

module.exports = exports["default"];

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/repeat
 *
 * @description
 *
 * Same as `'STR'.repeat(1)`.
 *
 * @example
 *
 * 	const repeat = require('1-liners/repeat');
 *
 * 	repeat(1, 'super') // => super
 *
 */


exports.__esModule = true;

exports["default"] = function (times, str) {
  return str.repeat(times);
};

module.exports = exports["default"];

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/replace
 *
 * @description
 *
 * Same as `haystack.replace(needle, replace)`.
 *
 * @example
 *
 * 	const replace = require('1-liners/replace');
 *
 * 	replace(/\d+/g, sub => `"${sub}"`, 'Items: 3,2'); // => Items: "3","2"
 * 	replace(':', '=', 'Items: 3,2'); // => Items= 3,2
 *
 */


exports.__esModule = true;

exports["default"] = function (needle, replace, haystack) {
  return haystack.replace(needle, replace);
};

module.exports = exports["default"];

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/search
 *
 * @description
 *
 * Same as `'STR'.search(regexp)`.
 *
 * @example
 *
 * 	const search = require('1-liners/search');
 *
 * 	search(/s/, 'super') // => 0
 *
 */


exports.__esModule = true;

exports["default"] = function (regexp, str) {
  return str.search(regexp);
};

module.exports = exports["default"];

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/shallowClone
 *
 * @description
 *
 * Copy all properties of an object into a new plain object.
 *
 * @example
 *
 * 	import shallowClone from '1-liners/shallowClone';
 *
 * 	const source = {
 * 		value: 'value',
 * 		reference: /reference/,
 * 	};
 * 	const target = shallowClone(source);
 *
 * 	target === source                      // => false
 * 	target.value === source.value          // => true
 * 	target.reference === source.reference  // => true
 *
 */


exports.__esModule = true;
// istanbul ignore next

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = function (object) {
  return _extends({}, object);
};

module.exports = exports["default"];

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/shave
 * 
 * @description
 *
 * Shave ensures that a function is called with n arguments.
 * 
 * @example
 * 
 * 	const shave = require('1-liners/shave');
 * 
 * 	map(parseInt, [0, 1.1, 2.2]); // => [0, NaN, NaN]
 * 	map(shave(1, parseInt), [0, 1.1, 2.2]); // => [0, 1, 2]
 * 
 */


exports.__esModule = true;

exports["default"] = function (shave, f) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return f.apply(undefined, args.slice(0, shave));
  };
};

module.exports = exports["default"];

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/signum
 *
 * @description
 *
 * Returns the [sign of a number](https://en.wikipedia.org/wiki/Signum_function). `1` if `n` is positive, `-1` if `n` is negative and `0` if `n` is `0`. Otherwise returns `NaN`.
 *
 * @example
 *
 * 	const signum = require('1-liners/signum');
 *
 * 	signum(-5);         // => -1
 * 	signum(-Infinity);  // => -1
 *
 * 	signum(10);         // => 1
 * 	signum(Infinity);   // => 1
 *
 * 	signum(0);          // => 0
 * 	signum(-0);         // => 0
 *
 */


exports.__esModule = true;

exports["default"] = function (n) {
  return n === 0 ? 0 : n > 0 ? 1 : n < 0 ? -1 : NaN;
};

module.exports = exports["default"];

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/slice
 * 
 * @description
 *
 * Same as `'1-liners'.slice(2,4)` or `[1,2,3,4].slice(1,3)` 
 * Use in place of `'1-liners'.substring(2,6)`
 * 
 * @example
 * 
 * 	const slice = require('1-liners/slice');
 * 
 * 	slice(2, 6, '1-liners'); // => 'line'
 * 	slice(1, 3, [1,2,3,4]); // => [2,3]
 * 
 */


exports.__esModule = true;

exports["default"] = function (startIndex, endIndex, arg) {
  return arg.slice(Math.max(startIndex, 0), endIndex);
};

module.exports = exports["default"];

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/some
 * 
 * @description
 *
 * Same as `[1,2,3].some(GreaterThan16)`
 * 
 * @example
 * 
 * 	const some = require('1-liners/some');
 * 
 * 	some(elem => elem > 16, [16,17,18]); // => true
 * 
 */


exports.__esModule = true;

exports["default"] = function (some, arr) {
  return arr.some(some);
};

module.exports = exports["default"];

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/split
 * 
 * @description
 *
 * Same as `'1-liners'.split('-')`
 * 
 * @example
 * 
 * 	const split = require('1-liners/split');
 * 
 * 	split('-', '1-liners'); // => [1, 'liners']
 * 
 */


exports.__esModule = true;

exports["default"] = function (split, str) {
  return str.split(split);
};

module.exports = exports["default"];

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/startsWith
 *
 * @description
 *
 * Same as [`str.startsWith(searchString)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith).
 *
 * @example
 *
 * 	const startsWith = require('1-liners/startsWith');
 *
 * 	startsWith('1', '1-liners');  // => true
 * 	startsWith('stoeffel', 'nope');  // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (searchString, str) {
  return str.startsWith(searchString);
};

module.exports = exports["default"];

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/startsWithAt
 *
 * @description
 *
 * Same as [`str.startsWith(searchString, position)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith).
 *
 * @example
 *
 * 	const startsWithAt = require('1-liners/startsWithAt');
 *
 * 	startsWithAt(2, 'liners', '1-liners/startsWithAt');  // => true
 * 	startsWithAt(2, 'stoeffel', 'nope');  // => false
 *
 */


exports.__esModule = true;

exports["default"] = function (position, searchString, str) {
  return str.startsWith(searchString, position);
};

module.exports = exports["default"];

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/sum
 *
 * @description
 *
 * Sums all items of an `array`.
 *
 * @example
 *
 * 	const sum = require('1-liners/sum');
 *
 * 	sum([1, 2, 3]);        // => 6
 * 	sum([]);               // => 0
 *
 */


exports.__esModule = true;

exports["default"] = function (array) {
  return array.reduce(function (a, b) {
    return a + b;
  }, 0);
};

module.exports = exports["default"];

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/tail
 *
 * @description
 *
 * Returns the tail of an array
 *
 * @example
 *
 * 	const tail = require('1-liners/tail');
 *
 * 	tail([1, 2, 3]); // => [2, 3]
 *
 */


exports.__esModule = true;

exports["default"] = function (_ref) {
  var tail = _ref.slice(1);

  return tail;
};

module.exports = exports["default"];

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/take
 * 
 * @description
 *
 * Take n items of an array. Same as `arr.slice(0, n)`.
 * 
 * @example
 * 
 * 	const take = require('1-liners/take');
 * 
 * 	take(2, [1, 2, 3]); // => [1, 2]
 * 
 */


exports.__esModule = true;

exports["default"] = function (take, arr) {
  return arr.slice(0, take);
};

module.exports = exports["default"];

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/takeUntil
 * 
 * @description
 *
 * Take items of an array until they fulfill a predicate.
 * 
 * @example
 * 
 * 	const takeUntil = require('1-liners/takeUntil');
 * 
 * 	takeUntil(i => i % 2 === 1, [2, 4, 6, 8, 7, 8, 8]); // => [2, 4, 6, 8]
 * 
 */


exports.__esModule = true;

exports["default"] = function (pred, arr) {
  return arr.reduce(function (newArr, i) {
    if (pred(i)) arr.length = 0;else newArr.push(i);return newArr;
  }, []);
};

module.exports = exports["default"];

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/takeWhile
 * 
 * @description
 *
 * Take items of an array while they fulfill a predicate.
 * 
 * @example
 * 
 * 	const takeWhile = require('1-liners/takeWhile');
 * 
 * 	takeWhile(i => i % 2 === 0, [2, 4, 6, 8, 7, 8, 8]); // => [2, 4, 6, 8]
 * 
 */


exports.__esModule = true;

exports["default"] = function (pred, arr) {
  return arr.reduce(function (newArr, i) {
    if (!pred(i)) arr.length = 0;else newArr.push(i);return newArr;
  }, []);
};

module.exports = exports["default"];

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/test
 *
 * @description
 *
 * Same as [`regexObj.test(str)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test).
 *
 * @example
 *
 * 	const test = require('1-liners/test');
 * 	const haystack = 'hAyHAYhayneEdLEHayHAy';
 *
 * 	test(haystack, /needle/);   // => false
 * 	test(haystack, /needle/i);  // => true
 *
 */


exports.__esModule = true;

exports["default"] = function (str, regexObj) {
  return regexObj.test(str);
};

module.exports = exports["default"];

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/times
 * 
 * @description
 *
 * Same as `a * b`
 * 
 * @example
 * 
 * 	const times = require('1-liners/times');
 * 
 * 	times(3, 2); // => 6
 * 
 */


exports.__esModule = true;

exports["default"] = function (a, b) {
  return a * b;
};

module.exports = exports["default"];

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/toLowerCase
 * 
 * @description
 *
 * Same as `'STR'.toLowerCase()`.
 * 
 * @example
 * 
 * 	const toLowerCase = require('1-liners/toLowerCase');
 * 
 * 	toLowerCase('HALLO') // => 'hallo'
 * 
 */


exports.__esModule = true;

exports["default"] = function (str) {
  return str.toLowerCase();
};

module.exports = exports["default"];

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/toUpperCase
 * 
 * @description
 *
 * Same as `'str'.toUpperCase()`.
 * 
 * @example
 * 
 * 	const toUpperCase = require('1-liners/toUpperCase');
 * 
 * 	toUpperCase('hallo') // => 'HALLO'
 * 
 */


exports.__esModule = true;

exports["default"] = function (str) {
  return str.toUpperCase();
};

module.exports = exports["default"];

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/trim
 *
 * @description
 *
 * Same as `'STR'.trim()`.
 *
 * @example
 *
 * 	const trim = require('1-liners/trim');
 *
 * 	trim('  super  ') // => super
 *
 */


exports.__esModule = true;

exports["default"] = function (str) {
  return str.trim();
};

module.exports = exports["default"];

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/uncurry
 *
 * @description
 *
 * Uncurry a function – collapse 2 lists of parameters into one.
 *
 * @example
 *
 * 	import uncurry from '1-liners/uncurry';
 *
 * 	const f = (a) => (b) => a + b;
 * 	const fβ = uncurry(f);
 * 	fβ(1, 2);  // => 3
 *
 * 	const g = (a) => (b, c) => a + b + c
 * 	const gβ = uncurry(g);
 * 	gβ(1, 2, 3);  // => 6
 *
 */


exports.__esModule = true;

exports["default"] = function (f) {
  return function (a) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return f(a).apply(undefined, rest);
  };
};

module.exports = exports["default"];

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/uncurry3
 *
 * @description
 *
 * Uncurry a function – collapse 3 lists of parameters into one.
 *
 * @example
 *
 * 	import uncurry3 from '1-liners/uncurry3';
 *
 * 	const f = (a) => (b) => (c) => a + b + c;
 * 	const fβ = uncurry3(f);
 * 	fβ(1, 2, 3);  // => 6
 *
 * 	const g = (a) => (b) => (c, d) => a + b + c + d;
 * 	const gβ = uncurry3(g);
 * 	gβ(1, 2, 3, 4);  // => 10
 *
 */


exports.__esModule = true;

exports["default"] = function (f) {
  return function (a, b) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    return f(a)(b).apply(undefined, rest);
  };
};

module.exports = exports["default"];

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/unfold
 *
 * @description
 *
 * Builds a list from a seed value.
 *
 * @example
 *
 * 	const unfold = require('1-liners/unfold');
 *
 * const fn = n => n < 20 ?  [n, n + 1] : false;
 * unfold(fn, 10); // => [10,11,12,13,14,15,16,17,18,19]
 *
 * // range in terms of unfold
 * const range = (from, to) => unfold((seed) => seed < to ? [seed, seed + 1] : false, from);
 * range(1, 10); // => [1,2,3,4,5,6,7,8,9]
 *
 * // unnest in terms of unfold
 * const unnest = xs => unfold((seed) => seed < xs.length ? [xs[seed], seed + 1] : false , 0);
 * unnest([[1, 2], [3, 4], [5, 6]]); // => [1,2,3,4,5,6]
 *
 */


exports.__esModule = true;
exports["default"] = unfold;

function unfold(_x2, _x3) {
  var _arguments = arguments;
  var _again = true;

  _function: while (_again) {
    var fn = _x2,
        seed = _x3;
    _again = false;
    var acc = _arguments.length <= 2 || _arguments[2] === undefined ? [] : _arguments[2];
    if (fn(seed)) {
      _arguments = [_x2 = fn, _x3 = fn(seed)[1], acc.concat.apply(acc, [fn(seed)[0]])];
      _again = true;
      acc = undefined;
      continue _function;
    } else {
      return acc;
    }
  }
}

module.exports = exports["default"];

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/values
 *
 * @description
 *
 * Get all values of an object
 * Same as `Object.keys(obj).map(i => obj[i])`.
 *
 * @example
 *
 * 	const values = require('1-liners/values');
 *
 * 	values({ 100: 'a', 2: 'b', 7: 'c' }); // => ['a', 'b', 'c']
 * 	values(['a', 'b', 'c']); // => ['a', 'b', 'c']
 */


exports.__esModule = true;

exports["default"] = function (obj) {
  return Object.keys(obj).map(function (i) {
    return obj[i];
  });
};

module.exports = exports["default"];

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module 1-liners/xor
 *
 * @description
 *
 * Same as `(x && !y) || (!x && y)`
 *
 * @example
 *
 * 	const xor = require('1-liners/xor');
 *
 * 	xor(0, 1); // => 1
 * 	xor(1, 1); // => 0
 *
 */


exports.__esModule = true;

exports["default"] = function (x, y) {
  return x && !y || !x && y;
};

module.exports = exports["default"];

/***/ }),
/* 157 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filterbutton__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rangefilter__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__departurefilter_css__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__departurefilter_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__departurefilter_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_inferno__);
/**
 * Buttons for filtering departureslist
 * @param {Object} props
 * @param {Function} props.onFilterToggle Callback for a button click
 * @param {Function} props.onRangeChange Callback for range filter chang
 * @param {string[]} [props.filters=[]]
 * @param {string[]} [props.activeFilters=[]]
 * @param {number} [props.range=0]
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var _ref$filters=_ref.filters,filters=_ref$filters===undefined?[]:_ref$filters,_ref$activeFilters=_ref.activeFilters,activeFilters=_ref$activeFilters===undefined?[]:_ref$activeFilters,_ref$range=_ref.range,range=_ref$range===undefined?0:_ref$range,onFilterToggle=_ref.onFilterToggle,onRangeChange=_ref.onRangeChange;return Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'div','departure-filter',[Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'div',null,Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_1__rangefilter__["a" /* default */],null,null,{'range':range,'onChange':onRangeChange})),Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'div','vehicle-type-filters',filters.map(function(type){return Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_0__filterbutton__["a" /* default */],null,null,{'vehicleType':type,'onFilterToggle':onFilterToggle,'isToggled':activeFilters.indexOf(type)>-1});}))]);});

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_vehicleicon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_inferno__);
/**
 * Filter button component
 * @constructs {FilterButton}
 * @param {Object} props
 * @param {Function} props.onFilterToggle Callback for button
 * @param {string} [props.vehicleType=""]
 * @param {boolean} [props.isToggled=false] Button's toggle state
 *//* harmony default export */ __webpack_exports__["a"] = (function(){var _ref=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{},_ref$vehicleType=_ref.vehicleType,vehicleType=_ref$vehicleType===undefined?'':_ref$vehicleType,_ref$isToggled=_ref.isToggled,isToggled=_ref$isToggled===undefined?false:_ref$isToggled,onFilterToggle=_ref.onFilterToggle;var className='filter-button bg '+vehicleType.toLocaleLowerCase()+(isToggled?' toggled':'');return Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'button',className,Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_0__common_vehicleicon__["a" /* default */],null,null,{'aria-hidden':true,'iconName':vehicleType.toLocaleLowerCase()+'-withoutBox'}),{'aria-label':'Suodatin '+__WEBPACK_IMPORTED_MODULE_1__constants_constants__["i" /* VEHICLE_TYPE_TRANSLATIONS */][vehicleType],'aria-pressed':''+isToggled,'onClick':function onClick(e){return onFilterToggle(vehicleType,e.ctrlKey);}});});

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inferno__);
/**
 * Range input for filtering departures by distance
 * @constructs {RangeFilter}
 * @param {Object} props
 * @param {number} range Current value
 * @param {Function} props.onChange
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var range=_ref.range,_onChange=_ref.onChange;return Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,"div","range-filter-wrapper",[Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,"output",null,[range,"m"]),Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,"label",null,[Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,"span","accessibility-hidden","Maksimi et\xE4isyys pys\xE4kille"),Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(512,"input",null,null,{"type":"range","name":"range","title":"Maksimi et\xE4isyys pys\xE4kille","min":__WEBPACK_IMPORTED_MODULE_0__constants_constants__["f" /* MIN_RANGE */],"max":__WEBPACK_IMPORTED_MODULE_0__constants_constants__["e" /* MAX_RANGE */],"step":__WEBPACK_IMPORTED_MODULE_0__constants_constants__["g" /* RANGE_STEP */],"defaultValue":range,"onChange":function onChange(e){return _onChange(e.target.value);},"onInput":function onInput(e){return _onChange(e.target.value);}})])]);});

/***/ }),
/* 161 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__errormessage_css__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__errormessage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__errormessage_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inferno__);
/**
 * Component for displaying error messages
 * @constructs ErrorMessage
 * @param {Object} props
 * @param {string} props.message error message
 * @param {Function} props.onClick callback for element click event
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var message=_ref.message,onClick=_ref.onClick;return Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,'div','error-message '+(message?'':' hidden'),[Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,'button','close-button','x',{'aria-label':'Sulje'}),message],{'onClick':onClick});});

/***/ }),
/* 163 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_debounce__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno_component__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inferno_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__suggestionslist__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__addresssearch_css__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__addresssearch_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__addresssearch_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_inferno__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
 * AddressSearch component for address input.
 * @class AddressSearch
 * @extends {Component}
 */var AddressSearch=function(_Component){_inherits(AddressSearch,_Component);/**
   * Creates an instance of AddressSearch.
   * @param {Object} props
   * @param {string} address
   */function AddressSearch(props){_classCallCheck(this,AddressSearch);var _this=_possibleConstructorReturn(this,(AddressSearch.__proto__||Object.getPrototypeOf(AddressSearch)).call(this,props));_this.state={searchTerm:'',suggestions:[]};_this.debouncedFetchSuggestions=__WEBPACK_IMPORTED_MODULE_0_lodash_debounce___default()(_this.fetchSuggestions,300);return _this;}/**
   * Search current location and search departures when this component was mounted
   */_createClass(AddressSearch,[{key:'componentDidMount',value:function componentDidMount(){this.doSubmitAction();}/**
   * Invoked when props change. Address is hosted in the ancestor component
   * so whenever it updates the search term in the search field should update too
   * @param {object} nextProps
   */},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){var address=nextProps.address;if(address!==this.props.address){this.setState({searchTerm:address?address.label:'',selectedSuggestion:undefined});// if the address was cleared then focus on address input
if(!address){this.addressInput.focus();}}}/**
   * Does submit action (calls given callback) and
   * does suggestions clean up
   */},{key:'doSubmitAction',value:function doSubmitAction(){var _state=this.state,searchTerm=_state.searchTerm,selectedSuggestion=_state.selectedSuggestion;this.hideSuggestions();// if a suggestion was selected then we can use it to search for departures
if(selectedSuggestion){return this.props.onSearch(selectedSuggestion);}// search address with a search string or current location
var promise=searchTerm&&searchTerm.toLowerCase()!==__WEBPACK_IMPORTED_MODULE_3__constants_constants__["c" /* LOCATION_MAGIC_WORD */]?__WEBPACK_IMPORTED_MODULE_4__model__["c" /* findAddressBySearchTerm */](searchTerm):__WEBPACK_IMPORTED_MODULE_4__model__["b" /* findAddressByCurrentLocation */]();promise.then(this.props.onSearch).catch(this.props.onError);}/**
   * Fetch suggestions from api
   * @param {string} searchTerm
   */},{key:'fetchSuggestions',value:function fetchSuggestions(searchTerm){__WEBPACK_IMPORTED_MODULE_4__model__["a" /* fetchSuggestions */](searchTerm).then(this.setState.bind(this)).catch(console.error);}/**
   * Set suggestion selected
   * @param {Object} suggestion
   */},{key:'selectSuggestion',value:function selectSuggestion(suggestion,callback){this.setState({selectedSuggestion:suggestion,searchTerm:suggestion.label},callback);}/**
   * Hide suggestions list and clear selected suggestion from state
   */},{key:'hideSuggestions',value:function hideSuggestions(){this.setState({suggestions:[]});}/**
   * Callback for suggestion list item's click. Set clicked
   * suggestion selected and submit form
   * @param {Object} suggestion
   */},{key:'onSuggestionClick',value:function onSuggestionClick(suggestion){this.selectSuggestion(suggestion,this.doSubmitAction);}/**
   * Callback for submit event
   * @param {Event} e
   */},{key:'onSubmit',value:function onSubmit(e){e.preventDefault();this.doSubmitAction();}/**
   * Callback for clear address button
   * @param {Event} e
   */},{key:'onClearClick',value:function onClearClick(e){e.preventDefault();this.props.clearAddress();}/**
   * Callback for text input's input event
   * @param {Event} e
   */},{key:'onSearchTermChange',value:function onSearchTermChange(e){var term=e.target.value;this.setState({searchTerm:term,selectedSuggestion:undefined});if(!term.length){this.hideSuggestions();return;}this.debouncedFetchSuggestions(term);}/**
   * Select next suggestion. Callback for down arrow button.
   */},{key:'onKeyDownPress',value:function onKeyDownPress(){var next=__WEBPACK_IMPORTED_MODULE_4__model__["d" /* selectNextSuggestion */](this.state);this.selectSuggestion(next);}/**
   * Select previous suggestion. Callback for up arrow button.
   */},{key:'onKeyUpPress',value:function onKeyUpPress(){var prev=__WEBPACK_IMPORTED_MODULE_4__model__["e" /* selectPrevSuggestion */](this.state);this.selectSuggestion(prev);}/**
   * Callback for form's key event
   * @param {Event} e
   */},{key:'onKeyEvent',value:function onKeyEvent(e){var keyCode=e.keyCode;switch(keyCode){// if up was pressed
case 38:e.preventDefault();this.onKeyUpPress();break;// if down was pressed
case 40:e.preventDefault();this.onKeyDownPress();break;// if esc was pressed
case 27:e.preventDefault();this.hideSuggestions();break;default:break;}}/**
   * Render component
   * @returns {string} markup
   */},{key:'render',value:function render(){var _this2=this;var _state2=this.state,searchTerm=_state2.searchTerm,suggestions=_state2.suggestions,selectedSuggestion=_state2.selectedSuggestion;return Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(2,'form',null,[Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(2,'div','address-search',[Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(512,'input',null,null,{'type':'text','aria-autocomplete':'list','aria-owns':'suggestions-list','aria-label':'Osoite/sijainti','placeholder':'Hae paikannuksella, osoitteella tai paikannimell\xE4...','onInput':this.onSearchTermChange.bind(this),'onBlur':this.hideSuggestions.bind(this),'value':searchTerm},null,function(c){return _this2.addressInput=c;}),Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(2,'button','address-search-clear',Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(2,'span',null,'x'),{'type':'button','onClick':this.onClearClick.bind(this)}),Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(2,'button','address-search-submit','Hae',{'type':'submit'})]),Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(2,'div','suggestions',Object(__WEBPACK_IMPORTED_MODULE_6_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_2__suggestionslist__["a" /* default */],null,null,{'suggestions':suggestions,'selected':selectedSuggestion,'onItemClick':this.onSuggestionClick.bind(this)}))],{'onSubmit':this.onSubmit.bind(this),'onKeyUp':this.onKeyEvent.bind(this)});}}]);return AddressSearch;}(__WEBPACK_IMPORTED_MODULE_1_inferno_component___default.a);/* harmony default export */ __webpack_exports__["a"] = (AddressSearch);

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9),
    now = __webpack_require__(166),
    toNumber = __webpack_require__(168);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(10);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9),
    isSymbol = __webpack_require__(169);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(170),
    isObjectLike = __webpack_require__(173);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(11),
    getRawTag = __webpack_require__(171),
    objectToString = __webpack_require__(172);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(11);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 172 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 173 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__suggestionslistitem__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__suggestionslist_css__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__suggestionslist_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__suggestionslist_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_inferno__);
/**
 * List of suggestions fetched from api
 * @constructs SuggestionList
 * @param {Object} props
 * @param {Function} props.onItemClick
 * @param {Function} props.onClose
 * @param {Object[]} [props.suggestions=[]]
 * @param {Object} [props.selected={}]
 * @returns {SuggestionList}
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var _ref$suggestions=_ref.suggestions,suggestions=_ref$suggestions===undefined?[]:_ref$suggestions,_ref$selected=_ref.selected,selected=_ref$selected===undefined?{}:_ref$selected,onItemClick=_ref.onItemClick,onClose=_ref.onClose;return Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'ol',null,suggestions.map(function(suggestion){return Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_0__suggestionslistitem__["a" /* default */],null,null,{'suggestion':suggestion,'onClick':onItemClick,'selected':selected.id===suggestion.id},suggestion.id);}),{'id':'suggestions-list','role':'listbox','style':{display:suggestions.length?'block':'none'}});});

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inferno__);
/**
 * A row in suggestions list
 * @constructs SuggestionsListItem
 * @param {Object} props
 * @param {Object} props.suggestion
 * @param {Function} props.onClick
 * @param {boolean} [props.selected=false]
 * @returns {SuggestionsListItem}
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var suggestion=_ref.suggestion,onClick=_ref.onClick,_ref$selected=_ref.selected,selected=_ref$selected===undefined?false:_ref$selected;return Object(__WEBPACK_IMPORTED_MODULE_0_inferno__["createVNode"])(2,'li','suggestions-list-item'+(selected?' selected':''),[Object(__WEBPACK_IMPORTED_MODULE_0_inferno__["createVNode"])(2,'div','suggestion-name',suggestion.label),Object(__WEBPACK_IMPORTED_MODULE_0_inferno__["createVNode"])(2,'div','suggestion-locality',suggestion.locality),selected],{'tabindex':'-1','role':'option listitem','aria-selected':selected,'onMouseDown':function onMouseDown(){return onClick(suggestion);}});});

/***/ }),
/* 176 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return findAddressByCurrentLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return findAddressBySearchTerm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchSuggestions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return selectNextSuggestion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return selectPrevSuggestion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_locationservice__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_addresssearchservice__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_constants__ = __webpack_require__(2);
var _this=this;function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{return Promise.resolve(value).then(function(value){step("next",value);},function(err){step("throw",err);});}}return step("next");});};}/**
 * Find current location and lookup address based on that
 * @async
 * @return {object} address object with location
*/var findAddressByCurrentLocation=function(){var _ref=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(){var location,address;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return Object(__WEBPACK_IMPORTED_MODULE_1__services_locationservice__["a" /* findGPSLocation */])();case 2:location=_context.sent;_context.next=5;return Object(__WEBPACK_IMPORTED_MODULE_2__services_addresssearchservice__["a" /* lookupAddress */])(location);case 5:address=_context.sent;return _context.abrupt('return',Object.assign({},address,{location:location}));case 7:case'end':return _context.stop();}}},_callee,_this);}));return function findAddressByCurrentLocation(){return _ref.apply(this,arguments);};}();/**
 * Search address by a search term
 * @async
 * @param {string} searchTerm
 * @return {object} address object
*/var findAddressBySearchTerm=function(){var _ref2=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(searchTerm){var result;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return Object(__WEBPACK_IMPORTED_MODULE_2__services_addresssearchservice__["b" /* searchAddress */])(searchTerm);case 2:result=_context2.sent;return _context2.abrupt('return',result[0]);case 4:case'end':return _context2.stop();}}},_callee2,_this);}));return function findAddressBySearchTerm(_x){return _ref2.apply(this,arguments);};}();/**
 * Fetch a list of address suggestions from the api
 * @async
 * @param {string} searchTerm
 * @return {object} object representing changes in the component state
 */var fetchSuggestions=function(){var _ref3=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3(searchTerm){var result,sorted;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.next=2;return Object(__WEBPACK_IMPORTED_MODULE_2__services_addresssearchservice__["b" /* searchAddress */])(searchTerm,__WEBPACK_IMPORTED_MODULE_3__constants_constants__["d" /* MAX_ADDRESS_SUGGESTIONS */]);case 2:result=_context3.sent;sorted=result.sort(function(a,b){return b.confidence-a.confidence;});return _context3.abrupt('return',{suggestions:sorted});case 5:case'end':return _context3.stop();}}},_callee3,_this);}));return function fetchSuggestions(_x2){return _ref3.apply(this,arguments);};}();/**
 * Select next suggestion.
 * @param {object} state
 * @return {object} suggestion
 */var selectNextSuggestion=function selectNextSuggestion(state){var suggestions=state.suggestions,selectedSuggestion=state.selectedSuggestion;var currentIndex=suggestions.indexOf(selectedSuggestion);var nextIndex=currentIndex+1>=suggestions.length?0:currentIndex+1;return suggestions[nextIndex];};/**
 * Select previous suggestion.
 * @param {object} state
 * @return {object} suggestion
 */var selectPrevSuggestion=function selectPrevSuggestion(state){var suggestions=state.suggestions,selectedSuggestion=state.selectedSuggestion;var currentIndex=suggestions.indexOf(selectedSuggestion);var prevIndex=[-1,0].indexOf(currentIndex)>-1?suggestions.length-1:currentIndex-1;return suggestions[prevIndex];};

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(179);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 179 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return POSITION_ERROR; });
/**
 * Messages for position errors
 * @private
 * @type {Object}
 */var POSITION_ERROR_CODES={1:'Oikeuksia sijainnin hakuun ei annettu tai sijainnin haku on kytketty pois',2:'Sijaintipalveluun ei saatu yhteyttä',3:'Sijainnin haku kesti liian kauan'};/**
 * Position error type
 */var POSITION_ERROR='POSITION_ERROR';/**
 * Format error message by type
 * @param {string} type
 * @param {object} error
 * @returns {string} Human readable error message
 */var formatError=function formatError(type,error){return type===POSITION_ERROR?'Sijainti ei ole saatavilla: '+POSITION_ERROR_CODES[error.code]+'.':error.message;};/* harmony default export */ __webpack_exports__["b"] = (formatError);

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return searchAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return lookupAddress; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{return Promise.resolve(value).then(function(value){step("next",value);},function(err){step("throw",err);});}}return step("next");});};}/** @module AddressSearchService *//**
* Search for address/location coordinates
* @async
* @param {string} searchTerm
* @param {number} maxResults
* @returns {Object[]} An array of objects containing latitude, longitude and label
*/var searchAddress=function(){var _ref=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(searchTerm){var maxResults=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var encoded,url,response,data;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:encoded=encodeURIComponent(searchTerm);url='https://api.digitransit.fi/geocoding/v1/search?text='+encoded+'&size='+maxResults+'&lang=fi&boundary.rect.min_lat=59.9&boundary.rect.max_lat=60.45&boundary.rect.min_lon=24.3&boundary.rect.max_lon=25.5';_context.next=4;return fetch(url);case 4:response=_context.sent;if(response.ok){_context.next=7;break;}throw new Error('Service responded with no ok');case 7:_context.next=9;return response.json();case 9:data=_context.sent;if(!(!data||!data.features.length)){_context.next=12;break;}throw new Error('Osoitteen haku ep\xE4onnistui: Osoitetta tai paikkaa ei l\xF6ytynyt hakusanalla '+searchTerm);case 12:return _context.abrupt('return',data.features.map(function(feature){var geometry=feature.geometry,properties=feature.properties;var _geometry$coordinates=_slicedToArray(geometry.coordinates,2),longitude=_geometry$coordinates[0],latitude=_geometry$coordinates[1];return Object.assign({},properties,{location:{latitude:latitude,longitude:longitude}});}));case 13:case'end':return _context.stop();}}},_callee,this);}));return function searchAddress(_x2){return _ref.apply(this,arguments);};}();/**
* Search address for given coordinates
* @async
* @param {Object} location
* @param {number} location.latitude
* @param {number} location.longitude
* @returns {string} address
*/var lookupAddress=function(){var _ref3=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(_ref2){var latitude=_ref2.latitude,longitude=_ref2.longitude;var queryParams,response,data,properties;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:queryParams='point.lat='+encodeURIComponent(latitude)+'&point.lon='+encodeURIComponent(longitude)+'&size=1';_context2.next=3;return fetch('https://api.digitransit.fi/geocoding/v1/reverse?'+queryParams);case 3:response=_context2.sent;if(response.ok){_context2.next=6;break;}throw new Error('Osoitteen haku epäonnistui: Osoitepalvelu palautti virheen');case 6:_context2.next=8;return response.json();case 8:data=_context2.sent;if(!(!data||!data.features.length)){_context2.next=11;break;}throw new Error('Osoitteen haku epäonnistui: Osoitetta tai paikkaa ei löytynyt');case 11:if(!(data&&data.features.length)){_context2.next=14;break;}properties=data.features[0].properties;return _context2.abrupt('return',properties);case 14:return _context2.abrupt('return',null);case 15:case'end':return _context2.stop();}}},_callee2,this);}));return function lookupAddress(_x3){return _ref3.apply(this,arguments);};}();

/***/ }),
/* 182 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return allVehicleTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return filterDepartures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return findDepartures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return batchDeparturesToState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return updateVehicleFilters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_fputils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_locationservice__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_departurefetchmerge__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_constants__ = __webpack_require__(2);
var _this=this;function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{return Promise.resolve(value).then(function(value){step("next",value);},function(err){step("throw",err);});}}return step("next");});};}/**
 * All vehicle filters
 * @private
 * @type {string[]}
 */var allVehicleTypes=__WEBPACK_IMPORTED_MODULE_1__utils_fputils__["a" /* default */].values(__WEBPACK_IMPORTED_MODULE_5__constants_constants__["h" /* VEHICLE_TYPE */]);/**
 * Matcher function for departure filtering
 * @private
 * @param {object} filters
 * @return {function}
 */var filterMatcher=function filterMatcher(filters){return function(departure){return departure.distance<filters.range&&departure.realtimeDeparture>=Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["c" /* getNowInSeconds */])()&&filters.vehicleTypes.indexOf(departure.vehicleType)>-1;};};/**
* Function for filtering departures by type
* @param {string[]} filters
* @return {Function}
*/var filterDepartures=function filterDepartures(filters,departures){return departures.filter(filterMatcher(filters));};/**
* Form an object to represent state after departures has been fetched/batched
* @private
* @param {Object[]} departures
* @param {Object} state
* @return {object} object representing state changes
*/var formStateWithDepartures=function formStateWithDepartures(departures,state){return Object.assign({},state,{loading:false,departures:departures,filtered:filterDepartures(state.filters,departures),departureUpdateTime:new Date()});};/**
* Fetch departures by location
* @private
* @param {Object} location
* @param {number} location.latitude
* @param {number} location.longitude
* @return {object} object representing state changes
*/var findDeparturesByLocation=function(){var _ref=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(location,state){var filters,departures;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:filters=state.filters;_context.next=3;return Object(__WEBPACK_IMPORTED_MODULE_4__utils_departurefetchmerge__["b" /* fetchDepartures */])(location,filters.vehicleTypes);case 3:departures=_context.sent;return _context.abrupt('return',Object.assign({},formStateWithDepartures(departures,state),{location:location}));case 5:case'end':return _context.stop();}}},_callee,_this);}));return function findDeparturesByLocation(_x,_x2){return _ref.apply(this,arguments);};}();/**
 * Find departures by given location
 * @param {object} state Current app state
 * @param {object} location
 * @return {object} object representing state changes
 */var findDepartures=function(){var _ref2=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(state,location){return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:// stop location search if still running
Object(__WEBPACK_IMPORTED_MODULE_3__services_locationservice__["b" /* stopLocating */])();// search departures by given location
return _context2.abrupt('return',findDeparturesByLocation(location,state));case 2:case'end':return _context2.stop();}}},_callee2,_this);}));return function findDepartures(_x3,_x4){return _ref2.apply(this,arguments);};}();/**
 * Batch departures
 * @async
 * @param {object} state Current app state
 * @return {object} object representing state changes
 */var batchDeparturesToState=function(){var _ref3=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3(state){var departures;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.next=2;return Object(__WEBPACK_IMPORTED_MODULE_4__utils_departurefetchmerge__["a" /* batchDepartures */])(state.departures);case 2:departures=_context3.sent;return _context3.abrupt('return',formStateWithDepartures(departures,state));case 4:case'end':return _context3.stop();}}},_callee3,_this);}));return function batchDeparturesToState(_x5){return _ref3.apply(this,arguments);};}();/**
 * Callback for filter button. Toggles filter state.
 * @param {string} type
 * @param {boolean} multiselect
 * @return {object} object representing state changes
 */var updateVehicleFilters=function updateVehicleFilters(type,multiselect,state){var filters=state.filters;var current=filters.vehicleTypes;var currentToggled=current.indexOf(type)>-1;var activeFilters=__WEBPACK_IMPORTED_MODULE_1__utils_fputils__["a" /* default */].ifThenElse(function(){return!!multiselect;},// if pressed with ctrl key
__WEBPACK_IMPORTED_MODULE_1__utils_fputils__["a" /* default */].ifThenElse(function(){return currentToggled;},// remove filter from actives
__WEBPACK_IMPORTED_MODULE_1__utils_fputils__["a" /* default */].filter(function(f){return f!==type;}),// add filter to actives
__WEBPACK_IMPORTED_MODULE_1__utils_fputils__["a" /* default */].concat(type)),// if pressed without ctrl key
__WEBPACK_IMPORTED_MODULE_1__utils_fputils__["a" /* default */].ifThenElse(function(){return current.length>1||!currentToggled;},// if filter is not toggled then select only that
function(){return[type];},// else select all filters
function(){return allVehicleTypes.slice(0);}))(current);// update filter props on state and then filter departures
return Object.assign({},filters,{vehicleTypes:activeFilters});};

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fetchDepartures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return batchDepartures; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fputils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_departuresservice__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(1);
function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{return Promise.resolve(value).then(function(value){step("next",value);},function(err){step("throw",err);});}}return step("next");});};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}/** @module DepartureFetchMerge *//**
 * Merge two departure arrays, discard doubles preferring fetched
 * @private
 * @param {Object[]} fetched
 * @param {Object[]} existing
 * @returns {Object[]}
 */var mergeDepartures=function mergeDepartures(fetched,existing){var isFetched=Object(__WEBPACK_IMPORTED_MODULE_5__utils_utils__["b" /* findFrom */])(fetched,'id');var existingWithoutNew=existing.filter(function(d){return!isFetched(d);});return[].concat(_toConsumableArray(existingWithoutNew),_toConsumableArray(fetched));};/**
 * Fetch departures, merge results with existing departures
 * @async
 * @param {Object} location
 * @param {number} location.latitude
 * @param {number} location.longitude
 * @param {string[]} vehicleTypes]
 * @param {Object[]} [existing=[]]
 * @returns {Object[]}
 */var fetchDepartures=function(){var _ref=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(location){var vehicleTypes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var existing=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var findFromVehcileTypes,promises,departures;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(vehicleTypes.length){_context.next=2;break;}return _context.abrupt('return',existing);case 2:findFromVehcileTypes=Object(__WEBPACK_IMPORTED_MODULE_5__utils_utils__["b" /* findFrom */])(vehicleTypes);promises=[];// fetch bus departures with separate call
if(findFromVehcileTypes(__WEBPACK_IMPORTED_MODULE_3__constants_constants__["h" /* VEHICLE_TYPE */].BUS)){promises.push(__WEBPACK_IMPORTED_MODULE_4__services_departuresservice__["b" /* fetchDepartures */](location,{vehicleTypes:[__WEBPACK_IMPORTED_MODULE_3__constants_constants__["h" /* VEHICLE_TYPE */].BUS]}));}// fetch tram departures with separate call
if(findFromVehcileTypes(__WEBPACK_IMPORTED_MODULE_3__constants_constants__["h" /* VEHICLE_TYPE */].TRAM)){promises.push(__WEBPACK_IMPORTED_MODULE_4__services_departuresservice__["b" /* fetchDepartures */](location,{vehicleTypes:[__WEBPACK_IMPORTED_MODULE_3__constants_constants__["h" /* VEHICLE_TYPE */].TRAM]}));}// fetch departures other types with one call
if(findFromVehcileTypes([__WEBPACK_IMPORTED_MODULE_3__constants_constants__["h" /* VEHICLE_TYPE */].FERRY,__WEBPACK_IMPORTED_MODULE_3__constants_constants__["h" /* VEHICLE_TYPE */].RAIL,__WEBPACK_IMPORTED_MODULE_3__constants_constants__["h" /* VEHICLE_TYPE */].SUBWAY])){promises.push(__WEBPACK_IMPORTED_MODULE_4__services_departuresservice__["b" /* fetchDepartures */](location,{vehicleTypes:[__WEBPACK_IMPORTED_MODULE_3__constants_constants__["h" /* VEHICLE_TYPE */].FERRY,__WEBPACK_IMPORTED_MODULE_3__constants_constants__["h" /* VEHICLE_TYPE */].RAIL,__WEBPACK_IMPORTED_MODULE_3__constants_constants__["h" /* VEHICLE_TYPE */].SUBWAY]}));}// wait for promises and flatten results (each fetch returns an array)
_context.t0=__WEBPACK_IMPORTED_MODULE_1__fputils__["a" /* default */].flatMap(function(p){return p;});_context.next=10;return Promise.all(promises);case 10:_context.t1=_context.sent;departures=(0,_context.t0)(_context.t1);if(departures.length){_context.next=14;break;}return _context.abrupt('return',existing);case 14:return _context.abrupt('return',mergeDepartures(departures,existing));case 15:case'end':return _context.stop();}}},_callee,this);}));return function fetchDepartures(_x3){return _ref.apply(this,arguments);};}();;/**
 * Merge batch data with existing departures
 * @private
 * @param {Object[]} existing
 * @param {Object[]} batch
 */var mergeBatchData=function mergeBatchData(existing,batch){return existing.map(function(d){var update=Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* find */])(function(b){return b.nodeId===d.nodeId&&b.id===d.id;})(batch);return Object.assign({},d,update);});};/**
 * Select all realtime departures, one for each node
 * @private
 * @type {Function}
 * @param {Object[]} departures
 * @returns {Object[]}
 */var filterUniqueRealtimeDepartures=__WEBPACK_IMPORTED_MODULE_1__fputils__["a" /* default */].compose(Object(__WEBPACK_IMPORTED_MODULE_2__utils__["g" /* uniq */])(function(d){return d.nodeId;}),__WEBPACK_IMPORTED_MODULE_1__fputils__["a" /* default */].filter(function(d){return d.realtime;}));/**
 * Update given realtime departures by fetching a batch from api
 * @param {Object[]} [departures=[]]
 * @returns {Object[]}
 */var batchDepartures=function(){var _ref2=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(){var departures=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var realtimeDepartures,data;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:realtimeDepartures=filterUniqueRealtimeDepartures(departures);if(realtimeDepartures.length){_context2.next=3;break;}return _context2.abrupt('return',departures);case 3:_context2.next=5;return __WEBPACK_IMPORTED_MODULE_4__services_departuresservice__["a" /* batchDepartures */](realtimeDepartures);case 5:data=_context2.sent;return _context2.abrupt('return',mergeBatchData(departures,data));case 7:case'end':return _context2.stop();}}},_callee2,this);}));return function batchDepartures(){return _ref2.apply(this,arguments);};}();

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fetchDepartures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return batchDepartures; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_fputils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_graphqlresponseparser__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__querynearest__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__querybatch__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(1);
function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{return Promise.resolve(value).then(function(value){step("next",value);},function(err){step("throw",err);});}}return step("next");});};}/** @module DeparturesService *//**
 * Limit results by time (2h in seconds)
 * @private
 * @type {number}
 */var TIME_RANGE=3*60*60;/**
 * Number of stoptimes per route to fetch
 * @private
 * @type {number}
 */var NUMBER_OF_DEPARTURES_PER_ROUTE=2;/**
 * Max number of results to fetch
 * @private
 * @type {number}
 */var MAX_RESULTS=20;/**
 * Form graphql query for request body
 * @private
 * @param {Object} props
 * @param {number} props.latitude
 * @param {number} props.longitude
 * @param {number} props.startTime
 * @param {string[]} props.vehicleTypes
 * @returns {Object}
 */function formRequestBody(){var _ref=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{},latitude=_ref.latitude,longitude=_ref.longitude,startTime=_ref.startTime,vehicleTypes=_ref.vehicleTypes;return{query:__WEBPACK_IMPORTED_MODULE_3__querynearest__["a" /* default */],variables:{latitude:latitude,longitude:longitude,vehicleTypes:vehicleTypes,timeRange:TIME_RANGE,departuresCount:NUMBER_OF_DEPARTURES_PER_ROUTE,maxResults:MAX_RESULTS}};}/**
 * Fetch nearest departures from digitransit's public api
 * @async
 * @param {Object} location
 * @param {number} location.latitude
 * @param {number} location.longitude
 * @returns {Promise}
 */var fetchDepartures=function(){var _ref2=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(){var location=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var filters=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var _location$latitude,latitude,_location$longitude,longitude,vehicleTypes,reqBody,response,data;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_location$latitude=location.latitude,latitude=_location$latitude===undefined?60.189425:_location$latitude,_location$longitude=location.longitude,longitude=_location$longitude===undefined?24.951884:_location$longitude;vehicleTypes=filters.vehicleTypes;reqBody=formRequestBody({latitude:latitude,longitude:longitude,vehicleTypes:vehicleTypes});_context.next=5;return fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(reqBody)});case 5:response=_context.sent;if(response.ok){_context.next=8;break;}throw new Error('Palvelu palautti virheen');case 8:_context.next=10;return response.json();case 10:data=_context.sent;return _context.abrupt('return',Object(__WEBPACK_IMPORTED_MODULE_2__utils_graphqlresponseparser__["a" /* default */])(data));case 12:case'end':return _context.stop();}}},_callee,this);}));return function fetchDepartures(){return _ref2.apply(this,arguments);};}();/**
 * Form body for batch request
 * @private
 * @param {Object} props
 * @param {string} props.id
 * @returns {Object}
 */function formBatchRequestBody(_ref3){var id=_ref3.id;var startTime=Object(__WEBPACK_IMPORTED_MODULE_5__utils_utils__["c" /* getNowInSeconds */])();return{query:__WEBPACK_IMPORTED_MODULE_4__querybatch__["a" /* default */],variables:{id:id,startTime:startTime,departuresCount:NUMBER_OF_DEPARTURES_PER_ROUTE}};}/**
 * Parse batch response data
 * @private
 * @param {Object[]} data
 * @returns {Function}
 */var parseBatchResponse=__WEBPACK_IMPORTED_MODULE_1__utils_fputils__["a" /* default */].flatMap(function(data){var _data$payload$data$no=data.payload.data.node,nodeId=_data$payload$data$no.id,stoptimes=_data$payload$data$no.stoptimes;if(!stoptimes)return[];return stoptimes.map(function(stoptime){return Object.assign({nodeId:nodeId},Object(__WEBPACK_IMPORTED_MODULE_2__utils_graphqlresponseparser__["b" /* formStoptimeData */])(stoptime));});});/**
 * Batch updated departures
 * @param {Object[]} [departures=[]] Departures to batch
 * @returns {Object[]}
 */var batchDepartures=function(){var _ref4=_asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(){var departures=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var query,response,data;return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:if(departures.length){_context2.next=2;break;}return _context2.abrupt('return',departures);case 2:query=departures.map(function(d){return formBatchRequestBody({id:d.nodeId});});_context2.next=5;return fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql/batch',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(query)});case 5:response=_context2.sent;if(response.ok){_context2.next=8;break;}throw new Error('Palvelu palautti virheen');case 8:_context2.next=10;return response.json();case 10:data=_context2.sent;return _context2.abrupt('return',parseBatchResponse(data));case 12:case'end':return _context2.stop();}}},_callee2,this);}));return function batchDepartures(){return _ref4.apply(this,arguments);};}();

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return formStoptimeData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fputils__ = __webpack_require__(5);
/** @module GraphQLResponseParser *//**
 * Curried sum of two numbers
 * @private
 * @type {Function}
 * @param {number} a
 * @param {number} b
 * @return {number} sum
 */var sumWith=__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].curry(function(a,b){return a+b;});/**
 * Get relevant data from a stoptime object
 * @param {Object} stoptime
 * @returns {Function}
 */var formStoptimeData=function formStoptimeData(stoptime){var scheduledDeparture=stoptime.scheduledDeparture,headsign=stoptime.headsign,realtimeDeparture=stoptime.realtimeDeparture,serviceDay=stoptime.serviceDay;// times are seconds from midnight and serviceday is current day
var sumWithServiceDay=sumWith(serviceDay);return __WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].pipeAll([__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].pick(['realtime']),__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].assign({id:stoptime.trip.id,scheduledDeparture:sumWithServiceDay(scheduledDeparture),realtimeDeparture:sumWithServiceDay(realtimeDeparture),destination:headsign}),__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].ifThenElse(__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].property('destination'),__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].identity,// if destination is falsy then delete that property
__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].omit(['destination']))])(stoptime);};/**
 * Combine object (stoptime) with route object
 * @private
 * @param {Object} route
 * @returns {Function}
 */var combineWithRoute=function combineWithRoute(route){return __WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].assign(__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].shallowClone(route));};/**
 * Get stoptimes from routes and creates an object of each one
 * and adds route data to those objects
 * @private
 * @type {Function}
 * @param {Object} route
 * @returns {Object[]} stoptimes with route data
 */var combineRouteInfoWithStoptimes=function combineRouteInfoWithStoptimes(route){return __WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].composeAll([// combine with route info
__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].map(__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].shave(1)(combineWithRoute(route))),// get times etc. departure specific info
__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].map(formStoptimeData),__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].property('stoptimes')])(route);};/**
 * Get route info from data node
 * @private
 * @param {Object} node
 * @returns {Object}
 */var getRouteInfo=function getRouteInfo(node){var _node$place$pattern=node.place.pattern,route=_node$place$pattern.route,code=_node$place$pattern.code,headsign=_node$place$pattern.headsign;return{nodeId:node.place.id,destination:headsign,distance:node.distance,vehicleType:route.mode,routeName:route.shortName,stoptimes:node.place.stoptimes,url:'https://www.reittiopas.fi/linjat/'+route.gtfsId+'/pysakit/'+code};};/**
 * Find routes with stoptimes from response data
 * @private
 * @type {Function}
 * @param {Object} data
 * @returns {Object[]} routes with at least one stoptime
 */var findRoutesFromData=__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].composeAll([// select all nodes with stoptimes
__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].filter(__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].compose(__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].head,__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].property('stoptimes'))),// get route info for each node
__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].map(getRouteInfo),// pluck nodes
__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].map(function(val){return val.node;}),__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].property('edges'),__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].property('nearest')]);/**
 * Parse response from digitransit api
 * @type {Function}
 * @param {Object} [result={}]
 * @returns {Object[]}
 *//* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].pipe(// default to an empty object
__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].or({}),__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].ifThenElse(__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].property('data'),__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].pipeAll([__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].property('data'),findRoutesFromData,__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].flatMap(combineRouteInfoWithStoptimes)]),// if data is falsy then return an empty array
__WEBPACK_IMPORTED_MODULE_0__fputils__["a" /* default */].always([]))));

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module QueryNearest *//**
 * Graphql query for nearest departures
 * @type {string}
 *//* harmony default export */ __webpack_exports__["a"] = ("\n    query Nearest($latitude: Float!, $longitude: Float!, $maxResults: Int, $timeRange:Int, $departuresCount:Int, $vehicleTypes:[Mode]!) {\n        nearest(lat: $latitude, lon: $longitude, maxResults: $maxResults, filterByPlaceTypes: DEPARTURE_ROW, filterByModes: $vehicleTypes) {\n            edges {\n                node {\n                    id\n                    distance\n                    place {\n                        id\n                        ... on DepartureRow {\n                            stoptimes(timeRange: $timeRange, numberOfDepartures: $departuresCount) {\n                                serviceDay\n                                scheduledDeparture\n                                realtimeDeparture\n                                realtimeState\n                                realtime\n                                headsign\n                                trip {\n                                    id\n                                }\n                            }\n                            pattern {\n                                route {\n                                    gtfsId\n                                    shortName\n                                    longName\n                                    mode\n                                }\n                                code\n                                headsign\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n}");

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module QueryBatch *//**
 * Graphql query for nearest departures
 * @type {string}
 *//* harmony default export */ __webpack_exports__["a"] = ("\n    query BatchNearest($id: ID!, $startTime: Long!, $departuresCount: Int) {\n        node(id: $id) {\n            id\n            ...on DepartureRow {\n                stoptimes(startTime: $startTime, timeRange: 7200, numberOfDepartures: $departuresCount) {\n                    serviceDay\n                    scheduledDeparture\n                    realtimeDeparture\n                    realtimeState\n                    realtime\n                    headsign\n                    trip {\n                        id\n                    }\n                }\n            }\n        }\n    }\n");

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header_css__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__header_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_vehicleicon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favourites_favourites__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_inferno__);
/**
 * App header component
 * @constructs Header
 */var Header=function Header(_ref){var address=_ref.address,selectLocation=_ref.selectLocation;return Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'header',null,[Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'h1',null,[Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_1__common_vehicleicon__["a" /* default */],null,null,{'iconName':'bus'}),Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'span','app-name','julkisilla.info')]),Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(2,'p','app-description','L\xF6yd\xE4 l\xE4himm\xE4t julkisen liikenteen l\xE4hd\xF6t helposti'),Object(__WEBPACK_IMPORTED_MODULE_3_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_2__favourites_favourites__["a" /* default */],null,null,{'address':address,'selectLocation':selectLocation})]);};/* harmony default export */ __webpack_exports__["a"] = (Header);

/***/ }),
/* 190 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno_component__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inferno_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iconbutton_iconbutton__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favouritesdialog__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_storageservice__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_inferno__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var initialState={favourites:[],isListVisible:false};var FavouritesListWrapper=function(_Component){_inherits(FavouritesListWrapper,_Component);function FavouritesListWrapper(props){_classCallCheck(this,FavouritesListWrapper);var _this=_possibleConstructorReturn(this,(FavouritesListWrapper.__proto__||Object.getPrototypeOf(FavouritesListWrapper)).call(this,props));_this.state=Object.assign({},initialState);_this.toggleList=_this.toggleList.bind(_this);_this.isLocationFavoured=_this.isLocationFavoured.bind(_this);_this.toggleFavourite=_this.toggleFavourite.bind(_this);_this.removeFromFavourites=_this.removeFromFavourites.bind(_this);return _this;}_createClass(FavouritesListWrapper,[{key:'componentDidMount',value:function componentDidMount(){var favourites=__WEBPACK_IMPORTED_MODULE_3__services_storageservice__["a" /* get */]('favourites');if(favourites)this.setState({favourites:favourites});}},{key:'isLocationFavoured',value:function isLocationFavoured(address){var favourites=this.state.favourites;return address&&favourites.find(function(f){return Object(__WEBPACK_IMPORTED_MODULE_4__model__["a" /* areLocationsEqual */])(f,address);});}},{key:'toggleFavourite',value:function toggleFavourite(){var address=this.props.address;return this.isLocationFavoured(address)?this.removeFromFavourites(address):this.addToFavourites(address);}},{key:'addToFavourites',value:function addToFavourites(address){if(address){var favourites=[].concat(_toConsumableArray(this.state.favourites),[address]);this.setFavourites(favourites);}}},{key:'removeFromFavourites',value:function removeFromFavourites(address){var favourites=this.state.favourites.filter(function(f){return!Object(__WEBPACK_IMPORTED_MODULE_4__model__["a" /* areLocationsEqual */])(f,address);});this.setFavourites(favourites);}},{key:'setFavourites',value:function setFavourites(favourites){__WEBPACK_IMPORTED_MODULE_3__services_storageservice__["b" /* set */]('favourites',favourites);this.setState({favourites:favourites});}},{key:'toggleList',value:function toggleList(){this.setState({isListVisible:!this.state.isListVisible});}},{key:'onAddressSelect',value:function onAddressSelect(address){this.toggleList();this.props.selectLocation(address);}},{key:'render',value:function render(){var favourites=this.state.favourites;var address=this.props.address;var isCurrentAddressFavoured=this.isLocationFavoured(address);return Object(__WEBPACK_IMPORTED_MODULE_5_inferno__["createVNode"])(2,'div','favourites',[Object(__WEBPACK_IMPORTED_MODULE_5_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_1__iconbutton_iconbutton__["a" /* default */],null,null,{'className':'favourites-button','text':isCurrentAddressFavoured?'★':'☆','title':'Lis\xE4\xE4 suosikkeihin/poista suosikeista','aria-pressed':!!isCurrentAddressFavoured,'disabled':!address,'onClick':this.toggleFavourite}),Object(__WEBPACK_IMPORTED_MODULE_5_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_1__iconbutton_iconbutton__["a" /* default */],null,null,{'className':'favourites-button favourites-toggle','text':'\u25BC','title':'Avaa Omat suosikit-lista','aria-pressed':this.state.isListVisible,'onClick':this.toggleList}),Object(__WEBPACK_IMPORTED_MODULE_5_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_2__favouritesdialog__["a" /* default */],null,null,{'favourites':favourites,'isVisible':this.state.isListVisible,'selectFavourite':this.onAddressSelect.bind(this),'selectedAddress':address,'onClose':this.toggleList,'removeFavourite':this.removeFromFavourites})]);}}]);return FavouritesListWrapper;}(__WEBPACK_IMPORTED_MODULE_0_inferno_component___default.a);/* harmony default export */ __webpack_exports__["a"] = (FavouritesListWrapper);

/***/ }),
/* 192 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno_component__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inferno_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inferno_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favouriteslistitem__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__favourites_css__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__favourites_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__favourites_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_inferno__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
 * A list component for displaying user's saved locations
 * @class FavouritesList
 * @extends {Component}
 */var FavouritesDialog=function(_Component){_inherits(FavouritesDialog,_Component);function FavouritesDialog(props){_classCallCheck(this,FavouritesDialog);var _this=_possibleConstructorReturn(this,(FavouritesDialog.__proto__||Object.getPrototypeOf(FavouritesDialog)).call(this,props));_this.onKeyUp=_this.onKeyUp.bind(_this);return _this;}_createClass(FavouritesDialog,[{key:'componentDidUpdate',value:function componentDidUpdate(){if(this.props.isVisible){// start listening to keyup events
document.body.addEventListener('keyup',this.onKeyUp);// for usability reasons focus on the dialog when toggled visible
this.dialog.focus();}else{// stop listening to keyup events
document.body.removeEventListener('keyup',this.onKeyUp);}}},{key:'onKeyUp',value:function onKeyUp(e){// close the dialog on esc press
if(e.key==='Escape'){this.props.onClose();}}},{key:'render',value:function render(){var _this2=this;var _props$favourites=this.props.favourites,favourites=_props$favourites===undefined?[]:_props$favourites;return Object(__WEBPACK_IMPORTED_MODULE_4_inferno__["createVNode"])(2,'div','favourites-modal-wrapper '+(this.props.isVisible?'visible':'hidden'),[Object(__WEBPACK_IMPORTED_MODULE_4_inferno__["createVNode"])(2,'div','modal'),Object(__WEBPACK_IMPORTED_MODULE_4_inferno__["createVNode"])(2,'div','favouriteslist',[Object(__WEBPACK_IMPORTED_MODULE_4_inferno__["createVNode"])(2,'div','favouriteslist-header',[Object(__WEBPACK_IMPORTED_MODULE_4_inferno__["createVNode"])(2,'h2',null,'Omat suosikit'),Object(__WEBPACK_IMPORTED_MODULE_4_inferno__["createVNode"])(2,'button','favouriteslist-close-button text-only-button','sulje [x]',{'onClick':this.props.onClose})]),Object(__WEBPACK_IMPORTED_MODULE_4_inferno__["createVNode"])(2,'ul',null,[favourites.map(function(address){return Object(__WEBPACK_IMPORTED_MODULE_4_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_1__favouriteslistitem__["a" /* default */],null,null,{'address':address,'removeFavourite':_this2.props.removeFavourite,'selectFavourite':_this2.props.selectFavourite,'isSelected':Object(__WEBPACK_IMPORTED_MODULE_2__model__["a" /* areLocationsEqual */])(_this2.props.selectedAddress,address)});}),!favourites.length&&Object(__WEBPACK_IMPORTED_MODULE_4_inferno__["createVNode"])(2,'li','favouriteslist-placeholder','Ei tallennettuja suosikkeja')])],{'tabIndex':'0','role':'dialog','aria-modal':true},null,function(r){return _this2.dialog=r;})]);}}]);return FavouritesDialog;}(__WEBPACK_IMPORTED_MODULE_0_inferno_component___default.a);/* harmony default export */ __webpack_exports__["a"] = (FavouritesDialog);

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iconbutton_iconbutton__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favourites_css__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favourites_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__favourites_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_inferno__);
/**
 * A list item component representing a single entry in the favourites list
 * @param {object} props
 * @param {object} props.address
 * @param {function} props.removeFavourite
 * @param {function} props.selectFavourite
 * @param {boolean} props.isSelected
 */var FavouritesListItem=function FavouritesListItem(_ref){var address=_ref.address,removeFavourite=_ref.removeFavourite,selectFavourite=_ref.selectFavourite,isSelected=_ref.isSelected;return Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'li','favouriteslist-item'+(isSelected?' selected':''),[Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'div','favouriteslist-item-label',Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'button','text-only-button full-width',address.label,{'onClick':function onClick(){return selectFavourite(address);}})),Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'div',null,Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(16,__WEBPACK_IMPORTED_MODULE_0__iconbutton_iconbutton__["a" /* default */],null,null,{'className':'favouriteslist-item-remove','text':'x','onClick':function onClick(){return removeFavourite(address);},'title':'Poista Omat suosikit -listalta'}))],null,address);};/* harmony default export */ __webpack_exports__["a"] = (FavouritesListItem);

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return set; });
/**
  * Get a value from the store
  * @param  {String} key
  * @return {*}
  */var get=function get(key){return key?JSON.parse(localStorage.getItem(key)):null;};/**
  * Set value to the store
  * @param  {String} key
  * @param  {*} value
  */var set=function set(key,value){localStorage.setItem(key,JSON.stringify(value));};

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__footer_css__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__footer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__footer_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_inferno__);
/**
 * App footer component
 * @constructs Footer
 * @param {Object} props
 * @param {Date} props.departureUpdateTime
 *//* harmony default export */ __webpack_exports__["a"] = (function(_ref){var departureUpdateTime=_ref.departureUpdateTime;return Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'footer',null,Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'div','footer-content',[Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'p','footer-app-name','Julkisilla.info v'+"1.3.0"),Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'p',null,['L\xE4hd\xF6t p\xE4ivitetty\xA0',Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'i',null,departureUpdateTime?Object(__WEBPACK_IMPORTED_MODULE_0__utils_utils__["f" /* toTimeString */])(departureUpdateTime):'Ei koskaan'),'\xA0/\xA0 L\xE4ht\xF6jen tiedot ovat HSL:n tarjoamaa ',Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'a',null,'avointa dataa',{'href':'https://digitransit.fi/'}),'.']),Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'p',null,[Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'a',null,'Github',{'href':'https://github.com/mraatika/nearestdepartures'}),'|',Object(__WEBPACK_IMPORTED_MODULE_2_inferno__["createVNode"])(2,'a',null,'Vikaraportit ja kehitysehdotukset',{'href':'https://github.com/mraatika/nearestdepartures/issues'})])]));});

/***/ }),
/* 197 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__accuracyindicator_css__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__accuracyindicator_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__accuracyindicator_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inferno___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inferno__);
/**
 * Choose color class based on accuracy
 * @private
 * @param {number} accuracy
 * @return {string} color class
 */var chooseColorClass=function chooseColorClass(accuracy){if(accuracy>500)return'danger';if(accuracy>100)return'warning';return'';};/**
 * A component for displaying GPS location accuracy info. Will display
 * an excalamation mark and a color depending on accuracy
 * @param {object} props
 * @param {number} props.accuracy GPS location accuracy in meters
 */var AccuracyIndicator=function AccuracyIndicator(_ref){var accuracy=_ref.accuracy;return Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,'div','location-accuracy '+chooseColorClass(accuracy),[Object(__WEBPACK_IMPORTED_MODULE_1_inferno__["createVNode"])(2,'span','location-accuracy-attention','!'),'Paikannuksen tarkkuus: '+Math.round(+accuracy||0)+'m']);};/* harmony default export */ __webpack_exports__["a"] = (AccuracyIndicator);

/***/ }),
/* 199 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 200 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 201 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=main.05823588.js.map