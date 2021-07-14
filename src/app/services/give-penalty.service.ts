import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GivePenaltyService {
	public penaltyStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  	constructor() { }

	public givePenalty(penalty: boolean) {
		return this.penaltyStatusSubject.next(penalty);
	}
}




