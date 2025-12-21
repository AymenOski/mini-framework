export function render(component_fn, container) {
    const vnode = component_fn()
    container.innerHTML = ''
    
    const dom_element = document.createElement(vnode.tag)
    if (vnode.children) {
        vnode.children.forEach(child => {
            dom_element.appendChild(document.createTextNode(child))
        })
    }
    
    container.appendChild(dom_element)
}
