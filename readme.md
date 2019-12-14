# Mithril Knob Component

Fully stylable "knob" input component for [Mithril.js](https://mithril.js.org/). Includes TypeScript types.

Try a [live demo here](https://spacejack.github.io/mithril-knob/).

Designed for Synth-like knobs which are useful for fine-grained numeric inputs.

Note that out of the box, this component provides no visual representation at all! You must provide your own CSS, and optionally render the content of the knob itself.

The component will only render a single div having the class `"mithril-knob"`. It will handle and interpret mouse and touch events for you, translated into input values clamped to the specified min/max range. It will also provide accessibility attributes, aria attributes and handle keyboard navigation.

How the component is visually represented is up to you. See examples for some "presets" you can use or customize.

## Install:

    npm install mithril-checkbox

(TypeScript types are included.)

### All Attrs Properties:

```typescript
interface Attrs {
    /** Minimum value (default 0) */
    min?: number;
    /** Maximum value (default 1) */
    max?: number;
    /** Step amount (default 0 = infinite) */
    step?: number;
    /** Distance in pixels to travel to max default 100 */
    distance?: number;
    /** Axis of drag motion to change value (default 'y') */
    axis?: 'x' | 'y' | 'xy';
    /** Optional input id */
    id?: string;
    /** Optional input name */
    name?: string;
    /** Optional input value */
    value?: number | string;
    /** Optional class to apply to containing element */
    class?: string;
    /** Change value event handler */
    onChange?(value: number): false | void;
    /** Drag value event handler */
    onDrag?(value: number): false | void;
    /** Any other attrs are forwarded to the hidden input element */
    [id: string]: any;
}
```

## Development Install:

First git clone this repo. Then:

    npm install

## Build module

    npm run build

## Serve, compile & watch example app:

    npm start

Then go to http://localhost:3000/ in your browser.
