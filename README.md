# Cris' CookBook

Static Italian home-cooking blog: plain HTML, CSS and a little JS. No build step.
Design: Amalfi maiolica tiles (cobalt and lemon), Bodoni Moda headlines, arched photo frames, and a recipe index laid out as a trattoria menu.

## Run locally
    python -m http.server 8080   # then open http://localhost:8080

## Deploy
Push to `main`. `.github/workflows/pages.yml` publishes to GitHub Pages (Settings > Pages > Source: GitHub Actions).
Add a custom domain in Pages settings, then replace `https://YOUR-DOMAIN.example` everywhere (find and replace).

## Branding placeholders (dashed blue boxes)
Logo, hero photo, about portrait, recipe photos, favicon, share image and media kit. Drop files in `assets/brand/`
(see the README there), then replace each `.ph` block with an `<img>`. Colours and fonts are tokens at the top of `css/styles.css`.

## Monetisation tags: replace these placeholders (find and replace across all pages)
| Placeholder | What it is | Where to get it |
|---|---|---|
| `ca-pub-XXXXXXXXXXXXXXXX` / `pub-XXXXXXXXXXXXXXXX` | Google AdSense publisher ID (head script, meta tag, every ad slot, `ads.txt`) | adsense.google.com |
| `data-ad-slot="000000000N"` | One ad unit ID per slot (leaderboard, in-feed, sidebar, in-content, footer) | AdSense > Ads > By ad unit |
| `G-XXXXXXXXXX` | Google Analytics 4 | analytics.google.com |
| `XXXXXXXXXXXXXXX` | Meta Pixel (Facebook and Instagram) | business.facebook.com |
| `XXXXXXXXXXXXXXXXXXXX` | TikTok Pixel | ads.tiktok.com |
| `YOUR-TAG-21` | Amazon Associates tag (UK) | affiliate-program.amazon.co.uk |
| `PRODUCT_ASIN` | Amazon product code per link | Product page URL |
| `YOUR-EMAIL-PROVIDER.example/subscribe` | Newsletter form endpoint | Mailchimp, MailerLite, Beehiiv, ConvertKit |
| `formspree.io/f/YOUR_FORM_ID` | Contact and brand enquiry form | formspree.io |
| `ko-fi.com/YOUR_HANDLE`, `YOUR_STORE.gumroad.com` | Tip jar and ebook shop | ko-fi.com, gumroad.com |
| `YOUR_HANDLE` | Instagram, TikTok, YouTube, Pinterest, Facebook profiles | |

Also present: Pinterest hover-save script, schema.org Recipe JSON-LD (`recipe.html`), `sitemap.xml`, `robots.txt`,
affiliate/sponsored labelling (`rel="sponsored nofollow"`, "Affiliate link" and "Sponsored" pills), media-kit page,
share buttons, and four legal pages (privacy, cookies, affiliate and ad disclosure, terms).

### Ad slots
Ad boxes show a dashed red placeholder. When AdSense approves the site, change `<body data-ads="placeholder">` to
`<body data-ads="live">` on every page (find and replace).

### Cookie consent (UK PECR and GDPR)
Ads, analytics and marketing tags are written as `type="text/plain"` and only run after the visitor clicks Accept all
(`js/main.js`). Keep it that way. The legal pages are templates: fill in the business details and have them reviewed.

## Pages
`index`, `recipes` (search and course filter), `recipe` (servings scaler, print, schema), `blog`, `kitchen` (affiliate hub),
`about`, `contact` (media kit and enquiry form), `privacy`, `cookies`, `disclosure`, `terms`.
