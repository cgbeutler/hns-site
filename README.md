# Cory Beutler Website

Using the Svelte + TS + Vite Template.

Migrate to SvelteKit if you need a little more server-side power or speed.

## Run or Build

If this is a fresh repo, first run
```sh
npm install
```

Run a hot-reloading dev environment with:
```sh
npm run dev
```

Build to the `dist` folder with:
```sh
npm run build
```

## Q&A
This note was in the original template readme.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
