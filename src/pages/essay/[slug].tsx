import React from 'react'
import { GetStaticProps } from 'next'
import { getAllEssays, getEssayBySlug } from '@/utils/index'

import type { Post } from '@/types/index'
import { MDXLayoutRenderer } from '@/components/mdx/index'

export const getStaticPaths = () => {
	const essays = getAllEssays()
	const paths = essays.map(({ slug }) => ({
		params: {
			slug,
		},
	}))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<Post> = async ({ params }) => {
	const slug = params?.slug as string
	const essay = await getEssayBySlug(slug)

	return { props: essay }
}

const Essay = ({ meta, code }: Post) => {
	return (
		<>
			<h2>Essay</h2>
			<MDXLayoutRenderer mdxSource={code} />
		</>
	)
}

export default Essay
