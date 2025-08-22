import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPlayerComponent } from './tab-player.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';

describe('TabPlayerComponent', () => {
	let component: TabPlayerComponent;
	let fixture: ComponentFixture<TabPlayerComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, TabPlayerComponent],
			providers: [TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(TabPlayerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
