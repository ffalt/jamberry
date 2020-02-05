export interface AutocompleteOption {
	header?: string;
	data: any;
}

export interface AutocompleteDataControl {
	autocompleteGetData(query: string): Promise<Array<AutocompleteOption>>;

	autocompleteSelectResult(result: AutocompleteOption): string;

	autocompleteEnter(query: string): void;
}

export interface AutocompleteControl {
	isVisible: boolean;
	activeIndex: number;
	query: string;
	options: Array<AutocompleteOption>;

	selectOption(option: AutocompleteOption): void;
}
