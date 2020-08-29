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
			.keys(this._activeTabs)
			.map((name: string) => this._activeTabs[name].componentRef.instance);
	}

	get currentTab(): Readonly<ActiveTabInterface | undefined> {
		return this._currentTab;
	}

	get currentTabName(): Readonly<string | undefined> {
		return this._currentTab ? this._currentTab.tab.name : undefined;
	}

	// Active tabs that have been instantiated
	private _activeTabs: { [name: string]: ActiveTabInterface } = {};
	// The current tab
	private _currentTab: ActiveTabInterface | undefined;

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
		if (this._currentTab && this._currentTab.tab.name === tab.name) {
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
		this._currentTab = instance;
		instance.componentRef.instance.onActivate();
	}

	detach(): void {
		const current = this._currentTab;
		if (current !== undefined) {
			// tslint:disable-next-line:no-null-keyword
			current.portal.setAttachedHost(null);
			this._currentTab = undefined;
		}
	}

	/**
	 * Clears out a portal from the DOM.
	 */
	dispose(): void {
		// Dispose all active tabs
		for (const name of Object.keys(this._activeTabs)) {
			this._activeTabs[name].dispose();
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
		if (!this._activeTabs[tab.name]) {
			this._activeTabs[tab.name] = this.createComponent(tab);
		}
		return this._activeTabs[tab.name] || undefined;
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
