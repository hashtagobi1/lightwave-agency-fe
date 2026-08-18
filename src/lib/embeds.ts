// src/lib/embeds.ts

// Turns a shared video URL (Instagram Reel/post, YouTube, Vimeo, ...) into
// an iframe-embeddable src, and tells the caller what aspect ratio to render
// it at — Instagram/TikTok-style reels are vertical, everything else is 16:9.
export function getVideoEmbed(
  url?: string | null,
): { src: string; aspect: "portrait" | "video" } | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("instagram.com")) {
      const match = parsed.pathname.match(/\/(reel|reels|p|tv)\/([^/]+)/);
      if (match) {
        const [, , shortcode] = match;
        return {
          src: `https://www.instagram.com/reel/${shortcode}/embed`,
          aspect: "portrait",
        };
      }
    }

    // Assume anything else (YouTube, Vimeo, ...) is already an embed-ready URL.
    return { src: url, aspect: "video" };
  } catch {
    return null;
  }
}
