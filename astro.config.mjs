import { defineConfig } from 'astro/config';

// Social previews (WhatsApp, Instagram, Facebook) require absolute og:image URLs.
// Priority: explicit SITE_URL > host-provided production URL (Vercel, Netlify, Cloudflare Pages).
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site =
  process.env.SITE_URL ||
  process.env.URL || // Netlify
  (vercel ? `https://${vercel}` : undefined) ||
  process.env.CF_PAGES_URL ||
  'https://nanatliamenezes.vercel.app';

export default defineConfig({ output: 'static', site, devToolbar: { enabled: false } });
