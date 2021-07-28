import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import fs from 'fs'
import path from 'path'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="en">
				<Head />
				<body className="dark:bg-primary dark:text-white">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
