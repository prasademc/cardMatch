import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../models/card.interface';

@Pipe({
	name: 'rendomCardList',
	pure: false
})
export class RendomCardListPipe implements PipeTransform {

	transform(cards: Card[], numberOfCards: number) {
		const selectedCardList: Card[] = this.getRandomCardList(cards, numberOfCards);
		const allSelectedCardList: Card[] = [...selectedCardList];
		return this.shuffleCards(allSelectedCardList.concat(allSelectedCardList));
	}

	/**
	 * Generate requred number of card list
	 * @param cards
	 * @param numberOfCards
	 * @returns
	 */
	private getRandomCardList(cards: Card[], numberOfCards: number) {
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
	private shuffleCards(cards: Card[]) {
		var currentIndex = cards.length, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
		}
		return cards;
	}
}
