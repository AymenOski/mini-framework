import { diff } from './dom-diff.js';
import { applyPatches } from './render.js';

let currentVdom = null;

export function setCurrentVdom(vdom) {
    currentVdom = vdom;
}

export function getCurrentVdom(){
    return currentVdom;
}

export function updateVdom(newVdom) {
    const oldVdom = getCurrentVdom();
    
    const patches = diff(oldVdom, newVdom);
    
    applyPatches(patches);
    
    setCurrentVdom(newVdom);
}
