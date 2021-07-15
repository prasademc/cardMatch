import { TestBed } from '@angular/core/testing';

import { GivePenaltyService } from './give-penalty.service';

describe('GivePenaltyService', () => {
	let service: GivePenaltyService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GivePenaltyService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
