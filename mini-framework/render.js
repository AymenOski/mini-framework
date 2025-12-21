import { diff } from "./dom-diff.js"
import { reset_hook_index, run_effects, cleanup_effects } from "./hooks.js"
import { setVirtualDOM } from "./virtual-dom.js"

let root_component_fn = null
let root_container = null
let current_vnode = null

export function render(component_fn, container) {
    root_component_fn = component_fn
    root_container = container
    
    reset_hook_index()
    
    const new_vnode = root_component_fn()
    
    container.innerHTML = ''
    const dom_element = create_dom_element(new_vnode)
    container.appendChild(dom_element)
    
    current_vnode = new_vnode
    
    if (typeof setVirtualDOM === 'function') {
        setVirtualDOM(new_vnode)
    }
    
    setTimeout(run_effects, 0)
}

export function rerender() {
    if (!root_component_fn || !root_container) return
    
    reset_hook_index()
    
    const new_vnode = root_component_fn()
    
    diff(root_container, current_vnode, new_vnode, 0)
    
    current_vnode = new_vnode
    if (typeof setVirtualDOM === 'function') {
        setVirtualDOM(new_vnode)
    }
    
    setTimeout(run_effects, 0)
}

export function create_dom_element(vnode) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return document.createTextNode(vnode.toString())
    }
    
    if (!vnode) {
        return document.createTextNode('')
    }

    if (vnode.component) {
        const component_vnode = vnode.component(vnode.props || {})
        return create_dom_element(component_vnode)
    }
    
    const dom_element = document.createElement(vnode.tag)
    
    if (vnode.props) {
        update_props(dom_element, vnode.props)
    }
    
    if (vnode.children) {
        vnode.children.forEach(child => {
            dom_element.appendChild(create_dom_element(child))
        })
    }
    
    return dom_element
}

export function update_props(dom_element, props) {
    Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith('on') && typeof value === 'function') {
            const event_name = key.toLowerCase().substring(2)
            dom_element.addEventListener(event_name, value)
        }
        else if (key === 'className' || key === 'class') {
             dom_element.setAttribute('class', value)
        }
        else if (key === 'checked' || key === 'value') {
            dom_element[key] = value
        }
        else {
             dom_element.setAttribute(key, value)
        }
    })
}
