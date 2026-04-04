import { TextDecoder, TextEncoder } from 'node:util';

import '@testing-library/jest-dom';

const globalObject = globalThis as typeof globalThis & {
  TextEncoder: any;
  TextDecoder: any;
};

if (typeof globalThis.TextEncoder === 'undefined') {
  globalObject.TextEncoder = TextEncoder;
}

if (typeof globalThis.TextDecoder === 'undefined') {
  globalObject.TextDecoder = TextDecoder;
}

expect.extend({});
