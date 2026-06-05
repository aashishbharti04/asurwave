/**
 * Single source of truth for runtime site constants.
 *
 * Static page content lives in `index.html` (so it is fully indexable and
 * works without JavaScript). This module holds the few values JavaScript needs
 * at runtime — e.g. to keep the footer copyright year current.
 */
export const SITE = {
  name: 'AsurWave',
  /** The channel this landing page promotes. */
  channelUrl: 'https://www.youtube.com/@AsurWave1012',
  contactEmail: 'aashish@marketdoctorsonline.com',
  /** First year of operation — used to render the copyright range. */
  startYear: 2025,
  socials: {
    linkedin: 'https://in.linkedin.com/in/aashana1012',
    github: 'https://github.com/aashishbharti04',
    youtube: 'https://www.youtube.com/@CodeWithAsur',
    instagram: 'https://www.instagram.com/asurwave1012?igsh=ZDBlY2NtczJ5cmMw',
  },
} as const;

export type SiteConfig = typeof SITE;
