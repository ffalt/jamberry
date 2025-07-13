import {TextEncoder, TextDecoder} from 'node:util';

Object.assign(global, {TextDecoder, TextEncoder});

Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(document, 'doctype', {value: '<!DOCTYPE html>'});
Object.defineProperty(window, 'getComputedStyle', {
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

Object.defineProperty(window, 'localStorage', {value: mockBrowser()});
Object.defineProperty(window, 'sessionStorage', {value: mockBrowser()});
Object.defineProperty(window, 'getComputedStyle', {value: () => ['-webkit-appearance']});
