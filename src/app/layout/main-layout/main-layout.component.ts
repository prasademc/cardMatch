import { Component, OnInit } from '@angular/core';
import { GameStatusService } from '../../services/game-status.service';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

	gameStatus: boolean = false;
	time: string = '';

	constructor(private gameStatusService: GameStatusService) { }

	ngOnInit(): void {
		this.gameStatusService.gameStatusSubject.subscribe(status => {
			if (status) this.gameStatus = !this.gameStatus;
		});
	}

	onRestartGame(event: boolean) {
		this.gameStatus = event;
	}

	finalTime(evt: string): void {
		this.time = evt;
	}
}
