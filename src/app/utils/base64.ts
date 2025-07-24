export function base64ArrayBuffer(buffer: ArrayBuffer): string {
	let binary: string = '';
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		// eslint-disable-next-line unicorn/prefer-code-point
		binary += String.fromCharCode(bytes[i]);
	}
	return globalThis.btoa(binary);
}
