export function base64ArrayBuffer(buffer: ArrayBuffer): string {
	let binary: string = '';
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		// eslint-disable-next-line unicorn/prefer-code-point
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

export function toBase64(data: string): string {
	return btoa(data);
}

export function fromBase64(data: string): string {
	return atob(data);
}

export function ArrayBufferFromBase64(data: string): Uint8Array {
	const binary = fromBase64(data);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.codePointAt(i)!;
	}
	return bytes;
}
