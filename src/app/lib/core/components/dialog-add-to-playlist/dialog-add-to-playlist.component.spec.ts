import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogChoosePlaylistComponent } from './dialog-add-to-playlist.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';

describe('DialogChoosePlaylistComponent', () => {
	let component: DialogChoosePlaylistComponent;
	let fixture: ComponentFixture<DialogChoosePlaylistComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, DialogChoosePlaylistComponent],
			providers: [...TEST_PROVIDERS],
			declarations: [],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogChoosePlaylistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
