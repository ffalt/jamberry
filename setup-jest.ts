import 'hammerjs';
import 'jest-preset-angular/setup-jest';
import 'soundmanager2/script/soundmanager2-nodebug-jsmin';
import './jest-global-mocks';
import '@angular/localize/init';

console.error = () => {
	// nope
};
