import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_PLAYER_MODULE_IMPORTS, TEST_PLAYER_MODULE_PROVIDERS} from '@app/modules/player/player.module.mock';
import {QueueItemComponent} from './queue-item.component';

describe('QueueComponent', () => {
	let component: QueueItemComponent;
	let fixture: ComponentFixture<QueueItemComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_PLAYER_MODULE_IMPORTS],
    providers: [...TEST_PLAYER_MODULE_PROVIDERS],
    declarations: [QueueItemComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(QueueItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
