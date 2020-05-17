import type { PluginWithOptions } from "markdown-it"

function generateOpenTag(
	href: string,
	className = "",
	origin: string,
	related: boolean | "true" | "false",
	attr = "src",
) {
	const id = href.split(":")[1]
	const originParam = origin ? `origin=${origin}` : ""
	const relParam = typeof related === "boolean" ? `rel=${related ? 1 : 0}` : ""
	const params = originParam || relParam ? `?${[originParam, relParam].filter(p => !!p).join("&")}` : ""

	return `<div class="youtube-container">
	  <iframe class="youtube-iframe ${className}"
			  ${attr}="https://www.youtube.com/embed/${id}${params}"
			  frameborder="0"
			  allow="encrypted-media"
			  allowfullscreen>`
}

function isYouTubeLink(href: string) {
	return href.indexOf("yt:") === 0 || href.indexOf("youtube:") === 0
}

export interface YouTubeConfiguration {
	className: string
	origin: string
	related: boolean | "true" | "false"
	attr: string
}

export const youtube: PluginWithOptions<Partial<YouTubeConfiguration>> = (
	md,
	{ className, origin, related, attr } = {},
) => {
	md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
		const token = tokens[idx]
		const href = token.attrGet("href")
		if (!isYouTubeLink(href)) {
			return self.renderToken(tokens, idx, options)
		}
		env.youtube = true
		return generateOpenTag(href, className, origin, related, attr)
	}

	md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
		if (!env.youtube) {
			return self.renderToken(tokens, idx, options)
		}
		env.youtube = false
		return "</iframe></div>"
	}
}
