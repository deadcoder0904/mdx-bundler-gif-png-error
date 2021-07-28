import React from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

import { GifPlayer } from '@/components/mdx/GifPlayer'

export const MDXComponents = {
	GifPlayer,
}

interface IMDXLayoutRenderer {
	mdxSource?: any
}

export const MDXLayoutRenderer = ({ mdxSource, ...rest }: IMDXLayoutRenderer) => {
	const MDXLayout = React.useMemo(() => getMDXComponent(mdxSource), [mdxSource])

	return <MDXLayout components={MDXComponents} {...rest} />
}
