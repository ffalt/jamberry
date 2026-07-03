import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoTextComponent } from './info-text.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('InfoTextComponent', () => {
	let component: InfoTextComponent;
	let fixture: ComponentFixture<InfoTextComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [InfoTextComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
