import { TextDecoder, TextEncoder } from 'node:util';

import '@testing-library/jest-dom';

const globalObject = globalThis as typeof globalThis & {
  TextEncoder?: typeof globalThis.TextEncoder;
  TextDecoder?: typeof globalThis.TextDecoder;
};

if (typeof globalThis.TextEncoder === 'undefined') {
  globalObject.TextEncoder =
    TextEncoder as unknown as typeof globalThis.TextEncoder;
}

if (typeof globalThis.TextDecoder === 'undefined') {
  globalObject.TextDecoder =
    TextDecoder as unknown as typeof globalThis.TextDecoder;
}

expect.extend({});
