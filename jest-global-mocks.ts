import {TextEncoder, TextDecoder} from 'node:util';

Object.assign(globalThis, {TextDecoder, TextEncoder});

Object.defineProperty(globalThis, 'CSS', {value: undefined});
Object.defineProperty(document, 'doctype', {value: '<!DOCTYPE html>'});
Object.defineProperty(globalThis, 'getComputedStyle', {
	value: () => ({
		display: 'none',
		appearance: ['-webkit-appearance']
	})
});

Object.defineProperty(URL, 'createObjectURL', {
	writable: true,
	value: jest.fn()
})

/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
	value: () => ({
		enumerable: true,
		configurable: true
	})
});

// global mocks for jsdom
const mockBrowser = () => {
	const storage = new Map<string, unknown>();
	return {
		getItem: (key: string): unknown => storage.get(key),
		setItem: (key: string, value: string): Map<string, unknown> => storage.set(key, value || ''),
		removeItem: (key: string): boolean => storage.delete(key),
		clear: (): void => storage.clear()
	};
};

Object.defineProperty(globalThis, 'localStorage', {value: mockBrowser()});
Object.defineProperty(globalThis, 'sessionStorage', {value: mockBrowser()});
Object.defineProperty(globalThis, 'getComputedStyle', {value: () => ['-webkit-appearance']});
