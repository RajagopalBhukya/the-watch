# The_Watch

Production-ready frontend demo for THE WATCH.

## Requirements

- Node.js 20.19+ or Node.js 22.12+
- npm 10+

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` directory to Vercel, Cloudflare Pages, Netlify, or any static host.

## Quality checks

```bash
npm run format
npm run format:check
npm audit
npm run build
```

The cart uses localStorage. The browser session uses sessionStorage plus a first-party cookie. These are client-side demo persistence mechanisms and are not a server-side commerce backend.
