# Project Implementation: TodoMVC with Mini-Framework
**Branch:** `asa`

This document outlines the implementation details and the series of framework-level fixes required to get the TodoMVC application fully functional.

## 1. Feature Implementation

### Router (`mini-framework/router.js`)
Implemented a lightweight hash-based router to handle client-side navigation.
- **Functionality**: Listens for the `hashchange` event.
- **Routes**:
    - `#/`: Shows all todos.
    - `#/active`: Shows only incomplete todos.
    - `#/completed`: Shows only completed todos.
- **Helpers**: Added `getFilter()` to translate routes into application filter states ('all', 'active', 'completed').

### Application Logic (`app.js`)
Implemented the core functionality using the mini-framework's `useState`, `useEffect`, and `h` (createElement).
- **State Management**: managed `todos` array and `filter` string.
- **Persistence**: `useEffect` hooks to load from and save to `localStorage` ('todo-mvc-todos').
- **State Cleanup**: Added logic to deduplicate todos on load (repairing data corruption from early bugs).
- **UI Components**:
    - **Header**: Input for new tasks (Enter key listener).
    - **Main**: List of todos with checkboxes and delete buttons. Implemented "Mark all as complete".
    - **Footer**: Dynamic count of items left, filter navigation, and "Clear completed" button.

## 2. Infrastructure & Environment Fixes

### Index Configuration
- **Issue**: The original `index.html` pointed to non-existent `scripts/` and `resources/` directories.
- **Fix**: Updated paths to point to root-level `app.js` and `style.css`.
- **Module Support**: Added `type="module"` to the `app.js` script tag to support ES6 imports.

## 3. Critical Framework Bug Fixes

During the development, several bugs in the mini-framework were uncovered and fixed.

### Fix 1: Event Listener Accumulation (`renderer.js`)
- **Symptom**: New tasks appeared to replace old ones, or state seemed "stuck".
- **Root Cause**: The renderer was forcing new event listeners onto DOM elements without removing the old ones. Because the old listeners were closures bound to an older state (where the todo list was empty), they overwrote the new state whenever triggered.
- **Fix**: Updated `applySingleProp` to store references to event handlers on the DOM element (`_eventHandlers`) and remove the existing listener before attaching a new one.

### Fix 2: Checkbox "Ghost" State in Filters (`dom-diff.js`)
- **Symptom**: Checking an item and switching to "Active" showed the item as "gone" but the *next* item in the list would appear checked incorrectly.
- **Root Cause**: The Virtual DOM diff algorithm tries to reuse DOM elements. When a user checks a box, the DOM state changes, but the Virtual DOM doesn't "know" this. When reusing that checked checkbox for an unchecked item, the diffing algorithm thought "properties haven't changed" and didn't force it to uncheck.
- **Fix**: Modified `diffProps` to **always** generate a patch for `checked` and `value` properties, ensuring the DOM is forced to match the application state regardless of user interaction.

### Fix 3: Deletion Index Shifting (`renderer.js`)
- **Symptom**: Deleting or filtering multiple items caused "doubling" of tasks or failure to delete items properly.
- **Root Cause**: The `applyPatches` function processed `REMOVE` patches in ascending order (index 0, then index 1, etc.). Removing index 0 shifts index 1 to 0. The next remove operation then tries to remove index 1 (which is now what was index 2), unintentionally skipping items or deleting the wrong ones.
- **Fix**: Overhauled `applyPatches` to separate removal operations.
    - **Create/Update**: Applied first, in standard order.
    - **Remove**: Applied LAST, and sorted in **Descending** order (bottom-to-top). This ensures that deleting an item does not change the indices of previous items waiting to be deleted.

## Conclusion
The application is now fully functional with stable routing, persistence, and state management. The underlying mini-framework has been patched to handle DOM diffing and patching more reliably.
