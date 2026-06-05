import { beforeEach, describe, expect, it } from 'vitest';

import { applyTheme, resolveInitialTheme } from '../src/modules/theme';

describe('resolveInitialTheme', () => {
  it('respects an explicit stored preference', () => {
    expect(resolveInitialTheme('light', false)).toBe('light');
    expect(resolveInitialTheme('dark', true)).toBe('dark');
  });

  it('falls back to the OS preference when nothing is stored', () => {
    expect(resolveInitialTheme(null, true)).toBe('light');
    expect(resolveInitialTheme(null, false)).toBe('dark');
  });

  it('defaults to dark for unrecognised stored values', () => {
    expect(resolveInitialTheme('purple', false)).toBe('dark');
  });
});

describe('applyTheme', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    delete document.documentElement.dataset.theme;
  });

  it('adds the light class and data attribute for the light theme', () => {
    applyTheme('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('removes the light class when switching back to dark', () => {
    applyTheme('light');
    applyTheme('dark');
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
