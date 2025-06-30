// helper functions
function levenshtein(str1: string, str2: string): number {
	const current: Array<number> = [];
	let prev = 0;
	let value;
	for (let i = 0; i <= str2.length; i++) {
		for (let j = 0; j <= str1.length; j++) {
			// eslint-disable-next-line
			if (i && j) {
				value = (str1.charAt(j - 1) === str2.charAt(i - 1)) ? prev : Math.min(current[j], current[j - 1], prev) + 1;
			} else {
				value = i + j;
			}
			prev = current[j];
			current[j] = value;
		}
	}
	return current.pop() || 0;
}

// return an edit distance from 0 to 1
function distance(str1: string, str2: string): number {
	if (str1 === undefined && str2 === undefined) {
		throw new Error('Trying to compare two undefined values');
	}
	if (str1 === undefined || str2 === undefined) {
		return 0;
	}
	const s1 = String(str1);
	const s2 = String(str2);
	const result = levenshtein(s1, s2);
	if (s1.length > s2.length) {
		return 1 - result / s1.length;
	}
	return 1 - result / s2.length;
}

function iterateGrams(value: string, gramSize: number): Array<string> {
	const nonWordRe = /[^\w, ]+/;
	const gs = gramSize || 2;
	const simplified = `-${value.toLowerCase().replace(nonWordRe, '')}-`;
// const lenDiff = gs - simplified.length;
	const results = [];
// let val = value;
// if (lenDiff > 0) {
// 	for (let i = 0; i < lenDiff; i += 1) {
// 		val += '-';
// 	}
// }
	for (let i = 0; i < simplified.length - gs + 1; i += 1) {
		results.push(simplified.slice(i, i + gs));
	}
	return results;
}

function gramCounter(value: string, gramSize: number): { [name: string]: number } {
	// return an object where key=gram, value=number of occurrences
	const result: { [name: string]: number } = {};
	const grams = iterateGrams(value, gramSize || 2);
	grams.forEach(g => {
		if (g in result) {
			result[g] += 1;
		} else {
			result[g] = 1;
		}
	});
	return result;
}

function isEmptyObject(obj: any): boolean {
	for (const prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			return false;
		}
	}
	return true;
}

function normalizeStr(str: string): string {
	if (typeof str !== 'string') {
		throw new Error('Must use a string as argument to FuzzySet functions');
	}
	return str.toLowerCase();
}

export class FuzzySet {
	version = '0.0.1';
	arr: Array<string>;
	useLevenshtein: boolean;
	gramSizeLower: number;
	gramSizeUpper: number;
	private exactSet: any = {};
	private matchDict: any = {};
	private items: any = {};

	constructor(arr?: Array<string>, useLevenshtein?: boolean, gramSizeLower?: number, gramSizeUpper?: number) {
		this.arr = arr || [];
		this.useLevenshtein = useLevenshtein || true;
		this.gramSizeLower = gramSizeLower || 2;
		this.gramSizeUpper = gramSizeUpper || 3;
		// initialization
		for (let i = this.gramSizeLower; i < this.gramSizeUpper + 1; i += 1) {
			this.items[i] = [];
		}
		// add all the items to the set
		this.arr.forEach(a => {
			this.add(a);
		});
	}

	get(value: string, defaultValue?: Array<Array<number>>): Array<Array<number>> | undefined {
		// check for value in set, returning defaultValue or undefined if none found
		const result = this.getVal(value);
		if (!result && defaultValue) {
			return defaultValue;
		}
		return result;
	}

	add(value: string): void {
		const normalizedValue = normalizeStr(value);
		if (normalizedValue in this.exactSet) {
			return;
		}
		for (let i = this.gramSizeLower; i < this.gramSizeUpper + 1; i += 1) {
			this.addVal(value, i);
		}
	}

	length(): number {
		// return length of items in set
		let count = 0;
		for (const prop in this.exactSet) {
			if (Object.prototype.hasOwnProperty.call(this.exactSet, prop)) {
				count += 1;
			}
		}
		return count;
	}

