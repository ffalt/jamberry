import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';
import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [FormsModule, SharedModule, ToastModule.forRoot(), TEST_JAM_MODULE],
    providers: [
			{
				provide: ActivatedRoute,
				useValue: {
					snapshot: {
						params: {},
						queryParams: {}
					}
				}
			}
		],
    declarations: [LoginComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
