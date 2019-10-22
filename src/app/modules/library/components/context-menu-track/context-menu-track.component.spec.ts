import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {ContextMenuTrackComponent} from './context-menu-track.component';

describe('ContextMenuTrackComponent', () => {
	let component: ContextMenuTrackComponent;
	let fixture: ComponentFixture<ContextMenuTrackComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [ContextMenuTrackComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextMenuTrackComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
