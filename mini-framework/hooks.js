import { update } from "./render.js"

const states = [], effect_dependencies = [], effect_cleanups = [], refs = []
let state_index = 0, effect_index = 0, ref_index = 0
const pending_effects = [] // Queue 

export function use_state(initial_value) {
    const current_index = state_index
    if (states[current_index] === undefined) {
        states[current_index] = initial_value
    }

    const current_state = states[current_index]

    const set_state = (new_value) => {
        const updated_value = typeof new_value === 'function'
            ? new_value(states[current_index])
            : new_value
        if (states[current_index] !== updated_value) {
            states[current_index] = updated_value
            update() 
        }
    }

    state_index++
    return [current_state, set_state]
}

export function use_effect(callback, dependencies) {
    const current_index = effect_index
    const prev_dependencies = effect_dependencies[current_index]

    let should_run = false
    if (dependencies === undefined) {
        should_run = true 
    } else if (prev_dependencies === undefined) {
        should_run = true 
    } else if (dependencies.length !== prev_dependencies.length) {
        should_run = true 
    } else {
        should_run = dependencies.some((dep, i) => dep !== prev_dependencies[i])
    }

    if (should_run) {
        pending_effects.push(() => {
            if (typeof effect_cleanups[current_index] === 'function') {
                effect_cleanups[current_index]()
            }
            const cleanup = callback()
            effect_cleanups[current_index] = cleanup
        })
    }

    effect_dependencies[current_index] = dependencies
    effect_index++
}

export function use_ref(initial_value) {
    const current_index = ref_index
    if (refs[current_index] === undefined) {
        refs[current_index] = { current: initial_value }
    }
    ref_index++
    return refs[current_index]
}

export function reset_hook_index() {
    state_index = 0
    effect_index = 0
    ref_index = 0
}

export function run_effects() {
    const effects_to_run = [...pending_effects]
    pending_effects.length = 0
    effects_to_run.forEach(effect => effect())
}

export function cleanup_effects() {
    effect_cleanups.forEach(cleanup => {
        if (typeof cleanup === 'function') cleanup()
    })
    states.length = 0
    effect_dependencies.length = 0
    effect_cleanups.length = 0
    refs.length = 0
}
