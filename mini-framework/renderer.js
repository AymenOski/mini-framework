// renderer.js
import { update, setMainComponent } from "./virtual-dom.js";

let rootContainer = null;
let mainComponent = null;

export function mount(component, container) {
    mainComponent = component;

    rootContainer = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!rootContainer) return;

    setMainComponent(mainComponent);
    update();
}

export function applyPatches(patches) {
    if (!rootContainer) return;

    patches.forEach((patchList, path) => {
        patchList.forEach(patch => {
            switch (patch.type) {
                case 'CREATE':
                    {
                        const newElement = createRealElement(patch.vdom);

                        // First render: mount root element
                        if (path === '') {
                            rootContainer.innerHTML = '';
                            rootContainer.appendChild(newElement);
                            break;
                        }

                        // Child create: insert into parent at index
                        const parts = path.split(',');
                        const childIndex = Number(parts.pop());
                        const parentPath = parts.join(',');
                        const parentEl = parentPath === ''
                            ? rootContainer.firstChild
                            : findElementByPath(rootContainer, parentPath);

                        if (!parentEl) break;

                        const beforeNode = parentEl.childNodes[childIndex] ?? null;
                        parentEl.insertBefore(newElement, beforeNode);
                    }
                    break;

                case 'REMOVE':
                    {
                        const element = path === '' ? rootContainer.firstChild : findElementByPath(rootContainer, path);
                        if (element && element.parentNode) element.parentNode.removeChild(element);
                    }
                    break;

                case 'REPLACE':
                    {
                        const element = path === '' ? rootContainer.firstChild : findElementByPath(rootContainer, path);
                        if (!element) break;
                        const replacement = createRealElement(patch.vdom);
                        if (element.parentNode) element.parentNode.replaceChild(replacement, element);
                    }
                    break;

                case 'UPDATE_PROPS':
                    {
                        const element = path === '' ? rootContainer.firstChild : findElementByPath(rootContainer, path);
                        if (element) applySingleProp(element, patch.key, patch.value);
                    }
                    break;

                case 'UPDATE_TEXT':
                    {
                        const element = path === '' ? rootContainer.firstChild : findElementByPath(rootContainer, path);
                        if (element) element.textContent = patch.text;
                    }
                    break;
            }
        });
    });
}

function findElementByPath(container, path) {
    if (path === '') return container.firstChild;

    const indices = path.split(',').map(Number);
    let current = container.firstChild;

    for (const index of indices) {
        if (!current) return null;
        current = current.childNodes[index];
    }

    return current;
}

function applySingleProp(element, key, value) {
    if (value === undefined) {
        element.removeAttribute(key);
        return;
    }

    if (key.startsWith('on')) {
        const eventName = key.toLowerCase().substring(2);
        element.addEventListener(eventName, value);
        return;
    }

    if (key === 'className') {
        element.setAttribute('class', value);
        return;
    }

    if (key === 'checked' || key === 'value') {
        element[key] = value;
        return;
    }

    element.setAttribute(key, value);
}

export function createRealElement(vdom) {
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom.toString());
    }

    if (!vdom) {
        return document.createTextNode('');
    }

    const element = document.createElement(vdom.tag);

    if (vdom.props) {
        Object.entries(vdom.props).forEach(([key, value]) => {
            applySingleProp(element, key, value);
        });
    }

    if (vdom.children) {
        vdom.children.forEach(child => {
            element.appendChild(createRealElement(child));
        });
    }

    return element;
}