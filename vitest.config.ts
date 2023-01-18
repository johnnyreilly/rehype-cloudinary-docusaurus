import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			all: true,
			include: ["src"],
			exclude: ["lib"],
			reporter: ["html", "lcov"],

			// c8 reports types-only lines as uncovered
			// https://github.com/johnnyreilly/rehype-cloudinary-docusaurus/issues/100
			provider: "istanbul",
		},
	},
});
