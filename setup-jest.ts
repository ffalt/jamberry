// eslint-disable-next-line import/no-unassigned-import
import 'hammerjs';
// eslint-disable-next-line import/no-internal-modules,import/no-unassigned-import
import 'jest-preset-angular/setup-jest';
// eslint-disable-next-line import/no-internal-modules,import/no-unassigned-import
import 'soundmanager2/script/soundmanager2-nodebug-jsmin';
// eslint-disable-next-line import/no-unassigned-import
import './jest-global-mocks';
// eslint-disable-next-line import/no-unassigned-import
import '@angular/localize/init';

console.error = () => {
	// nope
};