	isEmpty(): boolean {
		// return is set is empty
		for (const prop in this.exactSet) {
			if (Object.prototype.hasOwnProperty.call(this.exactSet, prop)) {
				return false;
			}
		}
		return true;
	}

	values(): Array<any> {
		// return list of values loaded into set
		const values = [];
		for (const prop in this.exactSet) {
			if (Object.prototype.hasOwnProperty.call(this.exactSet, prop)) {
				values.push(this.exactSet[prop]);
			}
		}
		return values;
	}

	private getVal(value: string): Array<Array<number>> | undefined {
		const normalizedValue = normalizeStr(value);
		const result = this.exactSet[normalizedValue];
		if (result) {
			return [[1, result]];
		}
		// start with high gram size and if there are no results, go to lower gram sizes
		for (let gramSize = this.gramSizeUpper; gramSize >= this.gramSizeLower; gramSize -= 1) {
			const res = this.getValGram(value, gramSize);
			if (res) {
				return res;
			}
		}
		return;
	}

	private getValGram(value: string, gramSize: number): Array<Array<number>> | undefined {
		const normalizedValue = normalizeStr(value);
		const matches: { [num: string]: number } = {};
		const gramCounts = gramCounter(normalizedValue, gramSize);
		const items = this.items[gramSize];
		let sumOfSquareGramCounts = 0;
		let otherGramCount;
		for (const gram in gramCounts) {
			if (Object.prototype.hasOwnProperty.call(gramCounts, gram)) {
				const gramCount = gramCounts[gram];
				sumOfSquareGramCounts += Math.pow(gramCount, 2);
				if (gram in this.matchDict) {
					for (const m of this.matchDict[gram]) {
						const index = m[0];
						otherGramCount = m[1];
						if (index in matches) {
							matches[index] += gramCount * otherGramCount;
						} else {
							matches[index] = gramCount * otherGramCount;
						}
					}
				}
			}
		}
		if (isEmptyObject(matches)) {
			return undefined;
		}
		const vectorNormal = Math.sqrt(sumOfSquareGramCounts);
		let results: Array<Array<any>> = [];
		let matchScore;
		// build a results list of [score, str]
		Object.keys(matches).forEach(matchIndex => {
			matchScore = matches[matchIndex];
			const index = parseInt(matchIndex, 10);
			results.push([matchScore / (vectorNormal * items[index][0]), items[index][1]]);
		});
		const sortDescending = (a: Array<number>, b: Array<number>): number => {
			if (a[0] < b[0]) {
				return 1;
			}
			if (a[0] > b[0]) {
				return -1;
			}
			return 0;
		};
		results.sort(sortDescending);
		if (this.useLevenshtein) {
			const newLevResults = [];
			const endIndex = Math.min(50, results.length);
			// truncate somewhat arbitrarily to 50
			for (let i = 0; i < endIndex; i += 1) {
				newLevResults.push([distance(results[i][1], normalizedValue), results[i][1]]);
			}
			results = newLevResults;
			results.sort(sortDescending);
		}
		const newResults = [];
		for (const r of results) {
			if (r[0] === results[0][0]) {
				newResults.push([r[0], this.exactSet[r[1]]]);
			}
		}
		return newResults;
	}

	private addVal(value: string, gramSize: number): void {
		const normalizedValue = normalizeStr(value);
		const items = this.items[gramSize] || [];
		const index = items.length;
		items.push(0);
		const gramCounts = gramCounter(normalizedValue, gramSize);
		let sumOfSquareGramCounts = 0;
		for (const gram in gramCounts) {
			if (Object.prototype.hasOwnProperty.call(gramCounts, gram)) {
				const gramCount = gramCounts[gram];
				sumOfSquareGramCounts += Math.pow(gramCount, 2);
				if (gram in this.matchDict) {
					this.matchDict[gram].push([index, gramCount]);
				} else {
					this.matchDict[gram] = [[index, gramCount]];
				}
			}
		}
		const vectorNormal = Math.sqrt(sumOfSquareGramCounts);
		items[index] = [vectorNormal, normalizedValue];
		this.items[gramSize] = items;
		this.exactSet[normalizedValue] = value;
	}
}
