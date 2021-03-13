import CascadiaCodeMono from "assets/fonts/CascadiaMono.woff2"
import tw, { css } from "twin.macro"

export default css`
	body {
		${tw`leading-normal bg-gray-100 text-gray-800 overflow-hidden`}
	}

	@font-face {
		font-family: "Cascadia Mono";
		src: local("Cascadia Mono"), url(${CascadiaCodeMono}) format("woff2");
	}

	button:-moz-focusring,
	[type="button"]:-moz-focusring,
	[type="reset"]:-moz-focusring,
	[type="submit"]:-moz-focusring {
		outline: none;
	}

	.youtube-container {
		padding-bottom: 56.25%;
		/* width: 700px; */
		width: 100%;
		${tw`shadow relative overflow-hidden mx-auto max-w-full h-0 flex justify-center`}
	}

	.youtube-iframe {
		${tw`absolute w-full h-full`}
	}

	.app-scrollbar {
		transition-property: color background;
		transition-duration: 0.2s;
		transition-timing-function: ease;
		${tw`bg-gray-100 max-h-screen relative flex-grow flex flex-col overflow-x-hidden overflow-y-auto`}
	}
`
