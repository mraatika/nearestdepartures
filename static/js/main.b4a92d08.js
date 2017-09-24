/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/nearestdepartures/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 207);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(193).default;
module.exports.default = module.exports;



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(186);
module.exports.default = module.exports;



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var options_1 = __webpack_require__(3);
var VNodes_1 = __webpack_require__(5);
var constants_1 = __webpack_require__(10);
var mounting_1 = __webpack_require__(11);
var patching_1 = __webpack_require__(6);
var rendering_1 = __webpack_require__(7);
var unmounting_1 = __webpack_require__(14);
// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
exports.EMPTY_OBJ = {};
if (true) {
    Object.freeze(exports.EMPTY_OBJ);
}
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    if (inferno_shared_1.isUndefined(context)) {
        context = exports.EMPTY_OBJ; // Context should not be mutable
    }
    var instance = new Component(props, context);
    vNode.children = instance;
    instance._blockSetState = false;
    instance.context = context;
    if (instance.props === exports.EMPTY_OBJ) {
        instance.props = props;
    }
    instance._patch = patching_1.patch;
    if (options_1.default.findDOMNodeEnabled) {
        instance._componentToDOMNodeMap = rendering_1.componentToDOMNodeMap;
    }
    // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
    instance._lifecycle = lifecycle;
    instance._unmounted = false;
    instance._pendingSetState = true;
    instance._isSVG = isSVG;
    if (!inferno_shared_1.isUndefined(instance.componentWillMount)) {
        instance._blockRender = true;
        instance.componentWillMount();
        instance._blockRender = false;
    }
    var childContext;
    if (!inferno_shared_1.isUndefined(instance.getChildContext)) {
        childContext = instance.getChildContext();
    }
    if (inferno_shared_1.isNullOrUndef(childContext)) {
        instance._childContext = context;
    }
    else {
        instance._childContext = inferno_shared_1.combineFrom(context, childContext);
    }
    options_1.default.beforeRender && options_1.default.beforeRender(instance);
    var input = instance.render(props, instance.state, context);
    options_1.default.afterRender && options_1.default.afterRender(instance);
    if (inferno_shared_1.isArray(input)) {
        if (true) {
            inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
        inferno_shared_1.throwError();
    }
    else if (inferno_shared_1.isInvalid(input)) {
        input = VNodes_1.createVoidVNode();
    }
    else if (inferno_shared_1.isStringOrNumber(input)) {
        input = VNodes_1.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes_1.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    instance._pendingSetState = false;
    instance._lastInput = input;
    return instance;
}
exports.createClassComponentInstance = createClassComponentInstance;
function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
    replaceVNode(parentDom, mounting_1.mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
}
exports.replaceLastChildAndUnmount = replaceLastChildAndUnmount;
function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
    unmounting_1.unmount(vNode, null, lifecycle, false, isRecycling);
    replaceChild(parentDom, dom, vNode.dom);
}
exports.replaceVNode = replaceVNode;
function createFunctionalComponentInput(vNode, component, props, context) {
    var input = component(props, context);
    if (inferno_shared_1.isArray(input)) {
        if (true) {
            inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
        inferno_shared_1.throwError();
    }
    else if (inferno_shared_1.isInvalid(input)) {
        input = VNodes_1.createVoidVNode();
    }
    else if (inferno_shared_1.isStringOrNumber(input)) {
        input = VNodes_1.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes_1.directClone(input);
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
exports.createFunctionalComponentInput = createFunctionalComponentInput;
function setTextContent(dom, text) {
    if (text !== '') {
        dom.textContent = text;
    }
    else {
        dom.appendChild(document.createTextNode(''));
    }
}
exports.setTextContent = setTextContent;
function updateTextContent(dom, text) {
    dom.firstChild.nodeValue = text;
}
exports.updateTextContent = updateTextContent;
function appendChild(parentDom, dom) {
    parentDom.appendChild(dom);
}
exports.appendChild = appendChild;
function insertOrAppend(parentDom, newNode, nextNode) {
    if (inferno_shared_1.isNullOrUndef(nextNode)) {
        appendChild(parentDom, newNode);
    }
    else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
exports.insertOrAppend = insertOrAppend;
function documentCreateElement(tag, isSVG) {
    if (isSVG === true) {
        return document.createElementNS(constants_1.svgNS, tag);
    }
    else {
        return document.createElement(tag);
    }
}
exports.documentCreateElement = documentCreateElement;
function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    unmounting_1.unmount(lastNode, null, lifecycle, false, isRecycling);
    var dom = mounting_1.mount(nextNode, null, lifecycle, context, isSVG);
    nextNode.dom = dom;
    replaceChild(parentDom, dom, lastNode.dom);
}
exports.replaceWithNewNode = replaceWithNewNode;
function replaceChild(parentDom, nextDom, lastDom) {
    if (!parentDom) {
        parentDom = lastDom.parentNode;
    }
    parentDom.replaceChild(nextDom, lastDom);
}
exports.replaceChild = replaceChild;
function removeChild(parentDom, dom) {
    parentDom.removeChild(dom);
}
exports.removeChild = removeChild;
function removeAllChildren(dom, children, lifecycle, isRecycling) {
    dom.textContent = '';
    if (!options_1.default.recyclingEnabled || (options_1.default.recyclingEnabled && !isRecycling)) {
        removeChildren(null, children, lifecycle, isRecycling);
    }
}
exports.removeAllChildren = removeAllChildren;
function removeChildren(dom, children, lifecycle, isRecycling) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (!inferno_shared_1.isInvalid(child)) {
            unmounting_1.unmount(child, dom, lifecycle, true, isRecycling);
        }
    }
}
exports.removeChildren = removeChildren;
function isKeyed(lastChildren, nextChildren) {
    return nextChildren.length && !inferno_shared_1.isNullOrUndef(nextChildren[0]) && !inferno_shared_1.isNullOrUndef(nextChildren[0].key)
        && lastChildren.length && !inferno_shared_1.isNullOrUndef(lastChildren[0]) && !inferno_shared_1.isNullOrUndef(lastChildren[0].key);
}
exports.isKeyed = isKeyed;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    recyclingEnabled: false,
    findDOMNodeEnabled: false,
    roots: null,
    createVNode: null,
    beforeRender: null,
    afterRender: null,
    afterMount: null,
    afterUpdate: null,
    beforeUnmount: null
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @module Utils */

/**
 * Find polyfill
 * @param {Function} fn Iteratee
 * @return {Function}
 */
const findPolyfill = fn =>
/**
 * @private
 * @param {Array} list
 * @returns {*|undefined}
 */
list => {
  for (let i = 0; i < list.length; i++) {
    if (fn(list[i])) return list[i];
  }

  return undefined;
};

/**
 * Curried native Array.prototype.find
 * @private
 * @param {Function} fn Iteratee
 * @returns {Function}
 */
const nativeFind = fn =>
/**
 * @param {Array} list
 * @returns {*|undefined}
 */
list => list.find(fn);

/**
 * Find element from array running values through an iteratee function
 */
const find = exports.find = typeof Array.prototype.find === 'function' ? nativeFind : findPolyfill;

/**
 * Get current time in seconds
 * @returns {number}
 */
const getNowInSeconds = exports.getNowInSeconds = () => Math.floor(new Date().getTime() / 1000);

/**
 * Find a value or some of values from list
 * @param {Array} list
 * @param {string} [prop] If defined will compare subject[prop] with entry[prop]
 * @returns {Function}
 */
const findFrom = exports.findFrom = (list = [], prop) => {
  // get entity[prop] if prop defined else return entity
  const getProp = prop ? e => e[prop] : e => e;
  // array comparator
  const compareArray = subject => e => subject.indexOf(getProp(e)) > -1;
  // single comparator
  const compareProp = subject => e => getProp(e) === subject;
  /**
   * @param {*} subject
   * @returns {*}
   */
  return subject => {
    const subjectValue = getProp(subject);
    const comparator = Array.isArray(subject) ? compareArray : compareProp;
    return find(comparator(subjectValue))(list);
  };
};

/**
 * Pad number with leading zero if necessary
 * @private
 * @param {number} num
 */
const padNumber = exports.padNumber = num => ('' + num).length < 2 ? '0' + num : num;

/**
 * Format date to time string
 * @param {Date} time
 * @returns {String}
 */
const toTimeString = exports.toTimeString = (time = new Date()) => `${padNumber(time.getHours())}:${padNumber(time.getMinutes())}:${padNumber(time.getSeconds())}`;

/**
 * Select unique values from an array
 * @param {Function} [fn]
 * @returns {Function}
 */
const uniq = exports.uniq = (fn = val => val) =>
/**
 * @param {Array} list
 * @returns {Array} Unique values
 */
(list = []) => {
  const findFromUniques = (val, uniques) => find(u => fn(u) === val)(uniques);

  return list.reduce((uniques, val) => {
    if (!findFromUniques(fn(val), uniques)) uniques.push(val);
    return uniques;
  }, []);
};

/**
 * Sort list in ascending order by results of running each value thru iteratee fn
 * @param {Function} iteratee
 * @returns {Function}
 */
const sortBy = exports.sortBy = (iteratee = val => val) =>
/**
 * @param {Array} list
 * @returns {Array} Sorted list
 */
(list = []) => {
  const copy = [...list];
  return copy.sort((a, b) => {
    if (iteratee(a) < iteratee(b)) return -1;
    if (iteratee(a) > iteratee(b)) return 1;
    return 0;
  });
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
var normalization_1 = __webpack_require__(18);
var options_1 = __webpack_require__(3);
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
        flags = inferno_shared_1.isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
    }
    var vNode = {
        children: inferno_shared_1.isUndefined(children) ? null : children,
        className: className,
        dom: null,
        flags: flags,
        key: inferno_shared_1.isUndefined(key) ? null : key,
        props: props || null,
        ref: ref || null,
        type: type
    };
    if (!noNormalise) {
        normalization_1.normalize(vNode);
    }
    if (options_1.default.createVNode) {
        options_1.default.createVNode(vNode);
    }
    return vNode;
}
exports.createVNode = createVNode;
function directClone(vNodeToClone) {
    var newVNode;
    var flags = vNodeToClone.flags;
    if (flags & 28 /* Component */) {
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (!propsToClone) {
            props = utils_1.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, null, props, vNodeToClone.key, vNodeToClone.ref, true);
        var newProps = newVNode.props;
        if (newProps) {
            var newChildren = newProps.children;
            // we need to also clone component children that are in props
            // as the children may also have been hoisted
            if (newChildren) {
                if (inferno_shared_1.isArray(newChildren)) {
                    var len = newChildren.length;
                    if (len > 0) {
                        var tmpArray = [];
                        for (var i = 0; i < len; i++) {
                            var child = newChildren[i];
                            if (inferno_shared_1.isStringOrNumber(child)) {
                                tmpArray.push(child);
                            }
                            else if (!inferno_shared_1.isInvalid(child) && isVNode(child)) {
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
        }
        newVNode.children = null;
    }
    else if (flags & 3970 /* Element */) {
        var children = vNodeToClone.children;
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (!propsToClone) {
            props = utils_1.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props, vNodeToClone.key, vNodeToClone.ref, !children);
    }
    else if (flags & 1 /* Text */) {
        newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
    }
    return newVNode;
}
exports.directClone = directClone;
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
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    var children = _children;
    var childrenLen = _children.length;
    if (childrenLen > 0 && !inferno_shared_1.isUndefined(_children[0])) {
        if (!props) {
            props = {};
        }
        if (childrenLen === 1) {
            children = _children[0];
        }
        if (!inferno_shared_1.isUndefined(children)) {
            props.children = children;
        }
    }
    var newVNode;
    if (inferno_shared_1.isArray(vNodeToClone)) {
        var tmpArray = [];
        for (var i = 0, len = vNodeToClone.length; i < len; i++) {
            tmpArray.push(directClone(vNodeToClone[i]));
        }
        newVNode = tmpArray;
    }
    else {
        var flags = vNodeToClone.flags;
        var className = vNodeToClone.className || (props && props.className) || null;
        var key = !inferno_shared_1.isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : (props ? props.key : null);
        var ref = vNodeToClone.ref || (props ? props.ref : null);
        if (flags & 28 /* Component */) {
            newVNode = createVNode(flags, vNodeToClone.type, className, null, (!vNodeToClone.props && !props) ? utils_1.EMPTY_OBJ : inferno_shared_1.combineFrom(vNodeToClone.props, props), key, ref, true);
            var newProps = newVNode.props;
            if (newProps) {
                var newChildren = newProps.children;
                // we need to also clone component children that are in props
                // as the children may also have been hoisted
                if (newChildren) {
                    if (inferno_shared_1.isArray(newChildren)) {
                        var len = newChildren.length;
                        if (len > 0) {
                            var tmpArray = [];
                            for (var i = 0; i < len; i++) {
                                var child = newChildren[i];
                                if (inferno_shared_1.isStringOrNumber(child)) {
                                    tmpArray.push(child);
                                }
                                else if (!inferno_shared_1.isInvalid(child) && isVNode(child)) {
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
            }
            newVNode.children = null;
        }
        else if (flags & 3970 /* Element */) {
            children = (props && !inferno_shared_1.isUndefined(props.children)) ? props.children : vNodeToClone.children;
            newVNode = createVNode(flags, vNodeToClone.type, className, children, (!vNodeToClone.props && !props) ? utils_1.EMPTY_OBJ : inferno_shared_1.combineFrom(vNodeToClone.props, props), key, ref, !children);
        }
        else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, key);
        }
    }
    return newVNode;
}
exports.cloneVNode = cloneVNode;
function createVoidVNode() {
    return createVNode(4096 /* Void */, null);
}
exports.createVoidVNode = createVoidVNode;
function createTextVNode(text, key) {
    return createVNode(1 /* Text */, null, null, text, null, key);
}
exports.createTextVNode = createTextVNode;
function isVNode(o) {
    return !!o.flags;
}
exports.isVNode = isVNode;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var options_1 = __webpack_require__(3);
var VNodes_1 = __webpack_require__(5);
var constants_1 = __webpack_require__(10);
var delegation_1 = __webpack_require__(187);
var mounting_1 = __webpack_require__(11);
var rendering_1 = __webpack_require__(7);
var unmounting_1 = __webpack_require__(14);
var utils_1 = __webpack_require__(2);
var processElement_1 = __webpack_require__(15);
function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    if (lastVNode !== nextVNode) {
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        if (nextFlags & 28 /* Component */) {
            if (lastFlags & 28 /* Component */) {
                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 3970 /* Element */) {
            if (lastFlags & 3970 /* Element */) {
                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 1 /* Text */) {
            if (lastFlags & 1 /* Text */) {
                patchText(lastVNode, nextVNode);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 4096 /* Void */) {
            if (lastFlags & 4096 /* Void */) {
                patchVoid(lastVNode, nextVNode);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else {
            // Error case: mount new one replacing old one
            utils_1.replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
exports.patch = patch;
function unmountChildren(children, dom, lifecycle, isRecycling) {
    if (VNodes_1.isVNode(children)) {
        unmounting_1.unmount(children, dom, lifecycle, true, isRecycling);
    }
    else if (inferno_shared_1.isArray(children)) {
        utils_1.removeAllChildren(dom, children, lifecycle, isRecycling);
    }
    else {
        dom.textContent = '';
    }
}
function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    var nextTag = nextVNode.type;
    var lastTag = lastVNode.type;
    if (lastTag !== nextTag) {
        utils_1.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
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
        if (isSVG || (nextFlags & 128 /* SvgElement */) > 0) {
            isSVG = true;
        }
        if (lastChildren !== nextChildren) {
            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        // inlined patchProps  -- starts --
        if (lastProps !== nextProps) {
            var lastPropsOrEmpty = lastProps || utils_1.EMPTY_OBJ;
            var nextPropsOrEmpty = nextProps || utils_1.EMPTY_OBJ;
            var hasControlledValue = false;
            if (nextPropsOrEmpty !== utils_1.EMPTY_OBJ) {
                var isFormElement = (nextFlags & 3584 /* FormElement */) > 0;
                if (isFormElement) {
                    hasControlledValue = processElement_1.isControlledFormElement(nextPropsOrEmpty);
                }
                for (var prop in nextPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    var nextValue = nextPropsOrEmpty[prop];
                    var lastValue = lastPropsOrEmpty[prop];
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                }
                if (isFormElement) {
                    processElement_1.processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
                }
            }
            if (lastPropsOrEmpty !== utils_1.EMPTY_OBJ) {
                for (var prop in lastPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (inferno_shared_1.isNullOrUndef(nextPropsOrEmpty[prop])) {
                        removeProp(prop, lastPropsOrEmpty[prop], dom);
                    }
                }
            }
        }
        // inlined patchProps  -- ends --
        if (lastClassName !== nextClassName) {
            if (inferno_shared_1.isNullOrUndef(nextClassName)) {
                dom.removeAttribute('class');
            }
            else {
                if (isSVG) {
                    dom.setAttribute('class', nextClassName);
                }
                else {
                    dom.className = nextClassName;
                }
            }
        }
        if (nextRef) {
            if (lastVNode.ref !== nextRef || isRecycling) {
                mounting_1.mountRef(dom, nextRef, lifecycle);
            }
        }
    }
}
exports.patchElement = patchElement;
function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var patchArray = false;
    var patchKeyed = false;
    if (nextFlags & 64 /* HasNonKeyedChildren */) {
        patchArray = true;
    }
    else if ((lastFlags & 32 /* HasKeyedChildren */) && (nextFlags & 32 /* HasKeyedChildren */)) {
        patchKeyed = true;
        patchArray = true;
    }
    else if (inferno_shared_1.isInvalid(nextChildren)) {
        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
    }
    else if (inferno_shared_1.isInvalid(lastChildren)) {
        if (inferno_shared_1.isStringOrNumber(nextChildren)) {
            utils_1.setTextContent(dom, nextChildren);
        }
        else {
            if (inferno_shared_1.isArray(nextChildren)) {
                mounting_1.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
            else {
                mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
    }
    else if (inferno_shared_1.isStringOrNumber(nextChildren)) {
        if (inferno_shared_1.isStringOrNumber(lastChildren)) {
            utils_1.updateTextContent(dom, nextChildren);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            utils_1.setTextContent(dom, nextChildren);
        }
    }
    else if (inferno_shared_1.isArray(nextChildren)) {
        if (inferno_shared_1.isArray(lastChildren)) {
            patchArray = true;
            if (utils_1.isKeyed(lastChildren, nextChildren)) {
                patchKeyed = true;
            }
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting_1.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    else if (inferno_shared_1.isArray(lastChildren)) {
        utils_1.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
    }
    else if (VNodes_1.isVNode(nextChildren)) {
        if (VNodes_1.isVNode(lastChildren)) {
            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    if (patchArray) {
        if (patchKeyed) {
            patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
    var lastType = lastVNode.type;
    var nextType = nextVNode.type;
    var lastKey = lastVNode.key;
    var nextKey = nextVNode.key;
    if (lastType !== nextType || lastKey !== nextKey) {
        utils_1.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        return false;
    }
    else {
        var nextProps = nextVNode.props || utils_1.EMPTY_OBJ;
        if (isClass) {
            var instance = lastVNode.children;
            instance._updating = true;
            if (instance._unmounted) {
                if (inferno_shared_1.isNull(parentDom)) {
                    return true;
                }
                utils_1.replaceChild(parentDom, mounting_1.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextVNode.flags & 4 /* ComponentClass */), lastVNode.dom);
            }
            else {
                var lastState = instance.state;
                var nextState = instance.state;
                var lastProps = instance.props;
                var childContext = void 0;
                if (!inferno_shared_1.isUndefined(instance.getChildContext)) {
                    childContext = instance.getChildContext();
                }
                nextVNode.children = instance;
                instance._isSVG = isSVG;
                if (inferno_shared_1.isNullOrUndef(childContext)) {
                    childContext = context;
                }
                else {
                    childContext = inferno_shared_1.combineFrom(context, childContext);
                }
                var lastInput = instance._lastInput;
                var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                var didUpdate = true;
                instance._childContext = childContext;
                if (inferno_shared_1.isInvalid(nextInput)) {
                    nextInput = VNodes_1.createVoidVNode();
                }
                else if (nextInput === inferno_shared_1.NO_OP) {
                    nextInput = lastInput;
                    didUpdate = false;
                }
                else if (inferno_shared_1.isStringOrNumber(nextInput)) {
                    nextInput = VNodes_1.createTextVNode(nextInput, null);
                }
                else if (inferno_shared_1.isArray(nextInput)) {
                    if (true) {
                        inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                    }
                    inferno_shared_1.throwError();
                }
                else if (inferno_shared_1.isObject(nextInput) && nextInput.dom) {
                    nextInput = VNodes_1.directClone(nextInput);
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
                    if (!inferno_shared_1.isUndefined(instance.componentDidUpdate)) {
                        instance.componentDidUpdate(lastProps, lastState);
                    }
                    options_1.default.afterUpdate && options_1.default.afterUpdate(nextVNode);
                    options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.set(instance, nextInput.dom);
                }
                nextVNode.dom = nextInput.dom;
            }
            instance._updating = false;
        }
        else {
            var shouldUpdate = true;
            var lastProps = lastVNode.props;
            var nextHooks = nextVNode.ref;
            var nextHooksDefined = !inferno_shared_1.isNullOrUndef(nextHooks);
            var lastInput = lastVNode.children;
            var nextInput = lastInput;
            nextVNode.dom = lastVNode.dom;
            nextVNode.children = lastInput;
            if (lastKey !== nextKey) {
                shouldUpdate = true;
            }
            else {
                if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
                }
            }
            if (shouldUpdate !== false) {
                if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                    nextHooks.onComponentWillUpdate(lastProps, nextProps);
                }
                nextInput = nextType(nextProps, context);
                if (inferno_shared_1.isInvalid(nextInput)) {
                    nextInput = VNodes_1.createVoidVNode();
                }
                else if (inferno_shared_1.isStringOrNumber(nextInput) && nextInput !== inferno_shared_1.NO_OP) {
                    nextInput = VNodes_1.createTextVNode(nextInput, null);
                }
                else if (inferno_shared_1.isArray(nextInput)) {
                    if (true) {
                        inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                    }
                    inferno_shared_1.throwError();
                }
                else if (inferno_shared_1.isObject(nextInput) && nextInput.dom) {
                    nextInput = VNodes_1.directClone(nextInput);
                }
                if (nextInput !== inferno_shared_1.NO_OP) {
                    patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
                    nextVNode.children = nextInput;
                    if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                        nextHooks.onComponentDidUpdate(lastProps, nextProps);
                    }
                    nextVNode.dom = nextInput.dom;
                }
            }
            if (nextInput.flags & 28 /* Component */) {
                nextInput.parentVNode = nextVNode;
            }
            else if (lastInput.flags & 28 /* Component */) {
                lastInput.parentVNode = nextVNode;
            }
        }
    }
    return false;
}
exports.patchComponent = patchComponent;
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    nextVNode.dom = dom;
    if (lastVNode.children !== nextText) {
        dom.nodeValue = nextText;
    }
}
exports.patchText = patchText;
function patchVoid(lastVNode, nextVNode) {
    nextVNode.dom = lastVNode.dom;
}
exports.patchVoid = patchVoid;
function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var lastChildrenLength = lastChildren.length;
    var nextChildrenLength = nextChildren.length;
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    for (; i < commonLength; i++) {
        var nextChild = nextChildren[i];
        if (nextChild.dom) {
            nextChild = nextChildren[i] = VNodes_1.directClone(nextChild);
        }
        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; i++) {
            var nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = VNodes_1.directClone(nextChild);
            }
            utils_1.appendChild(dom, mounting_1.mount(nextChild, null, lifecycle, context, isSVG));
        }
    }
    else if (nextChildrenLength === 0) {
        utils_1.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; i++) {
            unmounting_1.unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
        }
    }
}
exports.patchNonKeyedChildren = patchNonKeyedChildren;
function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
    var aLength = a.length;
    var bLength = b.length;
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
    if (aLength === 0) {
        if (bLength !== 0) {
            mounting_1.mountArrayChildren(b, dom, lifecycle, context, isSVG);
        }
        return;
    }
    else if (bLength === 0) {
        utils_1.removeAllChildren(dom, a, lifecycle, isRecycling);
        return;
    }
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    if (bStartNode.dom) {
        b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
    }
    if (bEndNode.dom) {
        b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
    }
    // Step 1
    /* eslint no-constant-condition: 0 */
    outer: while (true) {
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
                b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
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
                b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
            }
        }
        // Move and sync nodes from right to left.
        if (aEndNode.key === bStartNode.key) {
            patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            utils_1.insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
            aEnd--;
            bStart++;
            aEndNode = a[aEnd];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
            }
            continue;
        }
        // Move and sync nodes from left to right.
        if (aStartNode.key === bEndNode.key) {
            patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            utils_1.insertOrAppend(dom, bEndNode.dom, nextNode);
            aStart++;
            bEnd--;
            aStartNode = a[aStart];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
            }
            continue;
        }
        break;
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes_1.directClone(node);
                }
                bStart++;
                utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), nextNode);
            }
        }
    }
    else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmounting_1.unmount(a[aStart++], dom, lifecycle, false, isRecycling);
        }
    }
    else {
        aLength = aEnd - aStart + 1;
        bLength = bEnd - bStart + 1;
        var sources = new Array(bLength);
        // Mark all nodes as inserted.
        for (i = 0; i < bLength; i++) {
            sources[i] = -1;
        }
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if ((bLength <= 4) || (aLength * bLength <= 16)) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
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
                                b[j] = bNode = VNodes_1.directClone(bNode);
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
                if (patched < bLength) {
                    j = keyIndex.get(aNode.key);
                    if (!inferno_shared_1.isUndefined(j)) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.dom) {
                            b[j] = bNode = VNodes_1.directClone(bNode);
                        }
                        patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                        patched++;
                        a[i] = null;
                    }
                }
            }
        }
        // fast-path: if nothing patched remove all old and add all new
        if (aLength === a.length && patched === 0) {
            utils_1.removeAllChildren(dom, a, lifecycle, isRecycling);
            while (bStart < bLength) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes_1.directClone(node);
                }
                bStart++;
                utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), null);
            }
        }
        else {
            i = aLength - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (!inferno_shared_1.isNull(aNode)) {
                    unmounting_1.unmount(aNode, dom, lifecycle, true, isRecycling);
                    i--;
                }
            }
            if (moved) {
                var seq = lis_algorithm(sources);
                j = seq.length - 1;
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes_1.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils_1.insertOrAppend(dom, mounting_1.mount(node, dom, lifecycle, context, isSVG), nextNode);
                    }
                    else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
                            utils_1.insertOrAppend(dom, node.dom, nextNode);
                        }
                        else {
                            j--;
                        }
                    }
                }
            }
            else if (patched !== bLength) {
                // when patched count doesn't match b length we need to insert those new ones
                // loop backwards so we can use insertBefore
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes_1.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), nextNode);
                    }
                }
            }
        }
    }
}
exports.patchKeyedChildren = patchKeyedChildren;
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
        if (arrI === -1) {
            continue;
        }
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
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
function isAttrAnEvent(attr) {
    return attr[0] === 'o' && attr[1] === 'n';
}
exports.isAttrAnEvent = isAttrAnEvent;
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
    if (lastValue !== nextValue) {
        if (prop in constants_1.skipProps || (hasControlledValue && prop === 'value')) {
            return;
        }
        else if (prop in constants_1.booleanProps) {
            prop = prop === 'autoFocus' ? prop.toLowerCase() : prop;
            dom[prop] = !!nextValue;
        }
        else if (prop in constants_1.strictProps) {
            var value = inferno_shared_1.isNullOrUndef(nextValue) ? '' : nextValue;
            if (dom[prop] !== value) {
                dom[prop] = value;
            }
        }
        else if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, dom);
        }
        else if (inferno_shared_1.isNullOrUndef(nextValue)) {
            dom.removeAttribute(prop);
        }
        else if (prop === 'style') {
            patchStyle(lastValue, nextValue, dom);
        }
        else if (prop === 'dangerouslySetInnerHTML') {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!inferno_shared_1.isNullOrUndef(nextHtml)) {
                    dom.innerHTML = nextHtml;
                }
            }
        }
        else {
            // We optimize for NS being boolean. Its 99.9% time false
            if (isSVG && prop in constants_1.namespaces) {
                // If we end up in this path we can read property again
                dom.setAttributeNS(constants_1.namespaces[prop], prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
        }
    }
}
exports.patchProp = patchProp;
function patchEvent(name, lastValue, nextValue, dom) {
    if (lastValue !== nextValue) {
        if (name in constants_1.delegatedEvents) {
            delegation_1.handleEvent(name, lastValue, nextValue, dom);
        }
        else {
            var nameLowerCase = name.toLowerCase();
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (domEvent && domEvent.wrapped) {
                return;
            }
            if (!inferno_shared_1.isFunction(nextValue) && !inferno_shared_1.isNullOrUndef(nextValue)) {
                var linkEvent_1 = nextValue.event;
                if (linkEvent_1 && inferno_shared_1.isFunction(linkEvent_1)) {
                    if (!dom._data) {
                        dom[nameLowerCase] = function (e) {
                            linkEvent_1(e.currentTarget._data, e);
                        };
                    }
                    dom._data = nextValue.data;
                }
                else {
                    if (true) {
                        inferno_shared_1.throwError("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent.");
                    }
                    inferno_shared_1.throwError();
                }
            }
            else {
                dom[nameLowerCase] = nextValue;
            }
        }
    }
}
exports.patchEvent = patchEvent;
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    if (inferno_shared_1.isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    for (var style in nextAttrValue) {
        // do not add a hasOwnProperty check here, it affects performance
        var value = nextAttrValue[style];
        if (!inferno_shared_1.isNumber(value) || style in constants_1.isUnitlessNumber) {
            domStyle[style] = value;
        }
        else {
            domStyle[style] = value + 'px';
        }
    }
    if (!inferno_shared_1.isNullOrUndef(lastAttrValue)) {
        for (var style in lastAttrValue) {
            if (inferno_shared_1.isNullOrUndef(nextAttrValue[style])) {
                domStyle[style] = '';
            }
        }
    }
}
exports.patchStyle = patchStyle;
function removeProp(prop, lastValue, dom) {
    if (prop === 'value') {
        dom.value = '';
    }
    else if (prop === 'style') {
        dom.removeAttribute('style');
    }
    else if (isAttrAnEvent(prop)) {
        delegation_1.handleEvent(name, lastValue, null, dom);
    }
    else {
        dom.removeAttribute(prop);
    }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var options_1 = __webpack_require__(3);
var VNodes_1 = __webpack_require__(5);
var hydration_1 = __webpack_require__(189);
var mounting_1 = __webpack_require__(11);
var patching_1 = __webpack_require__(6);
var unmounting_1 = __webpack_require__(14);
var utils_1 = __webpack_require__(2);
// rather than use a Map, like we did before, we can use an array here
// given there shouldn't be THAT many roots on the page, the difference
// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
exports.roots = [];
exports.componentToDOMNodeMap = new Map();
options_1.default.roots = exports.roots;
/**
 * When inferno.options.findDOMNOdeEnabled is true, this function will return DOM Node by component instance
 * @param ref Component instance
 * @returns {*|null} returns dom node
 */
function findDOMNode(ref) {
    if (!options_1.default.findDOMNodeEnabled) {
        if (true) {
            inferno_shared_1.throwError('findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!');
        }
        inferno_shared_1.throwError();
    }
    var dom = ref && ref.nodeType ? ref : null;
    return exports.componentToDOMNodeMap.get(ref) || dom;
}
exports.findDOMNode = findDOMNode;
function getRoot(dom) {
    for (var i = 0, len = exports.roots.length; i < len; i++) {
        var root = exports.roots[i];
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
    exports.roots.push(root);
    return root;
}
function removeRoot(root) {
    for (var i = 0, len = exports.roots.length; i < len; i++) {
        if (exports.roots[i] === root) {
            exports.roots.splice(i, 1);
            return;
        }
    }
}
if (true) {
    if (inferno_shared_1.isBrowser && document.body === null) {
        inferno_shared_1.warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
    }
}
var documentBody = inferno_shared_1.isBrowser ? document.body : null;
/**
 * Renders virtual node tree into parent node.
 * @param {VNode | null | string | number} input vNode to be rendered
 * @param parentDom DOM node which content will be replaced by virtual node
 * @returns {InfernoChildren} rendered virtual node
 */
function render(input, parentDom) {
    if (documentBody === parentDom) {
        if (true) {
            inferno_shared_1.throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
        }
        inferno_shared_1.throwError();
    }
    if (input === inferno_shared_1.NO_OP) {
        return;
    }
    var root = getRoot(parentDom);
    if (inferno_shared_1.isNull(root)) {
        var lifecycle = new inferno_shared_1.Lifecycle();
        if (!inferno_shared_1.isInvalid(input)) {
            if (input.dom) {
                input = VNodes_1.directClone(input);
            }
            if (!hydration_1.default(input, parentDom, lifecycle)) {
                mounting_1.mount(input, parentDom, lifecycle, utils_1.EMPTY_OBJ, false);
            }
            root = setRoot(parentDom, input, lifecycle);
            lifecycle.trigger();
        }
    }
    else {
        var lifecycle = root.lifecycle;
        lifecycle.listeners = [];
        if (inferno_shared_1.isNullOrUndef(input)) {
            unmounting_1.unmount(root.input, parentDom, lifecycle, false, false);
            removeRoot(root);
        }
        else {
            if (input.dom) {
                input = VNodes_1.directClone(input);
            }
            patching_1.patch(root.input, input, parentDom, lifecycle, utils_1.EMPTY_OBJ, false, false);
        }
        root.input = input;
        lifecycle.trigger();
    }
    if (root) {
        var rootInput = root.input;
        if (rootInput && (rootInput.flags & 28 /* Component */)) {
            return rootInput.children;
        }
    }
}
exports.render = render;
function createRenderer(parentDom) {
    return function renderer(lastInput, nextInput) {
        if (!parentDom) {
            parentDom = lastInput;
        }
        render(nextInput, parentDom);
    };
}
exports.createRenderer = createRenderer;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @module Constants */

/**
 * Vehicle types
 * @type {Object}
 */
const VEHICLE_TYPE = exports.VEHICLE_TYPE = {
  BUS: 'BUS',
  TRAM: 'TRAM',
  RAIL: 'RAIL',
  SUBWAY: 'SUBWAY',
  FERRY: 'FERRY'
};

/**
 * Vehicle type ranslations from english to finnish
 * @type {Object}
 */
const VEHICLE_TYPE_TRANSLATIONS = exports.VEHICLE_TYPE_TRANSLATIONS = {
  BUS: 'Bussi',
  TRAM: 'Raitiovaunu',
  RAIL: 'Juna',
  SUBWAY: 'Metro',
  FERRY: 'Lautta'
};

/**
 * If address is this word then search by location
 * @type {string}
 */
const LOCATION_MAGIC_WORD = exports.LOCATION_MAGIC_WORD = 'oma sijainti';

/**
 * Default range filter value
 * @type {number}
 */
const DEFAULT_RANGE = exports.DEFAULT_RANGE = 400;

/**
 * Minimum range value
 * @type {number}
 */
const MIN_RANGE = exports.MIN_RANGE = 100;
/**
 * Maximum range value
 * @type {number}
 */
const MAX_RANGE = exports.MAX_RANGE = 2000;
/**
 * Range change step
 * @type {number}
 */
const RANGE_STEP = exports.RANGE_STEP = 100;

/**
 * Max amount of address suggestions to display
 * @type {number}
 */
const MAX_ADDRESS_SUGGESTIONS = exports.MAX_ADDRESS_SUGGESTIONS = 10;

/**
 * Interval between departure update in ms
 * @type {number}
 */
const BATCH_INTERVAL = exports.BATCH_INTERVAL = 30 * 1000;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _liners = __webpack_require__(69);

var oneliners = _interopRequireWildcard(_liners);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/** @module FPUtils */

/**
 * All functions that should not be auto curried
 * @private
 * @type {string[]}
 */
const unCurried = ['curry', 'compose', 'composeAll', 'ifThenElse', 'pipe', 'pipeAll'];
const rightCurried = ['assign', 'or'];

/**
 * Compose a curry function to curry multiple times (e.g sum(1)(2)(3))
 * @private
 * @type {Function}
 * @param {number} arity
 * @returns {Function}
 */
const curryMany = arity => oneliners.reduce(oneliners.compose, [...new Array(arity - 1)].map(() => oneliners.curry));

/**
 * Proxy for 1-liners utility functions. Auto curries all functions except ones
 * defined in unCurried list.
 * @type {Object}
 */
exports.default = Object.keys(oneliners).reduce((obj, key) => {
    const orig = oneliners[key];
    const arity = orig.length;
    let fn;

    // do not curry if
    // a) property is not a function
    // b) property is listed in list of fns that should not be curried
    // c) fn's arity is one or less
    if (typeof orig !== 'function' || unCurried.indexOf(key) > -1 || arity < 2) {
        fn = orig;
        // some fn should be curried right (such as assign)
    } else if (rightCurried.indexOf(key) > -1) {
        fn = oneliners.curryRight(orig);
    } else {
        fn = curryMany(arity)(orig);
    }
    obj[key] = fn;
    return obj;
}, {});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.xlinkNS = 'http://www.w3.org/1999/xlink';
exports.xmlNS = 'http://www.w3.org/XML/1998/namespace';
exports.svgNS = 'http://www.w3.org/2000/svg';
var TRUE = true;
exports.strictProps = Object.create(null);
exports.strictProps.volume = TRUE;
exports.strictProps.defaultChecked = TRUE;
Object.freeze(exports.strictProps);
exports.booleanProps = Object.create(null);
exports.booleanProps.muted = TRUE;
exports.booleanProps.scoped = TRUE;
exports.booleanProps.loop = TRUE;
exports.booleanProps.open = TRUE;
exports.booleanProps.checked = TRUE;
exports.booleanProps.default = TRUE;
exports.booleanProps.capture = TRUE;
exports.booleanProps.disabled = TRUE;
exports.booleanProps.readOnly = TRUE;
exports.booleanProps.required = TRUE;
exports.booleanProps.autoplay = TRUE;
exports.booleanProps.controls = TRUE;
exports.booleanProps.seamless = TRUE;
exports.booleanProps.reversed = TRUE;
exports.booleanProps.allowfullscreen = TRUE;
exports.booleanProps.novalidate = TRUE;
exports.booleanProps.hidden = TRUE;
exports.booleanProps.autoFocus = TRUE;
Object.freeze(exports.booleanProps);
exports.namespaces = Object.create(null);
exports.namespaces['xlink:href'] = exports.xlinkNS;
exports.namespaces['xlink:arcrole'] = exports.xlinkNS;
exports.namespaces['xlink:actuate'] = exports.xlinkNS;
exports.namespaces['xlink:show'] = exports.xlinkNS;
exports.namespaces['xlink:role'] = exports.xlinkNS;
exports.namespaces['xlink:title'] = exports.xlinkNS;
exports.namespaces['xlink:type'] = exports.xlinkNS;
exports.namespaces['xml:base'] = exports.xmlNS;
exports.namespaces['xml:lang'] = exports.xmlNS;
exports.namespaces['xml:space'] = exports.xmlNS;
Object.freeze(exports.namespaces);
exports.isUnitlessNumber = Object.create(null);
exports.isUnitlessNumber.animationIterationCount = TRUE;
exports.isUnitlessNumber.borderImageOutset = TRUE;
exports.isUnitlessNumber.borderImageSlice = TRUE;
exports.isUnitlessNumber.borderImageWidth = TRUE;
exports.isUnitlessNumber.boxFlex = TRUE;
exports.isUnitlessNumber.boxFlexGroup = TRUE;
exports.isUnitlessNumber.boxOrdinalGroup = TRUE;
exports.isUnitlessNumber.columnCount = TRUE;
exports.isUnitlessNumber.flex = TRUE;
exports.isUnitlessNumber.flexGrow = TRUE;
exports.isUnitlessNumber.flexPositive = TRUE;
exports.isUnitlessNumber.flexShrink = TRUE;
exports.isUnitlessNumber.flexNegative = TRUE;
exports.isUnitlessNumber.flexOrder = TRUE;
exports.isUnitlessNumber.gridRow = TRUE;
exports.isUnitlessNumber.gridColumn = TRUE;
exports.isUnitlessNumber.fontWeight = TRUE;
exports.isUnitlessNumber.lineClamp = TRUE;
exports.isUnitlessNumber.lineHeight = TRUE;
exports.isUnitlessNumber.opacity = TRUE;
exports.isUnitlessNumber.order = TRUE;
exports.isUnitlessNumber.orphans = TRUE;
exports.isUnitlessNumber.tabSize = TRUE;
exports.isUnitlessNumber.widows = TRUE;
exports.isUnitlessNumber.zIndex = TRUE;
exports.isUnitlessNumber.zoom = TRUE;
exports.isUnitlessNumber.fillOpacity = TRUE;
exports.isUnitlessNumber.floodOpacity = TRUE;
exports.isUnitlessNumber.stopOpacity = TRUE;
exports.isUnitlessNumber.strokeDasharray = TRUE;
exports.isUnitlessNumber.strokeDashoffset = TRUE;
exports.isUnitlessNumber.strokeMiterlimit = TRUE;
exports.isUnitlessNumber.strokeOpacity = TRUE;
exports.isUnitlessNumber.strokeWidth = TRUE;
Object.freeze(exports.isUnitlessNumber);
exports.skipProps = Object.create(null);
exports.skipProps.children = TRUE;
exports.skipProps.childrenType = TRUE;
exports.skipProps.defaultValue = TRUE;
exports.skipProps.ref = TRUE;
exports.skipProps.key = TRUE;
exports.skipProps.selected = TRUE;
exports.skipProps.checked = TRUE;
exports.skipProps.multiple = TRUE;
Object.freeze(exports.skipProps);
exports.delegatedEvents = Object.create(null);
exports.delegatedEvents.onClick = TRUE;
exports.delegatedEvents.onMouseDown = TRUE;
exports.delegatedEvents.onMouseUp = TRUE;
exports.delegatedEvents.onMouseMove = TRUE;
exports.delegatedEvents.onSubmit = TRUE;
exports.delegatedEvents.onDblClick = TRUE;
exports.delegatedEvents.onKeyDown = TRUE;
exports.delegatedEvents.onKeyUp = TRUE;
exports.delegatedEvents.onKeyPress = TRUE;
Object.freeze(exports.delegatedEvents);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var options_1 = __webpack_require__(3);
var VNodes_1 = __webpack_require__(5);
var patching_1 = __webpack_require__(6);
var recycling_1 = __webpack_require__(17);
var rendering_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(2);
var processElement_1 = __webpack_require__(15);
function mount(vNode, parentDom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 3970 /* Element */) {
        return mountElement(vNode, parentDom, lifecycle, context, isSVG);
    }
    else if (flags & 28 /* Component */) {
        return mountComponent(vNode, parentDom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
    }
    else if (flags & 4096 /* Void */) {
        return mountVoid(vNode, parentDom);
    }
    else if (flags & 1 /* Text */) {
        return mountText(vNode, parentDom);
    }
    else {
        if (true) {
            if (typeof vNode === 'object') {
                inferno_shared_1.throwError("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + JSON.stringify(vNode) + "\".");
            }
            else {
                inferno_shared_1.throwError("mount() expects a valid VNode, instead it received an object with the type \"" + typeof vNode + "\".");
            }
        }
        inferno_shared_1.throwError();
    }
}
exports.mount = mount;
function mountText(vNode, parentDom) {
    var dom = document.createTextNode(vNode.children);
    vNode.dom = dom;
    if (parentDom) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountText = mountText;
function mountVoid(vNode, parentDom) {
    var dom = document.createTextNode('');
    vNode.dom = dom;
    if (parentDom) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountVoid = mountVoid;
function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
    if (options_1.default.recyclingEnabled) {
        var dom_1 = recycling_1.recycleElement(vNode, lifecycle, context, isSVG);
        if (!inferno_shared_1.isNull(dom_1)) {
            if (!inferno_shared_1.isNull(parentDom)) {
                utils_1.appendChild(parentDom, dom_1);
            }
            return dom_1;
        }
    }
    var flags = vNode.flags;
    if (isSVG || (flags & 128 /* SvgElement */)) {
        isSVG = true;
    }
    var dom = utils_1.documentCreateElement(vNode.type, isSVG);
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    vNode.dom = dom;
    if (!inferno_shared_1.isInvalid(children)) {
        if (inferno_shared_1.isStringOrNumber(children)) {
            utils_1.setTextContent(dom, children);
        }
        else if (inferno_shared_1.isArray(children)) {
            mountArrayChildren(children, dom, lifecycle, context, isSVG);
        }
        else if (VNodes_1.isVNode(children)) {
            mount(children, dom, lifecycle, context, isSVG);
        }
    }
    if (!inferno_shared_1.isNull(props)) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = processElement_1.isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching_1.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement_1.processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (inferno_shared_1.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    }
    else {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (!inferno_shared_1.isNull(ref)) {
        mountRef(dom, ref, lifecycle);
    }
    if (!inferno_shared_1.isNull(parentDom)) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountElement = mountElement;
function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
        if (!inferno_shared_1.isInvalid(child)) {
            if (child.dom) {
                children[i] = child = VNodes_1.directClone(child);
            }
            mount(children[i], dom, lifecycle, context, isSVG);
        }
    }
}
exports.mountArrayChildren = mountArrayChildren;
function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
    if (options_1.default.recyclingEnabled) {
        var dom_2 = recycling_1.recycleComponent(vNode, lifecycle, context, isSVG);
        if (!inferno_shared_1.isNull(dom_2)) {
            if (!inferno_shared_1.isNull(parentDom)) {
                utils_1.appendChild(parentDom, dom_2);
            }
            return dom_2;
        }
    }
    var type = vNode.type;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var ref = vNode.ref;
    var dom;
    if (isClass) {
        var instance = utils_1.createClassComponentInstance(vNode, type, props, context, isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
        if (!inferno_shared_1.isNull(parentDom)) {
            utils_1.appendChild(parentDom, dom);
        }
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false;
        options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.set(instance, dom);
    }
    else {
        var input = utils_1.createFunctionalComponentInput(vNode, type, props, context);
        vNode.dom = dom = mount(input, null, lifecycle, context, isSVG);
        vNode.children = input;
        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
        if (!inferno_shared_1.isNull(parentDom)) {
            utils_1.appendChild(parentDom, dom);
        }
    }
    return dom;
}
exports.mountComponent = mountComponent;
function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
    if (ref) {
        if (inferno_shared_1.isFunction(ref)) {
            ref(instance);
        }
        else {
            if (true) {
                if (inferno_shared_1.isStringOrNumber(ref)) {
                    inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                }
                else if (inferno_shared_1.isObject(ref) && (vNode.flags & 4 /* ComponentClass */)) {
                    inferno_shared_1.throwError('functional component lifecycle events are not supported on ES2015 class components.');
                }
                else {
                    inferno_shared_1.throwError("a bad value for \"ref\" was used on component: \"" + JSON.stringify(ref) + "\"");
                }
            }
            inferno_shared_1.throwError();
        }
    }
    var hasDidMount = !inferno_shared_1.isUndefined(instance.componentDidMount);
    var afterMount = options_1.default.afterMount;
    if (hasDidMount || !inferno_shared_1.isNull(afterMount)) {
        lifecycle.addListener(function () {
            instance._updating = true;
            if (afterMount) {
                afterMount(vNode);
            }
            if (hasDidMount) {
                instance.componentDidMount();
            }
            instance._updating = false;
        });
    }
}
exports.mountClassComponentCallbacks = mountClassComponentCallbacks;
function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
    if (ref) {
        if (!inferno_shared_1.isNullOrUndef(ref.onComponentWillMount)) {
            ref.onComponentWillMount();
        }
        if (!inferno_shared_1.isNullOrUndef(ref.onComponentDidMount)) {
            lifecycle.addListener(function () { return ref.onComponentDidMount(dom); });
        }
    }
}
exports.mountFunctionalComponentCallbacks = mountFunctionalComponentCallbacks;
function mountRef(dom, value, lifecycle) {
    if (inferno_shared_1.isFunction(value)) {
        lifecycle.addListener(function () { return value(dom); });
    }
    else {
        if (inferno_shared_1.isInvalid(value)) {
            return;
        }
        if (true) {
            inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        inferno_shared_1.throwError();
    }
}
exports.mountRef = mountRef;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _icons = __webpack_require__(183);

var _icons2 = _interopRequireDefault(_icons);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Vehicle type icon component
 * @constructs VehicleIcon
 * @param {string} iconName
 * @returns {VehicleIcon}
 */
exports.default = ({ iconName }) => (0, _inferno.createVNode)(128, "svg", "icon", (0, _inferno.createVNode)(2, "use", null, null, {
    "xlink:href": _icons2.default + `#icon-icon_${iconName}`,
    "style": { fill: 'currentColor' }
}), {
    "viewBox": "0 0 100 100"
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(185).default;
module.exports.default = module.exports;



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var options_1 = __webpack_require__(3);
var patching_1 = __webpack_require__(6);
var recycling_1 = __webpack_require__(17);
var rendering_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(2);
function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & 3970 /* Element */) {
        unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & (1 /* Text */ | 4096 /* Void */)) {
        unmountVoidOrText(vNode, parentDom);
    }
}
exports.unmount = unmount;
function unmountVoidOrText(vNode, parentDom) {
    if (parentDom) {
        utils_1.removeChild(parentDom, vNode.dom);
    }
}
function unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var instance = vNode.children;
    var flags = vNode.flags;
    var isStatefulComponent = flags & 4 /* ComponentClass */;
    var ref = vNode.ref;
    var dom = vNode.dom;
    if (!isRecycling) {
        if (isStatefulComponent) {
            if (!instance._unmounted) {
                instance._blockSetState = true;
                options_1.default.beforeUnmount && options_1.default.beforeUnmount(vNode);
                instance.componentWillUnmount && instance.componentWillUnmount();
                if (ref && !isRecycling) {
                    ref(null);
                }
                instance._unmounted = true;
                options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.delete(instance);
                unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
            }
        }
        else {
            if (!inferno_shared_1.isNullOrUndef(ref)) {
                if (!inferno_shared_1.isNullOrUndef(ref.onComponentWillUnmount)) {
                    ref.onComponentWillUnmount(dom);
                }
            }
            unmount(instance, null, lifecycle, false, isRecycling);
        }
    }
    if (parentDom) {
        var lastInput = instance._lastInput;
        if (inferno_shared_1.isNullOrUndef(lastInput)) {
            lastInput = instance;
        }
        utils_1.removeChild(parentDom, dom);
    }
    if (options_1.default.recyclingEnabled && !isStatefulComponent && (parentDom || canRecycle)) {
        recycling_1.poolComponent(vNode);
    }
}
exports.unmountComponent = unmountComponent;
function unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var dom = vNode.dom;
    var ref = vNode.ref;
    var props = vNode.props;
    if (ref && !isRecycling) {
        unmountRef(ref);
    }
    var children = vNode.children;
    if (!inferno_shared_1.isNullOrUndef(children)) {
        unmountChildren(children, lifecycle, isRecycling);
    }
    if (!inferno_shared_1.isNull(props)) {
        for (var name_1 in props) {
            // do not add a hasOwnProperty check here, it affects performance
            if (props[name_1] !== null && patching_1.isAttrAnEvent(name_1)) {
                patching_1.patchEvent(name_1, props[name_1], null, dom);
                // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                props[name_1] = null;
            }
        }
    }
    if (parentDom) {
        utils_1.removeChild(parentDom, dom);
    }
    if (options_1.default.recyclingEnabled && (parentDom || canRecycle)) {
        recycling_1.poolElement(vNode);
    }
}
exports.unmountElement = unmountElement;
function unmountChildren(children, lifecycle, isRecycling) {
    if (inferno_shared_1.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!inferno_shared_1.isInvalid(child) && inferno_shared_1.isObject(child)) {
                unmount(child, null, lifecycle, false, isRecycling);
            }
        }
    }
    else if (inferno_shared_1.isObject(children)) {
        unmount(children, null, lifecycle, false, isRecycling);
    }
}
function unmountRef(ref) {
    if (inferno_shared_1.isFunction(ref)) {
        ref(null);
    }
    else {
        if (inferno_shared_1.isInvalid(ref)) {
            return;
        }
        if (true) {
            inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        inferno_shared_1.throwError();
    }
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InputWrapper_1 = __webpack_require__(190);
var SelectWrapper_1 = __webpack_require__(191);
var TextareaWrapper_1 = __webpack_require__(192);
var inferno_shared_1 = __webpack_require__(1);
/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */
function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if (flags & 512 /* InputElement */) {
        InputWrapper_1.processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    if (flags & 2048 /* SelectElement */) {
        SelectWrapper_1.processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    if (flags & 1024 /* TextareaElement */) {
        TextareaWrapper_1.processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
}
exports.processElement = processElement;
function isControlledFormElement(nextPropsOrEmpty) {
    return (nextPropsOrEmpty.type && InputWrapper_1.isCheckedType(nextPropsOrEmpty.type)) ? !inferno_shared_1.isNullOrUndef(nextPropsOrEmpty.checked) : !inferno_shared_1.isNullOrUndef(nextPropsOrEmpty.value);
}
exports.isControlledFormElement = isControlledFormElement;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/** @module AddressSearchService */

/**
 * Search for address/location coordinates
 * @async
 * @param {string} searchTerm
 * @param {number} maxResults
 * @returns {Object[]} An array of objects containing latitude, longitude and label
 */
let searchAddress = exports.searchAddress = (() => {
    var _ref = _asyncToGenerator(function* (searchTerm, maxResults = 1) {
        const encoded = encodeURIComponent(searchTerm);
        const url = `https://api.digitransit.fi/geocoding/v1/search?text=${encoded}&size=${maxResults}&lang=fi&boundary.rect.min_lat=59.9&boundary.rect.max_lat=60.45&boundary.rect.min_lon=24.3&boundary.rect.max_lon=25.5`;
        const response = yield fetch(url);

        if (!response.ok) throw new Error('Service responded with no ok');

        const data = yield response.json();

        // throw an error if no results are found
        if (!data || !data.features.length) throw new Error(`Osoitetta tai paikkaa ei löytynyt hakusanalla ${searchTerm}`);

        return data.features.map(function (feature) {
            const { geometry, properties } = feature;
            const [longitude, latitude] = geometry.coordinates;
            return Object.assign({}, properties, { location: { latitude, longitude } });
        });
    });

    return function searchAddress(_x) {
        return _ref.apply(this, arguments);
    };
})();

/**
 * Search address for given coordinates
 * @async
 * @param {Object} location
 * @param {number} location.latitude
 * @param {number} location.longitude
 * @returns {string} address
 */


let lookupAddress = exports.lookupAddress = (() => {
    var _ref2 = _asyncToGenerator(function* ({ latitude, longitude }) {
        const queryParams = `point.lat=${encodeURIComponent(latitude)}&point.lon=${encodeURIComponent(longitude)}&size=1`;
        const response = yield fetch(`https://api.digitransit.fi/geocoding/v1/reverse?${queryParams}`);

        if (!response.ok) throw new Error('Osoitepalvelu palautti virheen');

        const data = yield response.json();
        if (!data || !data.features.length) throw new Error('Osoitetta tai paikkaa ei löytynyt');

        if (data && data.features.length) {
            const { properties } = data.features[0];
            return properties.label;
        }

        return null;
    });

    return function lookupAddress(_x2) {
        return _ref2.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var patching_1 = __webpack_require__(6);
var componentPools = new Map();
var elementPools = new Map();
function recycleElement(vNode, lifecycle, context, isSVG) {
    var tag = vNode.type;
    var pools = elementPools.get(tag);
    if (!inferno_shared_1.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!inferno_shared_1.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!inferno_shared_1.isUndefined(recycledVNode)) {
                patching_1.patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                return vNode.dom;
            }
        }
    }
    return null;
}
exports.recycleElement = recycleElement;
function poolElement(vNode) {
    var tag = vNode.type;
    var key = vNode.key;
    var pools = elementPools.get(tag);
    if (inferno_shared_1.isUndefined(pools)) {
        pools = {
            nonKeyed: [],
            keyed: new Map()
        };
        elementPools.set(tag, pools);
    }
    if (inferno_shared_1.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (inferno_shared_1.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolElement = poolElement;
function recycleComponent(vNode, lifecycle, context, isSVG) {
    var type = vNode.type;
    var pools = componentPools.get(type);
    if (!inferno_shared_1.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!inferno_shared_1.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!inferno_shared_1.isUndefined(recycledVNode)) {
                var flags = vNode.flags;
                var failed = patching_1.patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
                if (!failed) {
                    return vNode.dom;
                }
            }
        }
    }
    return null;
}
exports.recycleComponent = recycleComponent;
function poolComponent(vNode) {
    var hooks = vNode.ref;
    var nonRecycleHooks = hooks && (hooks.onComponentWillMount ||
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
    if (inferno_shared_1.isUndefined(pools)) {
        pools = {
            nonKeyed: [],
            keyed: new Map()
        };
        componentPools.set(type, pools);
    }
    if (inferno_shared_1.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (inferno_shared_1.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolComponent = poolComponent;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var VNodes_1 = __webpack_require__(5);
function applyKey(key, vNode) {
    vNode.key = key;
    return vNode;
}
function applyKeyIfMissing(key, vNode) {
    if (inferno_shared_1.isNumber(key)) {
        key = "." + key;
    }
    if (inferno_shared_1.isNull(vNode.key) || vNode.key[0] === '.') {
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
        if (!inferno_shared_1.isInvalid(n)) {
            if (inferno_shared_1.isArray(n)) {
                _normalizeVNodes(n, result, 0, key);
            }
            else {
                if (inferno_shared_1.isStringOrNumber(n)) {
                    n = VNodes_1.createTextVNode(n, null);
                }
                else if (VNodes_1.isVNode(n) && n.dom || (n.key && n.key[0] === '.')) {
                    n = VNodes_1.directClone(n);
                }
                if (inferno_shared_1.isNull(n.key) || n.key[0] === '.') {
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
    if (nodes['$']) {
        nodes = nodes.slice();
    }
    else {
        nodes['$'] = true;
    }
    // tslint:enable
    for (var i = 0, len = nodes.length; i < len; i++) {
        var n = nodes[i];
        if (inferno_shared_1.isInvalid(n) || inferno_shared_1.isArray(n)) {
            var result = (newNodes || nodes).slice(0, i);
            _normalizeVNodes(nodes, result, i, "");
            return result;
        }
        else if (inferno_shared_1.isStringOrNumber(n)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes_1.createTextVNode(n, null)));
        }
        else if ((VNodes_1.isVNode(n) && n.dom) || (inferno_shared_1.isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */))) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes_1.directClone(n)));
        }
        else if (newNodes) {
            newNodes.push(applyKeyIfMissing(i, VNodes_1.directClone(n)));
        }
    }
    return newNodes || nodes;
}
exports.normalizeVNodes = normalizeVNodes;
function normalizeChildren(children) {
    if (inferno_shared_1.isArray(children)) {
        return normalizeVNodes(children);
    }
    else if (VNodes_1.isVNode(children) && children.dom) {
        return VNodes_1.directClone(children);
    }
    return children;
}
function normalizeProps(vNode, props, children) {
    if (!(vNode.flags & 28 /* Component */)) {
        if (inferno_shared_1.isNullOrUndef(children) && !inferno_shared_1.isNullOrUndef(props.children)) {
            vNode.children = props.children;
        }
        if (props.className) {
            vNode.className = props.className;
            delete props.className;
        }
    }
    if (props.ref) {
        vNode.ref = props.ref;
        delete props.ref;
    }
    if (!inferno_shared_1.isNullOrUndef(props.key)) {
        vNode.key = props.key;
        delete props.key;
    }
}
function normalizeElement(type, vNode) {
    if (type === 'svg') {
        vNode.flags = 128 /* SvgElement */;
    }
    else if (type === 'input') {
        vNode.flags = 512 /* InputElement */;
    }
    else if (type === 'select') {
        vNode.flags = 2048 /* SelectElement */;
    }
    else if (type === 'textarea') {
        vNode.flags = 1024 /* TextareaElement */;
    }
    else if (type === 'media') {
        vNode.flags = 256 /* MediaElement */;
    }
    else {
        vNode.flags = 2 /* HtmlElement */;
    }
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
        if (!inferno_shared_1.isNullOrUndef(defaultProps)) {
            if (!props) {
                props = vNode.props = defaultProps; // Create new object if only defaultProps given
            }
            else {
                for (var prop in defaultProps) {
                    if (inferno_shared_1.isUndefined(props[prop])) {
                        props[prop] = defaultProps[prop];
                    }
                }
            }
        }
        if (inferno_shared_1.isString(type)) {
            normalizeElement(type, vNode);
            if (props && props.children) {
                vNode.children = props.children;
                children = props.children;
            }
        }
    }
    if (props) {
        normalizeProps(vNode, props, children);
    }
    if (!inferno_shared_1.isInvalid(children)) {
        vNode.children = normalizeChildren(children);
    }
    if (props && !inferno_shared_1.isInvalid(props.children)) {
        props.children = normalizeChildren(props.children);
    }
    if (true) {
        // This code will be stripped out from production CODE
        // It will help users to track errors in their applications.
        var verifyKeys = function (vNodes) {
            var keyValues = vNodes.map(function (vnode) {
                return vnode.key;
            });
            keyValues.some(function (item, idx) {
                var hasDuplicate = keyValues.indexOf(item) !== idx;
                if (hasDuplicate) {
                    inferno_shared_1.warning('Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:' + item);
                }
                return hasDuplicate;
            });
        };
        if (vNode.children && Array.isArray(vNode.children)) {
            verifyKeys(vNode.children);
        }
    }
}
exports.normalize = normalize;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(20);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(195);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var asap = __webpack_require__(145);

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
    throw new TypeError('not a function');
  }
  this._45 = 0;
  this._81 = 0;
  this._65 = null;
  this._54 = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._10 = null;
Promise._97 = null;
Promise._61 = noop;

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
};
function handle(self, deferred) {
  while (self._81 === 3) {
    self = self._65;
  }
  if (Promise._10) {
    Promise._10(self);
  }
  if (self._81 === 0) {
    if (self._45 === 0) {
      self._45 = 1;
      self._54 = deferred;
      return;
    }
    if (self._45 === 1) {
      self._45 = 2;
      self._54 = [self._54, deferred];
      return;
    }
    self._54.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._81 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._81 === 1) {
        resolve(deferred.promise, self._65);
      } else {
        reject(deferred.promise, self._65);
      }
      return;
    }
    var ret = tryCallOne(cb, self._65);
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
      self._81 = 3;
      self._65 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._81 = 1;
  self._65 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._81 = 2;
  self._65 = newValue;
  if (Promise._97) {
    Promise._97(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._45 === 1) {
    handle(self, self._54);
    self._54 = null;
  }
  if (self._45 === 2) {
    for (var i = 0; i < self._54.length; i++) {
      handle(self, self._54[i]);
    }
    self._54 = null;
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
  })
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}


/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where Inferno gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes Inferno's erratic future behavior.
  __webpack_require__(205).enable();
  window.Promise = __webpack_require__(204);
}

// fetch() polyfill for making API calls.
__webpack_require__(206);

// Object.assign() is commonly used with Inferno.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = __webpack_require__(203);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _inferno = __webpack_require__(0);

var _app = __webpack_require__(146);

var _app2 = _interopRequireDefault(_app);

__webpack_require__(182);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// use offline-plugin when in production
if (false) {
    require('offline-plugin/runtime').install();
}

(0, _inferno.render)((0, _inferno.createVNode)(16, _app2.default), document.getElementById('app'));

/***/ }),
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
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
/* 34 */
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
/* 35 */
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
/* 36 */
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
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
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
/* 46 */
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
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
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
/* 53 */
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
/* 54 */
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
/* 55 */
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
/* 56 */
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
/* 57 */
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
/* 58 */
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
/* 59 */
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
/* 60 */
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
/* 61 */
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
/* 62 */
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
/* 63 */
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
/* 64 */
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
/* 65 */
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
/* 66 */
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
/* 67 */
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
/* 68 */
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _always = __webpack_require__(26);

var _always2 = _interopRequireDefault(_always);

var _and = __webpack_require__(27);

var _and2 = _interopRequireDefault(_and);

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _average = __webpack_require__(29);

var _average2 = _interopRequireDefault(_average);

var _between = __webpack_require__(30);

var _between2 = _interopRequireDefault(_between);

var _bind = __webpack_require__(31);

var _bind2 = _interopRequireDefault(_bind);

var _bitAnd = __webpack_require__(32);

var _bitAnd2 = _interopRequireDefault(_bitAnd);

var _bitOr = __webpack_require__(33);

var _bitOr2 = _interopRequireDefault(_bitOr);

var _butLast = __webpack_require__(34);

var _butLast2 = _interopRequireDefault(_butLast);

var _by = __webpack_require__(35);

var _by2 = _interopRequireDefault(_by);

var _charAt = __webpack_require__(36);

var _charAt2 = _interopRequireDefault(_charAt);

var _charCodeAt = __webpack_require__(37);

var _charCodeAt2 = _interopRequireDefault(_charCodeAt);

var _codePointAt = __webpack_require__(38);

var _codePointAt2 = _interopRequireDefault(_codePointAt);

var _compose = __webpack_require__(39);

var _compose2 = _interopRequireDefault(_compose);

var _composeAll = __webpack_require__(40);

var _composeAll2 = _interopRequireDefault(_composeAll);

var _concat = __webpack_require__(41);

var _concat2 = _interopRequireDefault(_concat);

var _converge = __webpack_require__(42);

var _converge2 = _interopRequireDefault(_converge);

var _curry = __webpack_require__(43);

var _curry2 = _interopRequireDefault(_curry);

var _curryRight = __webpack_require__(44);

var _curryRight2 = _interopRequireDefault(_curryRight);

var _dec = __webpack_require__(45);

var _dec2 = _interopRequireDefault(_dec);

var _drop = __webpack_require__(46);

var _drop2 = _interopRequireDefault(_drop);

var _endsWith = __webpack_require__(47);

var _endsWith2 = _interopRequireDefault(_endsWith);

var _endsWithAt = __webpack_require__(48);

var _endsWithAt2 = _interopRequireDefault(_endsWithAt);

var _equal = __webpack_require__(49);

var _equal2 = _interopRequireDefault(_equal);

var _every = __webpack_require__(50);

var _every2 = _interopRequireDefault(_every);

var _exec = __webpack_require__(51);

var _exec2 = _interopRequireDefault(_exec);

var _explode = __webpack_require__(52);

var _explode2 = _interopRequireDefault(_explode);

var _filter = __webpack_require__(53);

var _filter2 = _interopRequireDefault(_filter);

var _flatMap = __webpack_require__(54);

var _flatMap2 = _interopRequireDefault(_flatMap);

var _flip = __webpack_require__(55);

var _flip2 = _interopRequireDefault(_flip);

var _fold = __webpack_require__(56);

var _fold2 = _interopRequireDefault(_fold);

var _foldRight = __webpack_require__(57);

var _foldRight2 = _interopRequireDefault(_foldRight);

var _forEach = __webpack_require__(58);

var _forEach2 = _interopRequireDefault(_forEach);

var _greaterOrEqual = __webpack_require__(59);

var _greaterOrEqual2 = _interopRequireDefault(_greaterOrEqual);

var _greaterThan = __webpack_require__(60);

var _greaterThan2 = _interopRequireDefault(_greaterThan);

var _hasOwnProperty = __webpack_require__(61);

var _hasOwnProperty2 = _interopRequireDefault(_hasOwnProperty);

var _head = __webpack_require__(62);

var _head2 = _interopRequireDefault(_head);

var _identity = __webpack_require__(63);

var _identity2 = _interopRequireDefault(_identity);

var _ifThen = __webpack_require__(64);

var _ifThen2 = _interopRequireDefault(_ifThen);

var _ifThenElse = __webpack_require__(65);

var _ifThenElse2 = _interopRequireDefault(_ifThenElse);

var _implode = __webpack_require__(66);

var _implode2 = _interopRequireDefault(_implode);

var _inc = __webpack_require__(67);

var _inc2 = _interopRequireDefault(_inc);

var _includes = __webpack_require__(68);

var _includes2 = _interopRequireDefault(_includes);

var _indexOf = __webpack_require__(70);

var _indexOf2 = _interopRequireDefault(_indexOf);

var _isBetween = __webpack_require__(71);

var _isBetween2 = _interopRequireDefault(_isBetween);

var _isBoolean = __webpack_require__(72);

var _isBoolean2 = _interopRequireDefault(_isBoolean);

var _isFalse = __webpack_require__(73);

var _isFalse2 = _interopRequireDefault(_isFalse);

var _isFalsy = __webpack_require__(74);

var _isFalsy2 = _interopRequireDefault(_isFalsy);

var _isFunction = __webpack_require__(75);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isNull = __webpack_require__(76);

var _isNull2 = _interopRequireDefault(_isNull);

var _isNumber = __webpack_require__(77);

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isObject = __webpack_require__(78);

var _isObject2 = _interopRequireDefault(_isObject);

var _isPlainObject = __webpack_require__(79);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isString = __webpack_require__(80);

var _isString2 = _interopRequireDefault(_isString);

var _isTrue = __webpack_require__(81);

var _isTrue2 = _interopRequireDefault(_isTrue);

var _isTruthy = __webpack_require__(82);

var _isTruthy2 = _interopRequireDefault(_isTruthy);

var _isTypeOf = __webpack_require__(83);

var _isTypeOf2 = _interopRequireDefault(_isTypeOf);

var _isUndefined = __webpack_require__(84);

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isUnknown = __webpack_require__(85);

var _isUnknown2 = _interopRequireDefault(_isUnknown);

var _join = __webpack_require__(86);

var _join2 = _interopRequireDefault(_join);

var _keys = __webpack_require__(87);

var _keys2 = _interopRequireDefault(_keys);

var _last = __webpack_require__(88);

var _last2 = _interopRequireDefault(_last);

var _lastIndexOf = __webpack_require__(89);

var _lastIndexOf2 = _interopRequireDefault(_lastIndexOf);

var _length = __webpack_require__(90);

var _length2 = _interopRequireDefault(_length);

var _lessOrEqual = __webpack_require__(91);

var _lessOrEqual2 = _interopRequireDefault(_lessOrEqual);

var _lessThan = __webpack_require__(92);

var _lessThan2 = _interopRequireDefault(_lessThan);

var _localeCompare = __webpack_require__(93);

var _localeCompare2 = _interopRequireDefault(_localeCompare);

var _looseEqual = __webpack_require__(94);

var _looseEqual2 = _interopRequireDefault(_looseEqual);

var _map = __webpack_require__(95);

var _map2 = _interopRequireDefault(_map);

var _match = __webpack_require__(96);

var _match2 = _interopRequireDefault(_match);

var _max = __webpack_require__(97);

var _max2 = _interopRequireDefault(_max);

var _method = __webpack_require__(98);

var _method2 = _interopRequireDefault(_method);

var _min = __webpack_require__(99);

var _min2 = _interopRequireDefault(_min);

var _minus = __webpack_require__(100);

var _minus2 = _interopRequireDefault(_minus);

var _nand = __webpack_require__(101);

var _nand2 = _interopRequireDefault(_nand);

var _noop = __webpack_require__(102);

var _noop2 = _interopRequireDefault(_noop);

var _nor = __webpack_require__(103);

var _nor2 = _interopRequireDefault(_nor);

var _normalize = __webpack_require__(104);

var _normalize2 = _interopRequireDefault(_normalize);

var _not = __webpack_require__(105);

var _not2 = _interopRequireDefault(_not);

var _nth = __webpack_require__(106);

var _nth2 = _interopRequireDefault(_nth);

var _omit = __webpack_require__(107);

var _omit2 = _interopRequireDefault(_omit);

var _or = __webpack_require__(108);

var _or2 = _interopRequireDefault(_or);

var _pick = __webpack_require__(109);

var _pick2 = _interopRequireDefault(_pick);

var _pipe = __webpack_require__(110);

var _pipe2 = _interopRequireDefault(_pipe);

var _pipeAll = __webpack_require__(111);

var _pipeAll2 = _interopRequireDefault(_pipeAll);

var _plus = __webpack_require__(112);

var _plus2 = _interopRequireDefault(_plus);

var _product = __webpack_require__(113);

var _product2 = _interopRequireDefault(_product);

var _property = __webpack_require__(114);

var _property2 = _interopRequireDefault(_property);

var _push = __webpack_require__(115);

var _push2 = _interopRequireDefault(_push);

var _put = __webpack_require__(116);

var _put2 = _interopRequireDefault(_put);

var _reduce = __webpack_require__(117);

var _reduce2 = _interopRequireDefault(_reduce);

var _reduceRight = __webpack_require__(118);

var _reduceRight2 = _interopRequireDefault(_reduceRight);

var _repeat = __webpack_require__(119);

var _repeat2 = _interopRequireDefault(_repeat);

var _replace = __webpack_require__(120);

var _replace2 = _interopRequireDefault(_replace);

var _search = __webpack_require__(121);

var _search2 = _interopRequireDefault(_search);

var _shallowClone = __webpack_require__(122);

var _shallowClone2 = _interopRequireDefault(_shallowClone);

var _shave = __webpack_require__(123);

var _shave2 = _interopRequireDefault(_shave);

var _signum = __webpack_require__(124);

var _signum2 = _interopRequireDefault(_signum);

var _slice = __webpack_require__(125);

var _slice2 = _interopRequireDefault(_slice);

var _some = __webpack_require__(126);

var _some2 = _interopRequireDefault(_some);

var _split = __webpack_require__(127);

var _split2 = _interopRequireDefault(_split);

var _startsWith = __webpack_require__(128);

var _startsWith2 = _interopRequireDefault(_startsWith);

var _startsWithAt = __webpack_require__(129);

var _startsWithAt2 = _interopRequireDefault(_startsWithAt);

var _sum = __webpack_require__(130);

var _sum2 = _interopRequireDefault(_sum);

var _tail = __webpack_require__(131);

var _tail2 = _interopRequireDefault(_tail);

var _take = __webpack_require__(132);

var _take2 = _interopRequireDefault(_take);

var _takeUntil = __webpack_require__(133);

var _takeUntil2 = _interopRequireDefault(_takeUntil);

var _takeWhile = __webpack_require__(134);

var _takeWhile2 = _interopRequireDefault(_takeWhile);

var _test = __webpack_require__(135);

var _test2 = _interopRequireDefault(_test);

var _times = __webpack_require__(136);

var _times2 = _interopRequireDefault(_times);

var _toLowerCase = __webpack_require__(137);

var _toLowerCase2 = _interopRequireDefault(_toLowerCase);

var _toUpperCase = __webpack_require__(138);

var _toUpperCase2 = _interopRequireDefault(_toUpperCase);

var _trim = __webpack_require__(139);

var _trim2 = _interopRequireDefault(_trim);

var _uncurry = __webpack_require__(140);

var _uncurry2 = _interopRequireDefault(_uncurry);

var _uncurry3 = __webpack_require__(141);

var _uncurry32 = _interopRequireDefault(_uncurry3);

var _unfold = __webpack_require__(142);

var _unfold2 = _interopRequireDefault(_unfold);

var _values = __webpack_require__(143);

var _values2 = _interopRequireDefault(_values);

var _xor = __webpack_require__(144);

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
/* 70 */
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
/* 71 */
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
/* 72 */
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
/* 73 */
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
/* 74 */
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
/* 75 */
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
/* 76 */
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
/* 77 */
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
/* 78 */
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
/* 79 */
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
/* 80 */
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
/* 81 */
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
/* 82 */
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
/* 83 */
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
/* 84 */
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
/* 85 */
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
/* 86 */
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
/* 87 */
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
/* 88 */
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
/* 89 */
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
/* 90 */
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
/* 91 */
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
/* 92 */
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
/* 93 */
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
/* 94 */
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
/* 95 */
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
/* 96 */
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
/* 97 */
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
/* 98 */
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
/* 99 */
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
/* 100 */
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
/* 101 */
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
/* 102 */
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
/* 103 */
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
/* 104 */
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
/* 105 */
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
/* 106 */
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
/* 107 */
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
/* 108 */
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
/* 109 */
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
/* 110 */
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
/* 111 */
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
/* 112 */
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
/* 113 */
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
/* 114 */
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
/* 115 */
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
/* 116 */
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
/* 117 */
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
/* 118 */
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
/* 119 */
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
/* 120 */
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
/* 121 */
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
/* 122 */
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
/* 123 */
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
/* 124 */
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
/* 125 */
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
/* 126 */
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
/* 127 */
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
/* 128 */
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
/* 129 */
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
/* 130 */
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
/* 131 */
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
/* 132 */
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
/* 133 */
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
/* 134 */
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
/* 135 */
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
/* 136 */
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
/* 137 */
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
/* 138 */
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
/* 139 */
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
/* 140 */
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
/* 141 */
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
/* 142 */
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
/* 143 */
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
/* 144 */
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
/* 145 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _infernoComponent = __webpack_require__(13);

var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

var _fputils = __webpack_require__(9);

var _fputils2 = _interopRequireDefault(_fputils);

var _utils = __webpack_require__(4);

var _header = __webpack_require__(162);

var _header2 = _interopRequireDefault(_header);

var _footer = __webpack_require__(161);

var _footer2 = _interopRequireDefault(_footer);

var _departureslist = __webpack_require__(155);

var _departureslist2 = _interopRequireDefault(_departureslist);

var _departurefilter = __webpack_require__(151);

var _departurefilter2 = _interopRequireDefault(_departurefilter);

var _errormessage = __webpack_require__(160);

var _errormessage2 = _interopRequireDefault(_errormessage);

var _addresssearch = __webpack_require__(147);

var _addresssearch2 = _interopRequireDefault(_addresssearch);

var _departurefetchmerge = __webpack_require__(168);

var _locationservice = __webpack_require__(165);

var _addresssearchservice = __webpack_require__(16);

var _formaterror = __webpack_require__(170);

var _formaterror2 = _interopRequireDefault(_formaterror);

var _constants = __webpack_require__(8);

var _accuracyindicator = __webpack_require__(150);

var _accuracyindicator2 = _interopRequireDefault(_accuracyindicator);

__webpack_require__(172);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * All possible filters
 */
const allVehicleTypes = _fputils2.default.values(_constants.VEHICLE_TYPE);

/**
 * Default app state
 * @type {Object}
 */
const DEFAULT_STATE = {
  loading: true,
  addressSearchTerm: '',
  error: null,
  filters: {
    range: _constants.DEFAULT_RANGE,
    vehicleTypes: allVehicleTypes
  }
};

/**
 * Function for filtering departures by type
 * @param {string[]} filters
 * @return {Function}
 */
const filterDepartures = filters => _fputils2.default.filter(d => {
  return filters.vehicleTypes.indexOf(d.vehicleType) > -1 && d.distance < filters.range && d.realtimeDeparture >= (0, _utils.getNowInSeconds)();
});

/**
 * @class App
 * @extends {Inferno.Component}
 */
class App extends _infernoComponent2.default {
  /**
   * Creates an instance of App.
   * @constructs App
   */
  constructor() {
    super();
    this.state = Object.assign({}, DEFAULT_STATE);
  }

  /**
   * Find location and fetch departures when component has mounted
   */
  componentDidMount() {
    this.findDeparturesByCurrentLocation();
    // batch departures in every x seconds
    setInterval(() => this.batchDeparturesToState(), _constants.BATCH_INTERVAL);
  }

  /**
   * Find location and then departures by location found
   */
  findDeparturesByCurrentLocation() {
    // find location
    (0, _locationservice.findGPSLocation)().then(location => {
      // do a reverse geocoding
      (0, _addresssearchservice.lookupAddress)(location).then(address => {
        this.setState({ location, addressSearchTerm: address });
        // and finally fetch all departures
        this.fetchDeparturesToState(location);
      }).catch(err => {
        this.onError(`Osoitteen haku epäonnistui: ${err.message}!`);
      });
    }).catch(err => this.onError((0, _formaterror2.default)(_formaterror.POSITION_ERROR, err)));
  }

  /**
   * Fetch departures and add them to state. Apply filters and also set filtered result to state.
   * @param {Object} location
   * @param {number} location.latitude
   * @param {number} location.longitude
   */
  fetchDeparturesToState(location) {
    const { filters } = this.state;

    (0, _departurefetchmerge.fetchDepartures)(location, filters.vehicleTypes).then(this.afterDeparturesFetched.bind(this)).catch(err => {
      console.error(err);
      this.onError(`Lähtöjen haku epäonnistui: ${err.message}!`);
    });
  }

  /**
   * Batch departures and add them to state. Apply filters and also set filtered result to state.
   */
  batchDeparturesToState() {
    (0, _departurefetchmerge.batchDepartures)(this.state.departures).then(this.afterDeparturesFetched.bind(this)).catch(err => console.error(err));
  }

  /**
   * Set state after departures has been fetched/batched
   * @param {Object[]} departures
   */
  afterDeparturesFetched(departures) {
    this.setState({
      loading: false,
      departures: departures,
      filtered: filterDepartures(this.state.filters)(departures),
      departureUpdateTime: new Date()
    });
  }

  /**
   * Callback for filter button. Toggles filter state.
   * @param {string} type
   * @param {boolean} multiselect
   */
  onFilterToggle(type, multiselect) {
    const { filters } = this.state;
    const { vehicleTypes: current } = filters;
    const currentToggled = current.indexOf(type) > -1;

    const activeFilters = _fputils2.default.ifThenElse(() => !!multiselect,
    // if pressed with ctrl key
    _fputils2.default.ifThenElse(() => currentToggled,
    // remove filter from actives
    _fputils2.default.filter(f => f !== type),
    // add filter to actives
    _fputils2.default.concat(type)),
    // if pressed without ctrl key
    _fputils2.default.ifThenElse(() => current.length > 1 || !currentToggled,
    // if filter is not toggled then select only that
    () => [type],
    // else select all filters
    () => allVehicleTypes.slice(0)))(current);

    // update filter props on state and then filter departures
    this.setState({ filters: Object.assign({}, filters, { vehicleTypes: activeFilters }) }, this.filterDeparturesToState.bind(this));
  }

  /**
   * Callback for range filter change
   * @param {number} range
   */
  onRangeChange(range) {
    this.setState({ filters: Object.assign({}, this.state.filters, { range }) }, this.filterDeparturesToState.bind(this));
  }

  /**
   * Filter departures based on filters set on state
   */
  filterDeparturesToState() {
    const { departures, filters } = this.state;
    const filtered = filterDepartures(filters)(departures);
    // filter departures and then sort
    this.setState({ filtered });
  }

  /**
   * Search coordinates for given address/poi/etc.
   * @param {string} [address]
   */
  searchForAddress({ searchTerm = '', location }) {
    this.setState({ location: undefined, loading: true, addressSearchTerm: searchTerm });

    // stop location search if still running
    (0, _locationservice.stopLocating)();

    _fputils2.default.ifThenElse(_fputils2.default.isTruthy,
    // if location is given then search departures by location
    this.fetchDeparturesToState.bind(this), _fputils2.default.ifThenElse(() => searchTerm && searchTerm.toLocaleLowerCase() !== _constants.LOCATION_MAGIC_WORD,
    // search address by search term
    () => {
      (0, _addresssearchservice.searchAddress)(searchTerm).then(result => {
        const { location, label } = result[0];
        this.setState({ addressSearchTerm: label, location: location });
        this.fetchDeparturesToState(location);
      }).catch(err => this.onError(`Osoitteen haku epäonnistui: ${err.message}!`));
    },
    // if location and search term is empty then search by client location
    this.findDeparturesByCurrentLocation.bind(this)))(location);
  }

  clearAddressSearchTerm() {
    this.setState({ addressSearchTerm: '' });
  }

  /**
   * Adds error to the state and clears departures
   * @param {string} error Error message
   */
  onError(error) {
    this.setState({
      error,
      loading: false,
      departures: [],
      filtered: []
    });
  }

  /**
   * Hides the error message
   * @param {string} error Error message
   */
  hideError() {
    this.setState({ error: null });
  }

  /**
   * Renders App
   * @returns {string} markup
   */
  render() {
    const { filtered, filters, error, location, addressSearchTerm, loading, departureUpdateTime } = this.state;

    return (0, _inferno.createVNode)(2, 'div', 'app-content', [(0, _inferno.createVNode)(16, _header2.default), (0, _inferno.createVNode)(2, 'main', null, [(0, _inferno.createVNode)(16, _errormessage2.default, null, null, {
      'message': error,
      'onClick': this.hideError.bind(this)
    }), (0, _inferno.createVNode)(16, _addresssearch2.default, null, null, {
      'address': addressSearchTerm,
      'onSearch': this.searchForAddress.bind(this),
      'clearAddressSearchTerm': this.clearAddressSearchTerm.bind(this)
    }), location && (0, _inferno.createVNode)(16, _accuracyindicator2.default, null, null, {
      'accuracy': location.accuracy
    }), (0, _inferno.createVNode)(16, _departurefilter2.default, null, null, {
      'filters': allVehicleTypes,
      'activeFilters': filters.vehicleTypes,
      'range': filters.range,
      'onFilterToggle': this.onFilterToggle.bind(this),
      'onRangeChange': this.onRangeChange.bind(this)
    }), (0, _inferno.createVNode)(16, _departureslist2.default, null, null, {
      'isLoading': loading,
      'departures': filtered
    })]), (0, _inferno.createVNode)(16, _footer2.default, null, null, {
      'departureUpdateTime': departureUpdateTime
    })]);
  }
}

exports.default = App;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debounce = __webpack_require__(198);

var _debounce2 = _interopRequireDefault(_debounce);

var _infernoComponent = __webpack_require__(13);

var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

var _suggestionslist = __webpack_require__(148);

var _suggestionslist2 = _interopRequireDefault(_suggestionslist);

var _addresssearchservice = __webpack_require__(16);

var _constants = __webpack_require__(8);

__webpack_require__(173);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AddressSearch component for address input.
 * @class AddressSearch
 * @extends {Component}
 */
class AddressSearch extends _infernoComponent2.default {
  /**
   * Creates an instance of AddressSearch.
   * @param {Object} props
   * @param {string} address
   */
  constructor(props) {
    super(props);
    this.state = { searchTerm: props.address, suggestions: [] };
    this.debouncedFetchSuggestions = (0, _debounce2.default)(this.fetchSuggestions, 300);
  }

  /**
   * Address changes when location search succeeds
   * @param {Object} newProps
   * @param {string} newProps.address
   */
  componentWillReceiveProps(newProps) {
    // only update when address actually changes so
    // it won't override text written to the input
    if (newProps.address !== this.props.address) {
      this.setState({
        searchTerm: newProps.address,
        selectedSuggestion: undefined
      });

      if (!newProps.address) {
        this.addressInput.focus();
      }
    }
  }

  /**
   * Does submit action (calls given callback) and
   * does suggestions clean up
   */
  doSubmitAction() {
    const { searchTerm, selectedSuggestion } = this.state;

    this.hideSuggestions();

    // if a suggestion is selected then use that
    // as search term otherwise find address based on search term
    const param = selectedSuggestion ? {
      location: selectedSuggestion.location,
      searchTerm: selectedSuggestion.label
    } : { searchTerm };

    this.props.onSearch(param);
  }

  /**
   * Set suggestion selected
   * @param {Object} suggestion
   */
  selectSuggestion(suggestion) {
    this.setState({ selectedSuggestion: suggestion, searchTerm: suggestion.label });
  }

  /**
   * Select next suggestion. Callback for down arrow button.
   */
  selectNextSuggestion() {
    const { suggestions, selectedSuggestion } = this.state;
    const currentIndex = suggestions.indexOf(selectedSuggestion);
    const nextIndex = currentIndex + 1 >= suggestions.length ? 0 : currentIndex + 1;
    this.selectSuggestion(suggestions[nextIndex]);
  }

  /**
   * Select previous suggestion. Callback for up arrow button.
   */
  selectPrevSuggestion() {
    const { suggestions, selectedSuggestion } = this.state;
    const currentIndex = suggestions.indexOf(selectedSuggestion);
    const prevIndex = [-1, 0].indexOf(currentIndex) > -1 ? suggestions.length - 1 : currentIndex - 1;
    this.selectSuggestion(suggestions[prevIndex]);
  }

  /**
   * Fetch suggestions from api
   * @param {string} searchTerm
   */
  fetchSuggestions(searchTerm) {
    (0, _addresssearchservice.searchAddress)(searchTerm, _constants.MAX_ADDRESS_SUGGESTIONS).then(result => result.sort((a, b) => b.confidence - a.confidence)).then(sorted => this.setState({ suggestions: sorted })).catch(e => console.log(e));
  }

  /**
   * Hide suggestions list and clear selected suggestion from state
   */
  hideSuggestions() {
    this.setState({ suggestions: [] });
  }

  /**
  * Callback for submit event
  */
  onSubmit(e) {
    e.preventDefault();
    this.doSubmitAction();
  }

  onClearClick(e) {
    e.preventDefault();
    this.props.clearAddressSearchTerm();
  }

  /**
   * Callback for text input's input event
   * @param {Event} e
   */
  onSearchTermChange(e) {
    const term = e.target.value;

    this.setState({ searchTerm: term, selectedSuggestion: undefined });

    if (!term.length) {
      this.hideSuggestions();
      return;
    }

    this.debouncedFetchSuggestions(term);
  }

  /**
   * Callback for suggestion list item's click. Set clicked
   * suggestion selected and submit form
   * @param {Object} suggestion
   */
  onSuggestionClick(suggestion) {
    this.selectSuggestion(suggestion);
    this.doSubmitAction();
  }

  /**
   * Callback for form's key event
   * @param {Event} e
   */
  onKeyEvent(e) {
    const { keyCode } = e;

    switch (keyCode) {
      // if up was pressed
      case 38:
        e.preventDefault();
        this.selectPrevSuggestion();
        break;
      // if down was pressed
      case 40:
        e.preventDefault();
        this.selectNextSuggestion();
        break;
      // if esc was pressed
      case 27:
        e.preventDefault();
        this.hideSuggestions();
        break;
      default:
        break;
    }
  }

  /**
   * Render component
   * @returns {string} markup
   */
  render() {
    const { searchTerm, suggestions, selectedSuggestion } = this.state;

    return (0, _inferno.createVNode)(2, 'form', null, [(0, _inferno.createVNode)(2, 'div', 'address-search', [(0, _inferno.createVNode)(512, 'input', null, null, {
      'type': 'text',
      'aria-autocomplete': 'list',
      'aria-owns': 'suggestions-list',
      'aria-label': 'Osoite/sijainti',
      'placeholder': 'Hae paikannuksella, osoitteella tai paikannimell\xE4...',
      'onInput': this.onSearchTermChange.bind(this),
      'onBlur': this.hideSuggestions.bind(this),
      'value': searchTerm
    }, null, c => this.addressInput = c), (0, _inferno.createVNode)(2, 'button', 'address-search-clear', (0, _inferno.createVNode)(2, 'span', null, 'x'), {
      'type': 'button',
      'onClick': this.onClearClick.bind(this)
    }), (0, _inferno.createVNode)(2, 'button', 'address-search-submit', 'Hae', {
      'type': 'submit'
    })]), (0, _inferno.createVNode)(2, 'div', 'suggestions', (0, _inferno.createVNode)(16, _suggestionslist2.default, null, null, {
      'suggestions': suggestions,
      'selected': selectedSuggestion,
      'onItemClick': this.onSuggestionClick.bind(this)
    }))], {
      'onSubmit': this.onSubmit.bind(this),
      'onKeyUp': this.onKeyEvent.bind(this)
    });
  }
}
exports.default = AddressSearch;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _suggestionslistitem = __webpack_require__(149);

var _suggestionslistitem2 = _interopRequireDefault(_suggestionslistitem);

__webpack_require__(174);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * List of suggestions fetched from api
 * @constructs SuggestionList
 * @param {Object} props
 * @param {Function} props.onItemClick
 * @param {Function} props.onClose
 * @param {Object[]} [props.suggestions=[]]
 * @param {Object} [props.selected={}]
 * @returns {SuggestionList}
 */
exports.default = ({ suggestions = [], selected = {}, onItemClick, onClose }) => (0, _inferno.createVNode)(2, 'ol', null, suggestions.map(suggestion => (0, _inferno.createVNode)(16, _suggestionslistitem2.default, null, null, {
  'suggestion': suggestion,
  'onClick': onItemClick,
  'selected': selected.id === suggestion.id
}, suggestion.id)), {
  'id': 'suggestions-list',
  'role': 'listbox',
  'style': { display: suggestions.length ? 'block' : 'none' }
});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inferno = __webpack_require__(0);

/**
 * A row in suggestions list
 * @constructs SuggestionsListItem
 * @param {Object} props
 * @param {Object} props.suggestion
 * @param {Function} props.onClick
 * @param {boolean} [props.selected=false]
 * @returns {SuggestionsListItem}
 */
exports.default = ({ suggestion, onClick, selected = false }) => (0, _inferno.createVNode)(2, 'li', 'suggestions-list-item' + (selected ? ' selected' : ''), [(0, _inferno.createVNode)(2, 'div', 'suggestion-name', suggestion.label), (0, _inferno.createVNode)(2, 'div', 'suggestion-locality', suggestion.locality), selected], {
  'tabindex': '-1',
  'role': 'option listitem',
  'aria-selected': selected,
  'onMouseDown': () => onClick(suggestion)
});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(175);

var _inferno = __webpack_require__(0);

/**
 * Choose color class based on accuracy
 * @private
 * @param {number} accuracy
 * @return {string} color class
 */
const chooseColorClass = accuracy => {
    if (accuracy > 500) return 'danger';
    if (accuracy > 100) return 'warning';
    return '';
};

/**
 * A component for displaying GPS location accuracy info. Will display
 * an excalamation mark and a color depending on accuracy
 * @param {object} props
 * @param {number} props.accuracy GPS location accuracy in meters
 */
const AccuracyIndicator = ({ accuracy }) => (0, _inferno.createVNode)(2, 'div', `location-accuracy ${chooseColorClass(accuracy)}`, [(0, _inferno.createVNode)(2, 'span', 'location-accuracy-attention', '!'), `Paikannuksen tarkkuus: ${Math.round(+accuracy || 0)}m`]);

exports.default = AccuracyIndicator;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _filterbutton = __webpack_require__(152);

var _filterbutton2 = _interopRequireDefault(_filterbutton);

var _rangefilter = __webpack_require__(153);

var _rangefilter2 = _interopRequireDefault(_rangefilter);

__webpack_require__(176);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Buttons for filtering departureslist
 * @param {Object} props
 * @param {Function} props.onFilterToggle Callback for a button click
 * @param {Function} props.onRangeChange Callback for range filter chang
 * @param {string[]} [props.filters=[]]
 * @param {string[]} [props.activeFilters=[]]
 * @param {number} [props.range=0]
 */
exports.default = ({
    filters = [],
    activeFilters = [],
    range = 0,
    onFilterToggle,
    onRangeChange
}) => (0, _inferno.createVNode)(2, 'div', 'departure-filter', [(0, _inferno.createVNode)(2, 'div', null, (0, _inferno.createVNode)(16, _rangefilter2.default, null, null, {
    'range': range,
    'onChange': onRangeChange
})), (0, _inferno.createVNode)(2, 'div', 'vehicle-type-filters', filters.map(type => (0, _inferno.createVNode)(16, _filterbutton2.default, null, null, {
    'vehicleType': type,
    'onFilterToggle': onFilterToggle,
    'isToggled': activeFilters.indexOf(type) > -1
})))]);

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vehicleicon = __webpack_require__(12);

var _vehicleicon2 = _interopRequireDefault(_vehicleicon);

var _constants = __webpack_require__(8);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Filter button component
 * @constructs {FilterButton}
 * @param {Object} props
 * @param {Function} props.onFilterToggle Callback for button
 * @param {string} [props.vehicleType=""]
 * @param {boolean} [props.isToggled=false] Button's toggle state
 */
exports.default = ({
  vehicleType = '',
  isToggled = false,
  onFilterToggle
} = {}) => {
  let className = `filter-button bg ${vehicleType.toLocaleLowerCase()}${isToggled ? ' toggled' : ''}`;

  return (0, _inferno.createVNode)(2, 'button', className, (0, _inferno.createVNode)(16, _vehicleicon2.default, null, null, {
    'aria-hidden': true,
    'iconName': `${vehicleType.toLocaleLowerCase()}-withoutBox`
  }), {
    'aria-label': `Suodatin ${_constants.VEHICLE_TYPE_TRANSLATIONS[vehicleType]}`,
    'aria-pressed': '' + isToggled,
    'onClick': e => onFilterToggle(vehicleType, e.ctrlKey)
  });
};

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(8);

var _inferno = __webpack_require__(0);

/**
 * Range input for filtering departures by distance
 * @constructs {RangeFilter}
 * @param {Object} props
 * @param {number} range Current value
 * @param {Function} props.onChange
 */
exports.default = ({
  range,
  onChange
}) => (0, _inferno.createVNode)(2, "div", "range-filter-wrapper", [(0, _inferno.createVNode)(2, "output", null, [range, "m"]), (0, _inferno.createVNode)(2, "label", null, [(0, _inferno.createVNode)(2, "span", "accessibility-hidden", "Maksimi et\xE4isyys pys\xE4kille"), (0, _inferno.createVNode)(512, "input", null, null, {
  "type": "range",
  "name": "range",
  "title": "Maksimi et\xE4isyys pys\xE4kille",
  "min": _constants.MIN_RANGE,
  "max": _constants.MAX_RANGE,
  "step": _constants.RANGE_STEP,
  "defaultValue": range,
  "onChange": e => onChange(e.target.value),
  "onInput": e => onChange(e.target.value)
})])]);

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _time = __webpack_require__(159);

var _time2 = _interopRequireDefault(_time);

var _routeidentifier = __webpack_require__(158);

var _routeidentifier2 = _interopRequireDefault(_routeidentifier);

var _distance = __webpack_require__(157);

var _distance2 = _interopRequireDefault(_distance);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 */
exports.default = ({
    realtime,
    realtimeDeparture,
    routeName,
    distance,
    destination,
    vehicleType,
    url
} = {}) => (0, _inferno.createVNode)(2, 'a', 'departures-list-row', [(0, _inferno.createVNode)(2, 'div', `time${realtime ? ' realtime' : ''}`, (0, _inferno.createVNode)(16, _time2.default, null, null, {
    'time': realtimeDeparture
})), (0, _inferno.createVNode)(2, 'div', 'routename', (0, _inferno.createVNode)(16, _routeidentifier2.default, null, null, {
    'vehicleType': vehicleType,
    'routeName': routeName
})), (0, _inferno.createVNode)(2, 'div', 'destination', destination), (0, _inferno.createVNode)(2, 'div', 'distance', (0, _inferno.createVNode)(16, _distance2.default, null, null, {
    'distance': distance
}))], {
    'href': url,
    'target': '_blank'
});

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _infernoComponent = __webpack_require__(13);

var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

var _departurerow = __webpack_require__(154);

var _departurerow2 = _interopRequireDefault(_departurerow);

var _loadingoverlay = __webpack_require__(163);

var _loadingoverlay2 = _interopRequireDefault(_loadingoverlay);

var _departureslistsortheader = __webpack_require__(156);

var _departureslistsortheader2 = _interopRequireDefault(_departureslistsortheader);

var _departuresorter = __webpack_require__(169);

var _departuresorter2 = _interopRequireDefault(_departuresorter);

__webpack_require__(177);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate a row for each departure
 * @private
 * @param {Object[]} departures
 * @returns {Function[]}
 */
const generateDepartureRows = departures => departures.map(departure => (0, _inferno.createVNode)(16, _departurerow2.default, null, null, Object.assign({}, departure), departure.id));
/**
 * Generate a placeholder row
 * @private
 * @returns {Function}
 */
const generateEmptyRow = () => (0, _inferno.createVNode)(2, 'div', 'departures-list-row no-results', 'L\xE4ht\xF6j\xE4 ei l\xF6ytynyt annetuilla hakukriteereill\xE4 tai suodattimilla.');

/**
 * A component for displaying a list of departures
 * @class DeparturesList
 * @extends {Inferno.Component}
 */
class DeparturesList extends _infernoComponent2.default {
  /**
   * Creates an instance of DeparturesList.
   * @param {Object} props
   * @param {Object[]} props.departures
   */
  constructor(props = {}) {
    super(props);
    this.state = { sortProp: 'time', sortDir: 1 };
  }

  /**
   * Sorts departures by prop and set to state
   * @param {string} propName Name of the prop to sort by
   */
  updateSortProps(propName) {
    // if sorted with same prop as before then switch sort mode asc <--> desc
    const sortDir = this.state.sortProp === propName ? this.state.sortDir * -1 : 1;
    // set sort props to state and then sort departures
    this.setState({ sortProp: propName, sortDir });
  }

  render() {
    const { sortProp, sortDir } = this.state;
    // sort departures using sort props from state
    const sorted = (0, _departuresorter2.default)(this.props.departures, sortProp, sortDir);
    // display rows or a placeholder row when there are no departures to display
    let rows = sorted.length ? generateDepartureRows(sorted) : generateEmptyRow();
    // bound callback
    const boundUpdateSortProps = this.updateSortProps.bind(this);

    return (0, _inferno.createVNode)(2, 'div', 'departures-list', [(0, _inferno.createVNode)(16, _loadingoverlay2.default, null, null, {
      'show': this.props.isLoading
    }), (0, _inferno.createVNode)(2, 'div', 'departures-list-header', [(0, _inferno.createVNode)(16, _departureslistsortheader2.default, null, null, {
      'propName': 'time',
      'active': sortProp === 'time',
      'onClick': boundUpdateSortProps,
      'text': 'L\xE4htee'
    }), (0, _inferno.createVNode)(16, _departureslistsortheader2.default, null, null, {
      'propName': 'routeName',
      'active': sortProp === 'routeName',
      'onClick': boundUpdateSortProps,
      'text': 'Linja'
    }), (0, _inferno.createVNode)(16, _departureslistsortheader2.default, null, null, {
      'propName': 'destination',
      'active': sortProp === 'destination',
      'onClick': boundUpdateSortProps,
      'text': 'M\xE4\xE4r\xE4np\xE4\xE4'
    }), (0, _inferno.createVNode)(16, _departureslistsortheader2.default, null, null, {
      'propName': 'distance',
      'active': sortProp === 'distance',
      'onClick': boundUpdateSortProps,
      'text': 'Pys\xE4kille'
    })]), (0, _inferno.createVNode)(2, 'div', 'departures-list-body', rows)]);
  }
}exports.default = DeparturesList;
;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inferno = __webpack_require__(0);

/**
 * Creates a callback for keypress event
 * @private
 * @param {Function} callback
 * @param {string} propName
 * @return {Function}
 */
const keyPressHandler = (callback, propName) => e => {
    const { keyCode } = e;
    // act if key was space or enter
    if ([13, 32].indexOf(keyCode) > -1) {
        e.preventDefault();
        callback(propName);
    }
};

/**
 * Departures list sorting header component
 * @constructs DepartureListSortHeader
 * @param {Object} props
 * @param {Function} props.onClick
 * @param {string} [props.propName=""]
 * @param {boolean} [props.active=false]
 * @param {string} [props.text=""]
 * @returns {DepartureListSortHeader}
 */

exports.default = ({
    propName = '',
    active = false,
    text = '',
    onClick
}) => (0, _inferno.createVNode)(2, 'div', `header ${propName.toLowerCase()}`, (0, _inferno.createVNode)(2, 'span', active ? 'active' : '', text), {
    'tabindex': '0',
    'role': 'button',
    'aria-pressed': active ? 'true' : 'false',
    'aria-label': `Järjestä lista ${text} mukaan`,
    'onClick': () => onClick(propName),
    'onKeyPress': keyPressHandler(onClick, propName)
});

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inferno = __webpack_require__(0);

/**
 * A component for displaying distance in human readable form
 * @constructs Distance
 * @param {Object} props
 * @param {number} props.distance distance in meters
 * @returns {Distance}
 */
exports.default = ({ distance }) => {
    let displayedDistance = '';

    if (distance) {
        // if distance is more than km then display kilometers with single decimal
        if (distance >= 1000) {
            const rounded = Math.round(distance / 1000 * 10) / 10;
            displayedDistance = `${rounded} km`;
        } else {
            displayedDistance = `${distance} m`;
        }
    }

    return (0, _inferno.createVNode)(2, 'span', null, displayedDistance);
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vehicleicon = __webpack_require__(12);

var _vehicleicon2 = _interopRequireDefault(_vehicleicon);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component for displaying a vehicle icon and route number
 * @constructs RouteIdentifier
 * @param {Object} props
 * @param {string} [routeName=""]
 * @param {string} [vehicleType=""]
 * @returns {RouteIdentifier}
 */
exports.default = ({
  routeName = '',
  vehicleType = ''
} = {}) => (0, _inferno.createVNode)(2, 'span', vehicleType.toLowerCase(), [(0, _inferno.createVNode)(16, _vehicleicon2.default, null, null, {
  'iconName': vehicleType.toLocaleLowerCase()
}), (0, _inferno.createVNode)(2, 'span', 'route-identifier', routeName)]);

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(4);

var _inferno = __webpack_require__(0);

/**
 * Get time as string containing hours and minutes separated by a colon
 * @private
 * @param {Date} date
 * @returns {string}
 */
const getTimeAsText = date => `${(0, _utils.padNumber)(date.getHours())}:${(0, _utils.padNumber)(date.getMinutes())}`;

/**
 * Component for displaying time in human readable form
 * @constructs Time
 * @param {Object} props
 * @param {number} props.time Time in seconds
 * @return {Time}
 */

exports.default = ({ time }) => {
  const now = Date.now();
  const date = new Date(time * 1000);
  const timeLeftInMins = Math.floor((date - now) / 1000 / 60);
  let timeText = '';

  if (date > now && timeLeftInMins < 10) {
    timeText = timeLeftInMins < 1 ? 'Now' : `${timeLeftInMins} min`;
  } else {
    timeText = getTimeAsText(date);
  }

  return (0, _inferno.createVNode)(2, 'span', null, timeText);
};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(178);

var _inferno = __webpack_require__(0);

/**
 * Component for displaying error messages
 * @constructs ErrorMessage
 * @param {Object} props
 * @param {string} props.message error message
 * @param {Function} props.onClick callback for element click event
 */
exports.default = ({ message, onClick }) => (0, _inferno.createVNode)(2, 'div', `error-message ${message ? '' : ' hidden'}`, [(0, _inferno.createVNode)(2, 'button', 'close-button', 'x', {
  'aria-label': 'Sulje'
}), message], {
  'onClick': onClick
});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(4);

__webpack_require__(179);

var _inferno = __webpack_require__(0);

/**
 * App footer component
 * @constructs Footer
 * @param {Object} props
 * @param {Date} props.departureUpdateTime
 */
exports.default = ({ departureUpdateTime }) => (0, _inferno.createVNode)(2, 'footer', null, (0, _inferno.createVNode)(2, 'div', 'footer-content', [(0, _inferno.createVNode)(2, 'p', 'footer-app-name', `Julkisilla.info v${"1.2.0"}`), (0, _inferno.createVNode)(2, 'p', null, ['L\xE4hd\xF6t p\xE4ivitetty\xA0', (0, _inferno.createVNode)(2, 'i', null, departureUpdateTime ? (0, _utils.toTimeString)(departureUpdateTime) : 'Ei koskaan'), '\xA0/\xA0 L\xE4ht\xF6jen tiedot ovat HSL:n tarjoamaa ', (0, _inferno.createVNode)(2, 'a', null, 'avointa dataa', {
  'href': 'https://digitransit.fi/'
}), '.'])]));

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(180);

var _vehicleicon = __webpack_require__(12);

var _vehicleicon2 = _interopRequireDefault(_vehicleicon);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * App header component
 * @constructs Header
 */
exports.default = () => (0, _inferno.createVNode)(2, 'header', null, [(0, _inferno.createVNode)(2, 'h1', null, [(0, _inferno.createVNode)(16, _vehicleicon2.default, null, null, {
  'iconName': 'bus'
}), (0, _inferno.createVNode)(2, 'span', 'app-name', 'julkisilla.info')]), (0, _inferno.createVNode)(2, 'p', 'app-description', 'L\xF6yd\xE4 l\xE4himm\xE4t julkisen liikenteen l\xE4hd\xF6t helposti')]);

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spinner = __webpack_require__(184);

var _spinner2 = _interopRequireDefault(_spinner);

__webpack_require__(181);

var _inferno = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Overlay component with spinner image
 * @constructs LoadingOverlay
 * @param {Object} props
 * @param {boolean} props.show
 * @returns {LoadingOverlay}
 */
exports.default = ({ show }) => (0, _inferno.createVNode)(2, 'div', 'loading-overlay', (0, _inferno.createVNode)(2, 'img', 'spinner', null, {
  'src': _spinner2.default,
  'alt': 'spinner'
}), {
  'style': { display: show ? 'block' : 'none' },
  'role': 'dialog',
  'aria-label': 'Odotetaan',
  'aria-busy': show
});

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.batchDepartures = exports.fetchDepartures = undefined;

/**
 * Fetch nearest departures from digitransit's public api
 * @async
 * @param {Object} location
 * @param {number} location.latitude
 * @param {number} location.longitude
 * @returns {Promise}
 */
let fetchDepartures = exports.fetchDepartures = (() => {
    var _ref = _asyncToGenerator(function* (location = {}, filters = {}) {
        const { latitude = 60.189425, longitude = 24.951884 } = location;
        const { vehicleTypes } = filters;
        const reqBody = formRequestBody({ latitude, longitude, vehicleTypes });

        const response = yield fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody)
        });

        if (!response.ok) throw new Error('Palvelu palautti virheen');

        const data = yield response.json();

        return (0, _graphqlresponseparser2.default)(data);
    });

    return function fetchDepartures() {
        return _ref.apply(this, arguments);
    };
})();

