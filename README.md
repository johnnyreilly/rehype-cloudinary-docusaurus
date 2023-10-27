<h1 align="center">Rehype Cloudinary Docusaurus plugin</h1>

<p align="center">Cloudinary offers an image CDN which can improve performance of your site. This plugin allows Docusaurus to use Cloudinary to serve optimised images.</p>

<p align="center">
	<a href="https://www.npmjs.com/package/rehype-cloudinary-docusaurus" target="_blank">
		<img alt="rehype-cloudinary-docusaurus version on npm" src="https://img.shields.io/npm/v/rehype-cloudinary-docusaurus.svg" />
	</a>
	<a href="https://img.shields.io/npm/dm/rehype-cloudinary-docusaurus.svg" target="_blank">
		<img alt="Downloads on npm" src="https://img.shields.io/npm/dm/rehype-cloudinary-docusaurus.svg" />
	</a>
	<a href="https://github.com/johnnyreilly/rehype-cloudinary-docusaurus/actions/workflows/build.yml" target="_blank">
		<img alt="Build" src="https://github.com/johnnyreilly/rehype-cloudinary-docusaurus/actions/workflows/build.yml/badge.svg" />
	</a>
	<a href="https://github.com/johnnyreilly/rehype-cloudinary-docusaurus/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/johnnyreilly/rehype-cloudinary-docusaurus/blob/main/LICENSE.md" target="_blank">
	    <img alt="License: MIT" src="https://img.shields.io/github/license/johnnyreilly/rehype-cloudinary-docusaurus?color=21bb42">
    </a>
	<a href="https://github.com/sponsors/johnnyreilly" target="_blank">
    	<img alt="Sponsor: On GitHub" src="https://img.shields.io/badge/sponsor-on_github-21bb42.svg" />
    </a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
    <img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
</p>

## Usage

```shell
npm i rehype-cloudinary-docusaurus
```

We need to reference it in our `docusaurus.config.js` file. We do this by adding it to the `rehypePlugins` array:

```js
//@ts-check
import docusaurusCloudinaryRehypePlugin from "rehype-cloudinary-docusaurus";

const url = "https://johnnyreilly.com";

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
						[
							rehypeCloudinaryDocusaurus,
							{
								cloudName: "demo",
								baseUrl: url,
							},
						],
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

You will also need to disable the `url-loader` in your Docusaurus build which transforms images into base64 strings, as this will conflict with the plugin. [There isn't a first class way to do this in Docusaurus at present](https://github.com/facebook/docusaurus/pull/5498). However by setting the environment variable `WEBPACK_URL_LOADER_LIMIT` to `0` you can disable it. [You can see an implementation example in this pull request](https://github.com/johnnyreilly/blog.johnnyreilly.com/pull/397). It amounts to adding the [`cross-env`](https://github.com/kentcdodds/cross-env) package and then adding the following to your `package.json`:

```json
	"build": "cross-env WEBPACK_URL_LOADER_LIMIT=0 docusaurus build",
```

See this package in action on: <https://johnnyreilly.com> - the source code can be found here: <https://github.com/johnnyreilly/blog.johnnyreilly.com>. To read more on how this plugin came to be, see [this blog post](https://johnnyreilly.com/docusaurus-image-cloudinary-rehype-plugin) and [how it was migrated to MDX 3](https://johnnyreilly.com/docusaurus-3-how-to-migrate-rehype-plugins).

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md).
Thanks! ❤️🌻

> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).
