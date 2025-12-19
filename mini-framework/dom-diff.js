/**
 * DOM-DIFF.JS
 * 
 * Compares old and new virtual DOM trees to generate patches (minimal changes).
 * Returns a Map where keys are paths and values are arrays of patches.
 * 
 * Patch types:
 * - CREATE: New element added
 * - REMOVE: Element removed
 * - REPLACE: Element type completely different
 * - UPDATE_PROPS: Attributes/properties changed
 * - UPDATE_TEXT: Text content changed
 */

export function diff(oldVdom, newVdom) {
    const patches = new Map();
    
    // first render: oldVdom is null
    if (oldVdom === null) {
        // Return one big CREATE patch at root path '' with full newVdom
        patches.set('', [{ type: 'CREATE', vdom: newVdom }]);
        return patches;
    }
        
    return patches;
}
