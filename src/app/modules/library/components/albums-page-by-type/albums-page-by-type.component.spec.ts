import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AlbumsPageByTypeComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';

describe('AlbumsPageByTypeComponent', () => {
	let component: AlbumsPageByTypeComponent;
	let fixture: ComponentFixture<AlbumsPageByTypeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [AlbumsPageByTypeComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AlbumsPageByTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
