import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS } from '../../../../app.mock';
import { RootListComponent } from './root-list.component';

describe('RootListComponent', () => {
	let component: RootListComponent;
	let fixture: ComponentFixture<RootListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, RootListComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(RootListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
