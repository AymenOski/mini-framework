import { diff } from './dom-diff.js'
import { reset_hook_index, run_effects } from './hooks.js'

let root_component_fn, root_container, current_vnode

export function render(component_fn, container) {
    root_component_fn = component_fn
    root_container = container
    
    reset_hook_index()
    const new_vnode = root_component_fn()
    
    container.innerHTML = ''
    const dom_element = create_dom_element(new_vnode)
    container.appendChild(dom_element)
    
    current_vnode = new_vnode
    
    setTimeout(run_effects, 0)
}

export function rerender() {
    reset_hook_index()
    
    const new_vnode = root_component_fn()
    
    diff(root_container, current_vnode, new_vnode, 0)
    
    current_vnode = new_vnode
    setTimeout(run_effects, 0)
}

export function create_dom_element(vnode) {
    if (typeof vnode === 'string') return document.createTextNode(vnode)
    if (vnode.component) {
        const component_vnode = vnode.component(vnode.props || {})
        return create_dom_element(component_vnode)
    }
    const dom_element = document.createElement(vnode.tag)
    if (vnode.children) {
        vnode.children.forEach(child => {
            dom_element.appendChild(create_dom_element(child))
        })
    }
    return dom_element
}
