export function isValidBlobUrl(url: string): boolean {
	if (!url.startsWith('blob:')) {
		return false;
	}
	try {
		const urlObj = new URL(url);
		return urlObj.protocol === 'blob:';
	} catch {
		return false;
	}
}
