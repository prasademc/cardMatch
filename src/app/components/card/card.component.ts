import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../models/card.interface';
import { CardStatus } from '../../models/card.status.interface';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	@Input() card: Card = {
		name: '',
		url: ''
	};
	@Input() status: boolean = false;
	@Output() onCardFlip: EventEmitter<CardStatus> = new EventEmitter<CardStatus>();
	enableButton = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit(): void { }

	/**
	 * Card click handler
	 * @param evt
	 * @param name
	 */
	onCartdFlipHandler(evt: MouseEvent, name: string): void {
		let target = evt.target || evt.srcElement || evt.currentTarget;
		this.status = !this.status;
		this.onCardFlip.emit({ target: target as HTMLElement, name: name });
		setTimeout(this.enableCardClick.bind(this), 500);
	}

	/**
	 * Enable click evenet
	 */
	enableCardClick(): void {
		this.enableButton.emit(false);
	}
}
