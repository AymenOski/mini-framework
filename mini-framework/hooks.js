import { rerender } from "./render.js"

const states = []
let state_index = 0

export function use_state(initial_value) {
    const index = state_index

    if (states[index] === undefined) {
        states[index] = initial_value
    }

    const set_state = (value) => {
        states[index] = value
        rerender()
    }

    state_index++
    return [states[index], set_state]
}

export function use_effect(callback) {
    callback()
}
