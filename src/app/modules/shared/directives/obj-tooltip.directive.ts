import {Compiler, ComponentFactoryResolver, ComponentRef, Directive, HostListener, Input, ViewContainerRef} from '@angular/core';
import {ChildTooltipContentComponent, TooltipInfo} from '../components/obj-tooltip-content/child-tooltip-content.component';

@Directive({
	selector: '[appObjTooltip]'
})
export class ObjTooltipDirective {
	@Input() appObjTooltip: any;
	@Input() tooltipDisabled: boolean = false;
	@Input() tooltipAnimation: boolean = true;
	@Input() tooltipPlacement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

	private tooltip?: ComponentRef<ChildTooltipContentComponent>;
	private visible?: boolean;

	constructor(private viewContainerRef: ViewContainerRef, private compiler: Compiler, private componentFactoryResolver: ComponentFactoryResolver) {
	}

	getInfo(): TooltipInfo {
		const o = this.appObjTooltip;
		const result: TooltipInfo = {title: o.id, items: []};
		if (!this.appObjTooltip) {
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
		if (this.tooltipDisabled || this.visible) {
			return;
		}
		this.visible = true;
		const myComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ChildTooltipContentComponent);
		this.tooltip = this.viewContainerRef.createComponent(myComponentFactory);
		this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
		this.tooltip.instance.content = this.getInfo();
		this.tooltip.instance.placement = this.tooltipPlacement;
		this.tooltip.instance.animation = this.tooltipAnimation;
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
