import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { ArtworkEditComponent } from './artwork-edit.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ArtworkEditComponent', () => {
	let component: ArtworkEditComponent;
	let fixture: ComponentFixture<ArtworkEditComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, ArtworkEditComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ArtworkEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
