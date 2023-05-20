import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(document, 'doctype', {value: '<!DOCTYPE html>'});
Object.defineProperty(window, 'getComputedStyle', {
	value: () => ({
		display: 'none',
		appearance: ['-webkit-appearance']
	})
});
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
const mock = (): any => {
	const storage = new Map<string, any>();
	return {
		getItem: (key: string): any => storage.get(key),
		setItem: (key: string, value: string): Map<string, any> => storage.set(key, value || ''),
		removeItem: (key: string): boolean => storage.delete(key),
		clear: (): void => storage.clear()
	};
};

Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
Object.defineProperty(window, 'getComputedStyle', {value: () => ['-webkit-appearance']});

Object.defineProperty(document.body.style, 'transform', {
	value: () => ({enumerable: true, configurable: true})
});
