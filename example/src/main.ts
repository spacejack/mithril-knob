import * as m from 'mithril'
import Knob from '../../src'

// Demo component
function Demo(): m.Component {
	const values = {
		one: Math.random(),
		two: Math.random()
	}
	function setOneValue(v: number) {
		values.one = v
	}
	function setTwoValue(v: number) {
		values.two = v
	}
	const fine = {
		one: false,
		two: false
	}
	return {
		view() {
			return m('.demo',
				m('h3', 'Demos'),
				m('p', 'Here is a basic unstyled example and a rounded style knob that spins. Adjust values by dragging up/down within the knobs, or by focusing with the keyboard.'),
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
				)
			)
		}
	}
}

m.mount(document.getElementById('knob-demo')!, Demo)
