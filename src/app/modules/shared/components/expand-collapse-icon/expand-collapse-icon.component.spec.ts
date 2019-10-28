import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StringTogglePipe} from '@shared/pipes';
import {ExpandCollapseIconComponent} from './expand-collapse-icon.component';

describe('ExpandCollapseIconComponent', () => {
	let component: ExpandCollapseIconComponent;
	let fixture: ComponentFixture<ExpandCollapseIconComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			declarations: [ExpandCollapseIconComponent, StringTogglePipe]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ExpandCollapseIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
