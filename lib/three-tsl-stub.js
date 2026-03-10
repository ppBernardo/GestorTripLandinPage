/**
 * Stub for three/tsl - allows build to resolve when three npm doesn't ship tsl build.
 * Used only for import resolution; three-globe uses this for optional GPU compute.
 * All stub values are lazy (getters) to avoid infinite recursion.
 */
const noop = () => {};

function makeStub() {
  const s = (x) => makeStub();
  const obj = {
    mul: s,
    div: s,
    sub: s,
    add: s,
    assign: s,
    lessThan: () => makeStub(),
    element: s,
    get xy() {
      return makeStub();
    },
  };
  return obj;
}

const stub = makeStub;

export const Fn = (fn) => () => ({ compute: () => null });
export const If = noop;
export const uniform = (v) => makeStub();
export const storage = (attr, type, count) => makeStub();
export const float = (v) => makeStub();
export const instanceIndex = makeStub();
export const Loop = noop;
export const sqrt = (x) => makeStub();
export const sin = (x) => makeStub();
export const cos = (x) => makeStub();
export const asin = (x) => makeStub();
export const exp = (x) => makeStub();
export const negate = (x) => makeStub();
