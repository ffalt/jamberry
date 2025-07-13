import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {StartPageComponent, StartSectionsComponent, StartStatsComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('StartPageComponent', () => {
	let component: StartPageComponent;
	let fixture: ComponentFixture<StartPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [StartPageComponent, MockComponent(StartSectionsComponent), MockComponent(StartStatsComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(StartPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
