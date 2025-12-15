/**
 * CREATE-ELEMENT.JS
 * 
 * Purpose: Factory function to create Virtual DOM objects
 * 
 * This module provides the createElement function that creates JavaScript objects
 * representing DOM elements. These objects are NOT real DOM nodes - they're a
 * virtual representation that will be converted to real DOM later.
 * 
 * Why separate from real DOM?
 * - Allows us to compare old vs new virtual trees
 * - Enables diffing algorithm to find minimal changes
 * - Makes the framework fast and efficient
 * 
 * ============================================================================
 * 
 * STRUCTURE OF A VIRTUAL DOM OBJECT:
 * 
 * {
 *   tag: 'div',                    // HTML tag name
 *   props: {                        // Attributes and event handlers
 *     class: 'todo-item',
 *     id: 'todo-1',
 *     onClick: functionHandler      // Event handlers (like onClick, onChange)
 *   },
 *   children: [                     // Nested elements or text
 *     { tag: 'span', props: {}, children: ['Buy milk'] },
 *     { tag: 'button', props: { onClick: deleteHandler }, children: ['Delete'] }
 *   ]
 * }
 * 
 * ============================================================================
 * 
 * WHAT THIS MODULE SHOULD EXPORT:
 * 
 * createElement(tag, props, ...children)
 * 
 * Parameters:
 *   - tag (string): HTML tag name like 'div', 'button', 'ul', etc.
 *   - props (object): Attributes and event handlers { class: 'btn', onClick: handler }
 *   - children (args): Remaining arguments are child elements or text strings
 * 
 * Returns:
 *   Virtual DOM object with structure shown above
 * 
 * ============================================================================
 * 
 * EXAMPLES OF USAGE:
 * 
 * // Simple button
 * createElement('button', { class: 'btn', id: 'submit' }, 'Click me')
 * 
 * // With event handler
 * createElement('input', {
 *   type: 'text',
 *   placeholder: 'Enter task',
 *   onChange: handleChange
 * })
 * 
 * // Nested elements
 * createElement('div', { class: 'container' },
 *   createElement('h1', {}, 'Todo List'),
 *   createElement('ul', { class: 'list' },
 *     createElement('li', {}, 'Item 1'),
 *     createElement('li', {}, 'Item 2')
 *   )
 * )
 * 
 * ============================================================================
 * 
 * SPECIAL CONSIDERATIONS:
 * 
 * 1. TEXT NODES: Strings in children should be converted to text nodes
 *    { text: 'Hello' }
 * 
 * 2. FLATTENING: If a child is an array, it should be flattened
 *    createElement('ul', {}, [li1, li2, li3]) → properly flatten
 * 
 * 3. KEYS: For lists, support a 'key' prop to help identify elements
 *    createElement('li', { key: todo.id }, ...)
 * 
 * 4. NULL/UNDEFINED CHILDREN: Filter out null or undefined children
 * 
 * 5. EVENT HANDLERS: Store them in props as onClick, onChange, etc.
 *    These will be attached to real DOM elements by render.js
 * 
 * ============================================================================
 */

/**
 * TODO: IMPLEMENT THIS FUNCTION
 * 
 * Your implementation should:
 * 1. Accept a tag, props object, and variable number of children
 * 2. Flatten children array (handle nested arrays)
 * 3. Convert string children to text nodes { text: string }
 * 4. Create and return a virtual DOM object
 * 5. Handle edge cases (null, undefined, empty arrays)
 */
