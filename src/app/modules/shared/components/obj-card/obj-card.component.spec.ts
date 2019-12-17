import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CoverartImageComponent, FavIconComponent, ObjCardComponent} from '@shared/components';
import {LimitPipe} from '@shared/pipes';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {MockComponent, MockPipe} from 'ng-mocks';

describe('ObjCardComponent', () => {
	let component: ObjCardComponent;
	let fixture: ComponentFixture<ObjCardComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_SHARED_MODULE_IMPORTS],
			providers: [...TEST_SHARED_MODULE_PROVIDERS],
			declarations: [
				ObjCardComponent,
				MockComponent(CoverartImageComponent),
				MockComponent(FavIconComponent),
				MockPipe(LimitPipe)
			]
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
