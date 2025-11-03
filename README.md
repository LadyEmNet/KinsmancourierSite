# Kinsman Courier mini-site

This repository contains the static marketing site for Kinsman Courier. The site is a static HTML build designed for GitHub Pages hosting and includes anchor navigation for Home, About us, Become a Kinsman, and Contact sections along with a dedicated Delivery Manager page.

## Structure

```
├── index.html
├── delivery-manager.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── _headers
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── main.css
│   │   ├── delivery-manager.css
│   │   └── 404.css
│   ├── js/
│   │   ├── main.js
│   │   └── delivery-manager.js
│   └── (images)
├── .github/
│   ├── dependabot.yml
│   └── workflows/lighthouse.yml
└── lighthouserc.json
```

All brand assets live under `assets/`. Add production imagery using the existing filenames so GitHub Pages continues serving them without changing markup.

## Development

No build tools are required. Update `index.html` and `delivery-manager.html` for markup changes, and edit the styles or behaviours in the CSS/JS files inside `assets/`. Brand colours, layout helpers, and component styles are centralised in `assets/css/base.css` with page-specific rules in `assets/css/main.css` and `assets/css/delivery-manager.css`.

## Preview locally

1. Open `index.html` in your browser.
2. Test anchor links (Home, About us, Become a Kinsman, Contact) to ensure they scroll to the correct sections.
3. Open `delivery-manager.html` for the Delivery Manager product page.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. In repository settings, enable GitHub Pages for the `main` branch and root directory.
3. Enable **Enforce HTTPS** and set the custom domain (`kinsmancourier.com`). GitHub Pages will redirect HTTP requests automatically once the certificate is issued.
4. Wait for the deployment to finish; the site will be available at the GitHub Pages URL shown in settings.

## Security baseline

The site ships with a hardened default configuration:

- `_headers` configures the production responses with a strict Content Security Policy, HSTS, Referrer-Policy, Permissions-Policy, COOP, CORP, and X-Content-Type-Options.
- Inline scripts and styles were removed; page behaviour now loads from `assets/js/*.js` so the CSP can stay locked down. The only inline JSON-LD script is covered by the SHA-256 hash baked into the CSP header/meta tag.
- External form submissions post to `https://formsubmit.co/contact@kinsmancourier.com` and include a honeypot field to deflect simple spam bots.
- `robots.txt`, `sitemap.xml`, and `404.html` provide search-friendly crawling and error handling.
- `.github/dependabot.yml` checks weekly for GitHub Actions updates, and `.github/workflows/lighthouse.yml` runs Lighthouse on the live site (Best Practices & SEO ≥ 90).

### Updating the CSP

When adding new external assets (scripts, styles, images, fonts, or form endpoints), update both the `<meta http-equiv="Content-Security-Policy">` tag in the HTML pages **and** the `_headers` file so the directives stay in sync. Prefer self-hosted assets whenever possible; if you must allow another origin, add it explicitly to the relevant directive (for example `script-src`). For additional inline scripts, calculate the SHA-256 hash of the exact script contents and append it to the `script-src` directive.

## Contact form note

Driver and depot enquiry forms post to FormSubmit over HTTPS. Replace the `action` value with your own backend endpoint when you are ready to collect submissions server-side.
