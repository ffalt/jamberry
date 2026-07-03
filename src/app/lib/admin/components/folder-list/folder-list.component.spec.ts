import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderListComponent } from './folder-list.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('FolderListComponent', () => {
	let component: FolderListComponent;
	let fixture: ComponentFixture<FolderListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FolderListComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
