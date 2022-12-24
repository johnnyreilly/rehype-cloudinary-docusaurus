import type { Node } from "unist";

/* A rich AST node for uninst with image / JSX data */
export type ImgOrJsxNodeData = Node & {
	properties?: {
		alt: string | null;
		src: string;
	};
	tagName?: string;
	type: string;
	value?: string;
};
