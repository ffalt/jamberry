import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogPlaylistComponent } from './dialog-playlist.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';

describe('DialogPlaylistComponent', () => {
	let component: DialogPlaylistComponent;
	let fixture: ComponentFixture<DialogPlaylistComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, DialogPlaylistComponent],
			providers: [...TEST_PROVIDERS],
			declarations: [],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogPlaylistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
