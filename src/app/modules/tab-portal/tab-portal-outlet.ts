import {ComponentPortal} from '@angular/cdk/portal';
import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injector} from '@angular/core';
import {ActiveTabInterface, TabComponent, TabInterface} from './tab-portal.interfaces';

/**
 * A PortalOutlet that lets multiple components live for the lifetime of the outlet, allowing faster switching and persistent data.
 */
export class TabPortalOutlet {

	/**
	 * Returns the current active TabComponent instances.
	 */
	get activeComponents(): Array<TabComponent> {
		return Object
			.keys(this.activeTabs)
			.map((name: string) => this.activeTabs[name].componentRef.instance);
	}

	get currentTab(): Readonly<ActiveTabInterface | undefined> {
		return this.curTab;
	}

	get currentTabName(): Readonly<string | undefined> {
		return this.curTab ? this.curTab.tab.name : undefined;
	}

	// Active tabs that have been instantiated
	private activeTabs: { [name: string]: ActiveTabInterface } = {};
	// The current tab
	private curTab: ActiveTabInterface | undefined;

	constructor(
		public availableTabs: Array<TabInterface>,
		public outletElement: Element,
		private componentFactoryResolver: ComponentFactoryResolver,
		private appRef: ApplicationRef,
		private injector: Injector) {
	}

	switchTo(name: string): void {
		const tab = this.availableTabs.find(t => t.name === name);
		if (tab) {
			this.switchToTab(tab);
		}
	}

	switchToTab(tab: TabInterface): void {
		if (this.curTab && this.curTab.tab.name === tab.name) {
			return;
		}
		this.availableTabs.forEach(t => t.active = false);
		tab.active = true;
		// Detach any current instance
		this.detach();
		// Get existing or new component instance
		const instance = this.activateInstance(tab);
		// At this point the component has been instantiated, so we move it to the location in the DOM where we want it to be rendered.
		this.outletElement.innerHTML = '';
		this.outletElement.appendChild(TabPortalOutlet.getComponentRootNode(instance.componentRef));
		this.curTab = instance;
		instance.componentRef.instance.onActivate();
	}

	detach(): void {
		const current = this.curTab;
		if (current !== undefined) {
			current.portal.setAttachedHost(null);
			this.curTab = undefined;
		}
	}

	/**
	 * Clears out a portal from the DOM.
	 */
	dispose(): void {
		// Dispose all active tabs
		for (const name of Object.keys(this.activeTabs)) {
			this.activeTabs[name].dispose();
		}
		// Remove outlet element
		if (this.outletElement?.parentNode) {
			this.outletElement.parentNode.removeChild(this.outletElement);
		}
	}

	/** Gets the root HTMLElement for an instantiated component. */
	private static getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
		return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
	}

	private activateInstance(tab: TabInterface): ActiveTabInterface {
		if (!this.activeTabs[tab.name]) {
			this.activeTabs[tab.name] = this.createComponent(tab);
		}
		return this.activeTabs[tab.name] || undefined;
	}

	private createComponent(tab: TabInterface): ActiveTabInterface {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(tab.componentClass);
		const componentRef = componentFactory.create(this.injector);
		const portal = new ComponentPortal(tab.componentClass, undefined, this.injector);
		// Attach component view
		this.appRef.attachView(componentRef.hostView);
		return {
			tab, portal, componentRef,
			dispose: (): void => {
				this.appRef.detachView(componentRef.hostView);
				componentRef.destroy();
			}
		};
	}

}
