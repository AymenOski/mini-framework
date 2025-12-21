import { reset_hook_index, run_effects } from './hooks.js'

export function render(component_fn, container) {
    reset_hook_index()
    
    const vnode = component_fn()
    container.innerHTML = ''
    
    const dom_element = document.createElement(vnode.tag)
    if (vnode.children) {
        vnode.children.forEach(child => {
            dom_element.appendChild(document.createTextNode(child))
        })
    }
    
    container.appendChild(dom_element)
    
    run_effects() // runs immediately, not async
}
