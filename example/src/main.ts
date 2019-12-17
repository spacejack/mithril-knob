import * as m from 'mithril'
import Knob, {Attrs} from '../../src'

// Demo component
function Demo(): m.Component {
	const values = {
		one: Math.random(),
		two: Math.random(),
		three: Math.random()
	}
	function setOneValue(v: number) {
		values.one = v
	}
	function setTwoValue(v: number) {
		values.two = v
	}
	function setThreeValue(v: number) {
		values.three = v
	}
	const fine = {
		one: false,
		two: false,
		three: false,
	}
	return {
		view() {
			return m('.demo',
				m('h3', 'Demos'),
				m('p', 'Adjust values by dragging up/down within the knobs, or by focusing with the keyboard.'),

				m('h4', '1. Simple, unstyled'),
				m('.knobs',
					m(Knob,
						{
							value: values.one,
							distance: fine.one ? 1000 : 100,
							onDrag: setOneValue,
							onChange: setOneValue
						},
						m('.knob-value', values.one.toFixed(2))
					),
					m('button.btn', {
						class: fine.one ? 'active' : '',
						onclick: () => {fine.one = !fine.one}
					}, 'FINE'),
				),
				m('p', 'This uses a bit of CSS to style the knob div element as a grey square, and renders the value as a child node.'),

				m('h4', '2. Round knob that spins'),
				m('.knobs',
					m(Knob,
						{
							class: 'knob-round',
							distance: fine.two ? 1000 : 100,
							value: values.two,
							onDrag: setTwoValue,
							onChange: setTwoValue
						},
						m('.knob-spin',
							{style: {transform: `rotateZ(${values.two * 300 - 150}deg)`}},
							m('.knob-spin-tic')
						),
						m('.knob-spin-value', values.two.toFixed(2))
					),
					m('button.btn', {
						class: fine.two ? 'active' : '',
						onclick: () => {fine.two = !fine.two}
					}, 'FINE'),
				),
				m('p', 'This uses a bit more CSS, as well as some css rotation that reflects the current value.'),

				m('h4', '3. Pseudo-3D style, optimized redraws'),
				m('.knobs',
					// Use the optimized wrapper component.
					// Also helps cut down on content boilerplate.
					m(Knob3D, {
						distance: fine.three ? 1000 : 100,
						value: values.three,
						onChange: setThreeValue
					}),
					m('button.btn', {
						class: fine.three ? 'active' : '',
						onclick: () => {fine.three = !fine.three}
					}, 'FINE'),
				),
				m('p', 'This example uses a little more CSS. A wrapper component is used to help render the content on value changes but opts out of global redraws.')
			)
		}
	}
}

/** Wrapper component for further customization & optimization */
function Knob3D(): m.Component<Attrs> {
	let rotatorEl: HTMLElement
	let valueEl: HTMLElement

	return {
		view: ({attrs}) => m(Knob,
			{
				class: 'knob3d',
				...attrs,
				onDrag: v => {
					valueEl.textContent = v.toFixed(2)
					rotatorEl.style.transform
						= `rotateZ(${calcDegrees(v, attrs.min, attrs.max)}deg)`
					return attrs.onDrag ? attrs.onDrag(v) : false
				}
			},
			m('.rotator',
				{
					style: {transform: `rotateZ(${calcDegrees(attrs.value, attrs.min, attrs.max)}deg)`},
					oncreate: v => {rotatorEl = v.dom as HTMLElement}
				},
				m('.tic')
			),
			m('.value',
				{
					oncreate: v => {valueEl = v.dom as HTMLElement}
				},
				attrs.value != null ? Number(attrs.value).toFixed(2) : ''
			)
		)
	}
}

function calcDegrees (value?: string | number | undefined, min?: number, max?: number) {
	min = min || 0
	max = max != null ? max : 1
	value = Number(value != null ? value : min)
	return 300 * (value - min) / (max - min) - 150
}

// Start the app
m.mount(document.getElementById('knob-demo')!, Demo)
