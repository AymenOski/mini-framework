/**
 * VIRTUAL-DOM.JS
 * 
 * Purpose: Manage the virtual representation of the DOM in memory
 * 
 * This module maintains the "virtual tree" - a JavaScript copy of what the DOM
 * should look like. We keep track of this to compare with new virtual trees
 * and find out what changed.
 * 
 * ============================================================================
 * 
 * THE BIG PICTURE - How Virtual DOM Fits In:
 * 
 * 1. User clicks button
 * 2. Event handler updates STATE 
 * 3. App creates NEW VIRTUAL DOM from new state (create-element.js)
 * 4. OLD VIRTUAL DOM (stored here) vs NEW VIRTUAL DOM compared (dom-diff.js)
 * 5. List of changes sent to render.js
 * 6. render.js updates real DOM with changes
 * 7. User sees the update
 * 
 * ============================================================================
 * 
 * VIRTUAL DOM EXAMPLE:
 * 
 * {
 *   tag: 'div',
 *   props: { id: 'app' },
 *   children: [
 *     {
 *       tag: 'h1',
 *       props: {},
 *       children: [{ text: 'Todo List' }]
 *     },
 *     {
 *       tag: 'ul',
 *       props: { class: 'todos' },
 *       children: [
 *         { tag: 'li', props: {}, children: [{ text: 'Item 1' }] },
 *         { tag: 'li', props: {}, children: [{ text: 'Item 2' }] }
 *       ]
 *     }
 *   ]
 * }
 * 
 * ============================================================================
 * 
 * WHAT THIS MODULE SHOULD MANAGE:
 * 
 * Internal state:
 * - Store the CURRENT virtual DOM tree in a variable
 * - Store the corresponding REAL DOM element that it's mounted to
 * 
 * ============================================================================
 * 
 * METHODS TO IMPLEMENT:
 * 
 * 1. getVirtualDOM()
 *    - Returns the current virtual DOM tree
 *    - Used by dom-diff.js to compare with new tree
 * 
 * 2. setVirtualDOM(vnode)
 *    - Updates the stored virtual DOM tree
 *    - Called after a successful update to track current state
 * 
 * 3. mount(vnode, container)
 *    - Initialize virtual DOM with a new tree
 *    - Mount it to a real DOM container element
 *    - Called once when app starts
 * 
 */