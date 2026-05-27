const WORDS_PER_MINUTE = 200;
const KOREAN_CHARS_PER_MINUTE = 500;

export function calcReadingMinutes(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, '');

  const words = text.split(/\s+/).filter(Boolean).length;
  const koreanChars = (text.match(/[ㄱ-힝]/giu) || []).length;

  const minutes = words / WORDS_PER_MINUTE + koreanChars / KOREAN_CHARS_PER_MINUTE;
  return Math.max(1, Math.round(minutes));
}
