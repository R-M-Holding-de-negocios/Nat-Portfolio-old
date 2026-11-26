import { defineConfig } from 'astro/config';
// Set `site` to the real domain before publishing so canonical/OG URLs become absolute.
export default defineConfig({ output: 'static', devToolbar: { enabled: false } });