/**
 * Form body for batch request
 * @private
 * @param {Object} props
 * @param {string} props.id
 * @returns {Object}
 */


/**
 * Batch updated departures
 * @param {Object[]} [departures=[]] Departures to batch
 * @returns {Object[]}
 */
let batchDepartures = exports.batchDepartures = (() => {
    var _ref2 = _asyncToGenerator(function* (departures = []) {
        if (!departures.length) return departures;

        const query = departures.map(function (d) {
            return formBatchRequestBody({ id: d.nodeId });
        });

        const response = yield fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql/batch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(query)
        });

        if (!response.ok) throw new Error('Palvelu palautti virheen');

        const data = yield response.json();

        return parseBatchResponse(data);
    });

    return function batchDepartures() {
        return _ref2.apply(this, arguments);
    };
})();

var _fputils = __webpack_require__(9);

var _fputils2 = _interopRequireDefault(_fputils);

var _graphqlresponseparser = __webpack_require__(171);

var _graphqlresponseparser2 = _interopRequireDefault(_graphqlresponseparser);

var _querynearest = __webpack_require__(167);

var _querynearest2 = _interopRequireDefault(_querynearest);

var _querybatch = __webpack_require__(166);

var _querybatch2 = _interopRequireDefault(_querybatch);

var _utils = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/** @module DeparturesService */

