/**
 * Lightweight analytics helper
 * No external provider by default - just logs events
 * To enable real analytics, set VITE_ANALYTICS_ENABLED=true and implement provider
 */

const isEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === 'true'

/**
 * Track an event
 * @param {string} event - Event name
 * @param {object} payload - Event data
 */
export function track(event, payload = {}) {
  const eventData = {
    event,
    payload,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
  }

  // Always log in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', event, payload)
  }

  // TODO: Send to analytics provider when enabled
  // Example: if (isEnabled && window.gtag) { window.gtag('event', event, payload) }
  // Example: if (isEnabled && window.plausible) { window.plausible(event, { props: payload }) }

  return eventData
}

/**
 * Track CTA click
 * @param {string} source - Where the CTA was clicked (hero, nav, footer, mobileSticky)
 */
export function trackCtaClick(source) {
  return track('cta_click', { source })
}

/**
 * Track FAQ item open
 * @param {string} question - The FAQ question text
 */
export function trackFaqOpen(question) {
  return track('faq_open', { question })
}

export default { track, trackCtaClick, trackFaqOpen }
