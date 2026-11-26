import { defineConfig } from 'astro/config';

// Social previews (WhatsApp, Instagram, Facebook) require absolute og:image URLs.
// Set SITE_URL in the host's environment when a custom domain is adopted.
const site = process.env.SITE_URL || 'https://nataliamenezes.vercel.app';

export default defineConfig({ output: 'static', site, devToolbar: { enabled: false } });
