import { diff } from "./dom-diff.js"
import { reset_hook_index, run_effects, cleanup_effects } from "./hooks.js"
import { setVirtualDOM } from "./virtual-dom.js"

let rootComponent = null
let rootContainer = null
let currentVdom = null

export function render(component, container) {
    rootComponent = component
    rootContainer = container
    
    reset_hook_index()
    
    const newVdom = rootComponent()
    
    container.innerHTML = ''
    const realElement = create_dom_element(newVdom)
    container.appendChild(realElement)

    currentVdom = newVdom
    
    if (typeof setVirtualDOM === 'function') {
        setVirtualDOM(newVdom)
    }
    
    setTimeout(run_effects, 0)
}

export function update() {
    if (!rootComponent || !rootContainer) return
    
    reset_hook_index()
    
    const newVdom = rootComponent()
    
    diff(rootContainer, currentVdom, newVdom, 0)
    
    currentVdom = newVdom
    if (typeof setVirtualDOM === 'function') {
        setVirtualDOM(newVdom)
    }
    
    setTimeout(run_effects, 0)
}

export function createRealElement(vdom) {
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom.toString())
    }

    if (!vdom) {
        return document.createTextNode('')
    }

    if (vdom.component) {
        const componentVdom = vdom.component(vdom.props || {})
        return createRealElement(componentVdom)
    }

    const realElement = document.createElement(vdom.tag)

    if (vdom.props) {
        applyProps(realElement, vdom.props)
    }

    if (vdom.children) {
        vdom.children.forEach(child => {
            realElement.appendChild(createRealElement(child))
        })
    }
    
    return realElement
}

export function applyProps(realElement, props) {
    Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith('on') && typeof value === 'function') {
            const event_name = key.toLowerCase().substring(2)
            realElement.addEventListener(event_name, value)
        }
        else if (key === 'className' || key === 'class') {
             realElement.setAttribute('class', value)
        }
        else if (key === 'checked' || key === 'value') {
            realElement[key] = value
        }
        else {
             realElement.setAttribute(key, value)
        }
    })
}
