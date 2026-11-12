import { useEffect } from 'react';

/**
 * Custom React hook to update page SEO meta tags and structured schema dynamically
 * @param {Object} seoConfig
 * @param {string} seoConfig.title - Full page title
 * @param {string} seoConfig.description - Meta description (150-160 chars)
 * @param {string} [seoConfig.keywords] - Comma-separated keyword list
 * @param {string} [seoConfig.canonicalPath] - Relative URL path for canonical link (e.g. '/features')
 * @param {Object} [seoConfig.jsonLd] - Optional Schema.org JSON-LD object for rich snippets
 */
export function usePageSeo({
  title,
  description,
  keywords,
  canonicalPath = '',
  jsonLd = null,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
}) {
  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = title;
    }

    // Helper to update or create a meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Update Primary Meta Tags
    setMetaTag('name', 'robots', robots);

    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    if (title) {
      setMetaTag('name', 'title', title);
      setMetaTag('property', 'og:title', title);
      setMetaTag('name', 'twitter:title', title);
    }

    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Update Canonical Link
    const baseUrl = 'https://salesavatar.com';
    const normalizedPath = canonicalPath ? `/${canonicalPath.replace(/^\/+|\/+$/g, '')}` : '/';
    const fullCanonical = `${baseUrl}${normalizedPath}`;
    
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullCanonical);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('name', 'twitter:url', fullCanonical);

    // Ensure social previews follow the current route and use a crawlable image.
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'SalesAvatar CRM');
    setMetaTag('property', 'og:image', `${baseUrl}/images/crm-dashboard.jpg`);
    setMetaTag('property', 'og:image:alt', 'SalesAvatar CRM dashboard preview');
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:image', `${baseUrl}/images/crm-dashboard.jpg`);

    // Keep the document language aligned with the India-focused site content.
    document.documentElement.lang = 'en-IN';

    // 4. Inject Dynamic Page JSON-LD (e.g., FAQPage or Product)
    const scriptId = 'page-dynamic-jsonld';
    let scriptEl = document.getElementById(scriptId);

    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // Cleanup on unmount or page change
    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
      if (robots === 'noindex, nofollow') {
        const robEl = document.querySelector('meta[name="robots"]');
        if (robEl) robEl.setAttribute('content', 'index, follow');
      }
    };
  }, [title, description, keywords, canonicalPath, jsonLd, robots]);
}

export default usePageSeo;
