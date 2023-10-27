import type { Node } from "unist";

/* A rich AST node for uninst with image / JSX data */
export type ImgOrJsxNodeData = Node & {
	attributes: {
		name: string;
		type: string;
		value:
			| string
			| {
					data: unknown;
					type: string;
					value: string;
			  };
	}[];
	name: string;
	type: string;
};
