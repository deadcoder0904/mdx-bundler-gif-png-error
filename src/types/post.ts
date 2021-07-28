import type { Tag } from '@/types/index'

export type Meta = {
	title: string
	publishedAt: Date
	description: string
	slug: string
	tags: Array<Tag>
	image?: string
	author: string
	isPublished?: Boolean
}

export type Post = {
	meta: Meta
	code?: any
}
