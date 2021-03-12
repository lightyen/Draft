function escape(data) {
	return data.replace(/\\/g, "\\\\").replace(/\`/g, "\\`").replace(/\{/g, "\\{")
}

module.exports = function (content, map) {
	// if (this.cacheable) this.cacheable()
	if (content instanceof Buffer) {
		return
	}
	const callback = this.async()

	callback(null, `const value = \`${escape(content)}\`\nexport default value`)
}
