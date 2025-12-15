/**
 * DOM-DIFF.JS
 * 
 * Purpose: Compare virtual DOM trees and find the minimal differences
 * 
 * This is the heart of the framework's performance optimization!
 * Instead of updating the entire DOM, we find exactly what changed
 * and only update those parts.
 * 
 * ============================================================================
 * 
 * THE DIFFING ALGORITHM - How it works:
 * 
 * We compare OLD virtual DOM with NEW virtual DOM recursively:
 * 
 * Step 1: Compare node types
 *   - If old.tag !== new.tag → REPLACE entire node
 *   - If old is text but new isn't → REPLACE
 * 
 * Step 2: Compare properties (if same tag)
 *   - If any prop changed → UPDATE that prop
 *   - If new props added → ADD them
 *   - If props removed → REMOVE them
 * 
 * Step 3: Compare children (if same tag and props same)
 *   - Recursively diff each child
 *   - If new children added → ADD them
 *   - If children removed → REMOVE them
 *   - If children count different → Handle additions/removals
 * 
 * ============================================================================
 * 
 * EXAMPLE OF DIFFING:
 * 
 * OLD:
 * {
 *   tag: 'div',
 *   props: { class: 'container' },
 *   children: [
 *     { tag: 'p', props: {}, children: [{ text: 'Old text' }] },
 *     { tag: 'button', props: {}, children: [{ text: 'Delete' }] }
 *   ]
 * }
 * 
 * NEW:
 * {
 *   tag: 'div',
 *   props: { class: 'container active' },  // Class changed
 *   children: [
 *     { tag: 'p', props: {}, children: [{ text: 'New text' }] },  // Text changed
 *     { tag: 'span', props: {}, children: [{ text: 'X' }] }      // Tag changed
 *   ]
 * }
 * 
 * PATCHES RETURNED:
 * [
 *   { type: 'UPDATE_PROPS', element: divElement, props: { class: 'container active' } },
 *   { type: 'UPDATE_TEXT', element: pElement, text: 'New text' },
 *   { type: 'REPLACE', element: buttonElement, newNode: spanNode }
 * ]
 * 
 * ============================================================================
 * 
 * TYPES OF CHANGES:
 * 
 * 1. REPLACE
 *    - Old node is completely different from new node
 *    - Must replace entire element in real DOM
 * 
 * 2. REORDER (for lists)
 *    - Children are same but in different order
 *    - Can reorder in DOM without replacing
 * 
 * 3. UPDATE_PROPS
 *    - Same element, but properties/attributes changed
 *    - Update class, id, data-* attributes, etc.
 * 
 * 4. UPDATE_CHILDREN
 *    - Same element, children changed
 *    - Add/remove/update children recursively
 * ============================================================================
 * 
 * ALGORITHM PSEUDOCODE:
 * 
 * function diff(oldVnode, newVnode, index) {
 *   const patches = []
 *   
 *   // Case 1: Node was removed
 *   if (newVnode === null) {
 *     patches.push({ type: 'REMOVE', index })
 *     return patches
 *   }
 *   
 *   // Case 2: Both are text nodes
 *   if (typeof oldVnode === 'string' && typeof newVnode === 'string') {
 *     if (oldVnode !== newVnode) {
 *       patches.push({ type: 'UPDATE_TEXT', text: newVnode })
 *     }
 *     return patches
 *   }
 *   
 *   // Case 3: Different tags or type
 *   if (oldVnode.tag !== newVnode.tag) {
 *     patches.push({ type: 'REPLACE', node: newVnode })
 *     return patches
 *   }
 *   
 *   // Case 4: Same tag - check props and children
 *   const propPatches = diffProps(oldVnode.props, newVnode.props)
 *   if (propPatches) {
 *     patches.push({ type: 'UPDATE_PROPS', props: propPatches })
 *   }
 *   
 *   // Recursively diff children
 *   diffChildren(oldVnode.children, newVnode.children, patches)
 *   
 *   return patches
 * }
 * 
 * ============================================================================
 * 
 * WHY THIS MATTERS FOR PERFORMANCE:
 * 
 * Without diffing (naive approach):
 * - Remove all DOM elements
 * - Create all new DOM elements
 * - Insert all new elements
 * - Repaint entire page
 * = SLOW! 🐢
 * 
 * With diffing (smart approach):
 * - Calculate exact changes
 * - Only update attributes that changed
 * - Only update text that changed
 * - Keep existing elements if possible
 * - Minimal repainting
 * = FAST! ⚡
*/
