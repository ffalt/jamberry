function offset(nativeEl: HTMLElement): { width: number; height: number; top: number; left: number } {
	const boundingClientRect = nativeEl.getBoundingClientRect();
	return {
		width: boundingClientRect.width || nativeEl.offsetWidth,
		height: boundingClientRect.height || nativeEl.offsetHeight,
		top: boundingClientRect.top + (window.scrollY ?? globalThis.document.documentElement.scrollTop),
		left: boundingClientRect.left + (window.scrollX ?? globalThis.document.documentElement.scrollLeft)
	};
}

function getStyle(nativeEl: HTMLElement, cssProp: string): string {
	if ((nativeEl as any).currentStyle) {// IE
		return (nativeEl as any).currentStyle[cssProp];
	}
	if (globalThis.getComputedStyle) {
		return (globalThis.getComputedStyle(nativeEl) as any)[cssProp];
	}
	// finally try and get inline style
	return (nativeEl.style as any)[cssProp];
}

function isStaticPositioned(nativeEl: HTMLElement): boolean {
	return (getStyle(nativeEl, 'position') || 'static') === 'static';
}

function parentOffsetEl(nativeEl: HTMLElement): any {
	let offsetParent: any = nativeEl.offsetParent || globalThis.document;
	while (offsetParent && offsetParent !== globalThis.document && isStaticPositioned(offsetParent)) {
		offsetParent = offsetParent.offsetParent;
	}
	return offsetParent || globalThis.document;
}

function position(nativeEl: HTMLElement): { width: number; height: number; top: number; left: number } {
	let offsetParentBCR = {top: 0, left: 0};
	const elBCR = offset(nativeEl);
	const offsetParentEl = parentOffsetEl(nativeEl);
	if (offsetParentEl !== globalThis.document) {
		offsetParentBCR = offset(offsetParentEl);
		offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
		offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
	}
	const boundingClientRect = nativeEl.getBoundingClientRect();
	return {
		width: boundingClientRect.width || nativeEl.offsetWidth,
		height: boundingClientRect.height || nativeEl.offsetHeight,
		top: elBCR.top - offsetParentBCR.top,
		left: elBCR.left - offsetParentBCR.left
	};
}

export function positionElements(hostEl: HTMLElement, targetEl: HTMLElement, positionStr: string, appendToBody = false): {
	top: number;
	left: number
} {
	const positionStrParts = positionStr.split('-');
	const pos0 = positionStrParts[0];
	const pos1 = positionStrParts[1] || 'center';
	const hostElPos = appendToBody ? offset(hostEl) : position(hostEl);
	const targetElWidth = targetEl.offsetWidth;
	const targetElHeight = targetEl.offsetHeight;
	const shiftWidth: {
		[name: string]: () => number;
	} = {
		center: (): number => hostElPos.left + hostElPos.width / 2 - targetElWidth / 2,
		left: (): number => hostElPos.left,
		right: (): number => hostElPos.left + hostElPos.width
	};
	const shiftHeight: {
		[name: string]: () => number;
	} = {
		center: (): number => hostElPos.top + hostElPos.height / 2 - targetElHeight / 2,
		top: (): number => hostElPos.top,
		bottom: (): number => hostElPos.top + hostElPos.height
	};
	let targetElPos: { top: number; left: number };
	switch (pos0) {
		case 'right': {
			targetElPos = {
				top: shiftHeight[pos1](),
				left: shiftWidth[pos0]()
			};
			break;
		}
		case 'left': {
			targetElPos = {
				top: shiftHeight[pos1](),
				left: hostElPos.left - targetElWidth
			};
			break;
		}
		case 'bottom': {
			targetElPos = {
				top: shiftHeight[pos0](),
				left: shiftWidth[pos1]()
			};
			break;
		}
		default: {
			targetElPos = {
				top: hostElPos.top - targetElHeight,
				left: shiftWidth[pos1]()
			};
			break;
		}
	}
	return targetElPos;
}
