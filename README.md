# Mini-Framework

## What You're Building

A JavaScript framework with Virtual DOM, diffing, routing, state management, and events. Test it with TodoMVC.

## Team Breakdown (3 People)

**Team 1: Virtual DOM + Diffing**
- `create-element.js` - Build virtual DOM objects
- `virtual-dom.js` - Manage virtual tree
- `dom-diff.js` - Diffing algorithm (the hard part)

**Team 2: Rendering + Hooks + Events**
- `render.js` - Real DOM + patching
- `hooks.js` - useState, useEffect, useRef (hooks-based state)
- Event delegation system + synthetic events
- Handle onClick, onChange, etc.

**Team 3: Routing + App**
- `router.js` - Hash-based routing (#/, #/active, #/completed)
- `app.js` - TodoMVC logic (add, delete, filter, persist, state structure)

## Core Concepts (Must Know)

1. **Virtual DOM**: JS object representation of DOM
2. **Diffing**: Compare old & new vdom, generate patches
3. **State-Driven**: State changes → UI updates (not manual DOM manipulation)
4. **Routing**: URL hash changes trigger state updates
5. **Hooks**: useState, useEffect, useRef for state & side effects

## TodoMVC Requirements

- Add/delete/edit todos
- Check/uncheck (mark complete)
- Filter: All / Active / Completed
- Clear completed button
- Item counter
- URL synced with filter
- Persist in localStorage

## File Structure

```
mini-framework/
├── mini-framework/
│   ├── create-element.js
│   ├── virtual-dom.js
│   ├── dom-diff.js
│   ├── render.js
│   ├── hooks.js
│   └── router.js
├── index.html
├── app.js
├── style.css
└── resources/styles/index.css
```

## Performance Requirements

- **60 FPS minimum**
- No frame drops
- Use requestAnimationFrame
- Minimal DOM reflows

## Start Here

1. Team 1: `create-element.js` - make it return `{tag, props, children}`
2. Team 2: `render.js` - convert vdom to real DOM + hooks implementation
3. Team 3: `router.js` & `app.js` - routing + app logic
4. Integrate all parts together
5. Test in browser - check performance

## What You'll Learn

**As a Team:**
- How modern frameworks work internally (React, Vue, Angular)
- How to architect scalable applications
- Performance optimization techniques
- Separation of concerns & modularity
- Event system design patterns

**Team 1 (Virtual DOM + Diffing):**
- Recursive algorithms & tree traversal
- Time complexity optimization (O(n) diffing)
- Data structure design
- Algorithm efficiency & performance
- Interview-ready algorithm implementation

**Team 2 (Rendering + Hooks + Events):**
- DOM manipulation & performance
- React-like hooks implementation (useState, useEffect, useRef)
- Event delegation patterns
- Memory management & cleanup
- Browser rendering cycles (reflow/repaint)

**Team 3 (Routing + App):**
- Application state design & architecture
- Routing patterns & URL management
- Feature implementation from scratch
- Data persistence (localStorage)
- Complex UI logic & user interactions

## Next Project

**bomberman-dom** - Multiplayer game using this framework.
