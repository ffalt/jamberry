export function extractSVGParts(data: any): { path: string; viewbox: string } {
	const svg = typeof data === 'string' ? data : (new TextDecoder('utf-8')).decode(new Uint8Array(data));
	let i = svg.indexOf('viewBox="');
	let viewbox = svg.slice(i + 9);
	viewbox = viewbox.slice(0, viewbox.indexOf('"'));
	i = svg.indexOf('d="');
	let path = svg.slice(i + 3);
	path = path.slice(0, path.indexOf('"'));
	return { path, viewbox };
}
