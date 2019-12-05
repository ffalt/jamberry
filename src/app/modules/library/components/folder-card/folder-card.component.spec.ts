import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FolderCardComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';

describe('FolderCardComponent', () => {
	let component: FolderCardComponent;
	let fixture: ComponentFixture<FolderCardComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				FolderCardComponent
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
