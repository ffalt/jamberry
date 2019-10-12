import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {LogoutComponent} from './logout.component';

describe('LogoutComponent', () => {
	let component: LogoutComponent;
	let fixture: ComponentFixture<LogoutComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, ToastModule.forRoot(), TEST_JAM_MODULE],
			providers: [],
			declarations: [LogoutComponent]
		}).compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(LogoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
