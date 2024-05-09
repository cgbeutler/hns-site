import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// const config = {
//   onwarn: (warning, handler) => {
//     if (warning.code.startsWith('a11y-')) {
//       return;
//     }
//     handler(warning);
//   },
//   kit: {
//     adapter: adapter(),
//   }
// };

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}
