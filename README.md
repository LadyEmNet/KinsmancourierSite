# Kinsman Courier mini-site

This repository contains the static marketing site for Kinsman Courier. The site is a single-page HTML document designed for GitHub Pages hosting and includes anchor navigation for Home, About us, Become a Kinsman, and Contact sections.

## Structure

```
/index.html
/assets/
  (add IMG_4197.jpeg and kinsman_logo_blue.png before deployment)
```

An empty `.gitkeep` placeholder keeps the assets directory tracked until the production logo files are added.

## Development

No build tools are required. Update `index.html` directly for content or style changes. Brand colours, layout helpers, and components are defined near the top of the inline `<style>` block with comments for quick reference.

When you add the production logo files, keep the same filenames and dimensions so GitHub Pages continues serving them without changes to the markup.

## Preview locally

1. Open `index.html` in your browser.
2. Test anchor links (Home, About us, Become a Kinsman, Contact) to ensure they scroll to the correct sections.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. In repository settings, enable GitHub Pages for the `main` branch and root directory.
3. Wait for the deployment to finish; the site will be available at the GitHub Pages URL shown in settings.

## Contact form note

The recruitment form currently submits via `mailto:` to `hello@kinsmancourier.example`. Replace the form `action` attribute with a secure backend endpoint when ready to collect submissions server-side.
