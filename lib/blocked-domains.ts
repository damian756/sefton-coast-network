// Standing rule (Damian, 11 Nov 2026): "keep them, i dont want to link to any of them".
// No page or data file on any Sefton Coast site links to these organisations' websites:
// Southport BID, the Mikhail hotel and leisure group's venues, Southport Market, Sefton Council,
// YourSouthport and VisitSouthport. Naming them is fine; linking is not. Same list on all five sites.
export const BLOCKED_DOMAINS = [
  "sefton.gov.uk",
  "visitseftonandwestlancs.co.uk",
  "visitsouthport.com",
  "yoursouthport.com",
  "southportbid.com",
  "southportmarket.com",
  "southportmarket.co.uk",
  "mhalg.com",
  "thegrand.co.uk",
  "boldhotel.com",
  "lordstreethotel.com",
  "mavericksbar.co.uk",
  "punchtarmeys.co.uk",
  "arcains.co.uk",
  "hotshotsdarts.co.uk",
  "brewerytapliverpool.com",
  "doctorduncansliverpool.com",
  "ecclestonarms.co.uk",
] as const;

export function isBlockedUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  let host = "";
  try {
    host = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname.toLowerCase();
  } catch {
    return false;
  }
  return BLOCKED_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`));
}
