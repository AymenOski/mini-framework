/**
 * ROUTER.JS
 * 
 * Purpose: Synchronize URL hash with application state
 */

let onRouteChanged = () => { };

export const initRouter = (callback) => {
    onRouteChanged = callback;
    window.addEventListener('hashchange', () => {
        const route = window.location.hash;
        onRouteChanged(route);
    });
    // Handle initial route
    onRouteChanged(window.location.hash || '#/');
};

export const navigate = (route) => {
    window.location.hash = route;
};

export const getFilter = (route) => {
    if (route === '#/active') return 'active';
    if (route === '#/completed') return 'completed';
    return 'all';
};

export const getCurrentRoute = () => {
    return window.location.hash || '#/';
};