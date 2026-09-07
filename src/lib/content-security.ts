import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";

/** Max lengths to limit storage abuse / oversized payloads */
export const CONTENT_LIMITS = {
  title: 200,
  name: 200,
  descriptionPlain: 2000,
  location: 500,
  htmlBody: 50_000,
  aiContext: 10_000,
  url: 2048,
} as const;

const ALLOWED_HTML_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "h1",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
  "hr",
  "img",
  "span",
  "mark",
  "sub",
  "sup",
] as const;

const ALLOWED_HTML_ATTR = [
  "href",
  "target",
  "rel",
  "src",
  "alt",
  "title",
  "class",
] as const;

/**
 * Strip dangerous HTML (script, event handlers, etc.) for TipTap content.
 */
export function sanitizeHtml(html: string | null | undefined): string | null {
  if (html == null) return null;
  const trimmed = html.trim();
  if (!trimmed || trimmed === "<p></p>" || trimmed === "<p><br></p>") {
    return null;
  }

  const clean = DOMPurify.sanitize(trimmed, {
    ALLOWED_TAGS: [...ALLOWED_HTML_TAGS],
    ALLOWED_ATTR: [...ALLOWED_HTML_ATTR],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input"],
    FORBID_ATTR: ["style", "onerror", "onload", "onclick"],
  });

  const textOnly = clean.replace(/<[^>]*>/g, "").trim();
  if (!textOnly && !clean.includes("<img")) return null;

  return clean;
}

/** Safe HTML for rendering with dangerouslySetInnerHTML */
export function safeHtmlForRender(
  html: string | null | undefined,
  emptyFallback = "<p><em>Tidak ada konten</em></p>"
): string {
  return sanitizeHtml(html) ?? emptyFallback;
}

function emptyToNull(value: string | null | undefined): string | null {
  if (value == null) return null;
  const t = value.trim();
  return t.length === 0 ? null : t;
}

export const optionalPlainText = (max: number, label = "Teks") =>
  z.preprocess(
    (v) => (v === undefined ? null : v),
    z
      .union([
        z
          .string()
          .max(max, { message: `${label} maksimal ${max} karakter` }),
        z.null(),
      ])
      .transform((v) => emptyToNull(v))
  );

export const optionalHtmlContent = (max = CONTENT_LIMITS.htmlBody) =>
  z.preprocess(
    (v) => (v === undefined ? null : v),
    z
      .union([
        z
          .string()
          .max(max, { message: `Konten HTML maksimal ${max} karakter` }),
        z.null(),
      ])
      .transform((v) => sanitizeHtml(v))
  );

export const requiredTitle = (min = 2, label = "Judul") =>
  z
    .string()
    .trim()
    .min(min, { message: `${label} minimal ${min} karakter` })
    .max(CONTENT_LIMITS.title, {
      message: `${label} maksimal ${CONTENT_LIMITS.title} karakter`,
    });

export const requiredName = (min = 2, label = "Nama") =>
  z
    .string()
    .trim()
    .min(min, { message: `${label} minimal ${min} karakter` })
    .max(CONTENT_LIMITS.name, {
      message: `${label} maksimal ${CONTENT_LIMITS.name} karakter`,
    });

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
]);

function isYouTubeUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    if (!YOUTUBE_HOSTS.has(url.hostname)) return false;

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.length > 1;
    }

    // /watch?v=, /embed/, /shorts/
    return (
      url.pathname === "/watch" ||
      url.pathname.startsWith("/embed/") ||
      url.pathname.startsWith("/shorts/")
    );
  } catch {
    return false;
  }
}

/** Normalize YouTube watch/share URLs to embed form for iframe use */
export function toYouTubeEmbedUrl(raw: string): string {
  try {
    const url = new URL(raw);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace(/^\//, "").split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : raw;
    }
    if (url.pathname.startsWith("/embed/")) {
      return `https://www.youtube.com/embed/${url.pathname.slice("/embed/".length).split("/")[0]}`;
    }
    if (url.pathname.startsWith("/shorts/")) {
      const id = url.pathname.slice("/shorts/".length).split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : raw;
    }
    const id = url.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;
  } catch {
    /* ignore */
  }
  return raw;
}

export const optionalYouTubeUrl = z.preprocess(
  (v) => {
    if (v === undefined || v === null) return null;
    if (typeof v === "string") return emptyToNull(v);
    return v;
  },
  z
    .union([z.string().max(CONTENT_LIMITS.url), z.null()])
    .refine((v) => v == null || isYouTubeUrl(v), {
      message: "URL video harus dari YouTube (youtube.com / youtu.be)",
    })
    .transform((v) => (v == null ? null : toYouTubeEmbedUrl(v)))
);

export const optionalHttpUrl = (label = "URL") =>
  z.preprocess(
    (v) => {
      if (v === undefined || v === null) return null;
      if (typeof v === "string") return emptyToNull(v);
      return v;
    },
    z
      .union([z.string().max(CONTENT_LIMITS.url), z.null()])
      .refine(
        (v) => {
          if (v == null) return true;
          try {
            const url = new URL(v);
            return url.protocol === "http:" || url.protocol === "https:";
          } catch {
            return false;
          }
        },
        { message: `${label} tidak valid (harus http/https)` }
      )
  );

export const requiredHttpUrl = (label = "URL") =>
  z
    .string()
    .trim()
    .min(1, { message: `${label} wajib diisi` })
    .max(CONTENT_LIMITS.url, { message: `${label} terlalu panjang` })
    .refine(
      (v) => {
        try {
          const url = new URL(v);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch {
          return false;
        }
      },
      { message: `${label} tidak valid (harus http/https)` }
    );

export const PANORAMA_ALLOWED_MIME = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export const PANORAMA_MAX_BYTES = 50 * 1024 * 1024; // 50 MB

export function assertValidPanoramaFile(file: File): void {
  const type = (file.type || "").toLowerCase();
  if (
    type &&
    !PANORAMA_ALLOWED_MIME.includes(type as (typeof PANORAMA_ALLOWED_MIME)[number])
  ) {
    throw new Error("Format panorama harus JPEG, PNG, atau WebP");
  }
  if (file.size > PANORAMA_MAX_BYTES) {
    throw new Error("Ukuran panorama maksimal 50 MB");
  }
  if (file.size <= 0) {
    throw new Error("File panorama kosong");
  }
}
