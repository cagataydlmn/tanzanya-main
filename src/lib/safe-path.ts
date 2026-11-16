import { resolve, sep } from 'path';

/**
 * Resolves `segments` inside `baseDir` and returns null if the result
 * would escape the base directory (path traversal protection).
 */
export function safeJoin(baseDir: string, segments: string[]): string | null {
  const base = resolve(baseDir);
  const decoded = segments.map((s) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  });
  if (decoded.some((s) => s.includes('\0'))) return null;
  const target = resolve(base, ...decoded);
  if (target !== base && target.startsWith(base + sep)) return target;
  return null;
}
