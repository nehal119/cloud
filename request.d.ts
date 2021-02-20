!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.request=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
  "use strict";function doRequest(e,t,o,r){var n=new Promise(function(n,s){function i(r){doRequest(e,t,{qs:o.qs,headers:o.headers,timeout:o.timeout}).nodeify(function(e,t){var a=e||t.statusCode>=400;if("function"==typeof o.retry&&(a=o.retry(e,t,r+1)),r>=(5|o.maxRetries)&&(a=!1),a){var u=o.retryDelay;"function"==typeof o.retryDelay&&(u=o.retryDelay(e,t,r+1)),u=u||200,setTimeout(function(){i(r+1)},u)}else e?s(e):n(t)})}var a=new window.XMLHttpRequest;if("string"!=typeof e)throw new TypeError("The method must be a string.");if("string"!=typeof t)throw new TypeError("The URL/path must be a string.");if("function"==typeof o&&(r=o,o={}),(null===o||void 0===o)&&(o={}),"object"!=typeof o)throw new TypeError("Options must be an object (or null).");if("function"!=typeof r&&(r=void 0),e=e.toUpperCase(),o.headers=o.headers||{},o.retry&&"GET"===e)return i(0);var u,d=!(!(u=/^([\w-]+:)?\/\/([^\/]+)/.exec(t))||u[2]==window.location.host);if(d||(o.headers["X-Requested-With"]="XMLHttpRequest"),o.qs&&(t=handleQs(t,o.qs)),o.json&&(o.body=JSON.stringify(o.json),o.headers["Content-Type"]="application/json"),o.timeout){a.timeout=o.timeout;var f=Date.now();a.ontimeout=function(){var e=Date.now()-f,t=new Error("Request timed out after "+e+"ms");t.timeout=!0,t.duration=e,s(t)}}a.onreadystatechange=function(){if(4===a.readyState){var e={};a.getAllResponseHeaders().split("\r\n").forEach(function(t){var o=t.split(":");o.length>1&&(e[o[0].toLowerCase()]=o.slice(1).join(":").trim())});var o=new Response(a.status,e,a.responseText);o.url=t,n(o)}},a.open(e,t,!0);for(var p in o.headers)a.setRequestHeader(p,o.headers[p]);a.send(o.body?o.body:null)});return n.getBody=function(){return n.then(function(e){return e.getBody()})},n.nodeify(r)}var Promise=require("promise"),Response=require("http-response-object"),handleQs=require("./lib/handle-qs.js");module.exports=doRequest;
  },{"./lib/handle-qs.js":2,"http-response-object":3,"promise":4}],2:[function(require,module,exports){
  "use strict";function handleQs(r,s){r=r.split("?");var i=r[0],e=(r[1]||"").split("#")[0],t=r[1]&&r[1].split("#").length>1?"#"+r[1].split("#")[1]:"",n=parse(e);for(var a in s)n[a]=s[a];return e=stringify(n),""!==e&&(e="?"+e),i+e+t}var parse=require("qs").parse,stringify=require("qs").stringify;module.exports=handleQs;
  },{"qs":14}],3:[function(require,module,exports){
  "use strict";function Response(t,e,s,o){if("number"!=typeof t)throw new TypeError("statusCode must be a number but was "+typeof t);if(null===e)throw new TypeError("headers cannot be null");if("object"!=typeof e)throw new TypeError("headers must be an object but was "+typeof e);this.statusCode=t,this.headers={};for(var r in e)this.headers[r.toLowerCase()]=e[r];this.body=s,this.url=o}module.exports=Response,Response.prototype.getBody=function(t){if(this.statusCode>=300){var e=new Error("Server responded with status code "+this.statusCode+":\n"+this.body.toString());throw e.statusCode=this.statusCode,e.headers=this.headers,e.body=this.body,e.url=this.url,e}return t?this.body.toString(t):this.body};
  },{}],4:[function(require,module,exports){
  "use strict";module.exports=require("./lib");
  },{"./lib":9}],5:[function(require,module,exports){
  "use strict";function noop(){}function getThen(e){try{return e.then}catch(n){return LAST_ERROR=n,IS_ERROR}}function tryCallOne(e,n){try{return e(n)}catch(o){return LAST_ERROR=o,IS_ERROR}}function tryCallTwo(e,n,o){try{e(n,o)}catch(t){return LAST_ERROR=t,IS_ERROR}}function Promise(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._45=0,this._81=0,this._65=null,this._54=null,e!==noop&&doResolve(e,this)}function safeThen(e,n,o){return new e.constructor(function(t,r){var i=new Promise(noop);i.then(t,r),handle(e,new Handler(n,o,i))})}function handle(e,n){for(;3===e._81;)e=e._65;return Promise._10&&Promise._10(e),0===e._81?0===e._45?(e._45=1,void(e._54=n)):1===e._45?(e._45=2,void(e._54=[e._54,n])):void e._54.push(n):void handleResolved(e,n)}function handleResolved(e,n){asap(function(){var o=1===e._81?n.onFulfilled:n.onRejected;if(null===o)return void(1===e._81?resolve(n.promise,e._65):reject(n.promise,e._65));var t=tryCallOne(o,e._65);t===IS_ERROR?reject(n.promise,LAST_ERROR):resolve(n.promise,t)})}function resolve(e,n){if(n===e)return reject(e,new TypeError("A promise cannot be resolved with itself."));if(n&&("object"==typeof n||"function"==typeof n)){var o=getThen(n);if(o===IS_ERROR)return reject(e,LAST_ERROR);if(o===e.then&&n instanceof Promise)return e._81=3,e._65=n,void finale(e);if("function"==typeof o)return void doResolve(o.bind(n),e)}e._81=1,e._65=n,finale(e)}function reject(e,n){e._81=2,e._65=n,Promise._97&&Promise._97(e,n),finale(e)}function finale(e){if(1===e._45&&(handle(e,e._54),e._54=null),2===e._45){for(var n=0;n<e._54.length;n++)handle(e,e._54[n]);e._54=null}}function Handler(e,n,o){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=o}function doResolve(e,n){var o=!1,t=tryCallTwo(e,function(e){o||(o=!0,resolve(n,e))},function(e){o||(o=!0,reject(n,e))});o||t!==IS_ERROR||(o=!0,reject(n,LAST_ERROR))}var asap=require("asap/raw"),LAST_ERROR=null,IS_ERROR={};module.exports=Promise,Promise._10=null,Promise._97=null,Promise._61=noop,Promise.prototype.then=function(e,n){if(this.constructor!==Promise)return safeThen(this,e,n);var o=new Promise(noop);return handle(this,new Handler(e,n,o)),o};
  },{"asap/raw":13}],6:[function(require,module,exports){
  "use strict";var Promise=require("./core.js");module.exports=Promise,Promise.prototype.done=function(t,e){var o=arguments.length?this.then.apply(this,arguments):this;o.then(null,function(t){setTimeout(function(){throw t},0)})};
  },{"./core.js":5}],7:[function(require,module,exports){
  "use strict";function valuePromise(e){var r=new Promise(Promise._61);return r._81=1,r._65=e,r}var Promise=require("./core.js");module.exports=Promise;var TRUE=valuePromise(!0),FALSE=valuePromise(!1),NULL=valuePromise(null),UNDEFINED=valuePromise(void 0),ZERO=valuePromise(0),EMPTYSTRING=valuePromise("");Promise.resolve=function(e){if(e instanceof Promise)return e;if(null===e)return NULL;if(void 0===e)return UNDEFINED;if(e===!0)return TRUE;if(e===!1)return FALSE;if(0===e)return ZERO;if(""===e)return EMPTYSTRING;if("object"==typeof e||"function"==typeof e)try{var r=e.then;if("function"==typeof r)return new Promise(r.bind(e))}catch(n){return new Promise(function(e,r){r(n)})}return valuePromise(e)},Promise.all=function(e){var r=Array.prototype.slice.call(e);return new Promise(function(e,n){function o(i,u){if(u&&("object"==typeof u||"function"==typeof u)){if(u instanceof Promise&&u.then===Promise.prototype.then){for(;3===u._81;)u=u._65;return 1===u._81?o(i,u._65):(2===u._81&&n(u._65),void u.then(function(e){o(i,e)},n))}var f=u.then;if("function"==typeof f){var s=new Promise(f.bind(u));return void s.then(function(e){o(i,e)},n)}}r[i]=u,0===--t&&e(r)}if(0===r.length)return e([]);for(var t=r.length,i=0;i<r.length;i++)o(i,r[i])})},Promise.reject=function(e){return new Promise(function(r,n){n(e)})},Promise.race=function(e){return new Promise(function(r,n){e.forEach(function(e){Promise.resolve(e).then(r,n)})})},Promise.prototype["catch"]=function(e){return this.then(null,e)};
  },{"./core.js":5}],8:[function(require,module,exports){
  "use strict";var Promise=require("./core.js");module.exports=Promise,Promise.prototype["finally"]=function(e){return this.then(function(r){return Promise.resolve(e()).then(function(){return r})},function(r){return Promise.resolve(e()).then(function(){throw r})})};
  },{"./core.js":5}],9:[function(require,module,exports){
  "use strict";module.exports=require("./core.js"),require("./done.js"),require("./finally.js"),require("./es6-extensions.js"),require("./node-extensions.js"),require("./synchronous.js");
  },{"./core.js":5,"./done.js":6,"./es6-extensions.js":7,"./finally.js":8,"./node-extensions.js":10,"./synchronous.js":11}],10:[function(require,module,exports){
  "use strict";function denodeifyWithCount(n,e){for(var r=[],t=0;e>t;t++)r.push("a"+t);var o=["return function ("+r.join(",")+") {","var self = this;","return new Promise(function (rs, rj) {","var res = fn.call(",["self"].concat(r).concat([callbackFn]).join(","),");","if (res &&",'(typeof res === "object" || typeof res === "function") &&','typeof res.then === "function"',") {rs(res);}","});","};"].join("");return Function(["Promise","fn"],o)(Promise,n)}function denodeifyWithoutCount(n){for(var e=Math.max(n.length-1,3),r=[],t=0;e>t;t++)r.push("a"+t);var o=["return function ("+r.join(",")+") {","var self = this;","var args;","var argLength = arguments.length;","if (arguments.length > "+e+") {","args = new Array(arguments.length + 1);","for (var i = 0; i < arguments.length; i++) {","args[i] = arguments[i];","}","}","return new Promise(function (rs, rj) {","var cb = "+callbackFn+";","var res;","switch (argLength) {",r.concat(["extra"]).map(function(n,e){return"case "+e+":res = fn.call("+["self"].concat(r.slice(0,e)).concat("cb").join(",")+");break;"}).join(""),"default:","args[argLength] = cb;","res = fn.apply(self, args);","}","if (res &&",'(typeof res === "object" || typeof res === "function") &&','typeof res.then === "function"',") {rs(res);}","});","};"].join("");return Function(["Promise","fn"],o)(Promise,n)}var Promise=require("./core.js"),asap=require("asap");module.exports=Promise,Promise.denodeify=function(n,e){return"number"==typeof e&&e!==1/0?denodeifyWithCount(n,e):denodeifyWithoutCount(n)};var callbackFn="function (err, res) {if (err) { rj(err); } else { rs(res); }}";Promise.nodeify=function(n){return function(){var e=Array.prototype.slice.call(arguments),r="function"==typeof e[e.length-1]?e.pop():null,t=this;try{return n.apply(this,arguments).nodeify(r,t)}catch(o){if(null===r||"undefined"==typeof r)return new Promise(function(n,e){e(o)});asap(function(){r.call(t,o)})}}},Promise.prototype.nodeify=function(n,e){return"function"!=typeof n?this:void this.then(function(r){asap(function(){n.call(e,null,r)})},function(r){asap(function(){n.call(e,r)})})};
  },{"./core.js":5,"asap":12}],11:[function(require,module,exports){
  "use strict";var Promise=require("./core.js");module.exports=Promise,Promise.enableSynchronous=function(){Promise.prototype.isPending=function(){return 0==this.getState()},Promise.prototype.isFulfilled=function(){return 1==this.getState()},Promise.prototype.isRejected=function(){return 2==this.getState()},Promise.prototype.getValue=function(){if(3===this._81)return this._65.getValue();if(!this.isFulfilled())throw new Error("Cannot get a value of an unfulfilled promise.");return this._65},Promise.prototype.getReason=function(){if(3===this._81)return this._65.getReason();if(!this.isRejected())throw new Error("Cannot get a rejection reason of a non-rejected promise.");return this._65},Promise.prototype.getState=function(){return 3===this._81?this._65.getState():-1===this._81||-2===this._81?0:this._81}},Promise.disableSynchronous=function(){Promise.prototype.isPending=void 0,Promise.prototype.isFulfilled=void 0,Promise.prototype.isRejected=void 0,Promise.prototype.getValue=void 0,Promise.prototype.getReason=void 0,Promise.prototype.getState=void 0};
  },{"./core.js":5}],12:[function(require,module,exports){
  "use strict";function throwFirstError(){if(pendingErrors.length)throw pendingErrors.shift()}function asap(r){var s;s=freeTasks.length?freeTasks.pop():new RawTask,s.task=r,rawAsap(s)}function RawTask(){this.task=null}var rawAsap=require("./raw"),freeTasks=[],pendingErrors=[],requestErrorThrow=rawAsap.makeRequestCallFromTimer(throwFirstError);module.exports=asap,RawTask.prototype.call=function(){try{this.task.call()}catch(r){asap.onerror?asap.onerror(r):(pendingErrors.push(r),requestErrorThrow())}finally{this.task=null,freeTasks[freeTasks.length]=this}};
  },{"./raw":13}],13:[function(require,module,exports){
  (function (global){
  "use strict";function rawAsap(e){queue.length||(requestFlush(),flushing=!0),queue[queue.length]=e}function flush(){for(;index<queue.length;){var e=index;if(index+=1,queue[e].call(),index>capacity){for(var u=0,r=queue.length-index;r>u;u++)queue[u]=queue[u+index];queue.length-=index,index=0}}queue.length=0,index=0,flushing=!1}function makeRequestCallFromMutationObserver(e){var u=1,r=new BrowserMutationObserver(e),t=document.createTextNode("");return r.observe(t,{characterData:!0}),function(){u=-u,t.data=u}}function makeRequestCallFromTimer(e){return function(){function u(){clearTimeout(r),clearInterval(t),e()}var r=setTimeout(u,0),t=setInterval(u,50)}}module.exports=rawAsap;var queue=[],flushing=!1,requestFlush,index=0,capacity=1024,BrowserMutationObserver=global.MutationObserver||global.WebKitMutationObserver;requestFlush="function"==typeof BrowserMutationObserver?makeRequestCallFromMutationObserver(flush):makeRequestCallFromTimer(flush),rawAsap.requestFlush=requestFlush,rawAsap.makeRequestCallFromTimer=makeRequestCallFromTimer;
  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  
  },{}],14:[function(require,module,exports){
  "use strict";var Stringify=require("./stringify"),Parse=require("./parse");module.exports={stringify:Stringify,parse:Parse};
  },{"./parse":15,"./stringify":16}],15:[function(require,module,exports){
  "use strict";var Utils=require("./utils"),internals={delimiter:"&",depth:5,arrayLimit:20,parameterLimit:1e3,strictNullHandling:!1,plainObjects:!1,allowPrototypes:!1,allowDots:!1};internals.parseValues=function(e,t){for(var r={},l=e.split(t.delimiter,t.parameterLimit===1/0?void 0:t.parameterLimit),a=0;a<l.length;++a){var i=l[a],n=-1===i.indexOf("]=")?i.indexOf("="):i.indexOf("]=")+1;if(-1===n)r[Utils.decode(i)]="",t.strictNullHandling&&(r[Utils.decode(i)]=null);else{var s=Utils.decode(i.slice(0,n)),o=Utils.decode(i.slice(n+1));Object.prototype.hasOwnProperty.call(r,s)?r[s]=[].concat(r[s]).concat(o):r[s]=o}}return r},internals.parseObject=function(e,t,r){if(!e.length)return t;var l,a=e.shift();if("[]"===a)l=[],l=l.concat(internals.parseObject(e,t,r));else{l=r.plainObjects?Object.create(null):{};var i="["===a[0]&&"]"===a[a.length-1]?a.slice(1,a.length-1):a,n=parseInt(i,10);!isNaN(n)&&a!==i&&String(n)===i&&n>=0&&r.parseArrays&&n<=r.arrayLimit?(l=[],l[n]=internals.parseObject(e,t,r)):l[i]=internals.parseObject(e,t,r)}return l},internals.parseKeys=function(e,t,r){if(e){var l=r.allowDots?e.replace(/\.([^\.\[]+)/g,"[$1]"):e,a=/^([^\[\]]*)/,i=/(\[[^\[\]]*\])/g,n=a.exec(l),s=[];if(n[1]){if(!r.plainObjects&&Object.prototype.hasOwnProperty(n[1])&&!r.allowPrototypes)return;s.push(n[1])}for(var o=0;null!==(n=i.exec(l))&&o<r.depth;)o+=1,(r.plainObjects||!Object.prototype.hasOwnProperty(n[1].replace(/\[|\]/g,""))||r.allowPrototypes)&&s.push(n[1]);return n&&s.push("["+l.slice(n.index)+"]"),internals.parseObject(s,t,r)}},module.exports=function(e,t){var r=t||{};if(r.delimiter="string"==typeof r.delimiter||Utils.isRegExp(r.delimiter)?r.delimiter:internals.delimiter,r.depth="number"==typeof r.depth?r.depth:internals.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:internals.arrayLimit,r.parseArrays=r.parseArrays!==!1,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:internals.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:internals.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:internals.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:internals.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:internals.strictNullHandling,""===e||null===e||"undefined"==typeof e)return r.plainObjects?Object.create(null):{};for(var l="string"==typeof e?internals.parseValues(e,r):e,a=r.plainObjects?Object.create(null):{},i=Object.keys(l),n=0;n<i.length;++n){var s=i[n],o=internals.parseKeys(s,l[s],r);a=Utils.merge(a,o,r)}return Utils.compact(a)};
  },{"./utils":17}],16:[function(require,module,exports){
  "use strict";var Utils=require("./utils"),internals={delimiter:"&",arrayPrefixGenerators:{brackets:function(e){return e+"[]"},indices:function(e,r){return e+"["+r+"]"},repeat:function(e){return e}},strictNullHandling:!1,skipNulls:!1,encode:!0};internals.stringify=function(e,r,n,t,i,l,a,s,o){var f=e;if("function"==typeof a)f=a(r,f);else if(Utils.isBuffer(f))f=String(f);else if(f instanceof Date)f=f.toISOString();else if(null===f){if(t)return l?Utils.encode(r):r;f=""}if("string"==typeof f||"number"==typeof f||"boolean"==typeof f)return l?[Utils.encode(r)+"="+Utils.encode(f)]:[r+"="+f];var u=[];if("undefined"==typeof f)return u;var c;if(Array.isArray(a))c=a;else{var y=Object.keys(f);c=s?y.sort(s):y}for(var d=0;d<c.length;++d){var p=c[d];i&&null===f[p]||(u=Array.isArray(f)?u.concat(internals.stringify(f[p],n(r,p),n,t,i,l,a,s,o)):u.concat(internals.stringify(f[p],r+(o?"."+p:"["+p+"]"),n,t,i,l,a,s,o)))}return u},module.exports=function(e,r){var n,t,i=e,l=r||{},a="undefined"==typeof l.delimiter?internals.delimiter:l.delimiter,s="boolean"==typeof l.strictNullHandling?l.strictNullHandling:internals.strictNullHandling,o="boolean"==typeof l.skipNulls?l.skipNulls:internals.skipNulls,f="boolean"==typeof l.encode?l.encode:internals.encode,u="function"==typeof l.sort?l.sort:null,c="undefined"==typeof l.allowDots?!1:l.allowDots;"function"==typeof l.filter?(t=l.filter,i=t("",i)):Array.isArray(l.filter)&&(n=t=l.filter);var y=[];if("object"!=typeof i||null===i)return"";var d;d=l.arrayFormat in internals.arrayPrefixGenerators?l.arrayFormat:"indices"in l?l.indices?"indices":"repeat":"indices";var p=internals.arrayPrefixGenerators[d];n||(n=Object.keys(i)),u&&n.sort(u);for(var g=0;g<n.length;++g){var v=n[g];o&&null===i[v]||(y=y.concat(internals.stringify(i[v],v,p,s,o,f,t,u,c)))}return y.join(a)};
  },{"./utils":17}],17:[function(require,module,exports){
  "use strict";var hexTable=function(){for(var e=new Array(256),r=0;256>r;++r)e[r]="%"+((16>r?"0":"")+r.toString(16)).toUpperCase();return e}();exports.arrayToObject=function(e,r){for(var t=r.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!=typeof e[n]&&(t[n]=e[n]);return t},exports.merge=function(e,r,t){if(!r)return e;if("object"!=typeof r){if(Array.isArray(e))e.push(r);else{if("object"!=typeof e)return[e,r];e[r]=!0}return e}if("object"!=typeof e)return[e].concat(r);var n=e;return Array.isArray(e)&&!Array.isArray(r)&&(n=exports.arrayToObject(e,t)),Object.keys(r).reduce(function(e,n){var o=r[n];return Object.prototype.hasOwnProperty.call(e,n)?e[n]=exports.merge(e[n],o,t):e[n]=o,e},n)},exports.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(r){return e}},exports.encode=function(e){if(0===e.length)return e;for(var r="string"==typeof e?e:String(e),t="",n=0;n<r.length;++n){var o=r.charCodeAt(n);45===o||46===o||95===o||126===o||o>=48&&57>=o||o>=65&&90>=o||o>=97&&122>=o?t+=r.charAt(n):128>o?t+=hexTable[o]:2048>o?t+=hexTable[192|o>>6]+hexTable[128|63&o]:55296>o||o>=57344?t+=hexTable[224|o>>12]+hexTable[128|o>>6&63]+hexTable[128|63&o]:(n+=1,o=65536+((1023&o)<<10|1023&r.charCodeAt(n)),t+=hexTable[240|o>>18]+hexTable[128|o>>12&63]+hexTable[128|o>>6&63]+hexTable[128|63&o])}return t},exports.compact=function(e,r){if("object"!=typeof e||null===e)return e;var t=r||[],n=t.indexOf(e);if(-1!==n)return t[n];if(t.push(e),Array.isArray(e)){for(var o=[],a=0;a<e.length;++a)"undefined"!=typeof e[a]&&o.push(e[a]);return o}for(var c=Object.keys(e),u=0;u<c.length;++u){var f=c[u];e[f]=exports.compact(e[f],t)}return e},exports.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},exports.isBuffer=function(e){return null===e||"undefined"==typeof e?!1:!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))};
  },{}]},{},[1])(1)
  });
  
  
  //# sourceMappingURL=request.min.js.map