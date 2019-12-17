import * as m from 'mithril'

export const DEFAULT_DISTANCE = 100
export const DEFAULT_MIN = 0
export const DEFAULT_MAX = 1
export const DEFAULT_STEP = 0
export const DEFAULT_AXIS = 'y'

export interface Attrs {
	/** Minimum value (default 0) */
	min?: number
	/** Maximum value (default 1) */
	max?: number
	/** Step amount (default 0 = infinite) */
	step?: number
	/** Distance in pixels to travel to max (default 100) */
	distance?: number
	/** Axis of drag motion to change value (default 'y') */
	axis?: 'x' | 'y' | 'xy'
	/** Optional element id */
	id?: string | null
	/** Optional input name. If provided, a hidden input element will be renderd having the current value */
	name?: string | null
	/** Optional input value */
	value?: number | string
	/** Optional class to apply to containing element */
	className?: string | null
	class?: string | null
	style?: string | {[id: string]: any} | null
	/** Change (commit) value event handler. Return false to prevent redraw. */
	onChange?(value: number): false | void
	/** Drag value event handler. Return false to prevent redraw. */
	onDrag?(value: number): false | void
}

export default function MithrilKnob(): m.Component<Attrs> {
	let attrs: Attrs
	let ptr: Ptr | undefined
	let dragStart: {x: number, y: number, value: number} | undefined
	let min = DEFAULT_MIN
	let max = DEFAULT_MAX
	let value = min
	let distance = DEFAULT_DISTANCE
	let step = DEFAULT_STEP
	let axis: 'x' | 'y' | 'xy' = DEFAULT_AXIS

	function updateAttrs (a: Attrs) {
		attrs = a
		min = attrs.min != null ? Number(attrs.min) : min
		max = attrs.max != null ? Number(attrs.max) : max
		if (min > max) {
			console.warn('Knob min > max:', attrs.min, attrs.max)
			min = max
		}
		value = clamp(
			attrs.value != null ? Number(attrs.value) : value,
			min, max
		)
		distance = attrs.distance || DEFAULT_DISTANCE
		step = attrs.step || DEFAULT_STEP
		axis = attrs.axis || DEFAULT_AXIS
	}

	function onKeyDown (e: Event) {
		const k = (e as KeyboardEvent).keyCode
		let newVal: number | undefined
		if (k === 33) { // pgup
			e.preventDefault()
			let s = Math.max((max - min) / 10, step)
			if (s <= 0) s = 1
			newVal = quantize(value + s, min, max, step)
		} else if (k === 34) { // pgdown
			e.preventDefault()
			let s = Math.max((max - min) / 10, step)
			if (s <= 0) s = 1
			newVal = quantize(value - s, min, max, step)
		} else if (k === 35) { // end
			e.preventDefault()
			newVal = max
		} else if (k === 36) { // home
			e.preventDefault()
			newVal = min
		} else if (k === 37 || k === 40) { // left/down
			e.preventDefault()
			const s = step > 0 ? step : (max - min) / 10
			newVal = Math.max(value - s, min)
		} else if (k === 38 || k === 39) { // right/up
			e.preventDefault()
			const s = step > 0 ? step : (max - min) / 10
			newVal = Math.min(value + s, max)
		}
		if (typeof newVal !== 'number' || newVal === value) {
			return // no change to make
		}
		value = newVal
		if (attrs.onChange?.(value) !== false) {
			m.redraw()
		}
	}

	return {
		oncreate: v => {
			// Use drag events & compute input values
			ptr = Ptr(v.dom as HTMLElement, {
				down: e => {
					dragStart = {x: e.x, y: e.y, value};
					(v.dom as HTMLElement).focus()
				},
				move: e => {
					if (!dragStart) {
						console.warn('Got a move message before down message')
						return
					}
					const dx = e.x - dragStart.x
					const dy = -(e.y - dragStart.y) // up is positive
					const d = axis === 'x' ? dx
						: axis === 'y' ? dy
						: Math.abs(dx) > Math.abs(dy) ? dx : dy
					const val = clamp(
						dragStart.value + (max - min) * d / distance,
						min, max
					)
					if (val !== value) {
						value = val
						if (attrs.onDrag && attrs.onDrag(value) !== false) {
							m.redraw()
						}
					}
				},
				up: () => {
					if (value !== dragStart!.value) {
						if (attrs.onChange && attrs.onChange(value) !== false) {
							m.redraw()
						}
					}
					dragStart = undefined
				}
			})
			// Use keyboard events
			v.dom.addEventListener('keydown', onKeyDown)
		},
		onremove: v => {
			v.dom.removeEventListener('keydown', onKeyDown)
			if (ptr != null) {
				ptr.destroy()
				ptr = undefined
			}
		},
		view: v => {
			updateAttrs(v.attrs)
			const {className, class: class_, style} = v.attrs
			// Build label attrs object
			const elAttrs: {[id: string]: any} = {
				id: v.attrs.id,
				tabIndex: 0,
				role: 'slider',
				'aria-valuemin': String(min),
				'aria-valuemax': String(max),
				'aria-valuenow': String(value),
				'aria-orientation': axis === 'x' ? 'horizontal'
					: axis === 'y' ? 'vertical'
					: null
			}
			if (className !== undefined) {
				elAttrs.className = className
			} else if (class_ !== undefined) {
				elAttrs.class = class_
			}
			if (style !== undefined) {
				elAttrs.style = style
			}
			return m('.mithril-knob',
				elAttrs,
				!!attrs.name && m('input', {
					type: 'hidden',
					name: attrs.name,
					value,
				}),
				v.children
			)
		}
	}
}

