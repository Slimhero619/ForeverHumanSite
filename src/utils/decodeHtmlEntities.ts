/**
 * Decode HTML entities in a string (e.g. &#39; → ', &amp; → &).
 *
 * Uses a temporary textarea element so the browser handles *all* named and
 * numeric HTML entities — not just the handful we know about today.
 */
export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}
