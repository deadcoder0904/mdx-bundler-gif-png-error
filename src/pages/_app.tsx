import Head from 'next/head'
import { Nav } from '@/components/index'
import type { AppProps } from 'next/app'

import '@/styles/index.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="theme-color" content="#ffffff" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#00aba9" />
				<title>Mdx Bundler Images error</title>
			</Head>
			<Nav />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
