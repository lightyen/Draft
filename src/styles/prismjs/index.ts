import tw, { css } from "twin.macro"
import lineNumber from "./plugins/line-numbers"
import showLanguage from "./plugins/show-language"
import toolbar from "./plugins/toolbar"

const style = css`
	.token {
		color: inherit;
	}

	.line-numbers-rows {
		line-height: 1.545;
	}

	pre:not([class*="CodeMirror"]) {
		padding: 15px;
		${tw`mb-3 rounded shadow`}
	}

	code {
		font-family: Cascadia Mono, 微軟正黑體, Microsoft JhengHei, Roboto, Helvetica Neue, Helvetica, Arial,
			PingFang TC, 黑體-繁, Heiti TC, 蘋果儷中黑, Apple LiGothic Medium, sans-serif !important;
	}

	pre[class*="language-"] {
		${tw`text-sm`}
	}

	.toolbar {
		${tw`mr-1`}
	}

	div.code-toolbar > .toolbar .toolbar-item {
		${tw`p-1`}
	}

	div.code-toolbar > .toolbar a,
	div.code-toolbar > .toolbar button,
	div.code-toolbar > .toolbar span {
		background: rgba(224, 224, 224, 0.2);
		box-shadow: 0 0 0 2px rgba(119, 119, 119, 0.5);
		${tw`text-gray-400 transition py-0 px-1 text-sm rounded-lg select-none`}
	}

	div.code-toolbar > .toolbar a:hover,
	div.code-toolbar > .toolbar a:focus,
	div.code-toolbar > .toolbar button:hover,
	div.code-toolbar > .toolbar button:focus,
	div.code-toolbar > .toolbar span:hover,
	div.code-toolbar > .toolbar span:focus {
		background: rgba(224, 224, 224, 0.2);
		${tw`text-gray-200`}
	}
`

export default [lineNumber, toolbar, showLanguage, style]
