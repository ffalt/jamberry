import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_PLAYER_MODULE_IMPORTS, TEST_PLAYER_MODULE_PROVIDERS} from '@app/modules/player/player.module.mock';
import {QueueComponent} from './queue.component';

describe('QueueComponent', () => {
	let component: QueueComponent;
	let fixture: ComponentFixture<QueueComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_PLAYER_MODULE_IMPORTS],
			providers: [...TEST_PLAYER_MODULE_PROVIDERS],
			declarations: [QueueComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(QueueComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
