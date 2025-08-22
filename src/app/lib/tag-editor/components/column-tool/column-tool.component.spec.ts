import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnToolComponent } from './column-tool.component';

describe('ColumnToolComponent', () => {
	let component: ColumnToolComponent;
	let fixture: ComponentFixture<ColumnToolComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
				imports: [ColumnToolComponent],
				teardown: { destroyAfterEach: false }
			}
		).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ColumnToolComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
