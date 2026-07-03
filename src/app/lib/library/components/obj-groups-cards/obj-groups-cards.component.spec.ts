import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { ObjGroupsCardsComponent } from './obj-groups-cards.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ObjGroupsCardsComponent', () => {
	let component: ObjGroupsCardsComponent;
	let fixture: ComponentFixture<ObjGroupsCardsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, ObjGroupsCardsComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ObjGroupsCardsComponent);
		component = fixture.componentInstance;
		TestBed.runInInjectionContext(() => {
			fixture.detectChanges();
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
