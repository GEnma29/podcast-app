export const decodeToPlainText = (input: string, truncateAtFirstSentence = false): string => {
  if (!input) return '';

  // Step 1: Decode HTML entities (like &amp; -> &, < -> <, etc.)
  const decoded = new DOMParser().parseFromString(input, 'text/html').documentElement.textContent || '';

  const noHtmlTags = decoded.replace(/<[^>]+>/g, '');

  let cleaned = noHtmlTags
    .replace(/<br\s*\/?>/gi, '\n') 
    .replace(/#/g, '')        
    .replace(/\s+/g, ' ')                   
    .trim();  
    
  if (truncateAtFirstSentence) {
    const periodIndex = cleaned.indexOf('.');
    if (periodIndex > -1) {
      cleaned = cleaned.substring(0, periodIndex + 1); // keep the period
    }
  }

  return cleaned;
};

export function stripHtml(html: string): string {
  return html.replace(/<\/?[^>]+(>|$)/g, "")
}

