import tw, { css } from "twin.macro"

export default css`
	.CodeMirror {
		font-family: Fira Code, Roboto, Helvetica Neue, Helvetica, Arial, PingFang TC, Apple LiGothic Medium, 微軟正黑體,
			Microsoft JhengHei, sans-serif;
		${tw`bg-gray-300 text-gray-900 h-auto`}
	}

	.CodeMirror-selected {
		/* background: #96dfcf !important; */
	}

	.CodeMirror-lines {
		/* ${tw`p-0`} */
	}

	.CodeMirror pre.CodeMirror-line,
	.CodeMirror pre.CodeMirror-line-like {
		${tw`px-2`}
	}

	.cm-tab {
		position: relative;
	}
	.cm-tab::before {
		content: "";
		height: 100%;
		position: absolute;
		border-right: 1px solid #424242;
	}
	.cm-tab::after {
		position: absolute;
		left: 2px;
		content: "→";
		color: #424242;
	}

	.CodeMirror {
		width: 48vw;
		height: 100vh;
	}

	.CodeMirror-linenumbers {
		${tw`bg-gray-900`}
	}
`
