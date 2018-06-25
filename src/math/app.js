// import * as math from './math';

// export const doAdd = (a, b) => math.add(a, b);
// export const doSubtract = (a, b) => math.subtract(a, b);
// export const doMultiply = (a, b) => math.multiply(a, b);
// export const doDivide = (a, b) => math.divide(a, b);

import { add, subtract, multiply, divide } from './math';

export const doAdd = (a, b) => add(a, b);
export const doSubtract = (a, b) => subtract(a, b);
export const doMultiply = (a, b) => multiply(a, b);
export const doDivide = (a, b) => divide(a, b);