/**
 * Limit results by time (2h in seconds)
 * @private
 * @type {number}
 */
const TIME_RANGE = 3 * 60 * 60;
/**
 * Number of stoptimes per route to fetch
 * @private
 * @type {number}
 */
const NUMBER_OF_DEPARTURES_PER_ROUTE = 2;
/**
 * Max number of results to fetch
 * @private
 * @type {number}
 */
const MAX_RESULTS = 20;

/**
 * Form graphql query for request body
 * @private
 * @param {Object} props
 * @param {number} props.latitude
 * @param {number} props.longitude
 * @param {number} props.startTime
 * @param {string[]} props.vehicleTypes
 * @returns {Object}
 */
function formRequestBody({ latitude, longitude, startTime, vehicleTypes } = {}) {
    return {
        query: _querynearest2.default,
        variables: {
            latitude,
            longitude,
            vehicleTypes,
            timeRange: TIME_RANGE,
            departuresCount: NUMBER_OF_DEPARTURES_PER_ROUTE,
            maxResults: MAX_RESULTS
        }
    };
}function formBatchRequestBody({ id }) {
    const startTime = (0, _utils.getNowInSeconds)();

    return {
        query: _querybatch2.default,
        variables: {
            id,
            startTime,
            departuresCount: NUMBER_OF_DEPARTURES_PER_ROUTE
        }
    };
}

