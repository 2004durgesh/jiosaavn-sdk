import { createDownloadLinks, createImageLinks } from '#common/helpers';
import { describe, expect, it } from 'vitest';

// A real `encrypted_media_url` (Levitating, 3IoDK8qI) and its node-forge DES-ECB decryption.
const ENCRYPTED_MEDIA_URL =
  'ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDylsUbBKiBMWa4cKhEF4Xz5p975Hh3jSc+rXO0khV0lO1tzxLIEtHbjhw7tS9a8Gtq';
const MEDIA_URL_BASE = 'https://aac.saavncdn.com/665/7790c3b9097592113008eaf1031d6e57';

describe('createDownloadLinks', () => {
  it('should decrypt the media URL into one link per bitrate', () => {
    expect(createDownloadLinks(ENCRYPTED_MEDIA_URL)).toEqual([
      { quality: '12kbps', url: `${MEDIA_URL_BASE}_12.mp4` },
      { quality: '48kbps', url: `${MEDIA_URL_BASE}_48.mp4` },
      { quality: '96kbps', url: `${MEDIA_URL_BASE}_96.mp4` },
      { quality: '160kbps', url: `${MEDIA_URL_BASE}_160.mp4` },
      { quality: '320kbps', url: `${MEDIA_URL_BASE}_320.mp4` },
    ]);
  });

  it('should return no links without an encrypted URL', () => {
    expect(createDownloadLinks('')).toEqual([]);
  });
});

describe('createImageLinks', () => {
  const sizes = (link: string) => createImageLinks(link).map((image) => image.url);

  it('should build every size from a 150x150 link', () => {
    expect(sizes('http://c.saavncdn.com/123/Song-Hindi-2025-20250203083204-150x150.jpg')).toEqual([
      'https://c.saavncdn.com/123/Song-Hindi-2025-20250203083204-50x50.jpg',
      'https://c.saavncdn.com/123/Song-Hindi-2025-20250203083204-150x150.jpg',
      'https://c.saavncdn.com/123/Song-Hindi-2025-20250203083204-500x500.jpg',
    ]);
  });

  it('should build every size from a 500x500 link', () => {
    expect(sizes('https://c.saavncdn.com/123/Song-500x500.jpg')).toEqual([
      'https://c.saavncdn.com/123/Song-50x50.jpg',
      'https://c.saavncdn.com/123/Song-150x150.jpg',
      'https://c.saavncdn.com/123/Song-500x500.jpg',
    ]);
  });
});
