import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {HotkeyModule, HotkeysService} from '@app/modules/hotkeys';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {HeaderSlimComponent} from '@shared/components';
import {MockComponent} from 'ng-mocks';
import {AboutPageComponent} from './about-page.component';

describe('AboutPageComponent', () => {
	let component: AboutPageComponent;
	let fixture: ComponentFixture<AboutPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [HotkeyModule.forRoot(), ToastModule.forRoot(), TEST_JAM_MODULE],
    providers: [HotkeysService],
    declarations: [AboutPageComponent, MockComponent(HeaderSlimComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AboutPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
