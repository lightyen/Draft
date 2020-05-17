import type { loader } from "webpack"

function escape(data: string) {
	return data.replace(/\\/g, "\\\\").replace(/\`/g, "\\`").replace(/\{/g, "\\{")
}

const customLoader: loader.Loader = function (content, map) {
	// if (this.cacheable) this.cacheable()
	if (content instanceof Buffer) {
		return
	}
	const callback = this.async()

	callback(null, `const value = \`${escape(content)}\`\nexport default value`)
}

export default customLoader
