// vite-imagetools `as=picture` returns sources as srcset STRINGS keyed by format,
// not arrays. Shape:
//   { sources: { avif: "url 480w, url 768w, ...", webp: "...", jpeg: "..." },
//     img: { src, w, h } }

export interface Picture {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}
