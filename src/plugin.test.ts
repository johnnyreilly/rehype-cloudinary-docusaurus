import { describe, expect, it } from "vitest";

import { imageCloudinaryRehypeVisitorFactory } from "./plugin";

describe("imageCloudinaryRehypeVisitorFactory", () => {
	it("transforms img nodes", () => {
		const imageCloudinaryRehypeVisitor = imageCloudinaryRehypeVisitorFactory({
			cloudName: "demo",
			baseUrl: "https://blog.johnnyreilly.com",
		});
		const node = {
			type: "element",
			tagName: "img",
			properties: {
				src: "https://some.website.com/cat.gif",
				alt: null,
			},
		};

		imageCloudinaryRehypeVisitor(node);

		expect(node.properties.src).toBe(
			"https://res.cloudinary.com/demo/image/fetch/f_auto,q_auto,w_auto,dpr_auto/https://some.website.com/cat.gif"
		);
	});

	it("transforms JSX nodes", () => {
		const imageCloudinaryRehypeVisitor = imageCloudinaryRehypeVisitorFactory({
			cloudName: "demo",
			baseUrl: "https://blog.johnnyreilly.com",
		});
		const node = {
			type: "jsx",
			value:
				'<img src={require("!/workspaces/blog.johnnyreilly.com/blog-website/node_modules/url-loader/dist/cjs.js?limit=10000&name=assets/images/[name]-[hash].[ext]&fallback=/workspaces/blog.johnnyreilly.com/blog-website/node_modules/file-loader/dist/cjs.js!./bower-with-the-long-paths.png").default} width="640" height="497" />',
		};

		imageCloudinaryRehypeVisitor(node);

		expect(node.value).toBe(
			'<img src={`https://res.cloudinary.com/demo/image/fetch/f_auto,q_auto,w_auto,dpr_auto/https://blog.johnnyreilly.com${require("!/workspaces/blog.johnnyreilly.com/blog-website/node_modules/url-loader/dist/cjs.js?limit=10000&name=assets/images/[name]-[hash].[ext]&fallback=/workspaces/blog.johnnyreilly.com/blog-website/node_modules/file-loader/dist/cjs.js!./bower-with-the-long-paths.png").default}`} width="640" height="497" />'
		);
	});
});
