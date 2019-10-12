import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_HEADER_MODULE_IMPORTS, TEST_HEADER_MODULE_PROVIDERS} from '@app/modules/header/header.module.mock';
import {MockComponent} from 'ng-mocks';
import {SearchBoxComponent} from '../search-box/search-box.component';
import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_HEADER_MODULE_IMPORTS],
			providers: [...TEST_HEADER_MODULE_PROVIDERS],
			declarations: [HeaderComponent, MockComponent(SearchBoxComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
