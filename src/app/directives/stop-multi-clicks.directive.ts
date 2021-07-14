
import { Directive, Input, EventEmitter, HostListener, Renderer2, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[stopMultiClicks]'
})
export class StopMultiClicksDirective {

	@Input('stopMultiClicks') enableButton!: EventEmitter<boolean>;
	subscription!: Subscription;

	constructor(
		private renderer: Renderer2,
		private el: ElementRef
	) { }

	@HostListener('click')
	onClick() {
		this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
	}

	ngOnInit() {
		this.subscription = this.enableButton.subscribe(value => {
			if (!value) this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'painted');
		});
	}

	ngOnDestroy() {
		this.subscription && this.subscription.unsubscribe();
	}

}
