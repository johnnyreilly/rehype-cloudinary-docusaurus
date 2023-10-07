import * as acorn from "acorn";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxJsxFromMarkdown, mdxJsxToMarkdown } from "mdast-util-mdx-jsx";
import { toMarkdown } from "mdast-util-to-markdown";
import { type Options, mdxJsx } from "micromark-extension-mdx-jsx";
import type { Transformer } from "unified";
import type { Node } from "unist";
import { type Visitor, visit } from "unist-util-visit";

import type { ImgOrJsxNodeData } from "./types.js";

interface Params {
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
}: Params): Transformer {
	const imageCloudinaryRehypeVisitor = imageCloudinaryRehypeVisitorFactory({
		cloudName,
		baseUrl,
	});

	return (tree) => {
		visit(tree, ["mdxJsxTextElement"], imageCloudinaryRehypeVisitor);
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
}: Params): Visitor<Node> {
	const srcRegex = / src=\{(.*)\}/;
	return function imageCloudinaryRehypeVisitor(node) {
		const imgWithAttributes = node as ImgOrJsxNodeData;
		if (
			imgWithAttributes.type === "mdxJsxTextElement" &&
			imgWithAttributes.name === "img"
		) {
			// handles nodes like this:
			// {
			//   type: 'mdxJsxTextElement',
			//   name: 'img',
			//   attributes: [
			//     {
			//       type: 'mdxJsxAttribute',
			//       name: 'alt',
			//       value: 'title image reading &quot;Azure Container Apps, Bicep, managed certificates and custom domains&quot; with the Azure Container App logos'
			//     },
			//     {
			//       type: 'mdxJsxAttribute',
			//       name: 'src',
			//       value: {
			//         type: 'mdxJsxAttributeValueExpression',
			//         value: 'require("!/home/john/code/github/blog.johnnyreilly.com/blog-website/node_modules/url-loader/dist/cjs.js?limit=10000&name=assets/images/[name]-[contenthash].[ext]&fallback=/home/john/code/github/blog.johnnyreilly.com/blog-website/node_modules/file-loader/dist/cjs.js!./screenshot-azure-portal-bring-your-own-certificates.webp").default',
			//         data: [Object]
			//       }
			//     },
			//     { type: 'mdxJsxAttribute', name: 'width', value: '800' },
			//     { type: 'mdxJsxAttribute', name: 'height', value: '450' }
			//   ],
			//   children: []
			// }
			const srcIndex = imgWithAttributes.attributes.findIndex(
				(attr) => attr.name === "src"
			);
			const requireAttribute = imgWithAttributes.attributes[srcIndex].value;
			if (typeof requireAttribute !== "string") {
				const asMarkdown = toMarkdown(
					imgWithAttributes as Parameters<typeof toMarkdown>[0],
					{
						extensions: [mdxJsxToMarkdown()],
					}
				);

				// <img
				//    alt="screenshot of typescript playground saying &#39;ComponentThatReturnsANumber&#39; cannot be used as a JSX component. Its return type &#39;number&#39; is not a valid JSX element.(2786)"
				//    src={require("!/home/john/code/github/blog.johnnyreilly.com/blog-website/node_modules/url-loader/dist/cjs.js?limit=10000&name=assets/images/[name]-[contenthash].[ext]&fallback=/home/john/code/github/blog.johnnyreilly.com/blog-website/node_modules/file-loader/dist/cjs.js!./screenshot-typescript-playground.png").default}
				//    width="690" height="298" />

				const match = asMarkdown.match(srcRegex);
				if (match) {
					const urlOrRequire = match[1];
					// eslint-disable-next-line no-useless-escape
					const cloudinaryRequireString = `\`https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto,w_auto,dpr_auto/${baseUrl}\$\{${urlOrRequire}\}\``;

					const newMarkdown = asMarkdown.replace(
						srcRegex,
						` src={${cloudinaryRequireString}}`
					);

					// <img
					//    alt="screenshot of typescript playground saying &#39;ComponentThatReturnsANumber&#39; cannot be used as a JSX component. Its return type &#39;number&#39; is not a valid JSX element.(2786)"
					//    src={`https://res.cloudinary.com/priou/image/fetch/f_auto,q_auto,w_auto,dpr_auto/https://johnnyreilly.com${require("!/home/john/code/github/blog.johnnyreilly.com/blog-website/node_modules/url-loader/dist/cjs.js?limit=10000&name=assets/images/[name]-[contenthash].[ext]&fallback=/home/john/code/github/blog.johnnyreilly.com/blog-website/node_modules/file-loader/dist/cjs.js!./screenshot-typescript-playground.png").default}`}
					//    width="690" height="298" />

					const tree = fromMarkdown(newMarkdown, {
						extensions: [
							mdxJsx({
								acorn: acorn as unknown as Options["acorn"],
								addResult: true,
							}),
						],
						mdastExtensions: [mdxJsxFromMarkdown()],
					});

					const newNode = tree.children[0] as ImgOrJsxNodeData;
					const newSrcAttributeIndex = newNode.attributes.findIndex(
						(attr) => attr.name === "src"
					);

					if (newSrcAttributeIndex !== -1) {
						imgWithAttributes.attributes[srcIndex] =
							newNode.attributes[newSrcAttributeIndex];
					}
				}
			}
		}
	};
}
