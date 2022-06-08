// eslint-disable-next-line import/no-unassigned-import
import 'hammerjs';
// eslint-disable-next-line import/no-internal-modules,import/no-unassigned-import
import 'jest-preset-angular/setup-jest';
// eslint-disable-next-line import/no-internal-modules,import/no-unassigned-import
import 'soundmanager2/script/soundmanager2-nodebug-jsmin';
// eslint-disable-next-line import/no-unassigned-import
import './jest-global-mocks';

console.error = () => {
	// nope
};

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

/* output shorter and more meaningful Zone error stack traces */
// Error.stackTraceLimit = 2;
