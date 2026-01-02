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
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

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

    // Focus edit input when editing starts
    useEffect(() => {
        if (editingId) {
            const editInput = document.querySelector('.edit');
            if (editInput) {
                editInput.focus();
                editInput.select();
            }
        }
    }, [editingId]);

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

    const startEditing = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.title);
    };

    const saveEdit = (id) => {
        const trimmed = editText.trim();
        if (trimmed) {
            setTodos(todos.map(t =>
                t.id === id ? { ...t, title: trimmed } : t
            ));
        } else {
            // Delete if empty
            setTodos(todos.filter(t => t.id !== id));
        }
        setEditingId(null);
        setEditText('');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    const handleEditKeyDown = (e, id) => {
        if (e.key === 'Enter') {
            saveEdit(id);
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
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

    // Header with title and filters
    const renderHeader = () => (
        h('header', null,
            h('h1', null, 'todos'),
            h('input', {
                className: 'new-todo',
                placeholder: 'What needs to be done?',
                autofocus: true,
                onkeydown: handleNewTodoKeyDown
            })
        )
    );

    // Main Section (List)
    const renderMain = () => {
        return h('section', { className: 'main' },
            h('input', {
                id: 'toggle-all',
                className: 'toggle-all',
                type: 'checkbox',
                checked: activeCount === 0 && todos.length > 0,
                onchange: () => {
                    const allCompleted = activeCount === 0;
                    setTodos(todos.map(t => ({ ...t, completed: !allCompleted })));
                }
            }),
            h('label', { for: 'toggle-all' }, ''),
            todos.length > 0 ? h('ul', { className: 'todo-list', key: filter },
                ...visibleTodos.map(todo => {
                    const isEditing = editingId === todo.id;
                    return h('li', { 
                        className: `${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`,
                        key: todo.id
                    },
                        h('div', { className: 'view' },
                            h('input', {
                                className: 'toggle',
                                type: 'checkbox',
                                checked: todo.completed,
                                onchange: () => toggleTodo(todo.id)
                            }),
                            h('label', { 
                                ondblclick: () => startEditing(todo)
                            }, todo.title),
                            h('button', {
                                className: 'destroy',
                                onclick: () => deleteTodo(todo.id)
                            }, '×')
                        ),
                        isEditing ? h('input', {
                            className: 'edit',
                            value: editText,
                            oninput: (e) => setEditText(e.target.value),
                            onkeydown: (e) => handleEditKeyDown(e, todo.id),
                            onblur: () => saveEdit(todo.id),
                            autofocus: true
                        }) : null
                    );
                })
            ) : null
        );
    };

    // Footer
    const renderFooter = () => {
        if (todos.length === 0) return null;

        return h('footer', { className: 'footer' },
            h('span', { className: 'todo-count' },
                h('strong', null, activeCount),
                activeCount === 1 ? ' item left' : ' items left'
            ),
            h('ul', { className: 'filters' },
                h('li', null,
                    h('a', {
                        href: '#/',
                        className: filter === 'all' ? 'selected' : ''
                    }, 'All')
                ),
                h('li', null,
                    h('a', {
                        href: '#/active',
                        className: filter === 'active' ? 'selected' : ''
                    }, 'Active')
                ),
                h('li', null,
                    h('a', {
                        href: '#/completed',
                        className: filter === 'completed' ? 'selected' : ''
                    }, 'Completed')
                )
            ),
            completedCount > 0 ? h('button', {
                className: 'clear-completed',
                onclick: clearCompleted
            }, 'Clear completed') : null
        );
    };

    // --- MAIN RENDER ---

    return h('div', { className: 'todoapp' },
        renderHeader(),
        renderMain(),
        renderFooter()
    );
}

mount(App, '#app');