/**
 * Parse batch response data
 * @private
 * @param {Object[]} data
 * @returns {Function}
 */
const parseBatchResponse = _fputils2.default.flatMap(data => {
    const { id: nodeId, stoptimes } = data.payload.data.node;
    if (!stoptimes) return [];
    return stoptimes.map(stoptime => Object.assign({ nodeId }, (0, _graphqlresponseparser.formStoptimeData)(stoptime)));
});

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * Promise wrapper for geolocation.getCurrentPosition
 * @private
 * @async
 * @returns {Promise}
 */
let getCurrentPosition = (() => {
    var _ref = _asyncToGenerator(function* () {
        return new Promise(function (resolve, reject) {
            watcherId = navigator.geolocation.watchPosition(onLocationResult(resolve), reject, POSITION_OPTIONS);
        });
    });

    return function getCurrentPosition() {
        return _ref.apply(this, arguments);
    };
})();

/**
 * Find current position using geolocation api
 * @async
 * @returns {Promise}
 */


let findGPSLocation = exports.findGPSLocation = (() => {
    var _ref2 = _asyncToGenerator(function* () {
        if (!navigator.geolocation) throw new Error('Selain ei tue paikannusta');

        if (!watcherId) {
            const position = yield getCurrentPosition();
            return position.coords;
        }
    });

    return function findGPSLocation() {
        return _ref2.apply(this, arguments);
    };
})();

