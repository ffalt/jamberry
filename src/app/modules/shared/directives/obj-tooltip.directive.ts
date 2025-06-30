import {ComponentFactoryResolver, ComponentRef, Directive, HostListener, ViewContainerRef, inject, input} from '@angular/core';
import {ChildTooltipContentComponent, TooltipInfo} from '../components/obj-tooltip-content/child-tooltip-content.component';

@Directive({
	selector: '[appObjTooltip]',
	standalone: false
})
export class ObjTooltipDirective {
	readonly appObjTooltip = input<any>();
	readonly tooltipDisabled = input<boolean>(false);
	readonly tooltipAnimation = input<boolean>(true);
	readonly tooltipPlacement = input<'top' | 'bottom' | 'left' | 'right'>('bottom');
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly componentFactoryResolver = inject(ComponentFactoryResolver);
	private tooltip?: ComponentRef<ChildTooltipContentComponent>;
	private visible?: boolean;

	getInfo(): TooltipInfo {
		const o = this.appObjTooltip();
		const result: TooltipInfo = {title: o.id, items: []};
		if (!this.appObjTooltip()) {
			return result;
		}
		Object.keys(o).forEach(key => {
			result.items.push({key, value: o[key]});
		});
		return result;
	}

	@HostListener('focusin')
	@HostListener('mouseenter')
	show(): void {
		if (this.tooltipDisabled() || this.visible) {
			return;
		}
		this.visible = true;
		const myComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ChildTooltipContentComponent);
		this.tooltip = this.viewContainerRef.createComponent(myComponentFactory);
		this.tooltip.instance.hostElement.set(this.viewContainerRef.element.nativeElement);
		this.tooltip.instance.content.set(this.getInfo());
		this.tooltip.instance.placement.set(this.tooltipPlacement());
		this.tooltip.instance.animation.set(this.tooltipAnimation());
	}

	@HostListener('focusout')
	@HostListener('mouseleave')
	hide(): void {
		if (!this.visible) {
			return;
		}
		this.visible = false;
		if (this.tooltip) {
			this.tooltip.destroy();
		}
	}

}
