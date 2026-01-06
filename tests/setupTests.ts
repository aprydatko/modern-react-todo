
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
// Fix: Import jest from @jest/globals to satisfy TypeScript compiler and fix "Cannot find name" or namespace errors
import { jest } from '@jest/globals';

// Polyfill for TextEncoder/Decoder which is required by newer React Router versions in JSDOM
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Polyfill for TransformStream which some ESM packages (like Playwright internals) might trigger
if (typeof global.TransformStream === 'undefined') {
  class TransformStream {
    readable = {};
    writable = {};
  }
  global.TransformStream = TransformStream as any;
}

// Mocking scrollIntoView as it's not implemented in JSDOM
// Fix: Use the imported jest value and cast to any to allow prototype assignment
Element.prototype.scrollIntoView = jest.fn() as any;