/**
 * Cancel location search
 */


exports.stopLocating = stopLocating;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/** @module LocationService */

/**
 * Options for getCurrentPosition
 * @private
 * @type {Object}
 */
const POSITION_OPTIONS = {
    // use gps
    enableHighAccuracy: true,
    // time out in one minute
    timeout: 1 * 60 * 1000
};

/**
 * Current watcher's id
 * @private
 * @type {number}
 */
let watcherId = null;

/**
 * Create callback for watchPosition success
 * @private
 * @param {Function} resolve
 * @returns {Function}
 */
function onLocationResult(resolve) {
    /**
     * Callback for watchPosition success resolves if
     * acquired location is precise enough
     * @param {Object} position object
     */
    return position => {
        stopLocating(watcherId);
        resolve(position);
    };
};function stopLocating() {
    if (watcherId) {
        navigator.geolocation.clearWatch(watcherId);
        watcherId = null;
    }
}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/** @module QueryBatch */

/**
 * Graphql query for nearest departures
 * @type {string}
 */
exports.default = `
    query BatchNearest($id: ID!, $startTime: Long!, $departuresCount: Int) {
        node(id: $id) {
            id
            ...on DepartureRow {
                stoptimes(startTime: $startTime, timeRange: 7200, numberOfDepartures: $departuresCount) {
                    serviceDay
                    scheduledDeparture
                    realtimeDeparture
                    realtimeState
                    realtime
                    headsign
                    trip {
                        id
                    }
                }
            }
        }
    }
`;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/** @module QueryNearest */

