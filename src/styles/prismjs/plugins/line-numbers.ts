import tw, { css } from "twin.macro"

export default css`
	pre[class*="language-"].line-numbers {
		padding-left: 3.8rem;
		counter-reset: linenumber;
		${tw`relative`}
	}

	pre[class*="language-"].line-numbers > code {
		white-space: inherit;
		${tw`relative`}
	}

	.line-numbers .line-numbers-rows {
		font-size: 100%;
		left: -3.8rem;
		width: 3rem; /* works for line-numbers below 1000 lines */
		letter-spacing: -1px;
		${tw`absolute top-0`}
		${tw`border-r border-gray-600`}
	}

	.line-numbers-rows > span {
		counter-increment: linenumber;
		${tw`block pointer-events-none`}
	}

	.line-numbers-rows > span:before {
		content: counter(linenumber);
		${tw`block text-gray-600 pr-3 text-right`}
	}
`
