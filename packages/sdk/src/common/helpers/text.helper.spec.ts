import { decodeEntities, decodeResponseStrings, parseJsonField } from '#common/helpers';
import { describe, expect, it } from 'vitest';

describe('decodeEntities', () => {
  it('should decode the named entities JioSaavn sends', () => {
    expect(decodeEntities('Karvaan (From &quot;Dhurandhar&quot;)')).toBe('Karvaan (From "Dhurandhar")');
    expect(decodeEntities('Rock &amp; Roll')).toBe('Rock & Roll');
    expect(decodeEntities('&lt;3 &gt; &apos;x&apos;')).toBe("<3 > 'x'");
  });

  it('should decode numeric entities', () => {
    expect(decodeEntities('It&#039;s &#x2764;')).toBe("It's ❤");
  });

  it('should decode in a single pass and leave unknown entities alone', () => {
    expect(decodeEntities('&amp;quot;')).toBe('&quot;');
    expect(decodeEntities('&unknown; & plain')).toBe('&unknown; & plain');
  });
});

describe('decodeResponseStrings', () => {
  it('should decode strings but leave JSON-string fields for parseJsonField', () => {
    const raw = '{"title":"A &amp; B","bio":"[{\\"text\\": \\"He said &quot;hi&quot;\\"}]"}';
    const data = JSON.parse(raw, decodeResponseStrings);

    expect(data.title).toBe('A & B');
    expect(parseJsonField(data.bio, null)).toEqual([{ text: 'He said "hi"' }]);
  });
});

describe('parseJsonField', () => {
  it('should return the fallback for plain text', () => {
    expect(parseJsonField('Javed Akhtar is a renowned poet.', null)).toBeNull();
  });
});
