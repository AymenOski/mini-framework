/**
 * APP.JS
 * 
 * Purpose: Main application entry point
 * 
 * This file brings everything together:
 * - Imports framework modules
 * - Initializes the app
 * - Creates the UI structure
 * - Sets up event handlers
 * - Connects to state and routing
 */

import { createElement as h } from "./mini-framework/create-element.js";
import { mount } from "./mini-framework/renderer.js";


function App() {
    return h('div', { className: 'app-root' },
        h('h1', null, 'My TodoMVC'),
        h('input', { id: 'new-todo', placeholder: 'What needs to be done?' }),
    );
}

mount(App, '#app');
