import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderTabsComponent} from './header-tabs.component';

describe('BackgroundTextComponent', () => {
	let component: HeaderTabsComponent;
	let fixture: ComponentFixture<HeaderTabsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			declarations: [HeaderTabsComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderTabsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
