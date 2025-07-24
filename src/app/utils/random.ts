export function randomString(): string {
	return Math.floor(Math.random() * (9_999_999)).toString();
}
