import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { CoverartImageComponent } from './coverart-image.component';
import { TEST_IMPORTS } from '../../../../app.mock';

describe('CoverartImageComponent', () => {
	let component: CoverartImageComponent;
	let fixture: ComponentFixture<CoverartImageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, CoverartImageComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CoverartImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
