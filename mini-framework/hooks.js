import { rerender } from "./render.js"

const states = []
const effect_dependencies = []
let state_index = 0
let effect_index = 0

export function use_state(initial_value) {
    const i = state_index
    if (states[i] === undefined) {
        states[i] = initial_value
    }

    const set_state = (value) => {
        states[i] = value
        rerender()
    }

    state_index++
    return [states[i], set_state]
}

export function use_effect(callback, deps) {
    const i = effect_index
    const prev = effect_dependencies[i]

    let changed = true
    if (prev && deps) {
        changed = deps.some((d, idx) => d !== prev[idx])
    }

    if (changed) {
        callback()
    }

    effect_dependencies[i] = deps
    effect_index++
}

export function reset_hook_index() {
    state_index = 0
    effect_index = 0
}
