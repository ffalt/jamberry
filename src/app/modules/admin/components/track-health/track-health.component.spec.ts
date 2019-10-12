import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TrackHealthComponent} from './track-health.component';

describe('TrackHealthComponent', () => {
	let component: TrackHealthComponent;
	let fixture: ComponentFixture<TrackHealthComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [TrackHealthComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TrackHealthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
