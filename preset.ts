import { Preset, color } from "apply";


const newPreprocessor = `windicss({
			config: "windi.config.cjs",
		})`;

const addPreprocessor = (otherPreprocessors) => {
	if (otherPreprocessors) {
		// otherPreprocessors includes captured whitespace at the end.
		// So, this will match the existing formatting, putting the closing ] 
		// bracket on a new line only if it already was
		return `preprocess: [\n\t\t${newPreprocessor},\n\t\t${otherPreprocessors}]`;
	} else {
		return `preprocess: [\n\t\t${newPreprocessor},\n\t]`;
	}
};

Preset.setName("svelte-add/windicss");

const ROLLUP = "rollup"; // Not currently supported or inferred
const ROLLUP_SAPPER = "rollup-sapper"; // Not currently supported or inferred
const SNOWPACK = "snowpack"; // Not tested
const SNOWPACK_SVELTEKIT = "snowpack-sveltekit";
const WEBPACK = "webpack"; // Not currently supported or inferred
const WEBPACK_SAPPER = "webpack-sapper"; // Not currently supported or inferred
const VITE = "vite";
const VITE_SVELTEKIT = "vite-sveltekit";
const UNKNOWN_SETUP = "unknown";
const SETUP = "setup";

const EXCLUDE_EXAMPLES = "excludeExamples"
Preset.option(EXCLUDE_EXAMPLES, false);

Preset.hook((preset) => { preset.context[SETUP] = UNKNOWN_SETUP }).withoutTitle();
Preset.edit("package.json").update((content, preset) => {
	const pkg = JSON.parse(content);

	const dependencies = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

	if (dependencies["@sveltejs/kit"]) {
		if (dependencies["vite"]) preset.context[SETUP] = VITE_SVELTEKIT;
		else if (dependencies["snowpack"]) preset.context[SETUP] = SNOWPACK_SVELTEKIT;
	} else if (dependencies["vite"]) {
		preset.context[SETUP] = VITE;
	} else if (dependencies["snowpack"]) {
		preset.context[SETUP] = SNOWPACK;
	}

	return content;
}).withoutTitle();

Preset.extract("windi.config.cjs").withTitle("Adding Windi CSS config file");
Preset.group((preset) => {
	preset.extract(".vscode/extensions.json").whenConflict("skip");
	preset.editJson(".vscode/extensions.json").merge({
		recommendations: ["voorjaar.windicss-intellisense"],
	});
}).withTitle("Suggesting the Windi CSS IntelliSense extension").ifNotOption(EXCLUDE_EXAMPLES);

Preset.editJson("package.json").merge({
	devDependencies: {
		"svelte-windicss-preprocess": "^3.1.2",
		"windicss": "^2.5.5",
	},
}).withTitle("Adding needed dependencies");

Preset.group((preset) => {
	preset.extract("svelte.config.cjs").whenConflict("skip").withTitle("Adding `svelte.config.cjs`").if((preset) => [VITE].includes(preset.context[SETUP]));

	preset.edit("svelte.config.cjs").update((content) => {
		let result = content;

		const matchSveltePreprocess = /(sveltePreprocess\(.*\))/m;
		result = result.replace(matchSveltePreprocess, (_match, oldPreprocessor) => `[${oldPreprocessor}]`);

		const matchPreprocessors = /preprocess:[\s\r\n]\[[\s\r\n]*((?:.|\r|\n)+)[\s\r\n]*\]/m;
		result = result.replace(matchPreprocessors, (_match, otherPreprocessors) => {
			return addPreprocessor(otherPreprocessors);
		});

		result = `const windicss = require("svelte-windicss-preprocess").preprocess;\n${result}`;

		if (!result.includes("windicss(")) result = result.replace("module.exports = {", `module.exports = {\n\t${addPreprocessor("")},`);

		return result;
	}).withTitle("Configuring it in svelte.config.cjs");
}).withTitle("Setting up the Windi CSS preprocessor");

Preset.group((preset) => {
	preset.extract("src/routes/example-windicss.svelte");

	preset.edit("src/routes/index.svelte").update((contents) => {
		const closingMain = `</main>`;
		return contents.replace(closingMain, `\t<p>Visit <a href="/example-windicss">the /example-windicss page</a> to see Windi CSS utility classes in use.</p>\n${closingMain}`);
	});
}).withTitle("Adding a page using Windi CSS utility classes as an example and linking to it from the homepage").ifNotOption(EXCLUDE_EXAMPLES).if((preset) => [SNOWPACK_SVELTEKIT, VITE_SVELTEKIT].includes(preset.context[SETUP]));

Preset.instruct(`Run ${color.magenta("npm install")}, ${color.magenta("pnpm install")}, or ${color.magenta("yarn")} to install dependencies`);
