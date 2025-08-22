export interface AutocompleteOption<T> {
	header?: string;
	data: T;
}

export interface AutocompleteDataControl<T> {
	autocompleteGetData(query: string): Promise<Array<AutocompleteOption<T>>>;

	autocompleteSelectResult(result: AutocompleteOption<T>): string;

	autocompleteEnter(query: string): void;
}

export interface AutocompleteControl<T> {
	isVisible: boolean;
	activeIndex: number;
	query: string;
	options: Array<AutocompleteOption<T>>;

	selectOption(option: AutocompleteOption<T>): void;
}