/**
 * Graphql query for nearest departures
 * @type {string}
 */
exports.default = `
    query Nearest($latitude: Float!, $longitude: Float!, $maxResults: Int, $timeRange:Int, $departuresCount:Int, $vehicleTypes:[Mode]!) {
        nearest(lat: $latitude, lon: $longitude, maxResults: $maxResults, filterByPlaceTypes: DEPARTURE_ROW, filterByModes: $vehicleTypes) {
            edges {
                node {
                    id
                    distance
                    place {
                        id
                        ... on DepartureRow {
                            stoptimes(timeRange: $timeRange, numberOfDepartures: $departuresCount) {
                                serviceDay
                                scheduledDeparture
                                realtimeDeparture
                                realtimeState
                                realtime
                                headsign
                                trip {
                                    id
                                }
                            }
                            pattern {
                                route {
                                    gtfsId
                                    shortName
                                    longName
                                    mode
                                }
                                code
                                headsign
                            }
                        }
                    }
                }
            }
        }
    }
}`;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.batchDepartures = exports.fetchDepartures = undefined;

/**
 * Fetch departures, merge results with existing departures
 * @async
 * @param {Object} location
 * @param {number} location.latitude
 * @param {number} location.longitude
 * @param {string[]} vehicleTypes]
 * @param {Object[]} [existing=[]]
 * @returns {Object[]}
 */
