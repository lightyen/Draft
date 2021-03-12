import tw, { css } from "twin.macro"

export default css`
	.post h1 {
		${tw`font-black mt-8 mb-5 text-5xl`}
	}

	.post h2 {
		${tw`font-bold mt-6 mb-4 text-4xl`}
	}

	.post h3 {
		${tw`font-bold mt-6 mb-3 text-3xl`}
	}

	.post h4 {
		${tw`font-bold my-4 text-2xl`}
	}

	.post h5 {
		${tw`font-bold my-3 text-xl`}
	}

	.post h6 {
		${tw`font-bold my-2 text-lg`}
	}

	.post ul,
	.post ol {
		${tw`pl-6 mb-2`}
	}

	.post ul > li {
		${tw`list-disc`}
	}

	.post ol > li {
		${tw`list-decimal`}
	}

	.post hr {
		height: 3px;
		${tw`mb-2 bg-gray-300`}
	}

	.post p {
		${tw`mb-2`}
	}

	.post blockquote {
		border: none;
		border-left: 5px solid rgb(114, 30, 131);
		${tw`bg-gray-200 my-2 p-2 text-gray-600`}
	}

	.post blockquote > p:not([class*="language-"]) {
		${tw`mb-0`}
	}

	.post strong:not([class*="language-"]) {
		${tw`font-bold text-gray-900`}
	}

	/** code one line */
	.post code:not([class*="language-"]) {
		transition: background 0.2s ease;
		padding: 2px 4px;
		${tw`bg-gray-300 text-gray-800 rounded-lg`}
	}

	.post code:not([class*="language-"]):hover {
		${tw`bg-gray-200 text-gray-700`}
	}

	/** fenced code blocks */
	.post pre > code:not([class*="language-"]) {
		background: inherit;
		${tw`text-gray-100`}
	}

	.post pre > code:not([class*="language-"]):hover {
		background: inherit;
		${tw`text-gray-100`}
	}

	.post a {
		transition: background 0.2s ease-out;
		${tw`text-gray-900 break-words`}
	}

	.post a:hover {
		${tw`underline`}
	}
`
