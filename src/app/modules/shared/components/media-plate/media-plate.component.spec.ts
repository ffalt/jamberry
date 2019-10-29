import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderTabsComponent, IconartImageComponent} from '@shared/components';
import {MockComponent} from 'ng-mocks';
import {MediaPlateComponent} from './media-plate.component';

describe('HeaderIconSectionComponent', () => {
	let component: MediaPlateComponent;
	let fixture: ComponentFixture<MediaPlateComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			declarations: [
				MediaPlateComponent,
				MockComponent(HeaderTabsComponent),
				MockComponent(IconartImageComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MediaPlateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
