import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { IconartImageComponent } from './iconart-image.component';

describe('IconartImageComponent', () => {
	let component: IconartImageComponent;
	let fixture: ComponentFixture<IconartImageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [IconartImageComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(IconartImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
