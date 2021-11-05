import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderTabsComponent, IconartImageComponent} from '@shared/components';
import {MockComponent} from 'ng-mocks';
import {HeaderIconSectionComponent} from './header-icon-section.component';

describe('HeaderIconSectionComponent', () => {
	let component: HeaderIconSectionComponent;
	let fixture: ComponentFixture<HeaderIconSectionComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [
        HeaderIconSectionComponent,
        MockComponent(HeaderTabsComponent),
        MockComponent(IconartImageComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderIconSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
