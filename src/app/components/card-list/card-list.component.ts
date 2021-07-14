import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Card } from '../../models/card.interface';
import { CardList } from '../../models/card.list.interface';
import { CardStatus } from '../../models/card.status.interface'

import { MemoryCardListService } from '../../services/memory-card-list.service';
import { GameStatusService } from '../../services/game-status.service';
import { GivePenaltyService } from '../../services/give-penalty.service';

@Component({
	selector: 'app-card-list',
	templateUrl: './card-list.component.html',
	styleUrls: ['./card-list.component.scss'],
	providers: [MemoryCardListService]
})
export class CardListComponent implements OnInit {
	@ViewChild('cardGrid', { static: false }) cardGrid!: ElementRef;

	catrdList: CardList = {
		total: 0,
		cards: []
	}
	selectedCardList: Card[] = [];
	numberOfCards: number = 18;
	openStatus: boolean = false;
	recentflipedCards: CardStatus[] = [];
	matchCards: CardStatus[] = [];
	allflipedCards: Array<HTMLElement> = [];


	constructor(
		private memoryCardListService: MemoryCardListService,
		private gameStatusService: GameStatusService,
		private givePenaltyService: GivePenaltyService
	) { }

	ngOnInit(): void {
		if (this.numberOfCards % 2 === 0) {
			this.memoryCardListService.getCards().subscribe(result => {
				if (Array.isArray(result.cards)) {
					this.catrdList.total = result.total;
					this.catrdList.cards.push(...result.cards);
					this.selectedCardList = this.getRandomCardList(this.catrdList.cards, this.numberOfCards);
					const allSelectedCardList: Card[] = [...this.selectedCardList];
					this.selectedCardList = this.shuffleCards(allSelectedCardList.concat(allSelectedCardList));
				}
			});
		} else {
			console.log('Please set card number to even');
		}
	}

	/**
	 * Card click handler
	 * @param evt
	 */
	cardFlipHandler(evt: any): void {
		evt.target.classList.add('is-flipped');
		this.recentflipedCards.push(evt);

		if (this.recentflipedCards.length === 2) {
			setTimeout(this.isCardMatch.bind(this), 500);
			this.isCardClickable(true);
		}
	}

	/**
	 * Check card is match or not
	 */
	private isCardMatch(): void {
		const cardOne: string = this.recentflipedCards[0].name;
		const cardTwo: string = this.recentflipedCards[1].name;

		if (cardOne === cardTwo) {
			this.matchCards.push(...this.recentflipedCards);
			this.isCardFlip(true)
			this.isCardClickable(false);
		} else {
			this.openStatus = false;
			this.isCardFlip(false)
			this.isCardClickable(false);
			this.recentflipedCards.forEach(card => {
				this.wasCardFlip(card.target);
			})
		}

		this.recentflipedCards = [];

		if (this.selectedCardList.length === this.matchCards.length) {
			this.gameStatusService.showCongrats(true);
		}
	}

	/**
	 * Check weather card was open already
	 * @param elem
	 */
	private wasCardFlip(elem: HTMLElement): void {
		let isExist = this.allflipedCards.some(cardElem => cardElem === elem);

		if (isExist) {
			this.givePenaltyService.givePenalty(true);
		} else {
			this.allflipedCards.push(elem);
		}
	}

	/**
	 * Change card flip status
	 * @param status
	 */
	private isCardFlip(status: boolean): void {
		this.recentflipedCards.forEach(cardName => {
			status ? cardName.target?.classList.add('flipped') : cardName.target?.classList.remove('is-flipped');;
		});
	}

	/**
	 * Change card clickble status
	 * @param status
	 */
	private isCardClickable(status: boolean): void {
		this.cardGrid.nativeElement.querySelectorAll('.card').forEach((element: any) => {
			status ? element.classList.add('no-pointer') : element.classList.remove('no-pointer');
		});
	}

	/**
	 * Generate requred number of card list
	 * @param cards
	 * @param numberOfCards
	 * @returns
	 */
	private getRandomCardList(cards: Card[], numberOfCards: number): Card[] {
		var result = new Array(numberOfCards),
			len = cards.length,
			taken = new Array(len);
		if (numberOfCards > len)
			throw new RangeError("Total number of cards exceeded");
		while (numberOfCards--) {
			var x = Math.floor(Math.random() * len);
			result[numberOfCards] = cards[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
		}
		return result;
	}

	/**
	 * shuffle the all cartd list
	 * @param cards
	 * @returns
	 */
	private shuffleCards(cards: Card[]): Card[] {
		var currentIndex = cards.length, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
		}
		return cards;
	}
}
