import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {ComponentRef} from '@angular/core';

/**
 * Interface for the tab definitions passed to a TabPortalOutlet.
 * This is basically the same as passing the ComponentType to a regular portal,
 * but with an additional uniquely identifiable name.
 */
export interface TabInterface {
	name: string;
	componentClass: ComponentType<TabComponent>;
	active?: boolean;
}

/**
 * A generic interface for a tab component.
 * Here we assume each component has an onActivate method.
 *
 * You may want to use a common base component instead.
 */
export interface TabComponent {
	onActivate(): void;
}

/**
 * Interface for activated tabs referenced from the TabPortalOutlet.
 * This is only relevant for the internals of the outlet.
 */
export interface ActiveTabInterface {
	tab: TabInterface;
	portal: ComponentPortal<TabComponent>;
	componentRef: ComponentRef<TabComponent>;

	dispose(): void;
}
