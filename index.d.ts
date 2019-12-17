import * as m from 'mithril';
export declare const DEFAULT_DISTANCE = 100;
export declare const DEFAULT_MIN = 0;
export declare const DEFAULT_MAX = 1;
export declare const DEFAULT_STEP = 0;
export declare const DEFAULT_AXIS = "y";
export interface Attrs {
    /** Minimum value (default 0) */
    min?: number;
    /** Maximum value (default 1) */
    max?: number;
    /** Step amount (default 0 = infinite) */
    step?: number;
    /** Distance in pixels to travel to max (default 100) */
    distance?: number;
    /** Axis of drag motion to change value (default 'y') */
    axis?: 'x' | 'y' | 'xy';
    /** Optional element id */
    id?: string | null;
    /** Optional input name. If provided, a hidden input element will be renderd having the current value */
    name?: string | null;
    /** Optional input value */
    value?: number | string;
    /** Optional class to apply to containing element */
    className?: string | null;
    class?: string | null;
    style?: string | {
        [id: string]: any;
    } | null;
    /** Change (commit) value event handler. Return false to prevent redraw. */
    onChange?(value: number): false | void;
    /** Drag value event handler. Return false to prevent redraw. */
    onDrag?(value: number): false | void;
}
export default function MithrilKnob(): m.Component<Attrs>;
/** Step quantization helper */
export declare function quantize(val: number, min: number, max: number, step: number): number;
