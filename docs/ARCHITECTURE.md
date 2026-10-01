# The_Watch frontend architecture

## High-level design

The application is a React/Vite single-page storefront. Presentation is split into Home, Shop, Collections, About, Contact, Footer, Cart, and Product Detail components. Shop and Collections deliberately use separate JSON catalogs so their media cannot be mixed by array position.

## Product identity rule

Every product has one immutable unique `id`. Catalog JSON stores products in `productsById`, and `productOrder` only controls display order. A product owns its `assets.singleImage`, `assets.image360`, and (for Shop only) `assets.video`. Components never derive one product's media from another product's index.

## Low-level reliability

- JSON requests use `AbortController` cleanup and explicit HTTP error handling.
- Timers, observers, and event listeners return React cleanup functions.
- Product modal state resets whenever the selected product ID changes.
- Cart storage validates its schema and discards stale legacy data.
- An error boundary prevents a component exception from producing an unexplained blank screen.
- Browser garbage collection remains automatic; the app releases timers, observers, listeners, and aborted requests so unused resources can be collected normally.
