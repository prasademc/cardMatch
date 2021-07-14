import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CardList } from '../models/card.list.interface';

@Injectable()
export class MemoryCardListService {
	cardDataUrl: string = './assets/data/card-list.json';

	constructor(private http: HttpClient) { }

	getCards(): Observable<CardList> {
		return this.http.get<CardList>(this.cardDataUrl);
	}
}
