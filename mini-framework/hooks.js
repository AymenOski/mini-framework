import { rerender } from "./render.js"

let state

export function use_state(initial_value) {
    if (state === undefined) {
        state = initial_value
    }

    const set_state = (new_value) => {
        state = new_value
        rerender()
    }

    return [state, set_state]
}

export function use_effect(callback) {
    callback()
}
