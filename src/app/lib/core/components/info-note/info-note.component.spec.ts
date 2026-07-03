import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoNoteComponent } from './info-note.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('InfoNoteComponent', () => {
	let component: InfoNoteComponent;
	let fixture: ComponentFixture<InfoNoteComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [InfoNoteComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoNoteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
