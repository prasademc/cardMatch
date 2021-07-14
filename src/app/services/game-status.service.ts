import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GameStatusService {
	public gameStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor() {}

	public showCongrats(show: boolean) {
		return this.gameStatusSubject.next(show);
	}

	public hideCongrats(hide: boolean) {
		return this.gameStatusSubject.next(hide);
	}
}


