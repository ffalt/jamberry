import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {CoverartImageComponent, HeaderTabsComponent} from '@shared/components';
import {MockComponent} from 'ng-mocks';
import {HeaderJamBaseComponent} from './header-jambase.component';

describe('HeaderJamBaseComponent', () => {
	let component: HeaderJamBaseComponent;
	let fixture: ComponentFixture<HeaderJamBaseComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [
        HeaderJamBaseComponent,
        MockComponent(CoverartImageComponent),
        MockComponent(HeaderTabsComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderJamBaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
