!function i(a,l,u){function s(t,e){if(!l[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=l[t]={exports:{}};a[t][0].call(o.exports,function(e){return s(a[t][1][e]||e)},o,o.exports,i,a,l,u)}return l[t].exports}for(var c="function"==typeof require&&require,e=0;e<u.length;e++)s(u[e]);return s}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("mithril"),i=e("../../src");o.mount(document.getElementById("knob-demo"),function(){var t={one:Math.random(),two:Math.random()};function e(e){t.one=e}function n(e){t.two=e}var r={one:!1,two:!1};return{view:function(){return o(".demo",o("h3","Demos"),o("p","Here is a basic unstyled example and a rounded style knob that spins. Adjust values by dragging up/down within the knobs, or by focusing with the keyboard."),o(".knobs",o(i.default,{value:t.one,distance:r.one?1e3:100,onDrag:e,onChange:e},o(".knob-value",t.one.toFixed(2))),o("button.btn",{class:r.one?"active":"",onclick:function(){r.one=!r.one}},"FINE"),o(i.default,{class:"knob-round",distance:r.two?1e3:100,value:t.two,onDrag:n,onChange:n},o(".knob-spin",{style:{transform:"rotateZ("+(300*t.two-150)+"deg)"}},o(".knob-spin-tic")),o(".knob-spin-value",t.two.toFixed(2))),o("button.btn",{class:r.two?"active":"",onclick:function(){r.two=!r.two}},"FINE")))}}})},{"../../src":27,mithril:5}],2:[function(e,t,n){"use strict";var u=e("../render/vnode");t.exports=function(r,e,t){var o=[],n=!1,i=!1;function a(){if(n)throw new Error("Nested m.redraw.sync() call");n=!0;for(var e=0;e<o.length;e+=2)try{r(o[e],u(o[e+1]),l)}catch(e){t.error(e)}n=!1}function l(){i||(i=!0,e(function(){i=!1,a()}))}return l.sync=a,{mount:function(e,t){if(null!=t&&null==t.view&&"function"!=typeof t)throw new TypeError("m.mount(element, component) expects a component, not a vnode");var n=o.indexOf(e);0<=n&&(o.splice(n,2),r(e,[],l)),null!=t&&(o.push(e,t),r(e,u(t),l))},redraw:l}}},{"../render/vnode":21}],3:[function(e,t,n){(function(E){"use strict";var T=e("../render/vnode"),a=e("../render/hyperscript"),k=e("../promise/promise"),i=e("../pathname/build"),A=e("../pathname/parse"),S=e("../pathname/compileTemplate"),L=e("../pathname/assign"),C={};t.exports=function(d,p){var u;function v(e,t,n){if(e=i(e,t),null!=u){u();var r=n?n.state:null,o=n?n.title:null;n&&n.replace?d.history.replaceState(r,o,x.prefix+e):d.history.pushState(r,o,x.prefix+e)}else d.location.href=x.prefix+e}var m,h,y,g,w=C,b=x.SKIP={};function x(e,t,n){if(null==e)throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined");var r,s=0,c=Object.keys(n).map(function(e){if("/"!==e[0])throw new SyntaxError("Routes must start with a `/`");if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`");return{route:e,component:n[e],check:S(e)}}),o="function"==typeof E?E:setTimeout,f=k.resolve(),i=!1;if((u=null)!=t){var a=A(t);if(!c.some(function(e){return e.check(a)}))throw new ReferenceError("Default route doesn't match any known routes")}function l(){i=!1;var e=d.location.hash;"#"!==x.prefix[0]&&(e=d.location.search+e,"?"!==x.prefix[0]&&"/"!==(e=d.location.pathname+e)[0]&&(e="/"+e));var a=e.concat().replace(/(?:%[a-f89][a-f0-9])+/gim,decodeURIComponent).slice(x.prefix.length),l=A(a);function u(){if(a===t)throw new Error("Could not resolve default route "+t);v(t,null,{replace:!0})}L(l.params,d.history.state),function t(n){for(;n<c.length;n++)if(c[n].check(l)){var r=c[n].component,e=c[n].route,o=r,i=g=function(e){if(i===g){if(e===b)return t(n+1);m=null==e||"function"!=typeof e.view&&"function"!=typeof e?"div":e,h=l.params,y=a,g=null,w=r.render?r:null,2===s?p.redraw():(s=2,p.redraw.sync())}};return void(r.view||"function"==typeof r?(r={},i(o)):r.onmatch?f.then(function(){return r.onmatch(l.params,a,e)}).then(i,u):i("div"))}u()}(0)}return u=function(){i||(i=!0,o(l))},"function"==typeof d.history.pushState?(r=function(){d.removeEventListener("popstate",u,!1)},d.addEventListener("popstate",u,!1)):"#"===x.prefix[0]&&(u=null,r=function(){d.removeEventListener("hashchange",l,!1)},d.addEventListener("hashchange",l,!1)),p.mount(e,{onbeforeupdate:function(){return!(!(s=s?2:1)||C===w)},oncreate:l,onremove:r,view:function(){if(s&&C!==w){var e=[T(m,h.key,h)];return w&&(e=w.render(e[0])),e}}})}return x.set=function(e,t,n){null!=g&&((n=n||{}).replace=!0),g=null,v(e,t,n)},x.get=function(){return y},x.prefix="#!",x.Link={view:function(e){var n,r,o=e.attrs.options,t={};L(t,e.attrs),t.selector=t.options=t.key=t.oninit=t.oncreate=t.onbeforeupdate=t.onupdate=t.onbeforeremove=t.onremove=null;var i=a(e.attrs.selector||"a",t,e.children);return(i.attrs.disabled=Boolean(i.attrs.disabled))?(i.attrs.href=null,i.attrs["aria-disabled"]="true",i.attrs.onclick=null):(n=i.attrs.onclick,r=i.attrs.href,i.attrs.href=x.prefix+r,i.attrs.onclick=function(e){var t;"function"==typeof n?t=n.call(e.currentTarget,e):null==n||"object"!=typeof n||"function"==typeof n.handleEvent&&n.handleEvent(e),!1===t||e.defaultPrevented||0!==e.button&&0!==e.which&&1!==e.which||e.currentTarget.target&&"_self"!==e.currentTarget.target||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||(e.preventDefault(),e.redraw=!1,x.set(r,null,o))}),i}},x.param=function(e){return h&&null!=e?h[e]:h},x}}).call(this,e("timers").setImmediate)},{"../pathname/assign":7,"../pathname/build":8,"../pathname/compileTemplate":9,"../pathname/parse":10,"../promise/promise":12,"../render/hyperscript":17,"../render/vnode":21,timers:26}],4:[function(e,t,n){"use strict";var r=e("./render/hyperscript");r.trust=e("./render/trust"),r.fragment=e("./render/fragment"),t.exports=r},{"./render/fragment":16,"./render/hyperscript":17,"./render/trust":20}],5:[function(e,t,n){"use strict";function r(){return o.apply(this,arguments)}var o=e("./hyperscript"),i=e("./request"),a=e("./mount-redraw");r.m=o,r.trust=o.trust,r.fragment=o.fragment,r.mount=a.mount,r.route=e("./route"),r.render=e("./render"),r.redraw=a.redraw,r.request=i.request,r.jsonp=i.jsonp,r.parseQueryString=e("./querystring/parse"),r.buildQueryString=e("./querystring/build"),r.parsePathname=e("./pathname/parse"),r.buildPathname=e("./pathname/build"),r.vnode=e("./render/vnode"),r.PromisePolyfill=e("./promise/polyfill"),t.exports=r},{"./hyperscript":4,"./mount-redraw":6,"./pathname/build":8,"./pathname/parse":10,"./promise/polyfill":11,"./querystring/build":13,"./querystring/parse":14,"./render":15,"./render/vnode":21,"./request":22,"./route":24}],6:[function(e,t,n){"use strict";var r=e("./render");t.exports=e("./api/mount-redraw")(r,requestAnimationFrame,console)},{"./api/mount-redraw":2,"./render":15}],7:[function(e,t,n){"use strict";t.exports=Object.assign||function(t,n){n&&Object.keys(n).forEach(function(e){t[e]=n[e]})}},{}],8:[function(e,t,n){"use strict";var m=e("../querystring/build"),h=e("./assign");t.exports=function(e,r){if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Template parameter names *must* be separated");if(null==r)return e;var t=e.indexOf("?"),n=e.indexOf("#"),o=n<0?e.length:n,i=t<0?o:t,a=e.slice(0,i),l={};h(l,r);var u=a.replace(/:([^\/\.-]+)(\.{3})?/g,function(e,t,n){return delete l[t],null==r[t]?e:n?r[t]:encodeURIComponent(String(r[t]))}),s=u.indexOf("?"),c=u.indexOf("#"),f=c<0?u.length:c,d=s<0?f:s,p=u.slice(0,d);0<=t&&(p+=e.slice(t,o)),0<=s&&(p+=(t<0?"?":"&")+u.slice(s,f));var v=m(l);return v&&(p+=(t<0&&s<0?"?":"&")+v),0<=n&&(p+=e.slice(n)),0<=c&&(p+=(n<0?"":"&")+u.slice(c)),p}},{"../querystring/build":13,"./assign":7}],9:[function(e,t,n){"use strict";var l=e("./parse");t.exports=function(e){var r=l(e),o=Object.keys(r.params),i=[],a=new RegExp("^"+r.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,function(e,t,n){return null==t?"\\"+e:(i.push({k:t,r:"..."===n}),"..."===n?"(.*)":"."===n?"([^/]+)\\.":"([^/]+)"+(n||""))})+"$");return function(e){for(var t=0;t<o.length;t++)if(r.params[o[t]]!==e.params[o[t]])return!1;if(!i.length)return a.test(e.path);var n=a.exec(e.path);if(null==n)return!1;for(t=0;t<i.length;t++)e.params[i[t].k]=i[t].r?n[t+1]:decodeURIComponent(n[t+1]);return!0}}},{"./parse":10}],10:[function(e,t,n){"use strict";var a=e("../querystring/parse");t.exports=function(e){var t=e.indexOf("?"),n=e.indexOf("#"),r=n<0?e.length:n,o=t<0?r:t,i=e.slice(0,o).replace(/\/{2,}/g,"/");return i?("/"!==i[0]&&(i="/"+i),1<i.length&&"/"===i[i.length-1]&&(i=i.slice(0,-1))):i="/",{path:i,params:t<0?{}:a(e.slice(t+1,r))}}},{"../querystring/parse":14}],11:[function(e,t,n){(function(n){"use strict";var d=function(e){if(!(this instanceof d))throw new Error("Promise must be called with `new`");if("function"!=typeof e)throw new TypeError("executor must be a function");var i=this,a=[],l=[],o=t(a,!0),u=t(l,!1),s=i._instance={resolvers:a,rejectors:l},c="function"==typeof n?n:setTimeout;function t(r,o){return function t(n){var e;try{if(!o||null==n||"object"!=typeof n&&"function"!=typeof n||"function"!=typeof(e=n.then))c(function(){o||0!==r.length||console.error("Possible unhandled promise rejection:",n);for(var e=0;e<r.length;e++)r[e](n);a.length=0,l.length=0,s.state=o,s.retry=function(){t(n)}});else{if(n===i)throw new TypeError("Promise can't be resolved w/ itself");f(e.bind(n))}}catch(e){u(e)}}}function f(e){var n=0;function t(t){return function(e){0<n++||t(e)}}var r=t(u);try{e(t(o),r)}catch(e){r(e)}}f(e)};d.prototype.then=function(e,t){var o,i,a=this._instance;function n(t,e,n,r){e.push(function(e){if("function"!=typeof t)n(e);else try{o(t(e))}catch(e){i&&i(e)}}),"function"==typeof a.retry&&r===a.state&&a.retry()}var r=new d(function(e,t){o=e,i=t});return n(e,a.resolvers,o,!0),n(t,a.rejectors,i,!1),r},d.prototype.catch=function(e){return this.then(null,e)},d.prototype.finally=function(t){return this.then(function(e){return d.resolve(t()).then(function(){return e})},function(e){return d.resolve(t()).then(function(){return d.reject(e)})})},d.resolve=function(t){return t instanceof d?t:new d(function(e){e(t)})},d.reject=function(n){return new d(function(e,t){t(n)})},d.all=function(l){return new d(function(n,r){var o=l.length,i=0,a=[];if(0===l.length)n([]);else for(var e=0;e<l.length;e++)!function(t){function e(e){i++,a[t]=e,i===o&&n(a)}null==l[t]||"object"!=typeof l[t]&&"function"!=typeof l[t]||"function"!=typeof l[t].then?e(l[t]):l[t].then(e,r)}(e)})},d.race=function(r){return new d(function(e,t){for(var n=0;n<r.length;n++)r[n].then(e,t)})},t.exports=d}).call(this,e("timers").setImmediate)},{timers:26}],12:[function(n,r,e){(function(e){"use strict";var t=n("./polyfill");"undefined"!=typeof window?(void 0===window.Promise?window.Promise=t:window.Promise.prototype.finally||(window.Promise.prototype.finally=t.prototype.finally),r.exports=window.Promise):void 0!==e?(void 0===e.Promise?e.Promise=t:e.Promise.prototype.finally||(e.Promise.prototype.finally=t.prototype.finally),r.exports=e.Promise):r.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./polyfill":11}],13:[function(e,t,n){"use strict";t.exports=function(e){if("[object Object]"!==Object.prototype.toString.call(e))return"";var r=[];for(var t in e)o(t,e[t]);return r.join("&");function o(e,t){if(Array.isArray(t))for(var n=0;n<t.length;n++)o(e+"["+n+"]",t[n]);else if("[object Object]"===Object.prototype.toString.call(t))for(var n in t)o(e+"["+n+"]",t[n]);else r.push(encodeURIComponent(e)+(null!=t&&""!==t?"="+encodeURIComponent(t):""))}}},{}],14:[function(e,t,n){"use strict";t.exports=function(e){if(""===e||null==e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var t=e.split("&"),n={},r={},o=0;o<t.length;o++){var i=t[o].split("="),a=decodeURIComponent(i[0]),l=2===i.length?decodeURIComponent(i[1]):"";"true"===l?l=!0:"false"===l&&(l=!1);var u=a.split(/\]\[?|\[/),s=r;-1<a.indexOf("[")&&u.pop();for(var c=0;c<u.length;c++){var f=u[c],d=u[c+1],p=""==d||!isNaN(parseInt(d,10));if(""===f)null==n[a=u.slice(0,c).join()]&&(n[a]=Array.isArray(s)?s.length:0),f=n[a]++;else if("__proto__"===f)break;if(c===u.length-1)s[f]=l;else{var v=Object.getOwnPropertyDescriptor(s,f);null!=v&&(v=v.value),null==v&&(s[f]=v=p?[]:{}),s=v}}}return r}},{}],15:[function(e,t,n){"use strict";t.exports=e("./render/render")(window)},{"./render/render":19}],16:[function(e,t,n){"use strict";var r=e("../render/vnode"),o=e("./hyperscriptVnode");t.exports=function(){var e=o.apply(0,arguments);return e.tag="[",e.children=r.normalizeChildren(e.children),e}},{"../render/vnode":21,"./hyperscriptVnode":18}],17:[function(e,t,n){"use strict";var u=e("../render/vnode"),r=e("./hyperscriptVnode"),s=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,c={},f={}.hasOwnProperty;function d(e){for(var t in e)if(f.call(e,t))return!1;return!0}t.exports=function(e){if(null==e||"string"!=typeof e&&"function"!=typeof e&&"function"!=typeof e.view)throw Error("The selector must be either a string or a component.");var t=r.apply(1,arguments);return"string"==typeof e&&(t.children=u.normalizeChildren(t.children),"["!==e)?function(e,t){var n=t.attrs,r=u.normalizeChildren(t.children),o=f.call(n,"class"),i=o?n.class:n.className;if(t.tag=e.tag,t.attrs=null,t.children=void 0,!d(e.attrs)&&!d(n)){var a={};for(var l in n)f.call(n,l)&&(a[l]=n[l]);n=a}for(var l in e.attrs)f.call(e.attrs,l)&&"className"!==l&&!f.call(n,l)&&(n[l]=e.attrs[l]);for(var l in null==i&&null==e.attrs.className||(n.className=null!=i?null!=e.attrs.className?String(e.attrs.className)+" "+String(i):i:null!=e.attrs.className?e.attrs.className:null),o&&(n.class=null),n)if(f.call(n,l)&&"key"!==l){t.attrs=n;break}return Array.isArray(r)&&1===r.length&&null!=r[0]&&"#"===r[0].tag?t.text=r[0].children:t.children=r,t}(c[e]||function(e){for(var t,n="div",r=[],o={};t=s.exec(e);){var i=t[1],a=t[2];if(""===i&&""!==a)n=a;else if("#"===i)o.id=a;else if("."===i)r.push(a);else if("["===t[3][0]){var l=t[6];l=l&&l.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\"),"class"===t[4]?r.push(l):o[t[4]]=""===l?l:l||!0}}return 0<r.length&&(o.className=r.join(" ")),c[e]={tag:n,attrs:o}}(e),t):(t.tag=e,t)}},{"../render/vnode":21,"./hyperscriptVnode":18}],18:[function(e,t,n){"use strict";var r=e("../render/vnode");t.exports=function(){var e,t=arguments[this],n=this+1;if(null==t?t={}:"object"==typeof t&&null==t.tag&&!Array.isArray(t)||(t={},n=this),arguments.length===n+1)e=arguments[n],Array.isArray(e)||(e=[e]);else for(e=[];n<arguments.length;)e.push(arguments[n++]);return r("",t.key,t,e)}},{"../render/vnode":21}],19:[function(e,t,n){"use strict";var q=e("../render/vnode");t.exports=function(e){var u,v=e&&e.document,t={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"};function m(e){return e.attrs&&e.attrs.xmlns||t[e.tag]}function s(e,t){if(e.state!==t)throw new Error("`vnode.state` must not be modified")}function h(e){var t=e.state;try{return this.apply(t,arguments)}finally{s(e,t)}}function c(){try{return v.activeElement}catch(e){return null}}function C(e,t,n,r,o,i,a){for(var l=n;l<r;l++){var u=t[l];null!=u&&_(e,u,o,a,i)}}function _(e,t,n,r,o){var i,a,l,u,s,c,f,d,p=t.tag;if("string"==typeof p)switch(t.state={},null!=t.attrs&&L(t.attrs,t,n),p){case"#":c=e,d=o,(f=t).dom=v.createTextNode(f.children),g(c,f.dom,d);break;case"<":y(e,t,r,o);break;case"[":!function(e,t,n,r,o){var i=v.createDocumentFragment();if(null!=t.children){var a=t.children;C(i,a,0,a.length,n,null,r)}t.dom=i.firstChild,t.domSize=i.childNodes.length,g(e,i,o)}(e,t,n,r,o);break;default:!function(e,t,n,r,o){var i=t.tag,a=t.attrs,l=a&&a.is,u=(r=m(t)||r)?l?v.createElementNS(r,i,{is:l}):v.createElementNS(r,i):l?v.createElement(i,{is:l}):v.createElement(i);t.dom=u,null!=a&&function(e,t,n){for(var r in t)E(e,r,null,t[r],n)}(t,a,r);if(g(e,u,o),!w(t)&&(null!=t.text&&(""!==t.text?u.textContent=t.text:t.children=[q("#",void 0,void 0,t.text,void 0,void 0)]),null!=t.children)){var s=t.children;C(u,s,0,s.length,n,null,r),"select"===t.tag&&null!=a&&function(e,t){if("value"in t)if(null===t.value)-1!==e.dom.selectedIndex&&(e.dom.value=null);else{var n=""+t.value;e.dom.value===n&&-1!==e.dom.selectedIndex||(e.dom.value=n)}"selectedIndex"in t&&E(e,"selectedIndex",null,t.selectedIndex,void 0)}(t,a)}}(e,t,n,r,o)}else i=e,u=r,s=o,function(e,t){var n;if("function"==typeof e.tag.view){if(e.state=Object.create(e.tag),null!=(n=e.state.view).$$reentrantLock$$)return;n.$$reentrantLock$$=!0}else{if(e.state=void 0,null!=(n=e.tag).$$reentrantLock$$)return;n.$$reentrantLock$$=!0,e.state=null!=e.tag.prototype&&"function"==typeof e.tag.prototype.view?new e.tag(e):e.tag(e)}L(e.state,e,t),null!=e.attrs&&L(e.attrs,e,t);if(e.instance=q.normalize(h.call(e.state.view,e)),e.instance===e)throw Error("A view cannot return the vnode it received as argument");n.$$reentrantLock$$=null}(a=t,l=n),null!=a.instance?(_(i,a.instance,l,u,s),a.dom=a.instance.dom,a.domSize=null!=a.dom?a.instance.domSize:0):a.domSize=0}var f={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"};function y(e,t,n,r){var o=t.children.match(/^\s*?<(\w+)/im)||[],i=v.createElement(f[o[1]]||"div");"http://www.w3.org/2000/svg"===n?(i.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t.children+"</svg>",i=i.firstChild):i.innerHTML=t.children,t.dom=i.firstChild,t.domSize=i.childNodes.length,t.instance=[];for(var a,l=v.createDocumentFragment();a=i.firstChild;)t.instance.push(a),l.appendChild(a);g(e,l,r)}function d(e,t,n,r,o,i){if(t!==n&&(null!=t||null!=n))if(null==t||0===t.length)C(e,n,0,n.length,r,o,i);else if(null==n||0===n.length)z(e,t,0,t.length);else{var a=null!=t[0]&&null!=t[0].key,l=null!=n[0]&&null!=n[0].key,u=0,s=0;if(!a)for(;s<t.length&&null==t[s];)s++;if(!l)for(;u<n.length&&null==n[u];)u++;if(null===l&&null==a)return;if(a!=l)z(e,t,s,t.length),C(e,n,u,n.length,r,o,i);else if(l){for(var c,f,d,p,v,m=t.length-1,h=n.length-1;s<=m&&u<=h&&(d=t[m],p=n[h],d.key===p.key);)d!==p&&I(e,d,p,r,o,i),null!=p.dom&&(o=p.dom),m--,h--;for(;s<=m&&u<=h&&(c=t[s],f=n[u],c.key===f.key);)s++,u++,c!==f&&I(e,c,f,r,j(t,s,o),i);for(;s<=m&&u<=h&&u!==h&&c.key===p.key&&d.key===f.key;)O(e,d,v=j(t,s,o)),d!==f&&I(e,d,f,r,v,i),++u<=--h&&O(e,c,o),c!==p&&I(e,c,p,r,o,i),null!=p.dom&&(o=p.dom),s++,d=t[--m],p=n[h],c=t[s],f=n[u];for(;s<=m&&u<=h&&d.key===p.key;)d!==p&&I(e,d,p,r,o,i),null!=p.dom&&(o=p.dom),h--,d=t[--m],p=n[h];if(h<u)z(e,t,s,m+1);else if(m<s)C(e,n,u,h+1,r,o,i);else{var y,g,w=o,b=h-u+1,x=new Array(b),E=0,T=0,k=2147483647,A=0;for(T=0;T<b;T++)x[T]=-1;for(T=h;u<=T;T--){null==y&&(y=D(t,s,m+1));var S=y[(p=n[T]).key];null!=S&&(k=S<k?S:-1,d=t[x[T-u]=S],t[S]=null,d!==p&&I(e,d,p,r,o,i),null!=p.dom&&(o=p.dom),A++)}if(o=w,A!==m-s+1&&z(e,t,s,m+1),0===A)C(e,n,u,h+1,r,o,i);else if(-1===k)for(E=(g=function(e){var t=[0],n=0,r=0,o=0,i=N.length=e.length;for(o=0;o<i;o++)N[o]=e[o];for(o=0;o<i;++o)if(-1!==e[o]){var a=t[t.length-1];if(e[a]<e[o])N[o]=a,t.push(o);else{for(n=0,r=t.length-1;n<r;){var l=(n>>>1)+(r>>>1)+(n&r&1);e[t[l]]<e[o]?n=1+l:r=l}e[o]<e[t[n]]&&(0<n&&(N[o]=t[n-1]),t[n]=o)}}n=t.length,r=t[n-1];for(;0<n--;)t[n]=r,r=N[r];return N.length=0,t}(x)).length-1,T=h;u<=T;T--)f=n[T],-1===x[T-u]?_(e,f,r,i,o):g[E]===T-u?E--:O(e,f,o),null!=f.dom&&(o=n[T].dom);else for(T=h;u<=T;T--)f=n[T],-1===x[T-u]&&_(e,f,r,i,o),null!=f.dom&&(o=n[T].dom)}}else{var L=t.length<n.length?t.length:n.length;for(u=u<s?u:s;u<L;u++)(c=t[u])===(f=n[u])||null==c&&null==f||(null==c?_(e,f,r,i,j(t,u+1,o)):null==f?P(e,c):I(e,c,f,r,j(t,u+1,o),i));t.length>L&&z(e,t,u,t.length),n.length>L&&C(e,n,u,n.length,r,o,i)}}}function I(e,t,n,r,o,i){var a,l,u,s,c,f=t.tag;if(f===n.tag){if(n.state=t.state,n.events=t.events,function(e,t){do{var n;if(null!=e.attrs&&"function"==typeof e.attrs.onbeforeupdate)if(void 0!==(n=h.call(e.attrs.onbeforeupdate,e,t))&&!n)break;if("string"!=typeof e.tag&&"function"==typeof e.state.onbeforeupdate)if(void 0!==(n=h.call(e.state.onbeforeupdate,e,t))&&!n)break;return!1}while(0);return e.dom=t.dom,e.domSize=t.domSize,e.instance=t.instance,e.attrs=t.attrs,e.children=t.children,e.text=t.text,!0}(n,t))return;if("string"==typeof f)switch(null!=n.attrs&&M(n.attrs,n,r),f){case"#":!function(e,t){e.children.toString()!==t.children.toString()&&(e.dom.nodeValue=t.children);t.dom=e.dom}(t,n);break;case"<":a=e,u=n,s=i,c=o,(l=t).children!==u.children?(p(a,l),y(a,u,s,c)):(u.dom=l.dom,u.domSize=l.domSize,u.instance=l.instance);break;case"[":!function(e,t,n,r,o,i){d(e,t.children,n.children,r,o,i);var a=0,l=n.children;if(n.dom=null,null!=l){for(var u=0;u<l.length;u++){var s=l[u];null!=s&&null!=s.dom&&(null==n.dom&&(n.dom=s.dom),a+=s.domSize||1)}1!==a&&(n.domSize=a)}}(e,t,n,r,o,i);break;default:!function(e,t,n,r){var o=t.dom=e.dom;r=m(t)||r,"textarea"===t.tag&&(null==t.attrs&&(t.attrs={}),null!=t.text&&(t.attrs.value=t.text,t.text=void 0));(function(e,t,n,r){if(null!=n)for(var o in n)E(e,o,t&&t[o],n[o],r);var i;if(null!=t)for(var o in t)null==(i=t[o])||null!=n&&null!=n[o]||T(e,o,i,r)})(t,e.attrs,t.attrs,r),w(t)||(null!=e.text&&null!=t.text&&""!==t.text?e.text.toString()!==t.text.toString()&&(e.dom.firstChild.nodeValue=t.text):(null!=e.text&&(e.children=[q("#",void 0,void 0,e.text,void 0,e.dom.firstChild)]),null!=t.text&&(t.children=[q("#",void 0,void 0,t.text,void 0,void 0)]),d(o,e.children,t.children,n,null,r)))}(t,n,r,i)}else!function(e,t,n,r,o,i){if(n.instance=q.normalize(h.call(n.state.view,n)),n.instance===n)throw Error("A view cannot return the vnode it received as argument");M(n.state,n,r),null!=n.attrs&&M(n.attrs,n,r);null!=n.instance?(null==t.instance?_(e,n.instance,r,i,o):I(e,t.instance,n.instance,r,o,i),n.dom=n.instance.dom,n.domSize=n.instance.domSize):null!=t.instance?(P(e,t.instance),n.dom=void 0,n.domSize=0):(n.dom=t.dom,n.domSize=t.domSize)}(e,t,n,r,o,i)}else P(e,t),_(e,n,r,i,o)}function D(e,t,n){for(var r=Object.create(null);t<n;t++){var o=e[t];if(null!=o){var i=o.key;null!=i&&(r[i]=t)}}return r}var N=[];function j(e,t,n){for(;t<e.length;t++)if(null!=e[t]&&null!=e[t].dom)return e[t].dom;return n}function O(e,t,n){var r=v.createDocumentFragment();!function e(t,n,r){for(;null!=r.dom&&r.dom.parentNode===t;){if("string"!=typeof r.tag){if(null!=(r=r.instance))continue}else if("<"===r.tag)for(var o=0;o<r.instance.length;o++)n.appendChild(r.instance[o]);else if("["!==r.tag)n.appendChild(r.dom);else if(1===r.children.length){if(null!=(r=r.children[0]))continue}else for(var o=0;o<r.children.length;o++){var i=r.children[o];null!=i&&e(t,n,i)}break}}(e,r,t),g(e,r,n)}function g(e,t,n){null!=n?e.insertBefore(t,n):e.appendChild(t)}function w(e){if(null==e.attrs||null==e.attrs.contenteditable&&null==e.attrs.contentEditable)return!1;var t=e.children;if(null!=t&&1===t.length&&"<"===t[0].tag){var n=t[0].children;e.dom.innerHTML!==n&&(e.dom.innerHTML=n)}else if(null!=e.text||null!=t&&0!==t.length)throw new Error("Child node of a contenteditable must be trusted");return!0}function z(e,t,n,r){for(var o=n;o<r;o++){var i=t[o];null!=i&&P(e,i)}}function P(e,t){var n,r,o,i=0,a=t.state;"string"!=typeof t.tag&&"function"==typeof t.state.onbeforeremove&&null!=(o=h.call(t.state.onbeforeremove,t))&&"function"==typeof o.then&&(i=1,n=o);t.attrs&&"function"==typeof t.attrs.onbeforeremove&&null!=(o=h.call(t.attrs.onbeforeremove,t))&&"function"==typeof o.then&&(i|=2,r=o);if(s(t,a),i){if(null!=n){var l=function(){1&i&&((i&=2)||u())};n.then(l,l)}if(null!=r){l=function(){2&i&&((i&=1)||u())};r.then(l,l)}}else x(t),b(e,t);function u(){s(t,a),x(t),b(e,t)}}function p(e,t){for(var n=0;n<t.instance.length;n++)e.removeChild(t.instance[n])}function b(e,t){for(;null!=t.dom&&t.dom.parentNode===e;){if("string"!=typeof t.tag){if(null!=(t=t.instance))continue}else if("<"===t.tag)p(e,t);else{if("["!==t.tag&&(e.removeChild(t.dom),!Array.isArray(t.children)))break;if(1===t.children.length){if(null!=(t=t.children[0]))continue}else for(var n=0;n<t.children.length;n++){var r=t.children[n];null!=r&&b(e,r)}}break}}function x(e){if("string"!=typeof e.tag&&"function"==typeof e.state.onremove&&h.call(e.state.onremove,e),e.attrs&&"function"==typeof e.attrs.onremove&&h.call(e.attrs.onremove,e),"string"!=typeof e.tag)null!=e.instance&&x(e.instance);else{var t=e.children;if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];null!=r&&x(r)}}}function E(e,t,n,r,o){if("key"!==t&&"is"!==t&&null!=r&&!l(t)&&(n!==r||(i=e,"value"===(a=t)||"checked"===a||"selectedIndex"===a||"selected"===a&&i.dom===c()||"option"===i.tag&&i.dom.parentNode===v.activeElement)||"object"==typeof r)){var i,a;if("o"===t[0]&&"n"===t[1])return S(e,t,r);if("xlink:"===t.slice(0,6))e.dom.setAttributeNS("http://www.w3.org/1999/xlink",t.slice(6),r);else if("style"===t)A(e.dom,n,r);else if(k(e,t,o)){if("value"===t){if(("input"===e.tag||"textarea"===e.tag)&&e.dom.value===""+r&&e.dom===c())return;if("select"===e.tag&&null!==n&&e.dom.value===""+r)return;if("option"===e.tag&&null!==n&&e.dom.value===""+r)return}"input"===e.tag&&"type"===t?e.dom.setAttribute(t,r):e.dom[t]=r}else"boolean"==typeof r?r?e.dom.setAttribute(t,""):e.dom.removeAttribute(t):e.dom.setAttribute("className"===t?"class":t,r)}}function T(e,t,n,r){if("key"!==t&&"is"!==t&&null!=n&&!l(t))if("o"!==t[0]||"n"!==t[1]||l(t))if("style"===t)A(e.dom,n,null);else if(!k(e,t,r)||"className"===t||"value"===t&&("option"===e.tag||"select"===e.tag&&-1===e.dom.selectedIndex&&e.dom===c())||"input"===e.tag&&"type"===t){var o=t.indexOf(":");-1!==o&&(t=t.slice(o+1)),!1!==n&&e.dom.removeAttribute("className"===t?"class":t)}else e.dom[t]=null;else S(e,t,void 0)}function l(e){return"oninit"===e||"oncreate"===e||"onupdate"===e||"onremove"===e||"onbeforeremove"===e||"onbeforeupdate"===e}function k(e,t,n){return void 0===n&&(-1<e.tag.indexOf("-")||null!=e.attrs&&e.attrs.is||"href"!==t&&"list"!==t&&"form"!==t&&"width"!==t&&"height"!==t)&&t in e.dom}var n=/[A-Z]/g;function r(e){return"-"+e.toLowerCase()}function i(e){return"-"===e[0]&&"-"===e[1]?e:"cssFloat"===e?"float":e.replace(n,r)}function A(e,t,n){if(t!==n)if(null==n)e.style.cssText="";else if("object"!=typeof n)e.style.cssText=n;else if(null==t||"object"!=typeof t)for(var r in e.style.cssText="",n){null!=(o=n[r])&&e.style.setProperty(i(r),String(o))}else{for(var r in n){var o;null!=(o=n[r])&&(o=String(o))!==String(t[r])&&e.style.setProperty(i(r),o)}for(var r in t)null!=t[r]&&null==n[r]&&e.style.removeProperty(i(r))}}function o(){this._=u}function S(e,t,n){if(null!=e.events){if(e.events[t]===n)return;null==n||"function"!=typeof n&&"object"!=typeof n?(null!=e.events[t]&&e.dom.removeEventListener(t.slice(2),e.events,!1),e.events[t]=void 0):(null==e.events[t]&&e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=n)}else null==n||"function"!=typeof n&&"object"!=typeof n||(e.events=new o,e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=n)}function L(e,t,n){"function"==typeof e.oninit&&h.call(e.oninit,t),"function"==typeof e.oncreate&&n.push(h.bind(e.oncreate,t))}function M(e,t,n){"function"==typeof e.onupdate&&n.push(h.bind(e.onupdate,t))}return(o.prototype=Object.create(null)).handleEvent=function(e){var t,n=this["on"+e.type];"function"==typeof n?t=n.call(e.currentTarget,e):"function"==typeof n.handleEvent&&n.handleEvent(e),this._&&!1!==e.redraw&&(0,this._)(),!1===t&&(e.preventDefault(),e.stopPropagation())},function(e,t,n){if(!e)throw new TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");var r=[],o=c(),i=e.namespaceURI;null==e.vnodes&&(e.textContent=""),t=q.normalizeChildren(Array.isArray(t)?t:[t]);var a=u;try{u="function"==typeof n?n:void 0,d(e,e.vnodes,t,r,null,"http://www.w3.org/1999/xhtml"===i?void 0:i)}finally{u=a}e.vnodes=t,null!=o&&c()!==o&&"function"==typeof o.focus&&o.focus();for(var l=0;l<r.length;l++)r[l]()}}},{"../render/vnode":21}],20:[function(e,t,n){"use strict";var r=e("../render/vnode");t.exports=function(e){return null==e&&(e=""),r("<",void 0,void 0,e,void 0,void 0)}},{"../render/vnode":21}],21:[function(e,t,n){"use strict";function o(e,t,n,r,o,i){return{tag:e,key:t,attrs:n,children:r,text:o,dom:i,domSize:void 0,state:void 0,events:void 0,instance:void 0}}o.normalize=function(e){return Array.isArray(e)?o("[",void 0,void 0,o.normalizeChildren(e),void 0,void 0):null==e||"boolean"==typeof e?null:"object"==typeof e?e:o("#",void 0,void 0,String(e),void 0,void 0)},o.normalizeChildren=function(e){var t=[];if(e.length){for(var n=null!=e[0]&&null!=e[0].key,r=1;r<e.length;r++)if((null!=e[r]&&null!=e[r].key)!=n)throw new TypeError("Vnodes must either always have keys or never have keys!");for(r=0;r<e.length;r++)t[r]=o.normalize(e[r])}return t},t.exports=o},{}],22:[function(e,t,n){"use strict";var r=e("./promise/promise"),o=e("./mount-redraw");t.exports=e("./request/request")(window,r,o.redraw)},{"./mount-redraw":6,"./promise/promise":12,"./request/request":23}],23:[function(e,t,n){"use strict";var s=e("../pathname/build");t.exports=function(v,n,l){var a=0;function u(e){return new n(e)}function e(a){return function(t,r){"string"!=typeof t?t=(r=t).url:null==r&&(r={});var e=new n(function(n,e){a(s(t,r.params),r,function(e){if("function"==typeof r.type)if(Array.isArray(e))for(var t=0;t<e.length;t++)e[t]=new r.type(e[t]);else e=new r.type(e);n(e)},e)});if(!0===r.background)return e;var o=0;function i(){0==--o&&"function"==typeof l&&l()}return function t(n){var r=n.then;n.constructor=u;n.then=function(){o++;var e=r.apply(n,arguments);return e.then(i,function(e){if(i(),0===o)throw e}),t(e)};return n}(e)}}function m(e,t){for(var n in e.headers)if({}.hasOwnProperty.call(e.headers,n)&&t.test(n))return!0;return!1}return u.prototype=n.prototype,u.__proto__=n,{request:e(function(i,a,l,u){var e,t=null!=a.method?a.method.toUpperCase():"GET",n=a.body,r=!(null!=a.serialize&&a.serialize!==JSON.serialize||n instanceof v.FormData),s=a.responseType||("function"==typeof a.extract?"":"json"),o=new v.XMLHttpRequest,c=!1,f=o,d=o.abort;for(var p in o.abort=function(){c=!0,d.call(this)},o.open(t,i,!1!==a.async,"string"==typeof a.user?a.user:void 0,"string"==typeof a.password?a.password:void 0),r&&null!=n&&!m(a,/^content-type$/i)&&o.setRequestHeader("Content-Type","application/json; charset=utf-8"),"function"==typeof a.deserialize||m(a,/^accept$/i)||o.setRequestHeader("Accept","application/json, text/*"),a.withCredentials&&(o.withCredentials=a.withCredentials),a.timeout&&(o.timeout=a.timeout),o.responseType=s,a.headers)!{}.hasOwnProperty.call(a.headers,p)||o.setRequestHeader(p,a.headers[p]);o.onreadystatechange=function(e){if(!c&&4===e.target.readyState)try{var t,n=200<=e.target.status&&e.target.status<300||304===e.target.status||/^file:\/\//i.test(i),r=e.target.response;if("json"===s?e.target.responseType||"function"==typeof a.extract||(r=JSON.parse(e.target.responseText)):s&&"text"!==s||null==r&&(r=e.target.responseText),"function"==typeof a.extract?(r=a.extract(e.target,a),n=!0):"function"==typeof a.deserialize&&(r=a.deserialize(r)),n)l(r);else{try{t=e.target.responseText}catch(e){t=r}var o=new Error(t);o.code=e.target.status,o.response=r,u(o)}}catch(e){u(e)}},"function"==typeof a.config&&(o=a.config(o,a,i)||o)!==f&&(e=o.abort,o.abort=function(){c=!0,e.call(this)}),null==n?o.send():"function"==typeof a.serialize?o.send(a.serialize(n)):n instanceof v.FormData?o.send(n):o.send(JSON.stringify(n))}),jsonp:e(function(e,t,n,r){var o=t.callbackName||"_mithril_"+Math.round(1e16*Math.random())+"_"+a++,i=v.document.createElement("script");v[o]=function(e){delete v[o],i.parentNode.removeChild(i),n(e)},i.onerror=function(){delete v[o],i.parentNode.removeChild(i),r(new Error("JSONP request failed"))},i.src=e+(e.indexOf("?")<0?"?":"&")+encodeURIComponent(t.callbackKey||"callback")+"="+encodeURIComponent(o),v.document.documentElement.appendChild(i)})}}},{"../pathname/build":8}],24:[function(e,t,n){"use strict";var r=e("./mount-redraw");t.exports=e("./api/router")(window,r)},{"./api/router":3,"./mount-redraw":6}],25:[function(e,t,n){var r,o,i=t.exports={};function a(){throw new Error("setTimeout has not been defined")}function l(){throw new Error("clearTimeout has not been defined")}function u(t){if(r===setTimeout)return setTimeout(t,0);if((r===a||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:a}catch(e){r=a}try{o="function"==typeof clearTimeout?clearTimeout:l}catch(e){o=l}}();var s,c=[],f=!1,d=-1;function p(){f&&s&&(f=!1,s.length?c=s.concat(c):d=-1,c.length&&v())}function v(){if(!f){var e=u(p);f=!0;for(var t=c.length;t;){for(s=c,c=[];++d<t;)s&&s[d].run();d=-1,t=c.length}s=null,f=!1,function(t){if(o===clearTimeout)return clearTimeout(t);if((o===l||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(t);try{o(t)}catch(e){try{return o.call(null,t)}catch(e){return o.call(this,t)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new m(e,t)),1!==c.length||f||u(v)},m.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=h,i.addListener=h,i.once=h,i.off=h,i.removeListener=h,i.removeAllListeners=h,i.emit=h,i.prependListener=h,i.prependOnceListener=h,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},{}],26:[function(u,e,s){(function(e,t){var r=u("process/browser.js").nextTick,n=Function.prototype.apply,o=Array.prototype.slice,i={},a=0;function l(e,t){this._id=e,this._clearFn=t}s.setTimeout=function(){return new l(n.call(setTimeout,window,arguments),clearTimeout)},s.setInterval=function(){return new l(n.call(setInterval,window,arguments),clearInterval)},s.clearTimeout=s.clearInterval=function(e){e.close()},l.prototype.unref=l.prototype.ref=function(){},l.prototype.close=function(){this._clearFn.call(window,this._id)},s.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},s.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},s._unrefActive=s.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;0<=t&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},s.setImmediate="function"==typeof e?e:function(e){var t=a++,n=!(arguments.length<2)&&o.call(arguments,1);return i[t]=!0,r(function(){i[t]&&(n?e.apply(null,n):e.call(null),s.clearImmediate(t))}),t},s.clearImmediate="function"==typeof t?t:function(e){delete i[e]}}).call(this,u("timers").setImmediate,u("timers").clearImmediate)},{"process/browser.js":25,timers:26}],27:[function(e,t,u){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var b=e("mithril");function i(e,t,n,r){if(n-t<=0)return t;if(r<=0)return A(e,t,n);var o=Math.ceil((n-t)/r);return A(t+Math.round(o*(e-t)/(n-t))*r,t,n)}u.DEFAULT_DISTANCE=100,u.DEFAULT_MIN=0,u.DEFAULT_MAX=1,u.DEFAULT_STEP=0,u.DEFAULT_AXIS="y",u.default=function(){var f,d,p,v=u.DEFAULT_MIN,m=u.DEFAULT_MAX,h=v,y=u.DEFAULT_DISTANCE,l=u.DEFAULT_STEP,g=u.DEFAULT_AXIS;function w(e){var t,n,r=e.keyCode;if(33===r)e.preventDefault(),(o=Math.max((m-v)/10,l))<=0&&(o=1),n=i(h+o,v,m,l);else if(34===r){e.preventDefault(),(o=Math.max((m-v)/10,l))<=0&&(o=1),n=i(h-o,v,m,l)}else if(35===r)e.preventDefault(),n=m;else if(36===r)e.preventDefault(),n=v;else if(37===r||40===r){e.preventDefault();var o=0<l?l:(m-v)/10;n=Math.max(h-o,v)}else if(38===r||39===r){e.preventDefault();o=0<l?l:(m-v)/10;n=Math.min(h+o,m)}"number"==typeof n&&n!==h&&(h=n,!1!==(null===(t=f.onChange)||void 0===t?void 0:t.call(f,h))&&b.redraw())}return{oncreate:function(t){function e(e){e.preventDefault(),c!==T&&(c=E,window.addEventListener("mousemove",r),window.addEventListener("mouseup",a),s.down&&s.down(new k("down",e.pageX,e.pageY,e)))}function n(e){if(e.preventDefault(),c!==E&&(c=T,u.addEventListener("touchmove",o),u.addEventListener("touchend",l),s.down)){var t=e.changedTouches[0];s.down(new k("down",t.pageX,t.pageY,e))}}function r(e){e.preventDefault(),s.move&&s.move(new k("move",e.pageX,e.pageY,e))}function o(e){if(e.preventDefault(),s.move){var t=e.changedTouches[0];s.move(new k("move",t.pageX,t.pageY,e))}}function i(e,t,n){n.preventDefault();var r=c;setTimeout(function(){c===r&&(c=x)},200),s.up&&s.up(new k("up",e,t,n))}function a(e){window.removeEventListener("mouseup",a),window.removeEventListener("mousemove",r),i(e.pageX,e.pageY,e)}function l(e){u.removeEventListener("touchend",l),u.removeEventListener("touchmove",o);var t=e.changedTouches[0];i(t.pageX,t.pageY,e)}var u,s,c;u=t.dom,s={down:function(e){p={x:e.x,y:e.y,value:h},t.dom.focus()},move:function(e){if(p){var t=e.x-p.x,n=-(e.y-p.y),r="x"===g?t:"y"===g?n:Math.abs(t)>Math.abs(n)?t:n,o=A(p.value+(m-v)*r/y,v,m);o!==h&&(h=o,f.onDrag&&!1!==f.onDrag(h)&&b.redraw())}else console.warn("Got a move message before down message")},up:function(){h!==p.value&&f.onChange&&!1!==f.onChange(h)&&b.redraw(),p=void 0}},c=x,u.addEventListener("mousedown",e),u.addEventListener("touchstart",n),d={destroy:function(){window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",a),u.removeEventListener("touchmove",o),u.removeEventListener("touchend",l),u.removeEventListener("mousedown",e),u.removeEventListener("touchstart",n)}},t.dom.addEventListener("keydown",w)},onremove:function(e){e.dom.removeEventListener("keydown",w),null!=d&&(d.destroy(),d=void 0)},view:function(e){var t;t=e.attrs,v=null!=(f=t).min?Number(f.min):v,(m=null!=f.max?Number(f.max):m)<v&&(console.warn("Knob min > max:",f.min,f.max),v=m),h=A(null!=f.value?Number(f.value):h,v,m),y=f.distance||u.DEFAULT_DISTANCE,l=f.step||u.DEFAULT_STEP,g=f.axis||u.DEFAULT_AXIS;var n=e.attrs,r=n.className,o=n.class,i=n.style,a={id:e.attrs.id,tabIndex:0,role:"slider","aria-valuemin":String(v),"aria-valuemax":String(m),"aria-valuenow":String(h),"aria-orientation":"x"===g?"horizontal":"y"===g?"vertical":null};return void 0!==r?a.className=r:void 0!==o&&(a.class=o),void 0!==i&&(a.style=i),b(".mithril-knob",a,!!f.name&&b("input",{type:"hidden",name:f.name,value:h}),e.children)}}},u.quantize=i;var x=0,E=1,T=2,k=function(e,t,n,r){this.type=e,this.x=t,this.y=n,this.domEvent=r};function A(e,t,n){return Math.min(Math.max(e,t),n)}},{mithril:5}]},{},[1]);