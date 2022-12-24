<h1 align="center">Remark Cloudinary Docusaurus plugin</h1>

<p align="center">Cloudinary offers an image CDN which can improve performance of your site. This plugin allows Docusaurus to use Cloudinary to serve optimised images.</p>

<p align="center">
	<a href="https://codecov.io/gh/johnnyreilly/remark-cloudinary-docusaurus" target="_blank">
		<img alt="Codecov Test Coverage" src="https://codecov.io/gh/johnnyreilly/remark-cloudinary-docusaurus/branch/main/graph/badge.svg?token=eVIFY4MhfQ"/>
	</a>
	<a href="https://github.com/johnnyreilly/remark-cloudinary-docusaurus/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/johnnyreilly/remark-cloudinary-docusaurus/blob/main/LICENSE.md" target="_blank">
	    <img alt="License: MIT" src="https://img.shields.io/github/license/johnnyreilly/remark-cloudinary-docusaurus?color=21bb42">
    </a>
	<a href="https://github.com/sponsors/JoshuaKGoldberg" target="_blank">
    	<img alt="Sponsor: On GitHub" src="https://img.shields.io/badge/sponsor-on_github-21bb42.svg" />
    </a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
    <img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
</p>

## Usage

```shell
npm i remark-cloudinary-docusaurus
```

We need to reference it in our `docusaurus.config.js` file. We do this by adding it to the `rehypePlugins` array:

```js
//@ts-check
const remarkCloudinaryDocusaurus = require("remark-cloudinary-docusaurus");

const url = "https://blog.johnnyreilly.com";

/** @type {import('@docusaurus/types').Config} */
const config = {
	// ...
	presets: [
		[
			"@docusaurus/preset-classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				// ...
				blog: {
					// ...
					rehypePlugins: [
						remarkCloudinaryDocusaurus({ cloudName: "demo", baseUrl: url }),
					],
					// ...
				},
				// ...
			}),
		],
	],
	// ...
};
```

_Note:_ [as is standard for Docusaurus Remark plugins at present](https://docusaurus.io/docs/markdown-features/plugins#installing-plugins), this is a commonjs module.

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md).
Thanks! ❤️🌻

## Contributors

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).
