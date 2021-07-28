import React from 'react'
import { PauseIcon, PlayIcon } from '@heroicons/react/outline'

interface IGifPlayer {
	alt: string
	src: string
}

export const GifPlayer = (pic: IGifPlayer): JSX.Element | null => {
	const [gifPath, setGifPath] = React.useState('')
	const [pngPath, setPngPath] = React.useState('')
	const [isPlaying, setIsPlaying] = React.useState(false)

	React.useEffect(() => {
		const postType = window.location.pathname.split('/')[1]
		setGifPath(`/${postType}/${pic.src}`)
		setPngPath(`/${postType}/${pic.src.replace('gif', 'png')}`)
	}, [pic.src])

	const togglePlaying = () => setIsPlaying(!isPlaying)

	return (
		<div onClick={isPlaying ? togglePlaying : undefined} className="relative w-full h-full">
			{!isPlaying ? (
				<button
					onClick={togglePlaying}
					className="absolute w-full h-full -translate-x-1/2 -translate-y-1/2 border-none outline-none cursor-pointer left-1/2 top-1/2 bg-black/30 bg-no-repeat rounded-[50%]"
				>
					<PlayIcon className="w-6 h-6" />
				</button>
			) : (
				<PauseIcon className="w-6 h-6" />
			)}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img className="w-full h-full" src={isPlaying ? gifPath : pngPath} alt={pic.alt} />
		</div>
	)
}
