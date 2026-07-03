import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAlbumComponent } from './dialog-album.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DialogAlbumComponent', () => {
	let component: DialogAlbumComponent;
	let fixture: ComponentFixture<DialogAlbumComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [DialogAlbumComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogAlbumComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
