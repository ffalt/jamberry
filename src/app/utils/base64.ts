export function base64ArrayBuffer(buffer: ArrayBuffer): string {
	return new Uint8Array(buffer).toBase64();
}

export function ArrayBufferFromBase64(data: string): Uint8Array {
	return Uint8Array.fromBase64(data);
}
