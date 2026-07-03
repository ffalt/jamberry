import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageOverlayContentComponent } from './image-overlay-content.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ImageOverlayContentComponent', () => {
	let component: ImageOverlayContentComponent;
	let fixture: ComponentFixture<ImageOverlayContentComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [ImageOverlayContentComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ImageOverlayContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
