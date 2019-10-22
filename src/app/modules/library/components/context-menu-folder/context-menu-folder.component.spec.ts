import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {ContextMenuFolderComponent} from './context-menu-folder.component';

describe('ContextMenuFolderComponent', () => {
	let component: ContextMenuFolderComponent;
	let fixture: ComponentFixture<ContextMenuFolderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [ContextMenuFolderComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextMenuFolderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