let fetchDepartures = exports.fetchDepartures = (() => {
    var _ref = _asyncToGenerator(function* (location, vehicleTypes = [], existing = []) {
        // no need to fetch if vehicle types is empty
        if (!vehicleTypes.length) return existing;

        const findFromVehcileTypes = (0, _utils2.findFrom)(vehicleTypes);
        const promises = [];

        // fetch bus departures with separate call
        if (findFromVehcileTypes(_constants.VEHICLE_TYPE.BUS)) {
            promises.push(departuresService.fetchDepartures(location, { vehicleTypes: [_constants.VEHICLE_TYPE.BUS] }));
        }

        // fetch tram departures with separate call
        if (findFromVehcileTypes(_constants.VEHICLE_TYPE.TRAM)) {
            promises.push(departuresService.fetchDepartures(location, { vehicleTypes: [_constants.VEHICLE_TYPE.TRAM] }));
        }

        // fetch departures other types with one call
        if (findFromVehcileTypes([_constants.VEHICLE_TYPE.FERRY, _constants.VEHICLE_TYPE.RAIL, _constants.VEHICLE_TYPE.SUBWAY])) {
            promises.push(departuresService.fetchDepartures(location, {
                vehicleTypes: [_constants.VEHICLE_TYPE.FERRY, _constants.VEHICLE_TYPE.RAIL, _constants.VEHICLE_TYPE.SUBWAY]
            }));
        }

        // wait for promises and flatten results (each fetch returns an array)
        const departures = _fputils2.default.flatMap(function (p) {
            return p;
        })((yield Promise.all(promises)));

        if (!departures.length) return existing;

        return mergeDepartures(departures, existing);
    });

    return function fetchDepartures(_x) {
        return _ref.apply(this, arguments);
    };
})();

/**
 * Update given realtime departures by fetching a batch from api
 * @param {Object[]} [departures=[]]
 * @returns {Object[]}
 */
let batchDepartures = exports.batchDepartures = (() => {
    var _ref2 = _asyncToGenerator(function* (departures = []) {
        const realtimeDepartures = filterUniqueRealtimeDepartures(departures);

        if (!realtimeDepartures.length) return departures;

        const data = yield departuresService.batchDepartures(realtimeDepartures);

        return mergeBatchData(departures, data);
    });

    return function batchDepartures() {
        return _ref2.apply(this, arguments);
    };
})();

var _fputils = __webpack_require__(9);

var _fputils2 = _interopRequireDefault(_fputils);

var _utils = __webpack_require__(4);

var _constants = __webpack_require__(8);

var _departuresservice = __webpack_require__(164);

var departuresService = _interopRequireWildcard(_departuresservice);

