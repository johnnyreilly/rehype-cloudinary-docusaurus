import type { Node } from "unist";
import { describe, expect, it } from "vitest";

import { imageCloudinaryRehypeVisitorFactory } from "./plugin.js";

describe("imageCloudinaryRehypeVisitorFactory", () => {
	it("transforms mdxJsxTextElement nodes", () => {
		const imageCloudinaryRehypeVisitor = imageCloudinaryRehypeVisitorFactory({
			cloudName: "demo",
			baseUrl: "https://johnnyreilly.com",
		});
		const node = {
			type: "mdxJsxTextElement",
			name: "img",
			attributes: [
				{
					type: "mdxJsxAttribute",
					name: "alt",
					value:
						"title image reading &quot;Azure Container Apps, Bicep, managed certificates and custom domains&quot; with the Azure Container App logos",
				},
				{
					type: "mdxJsxAttribute",
					name: "src",
					value: {
						type: "mdxJsxAttributeValueExpression",
						value:
							'require("!/home/john/code/github/blog.johnnyreilly.com/blog-website/node_modules/url-loader/dist/cjs.js?limit=10000&name=assets/images/[name]-[contenthash].[ext]&fallback=/home/john/code/github/blog.johnnyreilly.com/blog-website/node_modules/file-loader/dist/cjs.js!./screenshot-azure-portal-bring-your-own-certificates.webp").default',
						data: [],
					},
				},
				{ type: "mdxJsxAttribute", name: "width", value: "800" },
				{ type: "mdxJsxAttribute", name: "height", value: "450" },
			],
			children: [],
		} as const;

		imageCloudinaryRehypeVisitor(node as Node, null, null);

		expect(node.attributes[1].value.value).toBe(
			'`https://res.cloudinary.com/demo/image/fetch/f_auto,q_auto,w_auto,dpr_auto/https://johnnyreilly.com${require("!/home/john/code/github/blog.johnnyreilly.com/blog-website/node_modules/url-loader/dist/cjs.js?limit=10000&name=assets/images/[name]-[contenthash].[ext]&fallback=/home/john/code/github/blog.johnnyreilly.com/blog-website/node_modules/file-loader/dist/cjs.js!./screenshot-azure-portal-bring-your-own-certificates.webp").default}`'
		);
	});
});
