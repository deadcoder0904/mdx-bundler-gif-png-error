const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
	mode: 'jit',
	purge: {
		mode: 'all',
		content: ['./src/**/*.{js,ts,jsx,tsx}', './next.config.js'],
		options: {
			extractors: [
				{
					extensions: ['mdx'],
					extractor: (content) => {
						content = mdx.sync(content)

						// Capture as liberally as possible, including things like `h-(screen-1.5)`
						const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

						// Capture classes within other delimiters like .block(class="w-1/2") in Pug
						const innerMatches =
							content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || []

						return broadMatches.concat(innerMatches)
					},
				},
			],
		},
	},
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'blue-gray': colors.blueGray,
				primary: '#141414',
			},
			boxShadow: {
				hr: 'var(--hr)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
