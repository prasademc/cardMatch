import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { GivePenaltyService } from '../../services/give-penalty.service';

@Component({
	selector: 'app-time',
	templateUrl: './time.component.html',
	styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

	hours: number = 0;
	minutes: number = 0;
	seconds: number = 0;
	recordingTimer: string = '00 : 00 : 00';
	time: boolean = true;
	@Output() onTimeChange: EventEmitter<string> = new EventEmitter<string>();

	constructor(private givePenaltyService: GivePenaltyService) { }

	ngOnInit(): void {
		this.timer();
		this.givePenaltyService.penaltyStatusSubject.subscribe(penalty =>{
			if(penalty) this.seconds = this.seconds + 5;
		});
	}

	/**
	 * Count the time
	 */
	private timeCounter() {
		if (this.time) {
			this.seconds += 1;
			if (this.seconds >= 60) {
				this.seconds = 0;
				this.minutes += 1

				if (this.minutes >= 60) {
					this.minutes = 0;
					this.hours += 1
				}
			}
			this.recordingTimer = `${this.hours ? this.hours > 9 ? this.hours : '0' + this.hours : '00'} : ${this.minutes ? (this.minutes > 9 ? this.minutes : '0' + this.minutes) : '00'} : ${this.seconds > 9 ? this.seconds : '0' + this.seconds}`;
			this.onTimeChange.emit(this.recordingTimer);
		}
	}

	/**
	 * Start the time counter
	 */
	private timer() {
		setInterval(() => this.timeCounter(), 1000);
	}
}
