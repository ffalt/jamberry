import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FavIconComponent} from './fav-icon.component';

describe('FavStarComponent', () => {
	let component: FavIconComponent;
	let fixture: ComponentFixture<FavIconComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			declarations: [FavIconComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FavIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
