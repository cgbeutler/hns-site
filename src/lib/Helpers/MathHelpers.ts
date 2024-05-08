
export function clamp( n: number, min: number, max: number ) {
  if (isNaN(n)) return 1;
  return Math.max(min, Math.min(max, n), 0);
}