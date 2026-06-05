import { describe, expect, it } from 'vitest';

import { buildEmbedUrl, isValidYouTubeId } from '../src/modules/videoFacade';

describe('isValidYouTubeId', () => {
  it('accepts standard 11-character ids', () => {
    expect(isValidYouTubeId('dQw4w9WgXcQ')).toBe(true);
    expect(isValidYouTubeId('jfKfPfyJRdk')).toBe(true);
    expect(isValidYouTubeId('_-aB3cD4eF5')).toBe(true);
  });

  it('rejects empty, nullish, placeholder, or malformed ids', () => {
    expect(isValidYouTubeId('')).toBe(false);
    expect(isValidYouTubeId(null)).toBe(false);
    expect(isValidYouTubeId(undefined)).toBe(false);
    expect(isValidYouTubeId('too-short')).toBe(false);
    expect(isValidYouTubeId('way-too-long-id')).toBe(false);
    expect(isValidYouTubeId('invalid id!!')).toBe(false);
  });
});

describe('buildEmbedUrl', () => {
  it('builds a privacy-friendly autoplay embed URL', () => {
    const url = buildEmbedUrl('dQw4w9WgXcQ');
    expect(url).toContain('youtube-nocookie.com/embed/dQw4w9WgXcQ');
    expect(url).toContain('autoplay=1');
    expect(url).toContain('rel=0');
  });
});
