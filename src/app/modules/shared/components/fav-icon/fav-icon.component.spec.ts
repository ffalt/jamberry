import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {StringTogglePipe} from '@shared/pipes';
import {FavIconComponent} from './fav-icon.component';

describe('FavStarComponent', () => {
	let component: FavIconComponent;
	let fixture: ComponentFixture<FavIconComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [FavIconComponent, StringTogglePipe],
    teardown: { destroyAfterEach: false }
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