var _utils2 = __webpack_require__(4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/** @module DepartureFetchMerge */

/**
 * Merge two departure arrays, discard doubles preferring fetched
 * @private
 * @param {Object[]} fetched
 * @param {Object[]} existing
 * @returns {Object[]}
 */
const mergeDepartures = (fetched, existing) => {
    const isFetched = (0, _utils2.findFrom)(fetched, 'id');
    const existingWithoutNew = existing.filter(d => !isFetched(d));
    return [...existingWithoutNew, ...fetched];
};;

/**
 * Merge batch data with existing departures
 * @private
 * @param {Object[]} existing
 * @param {Object[]} batch
 */
const mergeBatchData = (existing, batch) => {
    return existing.map(d => {
        const update = (0, _utils.find)(b => b.nodeId === d.nodeId && b.id === d.id)(batch);
        return Object.assign({}, d, update);
    });
};

/**
 * Select all realtime departures, one for each node
 * @private
 * @type {Function}
 * @param {Object[]} departures
 * @returns {Object[]}
 */
const filterUniqueRealtimeDepartures = _fputils2.default.compose((0, _utils.uniq)(d => d.nodeId), _fputils2.default.filter(d => d.realtime));

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sort;

var _fputils = __webpack_require__(9);

var _fputils2 = _interopRequireDefault(_fputils);

var _utils = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module DepartureSorter */

/**
 * Return sorter function for departures
 * @private
 * @param {Object[]} list List of departures
 * @param {string} propName Property to sort by
 * @param {number} sortDir 1=ascending, -1=descending
 * @returns {Object[]} Sorted departures
 */
function sort(list, propName, sortDir) {
  const iteratee = propName === 'time' ? _fputils2.default.property('realtimeDeparture') : _fputils2.default.property(propName);
  const sorted = (0, _utils.sortBy)(iteratee)(list);
  return sortDir === -1 ? sorted.reverse() : sorted;
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatError;
/**
 * Messages for position errors
 * @private
 * @type {Object}
 */
const POSITION_ERROR_CODES = {
  1: 'Oikeuksia sijainnin hakuun ei annettu tai sijainnin haku on kytketty pois',
  2: 'Sijaintipalveluun ei saatu yhteyttä',
  3: 'Sijainnin haku kesti liian kauan'
};

/**
 * Position error type
 */
const POSITION_ERROR = exports.POSITION_ERROR = 'POSITION_ERROR';

/**
 * Format error message by type
 * @param {string} type
 * @param {object} error
 * @returns {string} Human readable error message
 */
function formatError(type, error) {
  if (type === POSITION_ERROR) {
    return `Sijainti ei ole saatavilla: ${POSITION_ERROR_CODES[error.code]}.`;
  }
}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formStoptimeData = undefined;

var _fputils = __webpack_require__(9);

var _fputils2 = _interopRequireDefault(_fputils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module GraphQLResponseParser */

/**
 * Curried sum of two numbers
 * @private
 * @type {Function}
 * @param {number} a
 * @param {number} b
 * @return {number} sum
 */
const sumWith = _fputils2.default.curry((a, b) => a + b);

/**
 * Get relevant data from a stoptime object
 * @param {Object} stoptime
 * @returns {Function}
 */
const formStoptimeData = exports.formStoptimeData = stoptime => {
    const { scheduledDeparture, headsign, realtimeDeparture, serviceDay } = stoptime;
    // times are seconds from midnight and serviceday is current day
    const sumWithServiceDay = sumWith(serviceDay);

    return _fputils2.default.pipeAll([_fputils2.default.pick(['realtime']), _fputils2.default.assign({
        id: stoptime.trip.id,
        scheduledDeparture: sumWithServiceDay(scheduledDeparture),
        realtimeDeparture: sumWithServiceDay(realtimeDeparture),
        destination: headsign
    }), _fputils2.default.ifThenElse(_fputils2.default.property('destination'), _fputils2.default.identity,
    // if destination is falsy then delete that property
    _fputils2.default.omit(['destination']))])(stoptime);
};

/**
 * Combine object (stoptime) with route object
 * @private
 * @param {Object} route
 * @returns {Function}
 */
const combineWithRoute = route => _fputils2.default.assign(_fputils2.default.shallowClone(route));

/**
 * Get stoptimes from routes and creates an object of each one
 * and adds route data to those objects
 * @private
 * @type {Function}
 * @param {Object} route
 * @returns {Object[]} stoptimes with route data
 */
const combineRouteInfoWithStoptimes = route => {
    return _fputils2.default.composeAll([
    // combine with route info
    _fputils2.default.map(_fputils2.default.shave(1)(combineWithRoute(route))),
    // get times etc. departure specific info
    _fputils2.default.map(formStoptimeData), _fputils2.default.property('stoptimes')])(route);
};

/**
 * Get route info from data node
 * @private
 * @param {Object} node
 * @returns {Object}
 */
const getRouteInfo = node => {
    const { route, code, headsign } = node.place.pattern;
    return {
        nodeId: node.place.id,
        destination: headsign,
        distance: node.distance,
        vehicleType: route.mode,
        routeName: route.shortName,
        stoptimes: node.place.stoptimes,
        url: `https://www.reittiopas.fi/linjat/${route.gtfsId}/pysakit/${code}`
    };
};

/**
 * Find routes with stoptimes from response data
 * @private
 * @type {Function}
 * @param {Object} data
 * @returns {Object[]} routes with at least one stoptime
 */
const findRoutesFromData = _fputils2.default.composeAll([
// select all nodes with stoptimes
_fputils2.default.filter(_fputils2.default.compose(_fputils2.default.head, _fputils2.default.property('stoptimes'))),
// get route info for each node
_fputils2.default.map(getRouteInfo),
// pluck nodes
_fputils2.default.map(val => val.node), _fputils2.default.property('edges'), _fputils2.default.property('nearest')]);

/**
 * Parse response from digitransit api
 * @type {Function}
 * @param {Object} [result={}]
 * @returns {Object[]}
 */
exports.default = _fputils2.default.pipe(
// default to an empty object
_fputils2.default.or({}), _fputils2.default.ifThenElse(_fputils2.default.property('data'), _fputils2.default.pipeAll([_fputils2.default.property('data'), findRoutesFromData, _fputils2.default.flatMap(combineRouteInfoWithStoptimes)]),
// if data is falsy then return an empty array
_fputils2.default.always([])));

/***/ }),
/* 172 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 173 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 174 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 175 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 176 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 177 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 178 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 179 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 180 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 181 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 182 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/icons.7cc3ba83.svg";

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/spinner.8fd60d77.svg";

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference
var inferno_1 = __webpack_require__(0);
var inferno_shared_1 = __webpack_require__(1);
var noOp = inferno_shared_1.ERROR_MSG;
if (true) {
    noOp = 'Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.';
}
var componentCallbackQueue = new Map();
// when a components root VNode is also a component, we can run into issues
// this will recursively look for vNode.parentNode if the VNode is a component
function updateParentComponentVNodes(vNode, dom) {
    if (vNode.flags & 28 /* Component */) {
        var parentVNode = vNode.parentVNode;
        if (parentVNode) {
            parentVNode.dom = dom;
            updateParentComponentVNodes(parentVNode, dom);
        }
    }
}
var resolvedPromise = Promise.resolve();
function addToQueue(component, force, callback) {
    // TODO this function needs to be revised and improved on
    var queue = componentCallbackQueue.get(component);
    if (!queue) {
        queue = [];
        componentCallbackQueue.set(component, queue);
        resolvedPromise.then(function () {
            componentCallbackQueue.delete(component);
            component._updating = true;
            applyState(component, force, function () {
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i]();
                }
            });
            component._updating = false;
        });
    }
    if (callback) {
        queue.push(callback);
    }
}
function queueStateChanges(component, newState, callback) {
    if (inferno_shared_1.isFunction(newState)) {
        newState = newState(component.state, component.props, component.context);
    }
    var pending = component._pendingState;
    if (pending === null) {
        component._pendingState = pending = newState;
    }
    else {
        for (var stateKey in newState) {
            pending[stateKey] = newState[stateKey];
        }
    }
    if (inferno_shared_1.isBrowser && !component._pendingSetState && !component._blockRender) {
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
        var state = component.state;
        if (state === null) {
            component.state = pending;
        }
        else {
            for (var key in pending) {
                state[key] = pending[key];
            }
        }
        component._pendingState = null;
        if (callback && component._blockRender) {
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
        var nextState = inferno_shared_1.combineFrom(prevState, pendingState);
        var props = component.props;
        var context_1 = component.context;
        component._pendingState = null;
        var nextInput = component._updateComponent(prevState, nextState, props, props, context_1, force, true);
        var didUpdate = true;
        if (inferno_shared_1.isInvalid(nextInput)) {
            nextInput = inferno_1.createVNode(4096 /* Void */, null);
        }
        else if (nextInput === inferno_shared_1.NO_OP) {
            nextInput = component._lastInput;
            didUpdate = false;
        }
        else if (inferno_shared_1.isStringOrNumber(nextInput)) {
            nextInput = inferno_1.createVNode(1 /* Text */, null, null, nextInput);
        }
        else if (inferno_shared_1.isArray(nextInput)) {
            if (true) {
                inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
            }
            inferno_shared_1.throwError();
        }
        var lastInput = component._lastInput;
        var vNode = component._vNode;
        var parentDom = (lastInput.dom && lastInput.dom.parentNode) || (lastInput.dom = vNode.dom);
        component._lastInput = nextInput;
        if (didUpdate) {
            var childContext = void 0;
            if (!inferno_shared_1.isUndefined(component.getChildContext)) {
                childContext = component.getChildContext();
            }
            if (inferno_shared_1.isNullOrUndef(childContext)) {
                childContext = component._childContext;
            }
            else {
                childContext = inferno_shared_1.combineFrom(context_1, childContext);
            }
            var lifeCycle = component._lifecycle;
            component._patch(lastInput, nextInput, parentDom, lifeCycle, childContext, component._isSVG, false);
            lifeCycle.trigger();
            if (!inferno_shared_1.isUndefined(component.componentDidUpdate)) {
                component.componentDidUpdate(props, prevState, context_1);
            }
            inferno_1.options.afterUpdate && inferno_1.options.afterUpdate(vNode);
        }
        var dom = vNode.dom = nextInput.dom;
        var componentToDOMNodeMap = component._componentToDOMNodeMap;
        componentToDOMNodeMap && componentToDOMNodeMap.set(component, nextInput.dom);
        updateParentComponentVNodes(vNode, dom);
    }
    else {
        component.state = component._pendingState;
        component._pendingState = null;
    }
    if (!inferno_shared_1.isNullOrUndef(callback)) {
        callback.call(component);
    }
}
var alreadyWarned = false;
var Component = (function () {
    function Component(props, context) {
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
        this._patch = null;
        this._isSVG = false;
        this._componentToDOMNodeMap = null;
        this._updating = true;
        /** @type {object} */
        this.props = props || inferno_1.EMPTY_OBJ;
        /** @type {object} */
        this.context = context || inferno_1.EMPTY_OBJ; // context should not be mutable
    }
    Component.prototype.render = function (nextProps, nextState, nextContext) {
    };
    Component.prototype.forceUpdate = function (callback) {
        if (this._unmounted || !inferno_shared_1.isBrowser) {
            return;
        }
        applyState(this, true, callback);
    };
    Component.prototype.setState = function (newState, callback) {
        if (this._unmounted) {
            return;
        }
        if (!this._blockSetState) {
            queueStateChanges(this, newState, callback);
        }
        else {
            if (true) {
                inferno_shared_1.throwError('cannot update state via setState() in componentWillUpdate() or constructor.');
            }
            inferno_shared_1.throwError();
        }
    };
    Component.prototype.setStateSync = function (newState) {
        if (true) {
            if (!alreadyWarned) {
                alreadyWarned = true;
                console.warn('Inferno WARNING: setStateSync has been deprecated and will be removed in next release. Use setState instead.');
            }
        }
        this.setState(newState);
    };
    Component.prototype._updateComponent = function (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
        if (this._unmounted === true) {
            if (true) {
                inferno_shared_1.throwError(noOp);
            }
            inferno_shared_1.throwError();
        }
        if ((prevProps !== nextProps || nextProps === inferno_1.EMPTY_OBJ) || prevState !== nextState || force) {
            if (prevProps !== nextProps || nextProps === inferno_1.EMPTY_OBJ) {
                if (!inferno_shared_1.isUndefined(this.componentWillReceiveProps) && !fromSetState) {
                    this._blockRender = true;
                    this.componentWillReceiveProps(nextProps, context);
                    this._blockRender = false;
                }
                if (this._pendingSetState) {
                    nextState = inferno_shared_1.combineFrom(nextState, this._pendingState);
                    this._pendingSetState = false;
                    this._pendingState = null;
                }
            }
            /* Update if scu is not defined, or it returns truthy value or force */
            if (inferno_shared_1.isUndefined(this.shouldComponentUpdate) || this.shouldComponentUpdate(nextProps, nextState, context) || force) {
                if (!inferno_shared_1.isUndefined(this.componentWillUpdate)) {
                    this._blockSetState = true;
                    this.componentWillUpdate(nextProps, nextState, context);
                    this._blockSetState = false;
                }
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
                if (inferno_1.options.beforeRender) {
                    inferno_1.options.beforeRender(this);
                }
                var render = this.render(nextProps, nextState, context);
                if (inferno_1.options.afterRender) {
                    inferno_1.options.afterRender(this);
                }
                return render;
            }
            else {
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
            }
        }
        return inferno_shared_1.NO_OP;
    };
    return Component;
}());
exports.default = Component;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_OP = '$NO_OP';
exports.ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
exports.isBrowser = !!(typeof window !== 'undefined' && window.document);
function toArray(children) {
    return exports.isArray(children) ? children : (children ? [children] : children);
}
exports.toArray = toArray;
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
exports.isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}
exports.isStatefulComponent = isStatefulComponent;
function isStringOrNumber(obj) {
    var type = typeof obj;
    return type === 'string' || type === 'number';
}
exports.isStringOrNumber = isStringOrNumber;
function isNullOrUndef(obj) {
    return isUndefined(obj) || isNull(obj);
}
exports.isNullOrUndef = isNullOrUndef;
function isInvalid(obj) {
    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
}
exports.isInvalid = isInvalid;
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isNull(obj) {
    return obj === null;
}
exports.isNull = isNull;
function isTrue(obj) {
    return obj === true;
}
exports.isTrue = isTrue;
function isUndefined(obj) {
    return obj === undefined;
}
exports.isUndefined = isUndefined;
function isObject(o) {
    return typeof o === 'object';
}
exports.isObject = isObject;
function throwError(message) {
    if (!message) {
        message = exports.ERROR_MSG;
    }
    throw new Error("Inferno Error: " + message);
}
exports.throwError = throwError;
function warning(message) {
    console.warn(message);
}
exports.warning = warning;
function combineFrom(first, second) {
    var obj = {};
    var key;
    if (first) {
        for (key in first) {
            obj[key] = first[key];
        }
    }
    if (second) {
        for (key in second) {
            obj[key] = second[key];
        }
    }
    return obj;
}
exports.combineFrom = combineFrom;
function Lifecycle() {
    this.listeners = [];
}
exports.Lifecycle = Lifecycle;
Lifecycle.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle.prototype.trigger = function trigger() {
    var listeners = this.listeners;
    var listener;
    // We need to remove current listener from array when calling it, because more listeners might be added
    while (listener = listeners.shift()) {
        listener();
    }
};


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var isiOS = inferno_shared_1.isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var delegatedEvents = new Map();
function handleEvent(name, lastEvent, nextEvent, dom) {
    var delegatedRoots = delegatedEvents.get(name);
    if (nextEvent) {
        if (!delegatedRoots) {
            delegatedRoots = { items: new Map(), count: 0, docEvent: null };
            delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
            delegatedEvents.set(name, delegatedRoots);
        }
        if (!lastEvent) {
            delegatedRoots.count++;
            if (isiOS && name === 'onClick') {
                trapClickOnNonInteractiveElement(dom);
            }
        }
        delegatedRoots.items.set(dom, nextEvent);
    }
    else if (delegatedRoots) {
        delegatedRoots.count--;
        delegatedRoots.items.delete(dom);
        if (delegatedRoots.count === 0) {
            document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
            delegatedEvents.delete(name);
        }
    }
}
exports.handleEvent = handleEvent;
function dispatchEvent(event, target, items, count, dom, isClick) {
    var eventsToTrigger = items.get(target);
    if (eventsToTrigger) {
        count--;
        // linkEvent object
        dom = target;
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
    if (count > 0) {
        var parentDom = target.parentNode;
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (parentDom === null || (isClick && parentDom.nodeType === 1 && parentDom.disabled)) {
            return;
        }
        dispatchEvent(event, parentDom, items, count, dom, isClick);
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
        var count = delegatedRoots.count;
        if (count > 0) {
            event.stopPropagation = stopPropagation;
            dispatchEvent(event, event.target, delegatedRoots.items, count, document, event.type === 'click');
        }
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}
function emptyFn() {
}
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


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Links given data to event as first parameter
 * @param {*} data data to be linked, it will be available in function as first parameter
 * @param {Function} event Function to be called when event occurs
 * @returns {{data: *, event: Function}}
 */
function linkEvent(data, event) {
    return { data: data, event: event };
}
exports.default = linkEvent;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var options_1 = __webpack_require__(3);
var constants_1 = __webpack_require__(10);
var mounting_1 = __webpack_require__(11);
var patching_1 = __webpack_require__(6);
var rendering_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(2);
var processElement_1 = __webpack_require__(15);
function normalizeChildNodes(parentDom) {
    var dom = parentDom.firstChild;
    while (dom) {
        if (dom.nodeType === 8) {
            if (dom.data === '!') {
                var placeholder = document.createTextNode('');
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
exports.normalizeChildNodes = normalizeChildNodes;
function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
    var type = vNode.type;
    var ref = vNode.ref;
    vNode.dom = dom;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    if (isClass) {
        var _isSVG = dom.namespaceURI === constants_1.svgNS;
        var instance = utils_1.createClassComponentInstance(vNode, type, props, context, _isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vComponent = vNode;
        instance._vNode = vNode;
        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
        mounting_1.mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false; // Mount finished allow going sync
        options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.set(instance, dom);
    }
    else {
        var input = utils_1.createFunctionalComponentInput(vNode, type, props, context);
        hydrate(input, dom, lifecycle, context, isSVG);
        vNode.children = input;
        vNode.dom = input.dom;
        mounting_1.mountFunctionalComponentCallbacks(ref, dom, lifecycle);
    }
    return dom;
}
function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var flags = vNode.flags;
    var ref = vNode.ref;
    if (isSVG || (flags & 128 /* SvgElement */)) {
        isSVG = true;
    }
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        if (true) {
            inferno_shared_1.warning('Inferno hydration: Server-side markup doesn\'t match client-side markup or Initial render target is not empty');
        }
        var newDom = mounting_1.mountElement(vNode, null, lifecycle, context, isSVG);
        vNode.dom = newDom;
        utils_1.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    vNode.dom = dom;
    if (children) {
        hydrateChildren(children, dom, lifecycle, context, isSVG);
    }
    if (props) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = processElement_1.isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching_1.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement_1.processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (inferno_shared_1.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    }
    else {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (ref) {
        mounting_1.mountRef(dom, ref, lifecycle);
    }
    return dom;
}
function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
    normalizeChildNodes(parentDom);
    var dom = parentDom.firstChild;
    if (inferno_shared_1.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!inferno_shared_1.isNull(child) && inferno_shared_1.isObject(child)) {
                if (dom) {
                    dom = hydrate(child, dom, lifecycle, context, isSVG);
                    dom = dom.nextSibling;
                }
                else {
                    mounting_1.mount(child, parentDom, lifecycle, context, isSVG);
                }
            }
        }
    }
    else if (inferno_shared_1.isStringOrNumber(children)) {
        if (dom && dom.nodeType === 3) {
            if (dom.nodeValue !== children) {
                dom.nodeValue = children;
            }
        }
        else if (children) {
            parentDom.textContent = children;
        }
        dom = dom.nextSibling;
    }
    else if (inferno_shared_1.isObject(children)) {
        hydrate(children, dom, lifecycle, context, isSVG);
        dom = dom.nextSibling;
    }
    // clear any other DOM nodes, there should be only a single entry for the root
    while (dom) {
        var nextSibling = dom.nextSibling;
        parentDom.removeChild(dom);
        dom = nextSibling;
    }
}
function hydrateText(vNode, dom) {
    if (dom.nodeType !== 3) {
        var newDom = mounting_1.mountText(vNode, null);
        vNode.dom = newDom;
        utils_1.replaceChild(dom.parentNode, newDom, dom);
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
        return hydrateComponent(vNode, dom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
    }
    else if (flags & 3970 /* Element */) {
        return hydrateElement(vNode, dom, lifecycle, context, isSVG);
    }
    else if (flags & 1 /* Text */) {
        return hydrateText(vNode, dom);
    }
    else if (flags & 4096 /* Void */) {
        return hydrateVoid(vNode, dom);
    }
    else {
        if (true) {
            inferno_shared_1.throwError("hydrate() expects a valid VNode, instead it received an object with the type \"" + typeof vNode + "\".");
        }
        inferno_shared_1.throwError();
    }
}
function hydrateRoot(input, parentDom, lifecycle) {
    var dom = parentDom && parentDom.firstChild;
    if (dom) {
        hydrate(input, dom, lifecycle, utils_1.EMPTY_OBJ, false);
        dom = parentDom.firstChild;
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom = dom.nextSibling) {
            parentDom.removeChild(dom);
        }
        return true;
    }
    return false;
}
exports.default = hydrateRoot;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
exports.isCheckedType = isCheckedType;
function onTextInputChange(e) {
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newProps, dom);
    }
}
function wrappedOnChange(e) {
    var props = this.props || utils_1.EMPTY_OBJ;
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
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onClick) {
        var event_2 = props.onClick;
        if (event_2.event) {
            event_2.event(event_2.data, e);
        }
        else {
            event_2(e);
        }
    }
    else if (props.onclick) {
        props.onclick(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newProps, dom);
    }
}
function processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(nextPropsOrEmpty, dom);
    if (mounting && isControlled) {
        if (isCheckedType(nextPropsOrEmpty.type)) {
            dom.onclick = onCheckboxChange.bind(vNode);
            dom.onclick.wrapped = true;
        }
        else {
            dom.oninput = onTextInputChange.bind(vNode);
            dom.oninput.wrapped = true;
        }
        if (nextPropsOrEmpty.onChange) {
            dom.onchange = wrappedOnChange.bind(vNode);
            dom.onchange.wrapped = true;
        }
    }
}
exports.processInput = processInput;
function applyValue(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !inferno_shared_1.isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (multiple && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!inferno_shared_1.isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!inferno_shared_1.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.value = value;
        }
        else if (!inferno_shared_1.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}
exports.applyValue = applyValue;


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var VNodes_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
function updateChildOptionGroup(vNode, value) {
    var type = vNode.type;
    if (type === 'optgroup') {
        var children = vNode.children;
        if (inferno_shared_1.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOption(children[i], value);
            }
        }
        else if (VNodes_1.isVNode(children)) {
            updateChildOption(children, value);
        }
    }
    else {
        updateChildOption(vNode, value);
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if ((inferno_shared_1.isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
        dom.selected = true;
    }
    else if (!inferno_shared_1.isNullOrUndef(value) || !inferno_shared_1.isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
function onSelectChange(e) {
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onChange) {
        var event_1 = props.onChange;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.onchange) {
        props.onchange(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom, newProps, false);
    }
}
function processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(vNode, dom, nextPropsOrEmpty, mounting);
    if (mounting && isControlled) {
        dom.onchange = onSelectChange.bind(vNode);
        dom.onchange.wrapped = true;
    }
}
exports.processSelect = processSelect;
function applyValue(vNode, dom, nextPropsOrEmpty, mounting) {
    if (nextPropsOrEmpty.multiple !== dom.multiple) {
        dom.multiple = nextPropsOrEmpty.multiple;
    }
    var children = vNode.children;
    if (!inferno_shared_1.isInvalid(children)) {
        var value = nextPropsOrEmpty.value;
        if (mounting && inferno_shared_1.isNullOrUndef(value)) {
            value = nextPropsOrEmpty.defaultValue;
        }
        if (inferno_shared_1.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOptionGroup(children[i], value);
            }
        }
        else if (VNodes_1.isVNode(children)) {
            updateChildOptionGroup(children, value);
        }
    }
}
exports.applyValue = applyValue;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
function wrappedOnChange(e) {
    var props = this.props || utils_1.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onTextareaInputChange(e) {
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, vNode.dom, false);
    }
}
function processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(nextPropsOrEmpty, dom, mounting);
    if (mounting && isControlled) {
        dom.oninput = onTextareaInputChange.bind(vNode);
        dom.oninput.wrapped = true;
        if (nextPropsOrEmpty.onChange) {
            dom.onchange = wrappedOnChange.bind(vNode);
            dom.onchange.wrapped = true;
        }
    }
}
exports.processTextarea = processTextarea;
function applyValue(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;
    if (inferno_shared_1.isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = nextPropsOrEmpty.defaultValue;
            if (!inferno_shared_1.isNullOrUndef(defaultValue)) {
                if (defaultValue !== domValue) {
                    dom.value = defaultValue;
                }
            }
            else if (domValue !== '') {
                dom.value = '';
            }
        }
    }
    else {
        /* There is value so keep it controlled */
        if (domValue !== value) {
            dom.value = value;
        }
    }
}
exports.applyValue = applyValue;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(1);
exports.NO_OP = inferno_shared_1.NO_OP;
var options_1 = __webpack_require__(3);
exports.options = options_1.default;
var VNodes_1 = __webpack_require__(5);
exports.cloneVNode = VNodes_1.cloneVNode;
exports.createVNode = VNodes_1.createVNode;
var linkEvent_1 = __webpack_require__(188);
exports.linkEvent = linkEvent_1.default;
var rendering_1 = __webpack_require__(7);
exports.createRenderer = rendering_1.createRenderer;
exports.findDOMNode = rendering_1.findDOMNode;
exports.render = rendering_1.render;
var utils_1 = __webpack_require__(2);
exports.EMPTY_OBJ = utils_1.EMPTY_OBJ;
if (true) {
    var testFunc = function testFn() {
    };
    if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
        inferno_shared_1.warning(('It looks like you\'re using a minified copy of the development build ' +
            'of Inferno. When deploying Inferno apps to production, make sure to use ' +
            'the production build which skips development warnings and is faster. ' +
            'See http://infernojs.org for more details.'));
    }
}
exports.version = '1.6.2';
// we duplicate it so it plays nicely with different module loading systems
exports.default = {
    linkEvent: linkEvent_1.default,
    // core shapes
    createVNode: VNodes_1.createVNode,
    // cloning
    cloneVNode: VNodes_1.cloneVNode,
    // used to shared common items between Inferno libs
    NO_OP: inferno_shared_1.NO_OP,
    EMPTY_OBJ: utils_1.EMPTY_OBJ,
    // DOM
    render: rendering_1.render,
    findDOMNode: rendering_1.findDOMNode,
    createRenderer: rendering_1.createRenderer,
    options: options_1.default,
    version: exports.version
};
// Internal stuff that only core inferno-* packages use
var constants_1 = __webpack_require__(10);
exports.internal_isUnitlessNumber = constants_1.isUnitlessNumber;
// Mainly for testing
var normalization_1 = __webpack_require__(18);
exports.internal_normalize = normalization_1.normalize;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(19),
    getRawTag = __webpack_require__(196),
    objectToString = __webpack_require__(197);

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
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(19);

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
/* 197 */
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
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21),
    now = __webpack_require__(201),
    toNumber = __webpack_require__(202);

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
/* 199 */
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
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(194),
    isObjectLike = __webpack_require__(199);

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
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(20);

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
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21),
    isSymbol = __webpack_require__(200);

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
/* 203 */
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
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = __webpack_require__(22);

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._61);
  p._81 = 1;
  p._65 = value;
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
          while (val._81 === 3) {
            val = val._65;
          }
          if (val._81 === 1) return res(i, val._65);
          if (val._81 === 2) reject(val._65);
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
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(22);

var DEFAULT_WHITELIST = [
  ReferenceError,
  TypeError,
  RangeError
];

var enabled = false;
exports.disable = disable;
function disable() {
  enabled = false;
  Promise._10 = null;
  Promise._97 = null;
}

exports.enable = enable;
function enable(options) {
  options = options || {};
  if (enabled) disable();
  enabled = true;
  var id = 0;
  var displayId = 0;
  var rejections = {};
  Promise._10 = function (promise) {
    if (
      promise._81 === 2 && // IS REJECTED
      rejections[promise._72]
    ) {
      if (rejections[promise._72].logged) {
        onHandled(promise._72);
      } else {
        clearTimeout(rejections[promise._72].timeout);
      }
      delete rejections[promise._72];
    }
  };
  Promise._97 = function (promise, err) {
    if (promise._45 === 0) { // not yet handled
      promise._72 = id++;
      rejections[promise._72] = {
        displayId: null,
        error: err,
        timeout: setTimeout(
          onUnhandled.bind(null, promise._72),
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
/* 206 */
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
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);
module.exports = __webpack_require__(25);


/***/ })
/******/ ]);