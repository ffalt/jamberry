import {setupZoneTestEnv} from 'jest-preset-angular/setup-env/zone';
import 'hammerjs';
import 'soundmanager2/script/soundmanager2-nodebug-jsmin';
import './jest-global-mocks';
import '@angular/localize/init';

console.error = () => {
	// nope
};

setupZoneTestEnv();
