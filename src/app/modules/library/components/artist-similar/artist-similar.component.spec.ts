import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {ArtistSimilarComponent, ObjGroupsViewComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('ArtistSimilarComponent', () => {
	let component: ArtistSimilarComponent;
	let fixture: ComponentFixture<ArtistSimilarComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [ArtistSimilarComponent, MockComponent(ObjGroupsViewComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ArtistSimilarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
