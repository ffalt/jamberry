import { vi } from 'vitest';
import 'soundmanager2/script/soundmanager2-nodebug-jsmin';

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
	value: vi.fn()
});

const mockBrowser = () => {
	const storage = new Map<string, unknown>();
	return {
		getItem: (key: string): unknown => storage.get(key),
		setItem: (key: string, value: string): Map<string, unknown> => storage.set(key, value || ''),
		removeItem: (key: string): boolean => storage.delete(key),
		clear: (): void => {
			storage.clear();
		}
	};
};

Object.defineProperties(globalThis, {
	localStorage: { value: mockBrowser(), writable: true, configurable: true },
	sessionStorage: { value: mockBrowser(), writable: true, configurable: true },
	matchMedia: {
		writable: true,
		configurable: true,
		value: (query: string) => ({
			matches: false,
			media: query,
			onchange: undefined,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn()
		})
	},
});

vi.spyOn(console, 'error').mockImplementation(() => {
	// suppress console.error during tests
});

vi.spyOn(console, 'warn').mockImplementation(() => {
	// suppress console.warn during tests
});
