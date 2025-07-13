import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {EpisodeStateButtonComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {ObjPageComponent} from './obj-page.component';

describe('ObjPageComponent', () => {
	let component: ObjPageComponent;
	let fixture: ComponentFixture<ObjPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [
        ObjPageComponent,
        MockComponent(EpisodeStateButtonComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ObjPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
