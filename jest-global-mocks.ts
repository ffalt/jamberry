import { TextEncoder, TextDecoder } from 'node:util';

Object.assign(globalThis, { TextDecoder, TextEncoder });

Object.defineProperty(globalThis, 'CSS', { value: undefined, writable: true, configurable: true });
Object.defineProperty(document, 'doctype', { value: '<!DOCTYPE html>', writable: true, configurable: true });
Object.defineProperty(globalThis, 'getComputedStyle', {
	value: () => ({
		display: 'none',
		appearance: ['-webkit-appearance']
	}),
	writable: true,
	configurable: true
});

Object.defineProperty(URL, 'createObjectURL', {
	writable: true,
	configurable: true,
	value: jest.fn()
});

const mockBrowser = () => {
	const storage = new Map<string, unknown>();
	return {
		getItem: (key: string): unknown => storage.get(key),
		setItem: (key: string, value: string): Map<string, unknown> => storage.set(key, value || ''),
		removeItem: (key: string): boolean => storage.delete(key),
		clear: (): void => storage.clear()
	};
};

Object.defineProperty(globalThis, 'localStorage', { value: mockBrowser(), writable: true, configurable: true });
Object.defineProperty(globalThis, 'sessionStorage', { value: mockBrowser(), writable: true, configurable: true });
Object.defineProperty(globalThis, 'matchMedia', {
	writable: true,
	configurable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: undefined,
		// Deprecated but still used by some libs
		addListener: jest.fn(),
		removeListener: jest.fn(),
		// Modern event API
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn()
	})
});
