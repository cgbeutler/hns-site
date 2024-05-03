
export function pair<T>([ x, ...xs ]:Array<T>, [ y, ...ys ]:Array<T> = []): Array<Array<T>> { return [ [x,y], ...pair(xs, ys) ] }
export function interleave<T>([ x, ...xs ]:Array<T>, ys:Array<T> = []): Array<T> { return x === undefined ? ys : [ x, ...interleave (ys, xs) ] }