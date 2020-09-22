const path = require("path");
const fs = require("fs");
const appVersion = require("./package.json").version;

async function updateVersion() {
	const versionFilePath = path.join(__dirname + "/src/environments/version.ts");
	const src = `export const version = '${appVersion}';\n`;

	const result = await fs.promises.readFile(versionFilePath);
	if (result.toString() !== src) {
		await fs.promises.writeFile(versionFilePath, src, {flag: "w"});
		console.log(`Writing ${appVersion} version module to ${versionFilePath}\n`);
	}
}


updateVersion().catch(e => {
	console.error(e);
});
