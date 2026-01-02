# Mini-Framework

A lightweight, functional, Virtual DOM-based JavaScript framework for building modern web applications. This framework was built from scratch to demonstrate core concepts like DOM abstraction, state management, and routing without external dependencies.

## Features

- **Virtual DOM**: Efficiently updates only the parts of the DOM that changed.
- **React-like Hooks**: useState, useEffect, and useRef for state, side effects, and references
- **Routing**: A built-in hash-based router for single-page applications.
- **Event Handling**: Declarative event listeners via props.
- **Component-Based**: Build UI using reusable functional components.

## Objectives Implemented

- Abstracting the DOM (Virtual DOM)
- Routing System
- State Management
- Event Handling
- TodoMVC Project

---

## Documentation

### 1. Creating an Element
To create an element, use the `createElement` function (often aliased as `h`). It takes the tag name, an object of properties (attributes and events), and any number of children.

```javascript
import { createElement as h } from './mini-framework/create-element.js';

const element = h('div', { className: 'container' }, 'Hello World');
```

### 2. Adding Attributes
Attributes are passed as a plain JavaScript object in the second argument of `h`. Use `className` for the `class` attribute.

```javascript
const input = h('input', { 
    type: 'text', 
    placeholder: 'Enter name...',
    value: 'John Doe',
    className: 'form-control'
});
```

### 3. Creating an Event
Events are added by prefixing the event name with `on` in the props object.

```javascript
const button = h('button', {
    onclick: () => alert('Button clicked!')
}, 'Click Me');
```

### 4. Nesting Elements
Elements can be nested by passing other virtual nodes as children to the `h` function.

```javascript
const list = h('ul', { className: 'list' },
    h('li', null, 'Item 1'),
    h('li', null, 'Item 2'),
    h('li', null, 'Item 3')
);
```

---

## Why it works the way it works

### Abstracting the DOM (Virtual DOM)
Direct DOM manipulation is expensive and hard to manage. Our framework uses a **Virtual DOM**—a lightweight JavaScript object representation of the real DOM. 

1. **Render**: Components return a Virtual DOM tree.
2. **Diff**: When state changes, a new Virtual DOM tree is created. The framework compares (diffs) the new tree with the previous one.
3. **Patch**: The framework calculates the minimal set of changes (patches) needed and applies them to the real DOM.

### Reconciliation Algorithm
The `dom-diff.js` module implements a recursive diffing algorithm that identifies:
- Node replacements (if tags change).
- Attribute updates.
- Text content changes.
- Child additions or removals.

### Hooks and State
The `hooks.js` module maintains an internal array of states. Because components are just functions, we use a global index to track which `useState` call corresponds to which state slot. This index is reset on every render cycle, ensuring hooks are always associated with the correct data.

### Routing
The `router.js` module listens for `hashchange` events. When the URL hash changes (e.g., from `#/` to `#/active`), it triggers a callback that updates the application state, causing the UI to reflect the current route.

---

## TodoMVC Project
A fully functional TodoMVC application is included in `app.js`. It demonstrates:
- Complex state management (list of objects).
- Conditional rendering based on routes.
- LocalStorage persistence using `useEffect`.
- Event handling for keyboard and mouse interactions.

To run the project, simply open `index.html` in any modern web browser.
