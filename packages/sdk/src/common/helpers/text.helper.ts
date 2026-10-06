const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  quot: '"',
  apos: "'",
  lt: '<',
  gt: '>',
  nbsp: ' ',
};

/** Decodes the HTML entities JioSaavn leaves in text (`&quot;`, `&amp;`, `&#039;`, …) in one pass. */
export const decodeEntities = (value: string): string =>
  value.replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith('#')) {
      const hex = entity[1] === 'x' || entity[1] === 'X';
      const code = parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });

/**
 * Fields JioSaavn sends as JSON encoded *inside* a string. Decoding `&quot;` before they're parsed
 * would turn it into a bare `"` and break the JSON, so the response reviver skips them; they're
 * decoded as they're parsed, by {@link parseJsonField}.
 */
const JSON_STRING_FIELDS = new Set(['bio', 'languages', 'similar']);

const decodeAllStrings = (_key: string, value: unknown) => (typeof value === 'string' ? decodeEntities(value) : value);

/** `JSON.parse` reviver for API responses: decodes entities in every string except JSON-string fields. */
export const decodeResponseStrings = (key: string, value: unknown) =>
  JSON_STRING_FIELDS.has(key) ? value : decodeAllStrings(key, value);

/** Parses a JSON-string field (entities decoded), or returns `fallback` when it isn't valid JSON. */
export const parseJsonField = <T>(value: string, fallback: T): T => {
  try {
    return JSON.parse(value, decodeAllStrings) as T;
  } catch {
    return fallback;
  }
};
