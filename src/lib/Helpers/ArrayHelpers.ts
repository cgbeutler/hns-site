export function* chunk<T>(arr:Array<T>, n:number) { for (let i = 0; i < arr.length; i += n) { yield arr.slice(i, i + n); } }
export function interleave<T>([ x, ...xs ]:Array<T>, ys:Array<T> = []): Array<T> { return x === undefined ? ys : [ x, ...interleave (ys, xs) ] }
export function pair<T>([ x, ...xs ]:Array<T>, [ y, ...ys ]:Array<T> = []): Array<Array<T>> { return [ [x,y], ...pair(xs, ys) ] }