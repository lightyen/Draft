import { css } from "twin.macro"

export default css`
	.token.tab:not(:empty),
	.token.cr,
	.token.lf,
	.token.space {
		position: relative;
	}

	.token.tab:not(:empty):before,
	.token.cr:before,
	.token.lf:before,
	.token.space:before {
		color: #808080;
		opacity: 0.6;
		position: absolute;
	}

	.token.tab:not(:empty):before {
		content: "\21E5";
	}

	.token.cr:before {
		content: "\240D";
	}

	.token.crlf:before {
		content: "\240D\240A";
	}
	.token.lf:before {
		content: "\240A";
	}

	.token.space:before {
		content: "\00B7";
	}
`
