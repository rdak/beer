/**
 * Beer object interface
 */
export interface IBeerItem {
	id: number;
	name: string;
	description?: string;

	tagLine?: string;
	first_brewed: string;

	image: string;

	desc: string;
	accounts: Array<string>;
	phrases: Array<string>;

	abv?: string;
	volume?: {
		value: number;
		unit: string;
	};
	food_pairing?: Array<string>;
}
