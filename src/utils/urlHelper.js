/**
 * Sanitizes and formats external project URLs.
 * Automatically prepends https:// if missing, preventing relative routing issues.
 */
export function formatExternalUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
