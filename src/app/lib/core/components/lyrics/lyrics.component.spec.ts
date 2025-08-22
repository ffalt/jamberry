import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { LyricsComponent } from './lyrics.component';
import { TEST_IMPORTS } from '../../../../app.mock';

describe('LyricsComponent', () => {
	let component: LyricsComponent;
	let fixture: ComponentFixture<LyricsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, LyricsComponent],
			teardown: { destroyAfterEach: false }
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
