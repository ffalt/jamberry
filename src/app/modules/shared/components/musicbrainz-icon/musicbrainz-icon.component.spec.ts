import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MusicbrainzIconComponent} from './musicbrainz-icon.component';

describe('MusicbrainzIconComponent', () => {
	let component: MusicbrainzIconComponent;
	let fixture: ComponentFixture<MusicbrainzIconComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [],
			providers: [],
			declarations: [MusicbrainzIconComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MusicbrainzIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
