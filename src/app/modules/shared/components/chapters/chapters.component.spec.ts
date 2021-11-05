import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MediadurationPipe} from '@shared/pipes/mediaduration.pipe';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {ChaptersComponent} from './chapters.component';

describe('ChaptersComponent', () => {
	let component: ChaptersComponent;
	let fixture: ComponentFixture<ChaptersComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_SHARED_MODULE_IMPORTS],
    providers: [...TEST_SHARED_MODULE_PROVIDERS],
    declarations: [ChaptersComponent, MediadurationPipe],
    teardown: { destroyAfterEach: false }
})
			.compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ChaptersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
