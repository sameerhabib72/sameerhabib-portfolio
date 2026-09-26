/**
 * Time to Read calculator
 * Calculates reading time based on standard reading speed of 200 words per minute.
 */
export function calculateReadingTime(content: string[] | string): { minutes: number; text: string } {
  let textToCount = '';
  if (Array.isArray(content)) {
    textToCount = content.join(' ');
  } else if (typeof content === 'string') {
    textToCount = content;
  }

  // Strip markdown symbols and extra whitespaces
  const cleanText = textToCount
    .replace(/```[\s\S]*?```/g, '') // strip code blocks from strict word count or treat as short pause
    .replace(/#+\s/g, '')
    .replace(/[*_~`]/g, '')
    .trim();

  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  // Standard average reading speed: 200 words per minute (minimum 1 minute)
  const minutes = Math.max(1, Math.ceil(words / 200));

  return {
    minutes,
    text: `${minutes} min read`
  };
}
