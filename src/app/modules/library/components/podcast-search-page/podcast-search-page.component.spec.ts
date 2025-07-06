import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {PodcastService} from '@shared/services';
import {SharedModule} from '@shared/shared.module';
import {PodcastSearchPageComponent} from './podcast-search-page.component';

describe('PodcastSearchPageComponent', () => {
	let component: PodcastSearchPageComponent;
	let fixture: ComponentFixture<PodcastSearchPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [SharedModule, FormsModule, DialogOverlayModule, ToastModule.forRoot(), TEST_JAM_MODULE],
    providers: [PodcastService],
    declarations: [PodcastSearchPageComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PodcastSearchPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
