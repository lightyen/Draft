import type { PluginWithOptions } from "markdown-it"
import classnames from "classnames"

import Prism from "prismjs"

// highlights
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-go"
import "prismjs/components/prism-css"
import "prismjs/components/prism-scss"
import "prismjs/components/prism-sass"
import "prismjs/components/prism-json"

import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/toolbar/prism-toolbar"
import "prismjs/plugins/show-language/prism-show-language"

interface PrismjsConfiguration {}

export const prism: PluginWithOptions<Partial<PrismjsConfiguration>> = (md, cfg = {}) => {
	const langPrefix = "language-"
	const installPlugins = Prism.plugins
	const preClassName = classnames({
		"line-numbers": installPlugins.hasOwnProperty("lineNumbers"),
	})
	const defaultRender =
		md.renderer.rules.fence ||
		function (tokens, idx, options, env, self) {
			return self.renderToken(tokens, idx, options)
		}

	md.renderer.rules.fence = (tokens, idx, options, env, self) => {
		const token = tokens[idx]
		if (!token.info) {
			return defaultRender(tokens, idx, options, env, self)
		}
		const langClass = langPrefix + token.info
		const div = document.createElement("div")
		const pre = document.createElement("pre")
		const code = document.createElement("code")
		div.appendChild(pre)
		pre.appendChild(code)
		pre.style.lineHeight = "1.5rem"
		pre.className = classnames(langClass, preClassName)
		code.className = langClass
		code.textContent = token.content
		Prism.highlightElement(code)
		return div.innerHTML
	}
}
