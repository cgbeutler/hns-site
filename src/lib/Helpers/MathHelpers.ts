
export function clamp( n: any, min: number, max: number ) {
  if (typeof n === "string") n = Number.parseInt(n);
  if (typeof n !== "number" || isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

export function clampf( n: any, min: number, max: number ) {
  if (typeof n === "string") n = Number.parseFloat(n);
  if (typeof n !== "number" || isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}
