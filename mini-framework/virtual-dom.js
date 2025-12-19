let currentVdom = null;

export function setCurrentVdom(vdom) {
    currentVdom = vdom;
}

export function getCurrentVdom(){
    return currentVdom;
}

export function updateVdom(newVdom) {
    // Get the old VDOM we stored
    const oldVdom = getCurrentVdom();
    
    // Call diffing algorithm (from dom-diff.js)
    // const patches = diff(oldVdom, newVdom);
    
    // Apply patches to real DOM (from render.js)
    // applyPatches(patches);
    
    // Update storage for next time
    setCurrentVdom(newVdom);
}

