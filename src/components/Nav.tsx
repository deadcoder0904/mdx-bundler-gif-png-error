import React from 'react'
import Link from 'next/link'

import Logo from '@/assets/logo.svg'

interface INavItem {
	title: string
	link: string
}

const NavItem = ({ title, link }: INavItem) => (
	<Link href={link}>
		<a className="text-lg font-bold dark:hover:text-white dark:text-white/50">{title}</a>
	</Link>
)

const navData: INavItem[] = [
	{ title: 'Essays', link: '/essays' },
	{ title: 'About', link: '/about' },
]

export const Nav = () => {
	return (
		<header>
			<nav className="flex items-center justify-center h-16 font-semibold text-sm after:absolute after:inset-x-0 after:w-full after:h-12 after:shadow-hr after:z-[-1] mt-12">
				<section className="h-full">
					<Link href="/">
						<a className="flex items-center justify-center h-full pl-4">
							<Logo className="w-4 h-4 fill-current dark:text-white -rotate-6" />
							<span className="text-lg sr-only">Home</span>
						</a>
					</Link>
				</section>
				<section className="h-full">
					<ul className="flex items-center justify-center h-full">
						{navData.map(({ title, link }, i) => (
							<li key={i} className="mx-4">
								<NavItem title={title} link={link} />
							</li>
						))}
					</ul>
				</section>
			</nav>
		</header>
	)
}
