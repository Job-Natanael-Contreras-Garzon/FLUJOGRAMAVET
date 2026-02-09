# FlujogramaVet

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 🎯 SEO & PWA

This application is fully optimized for search engines and can be installed as a Progressive Web App:

### ✅ SEO Features

- **Complete Meta Tags**: Title, description, keywords optimized for search engines
- **Open Graph**: Professional previews when sharing on Facebook, WhatsApp, LinkedIn
- **Twitter Cards**: Optimized previews for Twitter/X
- **Structured Data**: JSON-LD schema for rich snippets in Google
- **Sitemap XML**: Faster indexing by search engines
- **PWA Ready**: Installable as mobile/desktop app

### 📋 SEO Documentation

- **[SEO-COMPLETE.md](SEO-COMPLETE.md)**: Comprehensive SEO guide and report
- **[ICONS-GUIDE.md](ICONS-GUIDE.md)**: How to generate PWA icons
- **sitemap.xml**: Located at `/sitemap.xml` after deployment
- **manifest.json**: PWA configuration

### 🚀 Post-Deployment SEO Tasks

```bash
# 1. Generate PWA icons (see ICONS-GUIDE.md)
# Use https://realfavicongenerator.net/

# 2. Submit sitemap to Google Search Console
# Visit: https://search.google.com/search-console

# 3. Validate social media previews
# Facebook: https://developers.facebook.com/tools/debug/
# Twitter: https://cards-dev.twitter.com/validator
```

### 📊 Expected SEO Score

- **Lighthouse SEO**: 95+ / 100
- **PageSpeed Insights**: 90+ / 100
- **Mobile-Friendly**: ✅ Yes
- **Core Web Vitals**: ✅ Passed

## 🔒 Security

This application has been hardened with security best practices for production deployment:

### ✅ Security Features Implemented

- **HTTP Security Headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- **External Link Protection**: All external links use `rel="noopener noreferrer"`
- **TypeScript Strict Mode**: Enhanced type safety
- **No Vulnerabilities**: Regular dependency audits with `npm audit`
- **Secure Defaults**: No tracking, no cookies, no personal data collection

### 📋 Security Documentation

- **[SECURITY.md](SECURITY.md)**: Complete security policy and guidelines
- **[DEPLOYMENT.md](DEPLOYMENT.md)**: Secure deployment guide for Vercel
- **security.txt**: Vulnerability disclosure policy at `/.well-known/security.txt`

### 🛡️ Pre-Deployment Checklist

```bash
# Verify no vulnerabilities
npm audit

# Test production build
npm run build

# Review security headers (after deployment)
# Visit: https://securityheaders.com
```

### 🚨 Reporting Security Issues

If you discover a security vulnerability, please email: `contrerasjob123@gmail.com`  
**Do NOT** create a public GitHub issue.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
