import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_HEADER_MODULE_IMPORTS, TEST_HEADER_MODULE_PROVIDERS} from '@app/modules/header/header.module.mock';
import {SearchBoxComponent} from './search-box.component';

describe('SearchBoxComponent', () => {
	let component: SearchBoxComponent;
	let fixture: ComponentFixture<SearchBoxComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_HEADER_MODULE_IMPORTS],
    providers: [...TEST_HEADER_MODULE_PROVIDERS],
    declarations: [SearchBoxComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
