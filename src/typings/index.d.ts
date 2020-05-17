export interface PostHeader {
	title: string
	author: string
	date: Date
	description: string
	tags: string[]
	filename: string
}

export interface MarkdownPost {
	__html: string
	header: PostHeader
}
