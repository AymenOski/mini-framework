/**
 * RENDER.JS
 * 
 * Purpose: Convert virtual DOM to real DOM and apply patches
 * 
 * This module is the bridge between the virtual world (JavaScript objects)
 * and the real world (browser DOM). It's responsible for:
 * 1. Creating real DOM elements from virtual DOM objects
 * 2. Attaching event handlers
 * 3. Applying patches/changes to existing DOM
 * 
 * ============================================================================
 * 
 * TWO MAIN FUNCTIONS:
 * 
 * 1. render(vnode, container)
 *    - Initial render: Convert virtual DOM to real DOM
 *    - Called once or when mounting
 *    - vnode: Virtual DOM object from create-element.js
 *    - container: Real DOM element where to insert (document.getElementById('app'))
 * 
 * 2. patch(patches, container)
 *    - Update render: Apply patches from dom-diff.js
 *    - Called whenever state changes
 *    - patches: Array of changes to apply
 *    - container: Real DOM element to update
 * 
 * HANDLING EVENTS:
 * 
 * Virtual DOM can have event handlers in props:
 * {
 *   tag: 'button',
 *   props: {
 *     class: 'btn',
 *     onClick: handleButtonClick,      // This is an event handler
 *     onChange: handleInputChange
 *   }
 * }
 * 
 * When rendering, attach these as DOM event listeners:
 * element.addEventListener('click', handleButtonClick)
 * element.addEventListener('change', handleInputChange)
 * 
 * Note: Props starting with 'on' (onClick, onChange) are event handlers
 * 
 * ============================================================================
 * 
 * MAIN FUNCTIONS TO IMPLEMENT (suggestion of course):
 * 
 * 1. render(vnode, container)
 *    - Create real DOM elements from virtual DOM
 *    - Attach event listeners
 *    - Insert into container
 * 
 * 2. patch(patches)
 *    - Apply changes from dom-diff to real DOM
 *    - Handle each patch type appropriately
 * 
 * 3. createRealElement(vnode)
 *    - Helper: Convert single vnode to DOM element
 *    - Create element, set props, attach listeners
 *    - Recursively create children
 * 
 * 4. attachEventListener(element, eventName, handler)
 *    - Helper: Attach event handler to element
 *    - Convert 'onClick' to 'click', 'onChange' to 'change', etc.
 * 
 * 5. updateElement(element, props)
 *    - Helper: Update element's attributes
 *    - Set class, id, data-* attributes, etc.
 *    - Skip event handler props (they're on* )
 * 
 * ============================================================================
 * 
 * EXAMPLE: Applying a patch
 * 
 * Patch: { type: 'UPDATE_PROPS', index: 0, props: { class: 'active' } }
 * 
 * Steps:
 * 1. Find the real DOM element at index 0
 * 2. Update its attributes: element.setAttribute('class', 'active')
 * 
 * ============================================================================
 * 
 * TEXT NODES:
 * 
 * Virtual text node:
 * { text: 'Hello World' }
 * 
 * Real DOM:
 * document.createTextNode('Hello World')
 * 
 * ============================================================================
 * 
 * EXAMPLE USAGE:
 * 
 * // Initial render
 * const app = createElement('div', { class: 'app' }, children);
 * render(app, document.getElementById('app'));
 * 
 * // Later when state changes
 * const newApp = createElement('div', { class: 'app' }, updatedChildren);
 * const patches = diff(oldVdom, newApp);
 * patch(patches);
 * 
 * ============================================================================
 */