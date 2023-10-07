import { defineConfig } from "vitest/config";

/// <reference types="vitest" />
export default defineConfig({
	test: {
		exclude: [
			"lib",
			"**/node_modules/**",
			"**/dist/**",
			"**/cypress/**",
			"**/.{idea,git,cache,output,temp}/**",
			"**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
		],
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
