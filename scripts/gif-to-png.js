const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const fg = require('fast-glob')

const ROOT_PATH = process.cwd()
const POSTS_PATH = path.join(ROOT_PATH, 'public')

function* walkSync(dir) {
	const files = fs.readdirSync(dir, { withFileTypes: true })
	for (let i = 0; i < files.length; i++) {
		if (files[i].isDirectory()) {
			yield* walkSync(path.join(dir, files[i].name))
		} else {
			yield path.join(dir, files[i].name)
		}
	}
}

const gifToPng = async () => {
	try {
		for (let [i, file] of [...walkSync(POSTS_PATH)].entries()) {
			const extname = path.extname(file)
			if (extname === '.gif') {
				console.log(file)
				const dirname = path.dirname(file)
				const png = path.resolve(dirname, path.basename(file).replace('.gif', '.png'))
				await sharp(file).png().toFile(png)
			}
		}
	} catch (e) {
		console.error('Error thrown:', e)
	}
}

gifToPng()