/** Step quantization helper */
export function quantize (val: number, min: number, max: number, step: number) {
	if (max - min <= 0) return min
	if (step <= 0) return clamp(val, min, max)
	const steps = Math.ceil((max - min) / step)
	const v = min + Math.round(steps * (val - min) / (max - min)) * step
	return clamp(v, min, max)
}

// Mouse/Touch abstraction helpers

const DEVICE_NONE  = 0
const DEVICE_MOUSE = 1
const DEVICE_TOUCH = 2

type PtrEventType = 'down' | 'move' | 'up'

class PtrEvent {
	type: PtrEventType
	x: number
	y: number
	domEvent: MouseEvent | TouchEvent
	constructor (type: PtrEventType, x: number, y: number, e: MouseEvent | TouchEvent) {
		this.type = type
		this.x = x
		this.y = y
		this.domEvent = e
	}
}

interface PtrEventListeners {
	down?(e: PtrEvent): void
	up?(e: PtrEvent): void
	move?(e: PtrEvent): void
}

/**
 * Creates a new Ptr instance attached to the element.
 */
function Ptr (el: HTMLElement, listeners: PtrEventListeners) {
	let device = DEVICE_NONE

	function onMouseDown (e: MouseEvent) {
		e.preventDefault()
		if (device === DEVICE_TOUCH) {
			return
		}
		device = DEVICE_MOUSE
		window.addEventListener('mousemove', onMouseMove)
		window.addEventListener('mouseup', onMouseUp)
		if (listeners.down) {
			listeners.down(new PtrEvent('down', e.pageX, e.pageY, e))
		}
	}

	function onTouchStart (e: TouchEvent) {
		e.preventDefault()
		if (device === DEVICE_MOUSE) {
			return
		}
		device = DEVICE_TOUCH
		el.addEventListener('touchmove', onTouchMove)
		el.addEventListener('touchend', onTouchEnd)
		if (listeners.down) {
			const t = e.changedTouches[0]
			listeners.down(new PtrEvent('down', t.pageX, t.pageY, e))
		}
	}

	function onMouseMove (e: MouseEvent) {
		e.preventDefault()
		if (listeners.move) {
			listeners.move(new PtrEvent('move', e.pageX, e.pageY, e))
		}
	}

	function onTouchMove (e: TouchEvent) {
		e.preventDefault()
		if (listeners.move) {
			const t = e.changedTouches[0]
			listeners.move(new PtrEvent('move', t.pageX, t.pageY, e))
		}
	}

	function onPointerUp (x: number, y: number, e: MouseEvent | TouchEvent) {
		e.preventDefault()
		const d = device
		setTimeout(() => {
			if (device === d) {
				device = DEVICE_NONE
			}
		}, 200)
		if (listeners.up) {
			listeners.up(new PtrEvent('up', x, y, e))
		}
	}

	function onMouseUp (e: MouseEvent) {
		window.removeEventListener('mouseup', onMouseUp)
		window.removeEventListener('mousemove', onMouseMove)
		onPointerUp(e.pageX, e.pageY, e)
	}

	function onTouchEnd (e: TouchEvent) {
		el.removeEventListener('touchend', onTouchEnd)
		el.removeEventListener('touchmove', onTouchMove)
		const t = e.changedTouches[0]
		onPointerUp(t.pageX, t.pageY, e)
	}

	function destroy() {
		window.removeEventListener('mousemove', onMouseMove)
		window.removeEventListener('mouseup', onMouseUp)
		el.removeEventListener('touchmove', onTouchMove)
		el.removeEventListener('touchend', onTouchEnd)
		el.removeEventListener('mousedown', onMouseDown)
		el.removeEventListener('touchstart', onTouchStart)
	}

	// Initialize by only adding the down/start listeners.
	// We add move/up listeners later on press.
	el.addEventListener('mousedown', onMouseDown)
	el.addEventListener('touchstart', onTouchStart)

	return {destroy}
}

/** Mouse/Touch input abstraction for down/up/move events */
interface Ptr extends ReturnType<typeof Ptr> {}

/* Inlined for older browsers without Math.sign */
// function sign (n: number) {
// 	return n > 0 ? 1 : n < 0 ? -1 : 0
// }

/** Clamp x to within min & max */
function clamp (x: number, min: number, max: number) {
	return Math.min(Math.max(x, min), max)
}
