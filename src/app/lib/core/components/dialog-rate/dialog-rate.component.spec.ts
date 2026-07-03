import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRateComponent } from './dialog-rate.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DialogRateComponent', () => {
	let component: DialogRateComponent;
	let fixture: ComponentFixture<DialogRateComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [DialogRateComponent],
			declarations: [],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogRateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
