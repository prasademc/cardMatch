import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-congrats',
	templateUrl: './congrats.component.html',
	styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {

	@Input() time: string = '';
	@Output() onRestartGame: EventEmitter<boolean> = new EventEmitter<boolean>(false);

	constructor() { }

	ngOnInit(): void {}

	/**
	 * Restart the game
	 * @param evt
	 */
	onRestart(evt: Event) {
		this.onRestartGame.emit(false);
	}
}
