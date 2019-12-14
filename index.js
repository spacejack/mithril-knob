(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mithril"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var m = require("mithril");
    exports.DEFAULT_DISTANCE = 100;
    exports.DEFAULT_MIN = 0;
    exports.DEFAULT_MAX = 1;
    exports.DEFAULT_STEP = 0;
    exports.DEFAULT_AXIS = 'y';
    function MithrilKnob() {
        var attrs;
        var ptr;
        var dragStart;
        var min = exports.DEFAULT_MIN;
        var max = exports.DEFAULT_MAX;
        var value = min;
        var distance = exports.DEFAULT_DISTANCE;
        var step = exports.DEFAULT_STEP;
        var axis = exports.DEFAULT_AXIS;
        function updateAttrs(a) {
            attrs = a;
            min = attrs.min != null ? Number(attrs.min) : min;
            max = attrs.max != null ? Number(attrs.max) : max;
            if (min > max) {
                console.warn('Knob min > max:', attrs.min, attrs.max);
                min = max;
            }
            value = clamp(attrs.value != null ? Number(attrs.value) : value, min, max);
            distance = attrs.distance || exports.DEFAULT_DISTANCE;
            step = attrs.step || exports.DEFAULT_STEP;
            axis = attrs.axis || exports.DEFAULT_AXIS;
        }
        function onKeyDown(e) {
            var _a, _b;
            var k = e.keyCode;
            var newVal;
            if (k === 33) { // pgup
                e.preventDefault();
                var s = Math.max((max - min) / 10, step);
                if (s <= 0)
                    s = 1;
                newVal = quantize(value + s, min, max, step);
            }
            else if (k === 34) { // pgdown
                e.preventDefault();
                var s = Math.max((max - min) / 10, step);
                if (s <= 0)
                    s = 1;
                newVal = quantize(value - s, min, max, step);
            }
            else if (k === 35) { // end
                e.preventDefault();
                newVal = max;
            }
            else if (k === 36) { // home
                e.preventDefault();
                newVal = min;
            }
            else if (k === 37 || k === 40) { // left/down
                e.preventDefault();
                var s = step > 0 ? step : (max - min) / 10;
                newVal = Math.max(value - s, min);
            }
            else if (k === 38 || k === 39) { // right/up
                e.preventDefault();
                var s = step > 0 ? step : (max - min) / 10;
                newVal = Math.min(value + s, max);
            }
            if (typeof newVal !== 'number' || newVal === value) {
                return; // no change to make
            }
            value = newVal;
            if (((_b = (_a = attrs).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value)) !== false) {
                m.redraw();
            }
        }
        return {
            oncreate: function (v) {
                // Use drag events & compute input values
                ptr = Ptr(v.dom, {
                    down: function (e) {
                        dragStart = { x: e.x, y: e.y, value: value };
                    },
                    move: function (e) {
                        var _a, _b;
                        if (!dragStart) {
                            console.warn('Got a move message before down message');
                            return;
                        }
                        var dx = e.x - dragStart.x;
                        var dy = -(e.y - dragStart.y); // up is positive
                        var d = axis === 'x' ? dx
                            : axis === 'y' ? dy
                                : Math.abs(dx) > Math.abs(dy) ? dx : dy;
                        var val = clamp(dragStart.value + (max - min) * d / distance, min, max);
                        if (val !== value) {
                            value = val;
                            if (((_b = (_a = attrs).onDrag) === null || _b === void 0 ? void 0 : _b.call(_a, value)) !== false) {
                                m.redraw();
                            }
                        }
                    },
                    up: function () {
                        var _a, _b;
                        if (value !== dragStart.value) {
                            if (((_b = (_a = attrs).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value)) !== false) {
                                m.redraw();
                            }
                        }
                        dragStart = undefined;
                    }
                });
                // Use keyboard events
                v.dom.addEventListener('keydown', onKeyDown);
            },
            onremove: function (v) {
                v.dom.removeEventListener('keydown', onKeyDown);
                if (ptr != null) {
                    ptr.destroy();
                    ptr = undefined;
                }
            },
            view: function (v) {
                updateAttrs(v.attrs);
                var _a = v.attrs, className = _a.className, elClass = _a.class, style = _a.style;
                // Build label attrs object
                var elAttrs = {
                    id: v.attrs.id,
                    tabIndex: 0,
                    role: 'slider',
                    'aria-valuemin': String(min),
                    'aria-valuemax': String(max),
                    'aria-valuenow': String(value),
                    'aria-orientation': axis === 'x' ? 'horizontal'
                        : axis === 'y' ? 'vertical'
                            : null
                };
                if (className !== undefined) {
                    elAttrs.className = className;
                }
                else if (elClass !== undefined) {
                    elAttrs.class = elClass;
                }
                if (style !== undefined) {
                    elAttrs.style = style;
                }
                return m('.mithril-knob', elAttrs, !!attrs.name && m('input', {
                    type: 'hidden',
                    name: attrs.name,
                    value: value,
                }), v.children);
            }
        };
    }
    exports.default = MithrilKnob;
    /** Step quantization helper */
    function quantize(val, min, max, step) {
        if (max - min <= 0)
            return min;
        if (step <= 0)
            return clamp(val, min, max);
        var steps = Math.ceil((max - min) / step);
        var v = min + Math.round(steps * (val - min) / (max - min)) * step;
        return clamp(v, min, max);
    }
    exports.quantize = quantize;
    // Mouse/Touch abstraction helpers
    var DEVICE_NONE = 0;
    var DEVICE_MOUSE = 1;
    var DEVICE_TOUCH = 2;
    var PtrEvent = /** @class */ (function () {
        function PtrEvent(type, x, y, e) {
            this.type = type;
            this.x = x;
            this.y = y;
            this.domEvent = e;
        }
        return PtrEvent;
    }());
    /**
     * Creates a new Ptr instance attached to the element.
     */
    function Ptr(el, listeners) {
        var device = DEVICE_NONE;
        function onMouseDown(e) {
            e.preventDefault();
            if (device === DEVICE_TOUCH) {
                return;
            }
            device = DEVICE_MOUSE;
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            if (listeners.down) {
                listeners.down(new PtrEvent('down', e.pageX, e.pageY, e));
            }
        }
        function onTouchStart(e) {
            e.preventDefault();
            if (device === DEVICE_MOUSE) {
                return;
            }
            device = DEVICE_TOUCH;
            el.addEventListener('touchmove', onTouchMove);
            el.addEventListener('touchend', onTouchEnd);
            if (listeners.down) {
                var t = e.changedTouches[0];
                listeners.down(new PtrEvent('down', t.pageX, t.pageY, e));
            }
        }
        function onMouseMove(e) {
            e.preventDefault();
            if (listeners.move) {
                listeners.move(new PtrEvent('move', e.pageX, e.pageY, e));
            }
        }
        function onTouchMove(e) {
            e.preventDefault();
            if (listeners.move) {
                var t = e.changedTouches[0];
                listeners.move(new PtrEvent('move', t.pageX, t.pageY, e));
            }
        }
        function onPointerUp(x, y, e) {
            e.preventDefault();
            var d = device;
            setTimeout(function () {
                if (device === d) {
                    device = DEVICE_NONE;
                }
            }, 200);
            if (listeners.up) {
                listeners.up(new PtrEvent('up', x, y, e));
            }
        }
        function onMouseUp(e) {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
            onPointerUp(e.pageX, e.pageY, e);
        }
        function onTouchEnd(e) {
            el.removeEventListener('touchend', onTouchEnd);
            el.removeEventListener('touchmove', onTouchMove);
            var t = e.changedTouches[0];
            onPointerUp(t.pageX, t.pageY, e);
        }
        function destroy() {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            el.removeEventListener('touchmove', onTouchMove);
            el.removeEventListener('touchend', onTouchEnd);
            el.removeEventListener('mousedown', onMouseDown);
            el.removeEventListener('touchstart', onTouchStart);
        }
        // Initialize by only adding the down/start listeners.
        // We add move/up listeners later on press.
        el.addEventListener('mousedown', onMouseDown);
        el.addEventListener('touchstart', onTouchStart);
        return { destroy: destroy };
    }
    /* Inlined for older browsers without Math.sign */
    // function sign (n: number) {
    // 	return n > 0 ? 1 : n < 0 ? -1 : 0
    // }
    /** Clamp x to within min & max */
    function clamp(x, min, max) {
        return Math.min(Math.max(x, min), max);
    }
});
