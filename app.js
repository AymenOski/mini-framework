/**
 * APP.JS
 * 
 * Purpose: Main application entry point
 */

import { createElement as h } from "./mini-framework/create-element.js";
import { mount } from "./mini-framework/renderer.js";
import { useState, useEffect } from "./mini-framework/hooks.js";
import { initRouter, getFilter } from "./mini-framework/router.js";

function App() {
    // --- STATE ---
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    // --- EFFECTS ---

    // Load initial state
    useEffect(() => {
        const saved = localStorage.getItem('todo-mvc-todos');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Deduplicate based on ID to fix any state corruption from previous bugs
            const uniqueTodos = Array.from(new Map(parsed.map(item => [item.id, item])).values());
            console.log('Loaded todos:', uniqueTodos);
            setTodos(uniqueTodos);
        }
    }, []);

    // Save state on change
    useEffect(() => {
        localStorage.setItem('todo-mvc-todos', JSON.stringify(todos));
    }, [todos]);

    // Initialize Router
    useEffect(() => {
        initRouter((route) => {
            const newFilter = getFilter(route);
            setFilter(newFilter);
        });
    }, []);

    // --- HANDLERS ---

    const addTodo = (title) => {
        const newTodo = {
            id: Date.now().toString(),
            title: title,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(t => !t.completed));
    };

    const handleNewTodoKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            addTodo(e.target.value.trim());
            e.target.value = '';
        }
    };

    // --- FILTERING ---

    const visibleTodos = todos.filter(t => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    const activeCount = todos.filter(t => !t.completed).length;
    const completedCount = todos.length - activeCount;

    // --- RENDER HELPERS ---

    // Header
    const renderHeader = () => (
        h('header', { className: 'header' },
            h('div', { className: 'header-input-container' },
                h('input', {
                    className: 'new-todo',
                    placeholder: 'what needs to be done ?',
                    autofocus: true,
                    onkeydown: handleNewTodoKeyDown
                })
            )
        )
    );

    // Main Section (List)
    const renderMain = () => {
        // Always render renderMain container so we can maintain the orange box structure if desired, 
        // but typically TodoMVC hides main when no todos. 
        // The image shows the list populated. 
        // I will stick to standard behavior but ensure the container is styled right when present.
        if (todos.length === 0) return null;

        return h('section', { className: 'main' },
            h('input', {
                id: 'toggle-all',
                className: 'toggle-all',
                type: 'checkbox',
                checked: activeCount === 0,
                onchange: () => {
                    const allCompleted = activeCount === 0;
                    setTodos(todos.map(t => ({ ...t, completed: !allCompleted })));
                }
            }),
            h('label', { for: 'toggle-all' }, 'Mark all as complete'),
            h('ul', { className: 'todo-list' },
                ...visibleTodos.map(todo =>
                    h('li', { className: todo.completed ? 'completed' : '' },
                        h('div', { className: 'view' },
                            h('div', { className: 'checkbox-wrapper' },
                                h('input', {
                                    className: 'toggle',
                                    type: 'checkbox',
                                    checked: todo.completed,
                                    onchange: () => toggleTodo(todo.id)
                                }),
                                h('span', { className: 'custom-checkbox' })
                            ),
                            h('label', null, todo.title),
                            // Destroy button might be hidden in design or hover-only. 
                            // I'll keep it but style it invisibly unless hovered if needed.
                            // The image doesn't show it explicitly on the items.
                            h('button', {
                                className: 'destroy',
                                onclick: () => deleteTodo(todo.id)
                            })
                        )
                    )
                )
            )
        );
    };

    // Navbar with Filter Tabs
    const renderNavbar = () => (
        h('nav', { className: 'navbar' },
            h('ul', { className: 'navbar-tabs' },
                h('li', null,
                    h('a', {
                        href: '#/',
                        className: `tab ${filter === 'all' ? 'active' : ''}`
                    }, 'All Tasks.')
                ),
                h('span', { className: 'tab-divider' }),
                h('li', null,
                    h('a', {
                        href: '#/active',
                        className: `tab ${filter === 'active' ? 'active' : ''}`
                    }, 'Active Tasks.')
                ),
                h('span', { className: 'tab-divider' }),
                h('li', null,
                    h('a', {
                        href: '#/completed',
                        className: `tab ${filter === 'completed' ? 'active' : ''}`
                    }, 'Completed Tasks.')
                )
            )
        )
    );

    // Footer
    const renderFooter = () => {
        // Show footer only if there are completed tasks? 
        // The image shows "Clear Completed Tasks." button. 
        // I'll show it if there are completed tasks, or maybe always if the design implies it.
        // Standard TodoMVC behavior: footer hidden if no todos. 
        if (todos.length === 0) return null;

        return h('footer', { className: 'footer' },
            completedCount > 0 ? h('button', {
                className: 'clear-completed',
                onclick: clearCompleted
            }, 'Clear Completed Tasks.') : null
        );
    };

    // --- MAIN RENDER ---

    return h('div', { className: 'todoapp' },
        renderHeader(),
        renderNavbar(),
        renderMain(),
        renderFooter()
    );
}

mount(App, '#app');
