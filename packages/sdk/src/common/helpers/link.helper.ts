import { decryptDesEcb } from './des.helper';

const MEDIA_URL_KEY = '38346591';
// The bitrate suffix right before the extension: `…/abc_96.mp4`.
const BITRATE_SUFFIX = /_(?:12|48|96|160|320)(?=\.\w+(?:\?|$))/;
// The size right before the extension: `…-150x150.jpg` (any size, so a 500x500 source works too).
const IMAGE_SIZE = /\d+x\d+(?=\.\w+(?:\?|$))/;
const INSECURE_PROTOCOL = /^http:\/\//;

export const createDownloadLinks = (encryptedMediaUrl: string) => {
  if (!encryptedMediaUrl) return [];

  const qualities = [
    { id: '_12', bitrate: '12kbps' },
    { id: '_48', bitrate: '48kbps' },
    { id: '_96', bitrate: '96kbps' },
    { id: '_160', bitrate: '160kbps' },
    { id: '_320', bitrate: '320kbps' },
  ];

  const decryptedLink = decryptDesEcb(encryptedMediaUrl, MEDIA_URL_KEY).replace(INSECURE_PROTOCOL, 'https://');

  return qualities.map((quality) => ({
    quality: quality.bitrate,
    url: decryptedLink.replace(BITRATE_SUFFIX, quality.id),
  }));
};

export const createImageLinks = (link: string) => {
  if (!link) return [];

  const qualities = ['50x50', '150x150', '500x500'];

  return qualities.map((quality) => ({
    quality,
    url: link.replace(IMAGE_SIZE, quality).replace(INSECURE_PROTOCOL, 'https://'),
  }));
};
