import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StartSectionComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {StartSectionsComponent} from './start-sections.component';

describe('StartSectionsComponent', () => {
	let component: StartSectionsComponent;
	let fixture: ComponentFixture<StartSectionsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [StartSectionsComponent, MockComponent(StartSectionComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(StartSectionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
