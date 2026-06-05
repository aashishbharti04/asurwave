/**
 * Lightweight YouTube "facade" — renders a cheap poster instead of an iframe and
 * only loads the heavy embed on user interaction. This removes ~3 third-party
 * iframes from the critical path, dramatically improving LCP and Core Web Vitals.
 *
 * Each facade is a `[data-youtube-id]` container with a button. When a valid
 * video id is present, clicking swaps in an autoplaying iframe; when the id is a
 * placeholder, the button instead opens the channel (a graceful empty state).
 */

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/** True when `id` looks like a real 11-character YouTube video id. */
export function isValidYouTubeId(id: string | null | undefined): boolean {
  return typeof id === 'string' && YOUTUBE_ID_PATTERN.test(id);
}

/** Build a privacy-friendly, autoplaying embed URL for a video id. */
export function buildEmbedUrl(id: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function createIframe(id: string, title: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.src = buildEmbedUrl(id);
  iframe.title = title;
  iframe.className = 'absolute inset-0 h-full w-full';
  iframe.loading = 'lazy';
  iframe.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.setAttribute('frameborder', '0');
  return iframe;
}

function activate(facade: HTMLElement): void {
  const id = facade.dataset.youtubeId;
  const title = facade.dataset.title ?? 'Video';

  if (isValidYouTubeId(id)) {
    facade.classList.add('is-loading');
    const iframe = createIframe(id as string, title);
    iframe.addEventListener('load', () => facade.classList.remove('is-loading'));
    facade.replaceChildren(iframe);
    return;
  }

  // Placeholder: send viewers to the channel instead.
  const channelUrl = facade.dataset.channelUrl;
  if (channelUrl) window.open(channelUrl, '_blank', 'noopener,noreferrer');
}

export function initVideoFacades(): void {
  document.querySelectorAll<HTMLElement>('[data-youtube-id]').forEach((facade) => {
    const button = facade.querySelector<HTMLButtonElement>('button');
    if (!button) return;
    button.addEventListener('click', () => activate(facade));
  });
}
