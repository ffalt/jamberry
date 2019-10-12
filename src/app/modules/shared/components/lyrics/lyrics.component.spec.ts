import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {LyricsComponent} from './lyrics.component';

describe('LyricsComponent', () => {
	let component: LyricsComponent;
	let fixture: ComponentFixture<LyricsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_SHARED_MODULE_IMPORTS],
			providers: [...TEST_SHARED_MODULE_PROVIDERS],
			declarations: [LyricsComponent]
		})
			.compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(LyricsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
