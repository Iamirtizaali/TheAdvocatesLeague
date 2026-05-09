# Complete SEO Implementation Plan for The Advocates' League

Since your website is built as a Client-Side Rendered (CSR) Single Page Application using **React + Vite**, and uses **Sanity CMS** for dynamic content, we need a specific approach to ensure search engines (like Google) and social media platforms (like Facebook/WhatsApp) can properly read and index your site.

Here is the complete, step-by-step plan to achieve production-grade SEO for your website:

## Phase 1: On-Page React SEO (Dynamic Meta Tags)
To allow search engines to understand what each specific page is about, we need to inject dynamic `<head>` tags into the DOM when pages load.

1. **Install React Helmet Async:** Install `react-helmet-async` to manage document head tags.
2. **Create an `<SEO />` Component:** Build a reusable React component that accepts `title`, `description`, `image`, and `url` as props.
3. **Implement on Static Pages:** Add the `<SEO />` component to `Home`, `About`, `Team`, `Contact`, and `SubSections` with highly optimized, static keywords.
4. **Implement on Dynamic Pages:** Update `BlogDetail`, `EventDetail`, and `SubSectionDetail` to dynamically pass Sanity data (Blog titles, excerpts, and featured images) into the `<SEO />` component.

## Phase 2: Sanity CMS Updates (SEO Controls)
We need to give you (the admin) the power to change SEO metadata directly from the Sanity Studio without touching the code.

1. **Create an `seo` Object Schema:** Add a new schema in Sanity containing fields for `metaTitle`, `metaDescription`, and `shareImage`.
2. **Attach to Main Schemas:** Add this `seo` field group to your main document types (`homePage`, `aboutPage`, `blog`, `event`, etc.).
3. **Update Frontend Queries:** Modify `src/sanity/queries.js` to fetch these new SEO fields alongside the regular page data.

## Phase 3: Global Meta Data & Fallbacks
When someone shares a link to your website on WhatsApp or LinkedIn, the platform's crawler doesn't run JavaScript. It only reads your base `index.html` file. We need to ensure the default file looks great.

1. **Update `index.html`:** Hardcode Open Graph (OG) tags and Twitter card meta tags into your `public/index.html` file as a global fallback.
2. **Default Share Image:** Create a high-quality "Open Graph Image" (e.g., your logo on a navy-blue background with gold text) and save it in the `public/` folder so links look professional when shared.

## Phase 4: Crawlability (Sitemap & Robots)
Search engines need a map to find all your dynamically generated blogs and events.

1. **Create `robots.txt`:** Add a `public/robots.txt` file to instruct search engines what to crawl and where the sitemap is located.
2. **Dynamic Sitemap Generation:** Create a small Node.js script that runs when you deploy to Vercel. It will fetch all active slugs from Sanity (Blogs, Events, Sections) and automatically generate a complete `sitemap.xml` file for Google Search Console.

## Phase 5: Technical & Accessibility Polish
1. **Alt Tags Check:** Ensure every `<img>` and Sanity `urlFor` image is passing a descriptive `alt` text to assist screen readers and Google Image Search.
2. **Heading Hierarchy:** Verify that every page has exactly one `<h1>` tag and follows a logical `<h2>`, `<h3>` structure.
3. **Canonical URLs:** Add self-referencing canonical URLs to prevent duplicate content penalties (especially useful if the site can be accessed with or without `www.`).

---

### How would you like to proceed?
I can begin implementing this plan immediately. The best place to start is **Phase 1 & Phase 2** (Installing React Helmet and updating the Sanity Schemas). Shall I go ahead and execute those steps?
