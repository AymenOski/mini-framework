/**
 * ROUTER.JS
 * 
 * Purpose: Synchronize URL hash with application state
 * 
 * This module handles client-side routing using URL hashes (#).
 * When the URL changes, it updates the application state.
 * When state changes, it updates the URL.
 * This keeps everything in sync without page reloads.
 * 
 * ============================================================================
 * 
 * HOW HASH-BASED ROUTING WORKS:
 * 
 * Traditional URL: https://example.com/todos/active
 * Hash URL:       https://example.com/#/active
 * 
 * Advantages of hash URLs:
 * - No server-side routing needed
 * - Page doesn't reload on hash change
 * - Can track navigation history (back/forward buttons work)
 * - Simple to implement
 * 
 * ============================================================================
 * 
 * ROUTES FOR TODOMVC:
 * 
 * #/             - Show all todos (filter = "all")
 * #/active       - Show only incomplete todos (filter = "active")
 * #/completed    - Show only completed todos (filter = "completed")
 * 
 * When URL is:     Filter state should be:
 * ----             ----
 * #/               "all"
 * #/active         "active"
 * #/completed      "completed"
 * 
 * ============================================================================
 * 
 * THE ROUTING FLOW:
 * 
 * SCENARIO 1: User clicks "Active" button
 * 
 * User clicks button
 *       ↓
 * router.navigate("#/active")  <- Called from button handler
 *       ↓
 * window.location.hash = "#/active"  <- URL changes
 *       ↓
 * 'hashchange' event fires
 *       ↓
 * Our onRouteChange listener is called
 *       ↓
 * Update store.setState({ filter: "active" })
 *       ↓
 * State triggers re-render
 *       ↓
 * UI shows only active todos
 *       ↓
 * URL shows #/active
 * (Everything stays in sync!)
 * 
 * ============================================================================
 * 
 * SCENARIO 2: User clicks browser back button
 * 
 * User clicks back button
 *       ↓
 * Browser changes URL to previous hash
 *       ↓
 * 'hashchange' event fires
 *       ↓
 * Our onRouteChange listener is called
 *       ↓
 * Update store.setState({ filter: "all" })
 *       ↓
 * State triggers re-render
 *       ↓
 * UI updates
 * (Browser history is preserved!)
 * 
 * ============================================================================
 * 
 * METHODS TO IMPLEMENT:
 * 
 * 1. initRouter()
 *    - Set up the router when app starts
 *    - Listen for 'hashchange' event
 *    - Get initial route from current URL
 * 
 * 2. onRouteChange(callback)
 *    - Register a callback function
 *    - This callback gets called whenever URL hash changes
 *    - callback receives (route) parameter: "#/active"
 * 
 * 3. navigate(route)
 *    - Change the URL programmatically
 *    - route: "#/active" or "#/completed" or "#/"
 *    - Sets window.location.hash
 *    - This triggers 'hashchange' event
 * 
 * 4. getCurrentRoute()
 *    - Returns the current hash route
 *    - Example: "#/active"
 * 
 * 5. getFilter()
 *    - Helper: Convert route to filter value
 *    - "#/" → "all"
 *    - "#/active" → "active"
 *    - "#/completed" → "completed"
*/