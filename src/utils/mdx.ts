import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import gfmPlugin from 'remark-gfm'
import slugPlugin from 'remark-slug'

import { dateSortDesc } from '@/utils/index'

import type { Meta } from '@/types/index'

const ROOT_PATH = process.cwd()
const PUBLIC_PATH = path.join(ROOT_PATH, 'public')
export const POSTS_PATH = path.join(ROOT_PATH, 'src/_posts')
const ESSAY_FILE_PATHS = glob.sync(`${POSTS_PATH}/essay/**/*.mdx`.replace(/\\/g, '/'))
const TUTORIAL_FILE_PATHS = glob.sync(`${POSTS_PATH}/tutorial/**/*.mdx`.replace(/\\/g, '/'))

export const getAllPosts = (posts: string[], tags?: Meta['tags']) => {
	return posts
		.map((filePath): Meta => {
			const source = fs.readFileSync(path.join(filePath), 'utf8')

			const split = filePath.split('/')
			const slug = split[split.length - 2]

			const data = matter(source).data as Meta

			return {
				...data,
				slug,
			}
		})
		.filter((post) => post?.isPublished === true)
		.filter((post) => {
			if (!tags) return true
			return post.tags === tags
		})
		.sort((a, b) => dateSortDesc(a.publishedAt, b.publishedAt))
}

export const getAllEssays = () => getAllPosts(ESSAY_FILE_PATHS)
export const getAllTutorials = () => getAllPosts(TUTORIAL_FILE_PATHS)

export const getPostBySlug = async (postType: 'essay' | 'tutorial', slug: string) => {
	const source = fs.readFileSync(path.join(`${POSTS_PATH}/${postType}/${slug}/index.mdx`), 'utf8')

	const cwd = path.join(POSTS_PATH, postType, slug)

	const { code, frontmatter } = await bundleMDX(source, {
		cwd,
		xdmOptions: (options) => {
			options.remarkPlugins = [...(options?.remarkPlugins ?? []), slugPlugin, gfmPlugin]

			return options
		},
		esbuildOptions: (options) => {
			options.outdir = path.join(PUBLIC_PATH, postType, slug)
			options.loader = {
				...options.loader,
				'.webp': 'file',
				'.jpeg': 'file',
				'.jpg': 'file',
				'.png': 'file',
				'.gif': 'file',
			}
			options.publicPath = slug

			options.write = true

			return options
		},
	})

	const meta = {
		...frontmatter,
		slug,
	} as Meta

	return {
		meta,
		code,
	}
}

export const getEssayBySlug = (slug: string) => getPostBySlug('essay', slug)
export const getTutorialBySlug = (slug: string) => getPostBySlug('tutorial', slug)
