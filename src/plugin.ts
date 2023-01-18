import type { Transformer } from "unified";
import visit from "unist-util-visit";

import type { ImgOrJsxNodeData } from "./types";

interface Options {
	baseUrl: string;
	cloudName: string;
}

/**
 * Create a rehype plugin that will replace image URLs with Cloudinary URLs
 * @param {*} cloudName your Cloudinary’s cloud name eg demo
 * @param {*} baseUrl the base URL of your website eg https://blog.johnnyreilly.com - should not include a trailing slash, will likely be the same as the config.url in your docusaurus.config.js
 * @returns rehype plugin that will replace image URLs with Cloudinary URLs
 */
export function imageCloudinaryRehypePlugin({
	cloudName,
	baseUrl,
}: Options): Transformer {
	const imageCloudinaryRehypeVisitor = imageCloudinaryRehypeVisitorFactory({
		cloudName,
		baseUrl,
	});

	return (tree) => {
		visit(tree, ["element", "jsx"], imageCloudinaryRehypeVisitor);
	};
}

/**
 * Create a rehype visitor that will replace image URLs with Cloudinary URLs - exposed for testing purposes
 * @param {*} cloudName your Cloudinary’s cloud name eg demo
 * @param {*} baseUrl the base URL of your website eg https://blog.johnnyreilly.com - should not include a trailing slash, will likely be the same as the config.url in your docusaurus.config.js
 * @returns rehype plugin that will replace image URLs with Cloudinary URLs
 */
export function imageCloudinaryRehypeVisitorFactory({
	cloudName,
	baseUrl,
}: Options) {
	const srcRegex = / src=\{(.*)\}/;

	return function imageCloudinaryRehypeVisitor(node: ImgOrJsxNodeData) {
		if (node.type === "element" && node.tagName === "img" && node.properties) {
			// handles nodes like this:
			// {
			//   type: 'element',
			//   tagName: 'img',
			//   properties: {
			//     src: 'https://some.website.com/cat.gif',
			//     alt: null
			//   },
			//   ...
			// }
			const url = node.properties.src;

			node.properties.src = `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${url}`;
		} else if (node.type === "jsx" && node.value?.includes("<img ")) {
			// handles nodes like this:
			// {
			//   type: 'jsx',
			//   value: '<img src={require("!/workspaces/blog.johnnyreilly.com/blog-website/node_modules/url-loader/dist/cjs.js?limit=10000&name=assets/images/[name]-[hash].[ext]&fallback=/workspaces/blog.johnnyreilly.com/blog-website/node_modules/file-loader/dist/cjs.js!./bower-with-the-long-paths.png").default} width="640" height="497" />'
			// }
			const match = node.value.match(srcRegex);
			if (match) {
				const urlOrRequire = match[1];
				node.value = node.value.replace(
					srcRegex,
					// eslint-disable-next-line no-useless-escape
					` src={${`\`https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${baseUrl}\$\{${urlOrRequire}\}\``}}`
				);
			}
		}
	};
}
