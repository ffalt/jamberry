import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ObjCardComponent } from './obj-card.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';

describe('ObjCardComponent', () => {
	let component: ObjCardComponent;
	let fixture: ComponentFixture<ObjCardComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, ObjCardComponent],
			providers: [...TEST_PROVIDERS],
			declarations: [],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ObjCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
