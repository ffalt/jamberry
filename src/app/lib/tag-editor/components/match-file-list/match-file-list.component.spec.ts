import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchFileListComponent } from './match-file-list.component';

describe('MatchFileListComponent', () => {
	let component: MatchFileListComponent;
	let fixture: ComponentFixture<MatchFileListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [MatchFileListComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchFileListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
