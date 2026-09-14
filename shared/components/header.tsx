"use client"

import { ChessQueen, ChevronLeft, Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { NAV_ITEMS } from "../constants"
import { cn } from "../lib/utils"
import { Button } from "../ui/button"

interface Props {
	isHomePage?: boolean
}

export const Header = ({ isHomePage = false }: Props) => {
	const [activeItemId, setActiveItemId] = useState(0)

	const [isOpenBurger, setIsOpenBurger] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const headerOffset = 350

			let currentSection = 0

			NAV_ITEMS.forEach((item, index) => {
				const section = document.getElementById(item.link)

				if (!section) return

				const rect = section.getBoundingClientRect()

				if (rect.top <= headerOffset) {
					currentSection = index
				}
			})

			setActiveItemId(currentSection)
		}

		handleScroll()

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	useEffect(() => {
		if (isOpenBurger) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "unset"
		}
	}, [isOpenBurger])

	return (
		<header className="sticky top-0 z-50">
			{/* DESKTOP */}
			<nav className="hidden lg:block relative px-10 py-5 border-b border-[#11151A]  background ">
				<div className="relative flex items-center justify-between">
					<Link href="/" className="flex items-center gap-2">
						<ChessQueen color="green" size={30} />
						<h1 className="text-xl font-bold text-primary">
							Chess<span className="text-accent">Analyzer</span>
						</h1>
					</Link>
					{isHomePage ? (
						<ul className="flex items-center gap-4">
							{NAV_ITEMS.map((item, index) => (
								<li onClick={() => setActiveItemId(index)} key={index} className="relative pb-2 text-xl">
									<a className={cn("text-primary  transition-colors duration-300", activeItemId === index && "text-accent ")} href={`#${item.link}`}>
										{item.title}
									</a>

									<div
										className={cn(
											"absolute -bottom-5 left-0 right-0 h-px bg-accent rounded-full mask-r-from-10 mask-l-from-10",
											"transition-opacity duration-300",
											activeItemId === index ? "opacity-100" : "opacity-0",
										)}
									/>
								</li>
							))}
						</ul>
					) : (
						<Link href="/">
							<Button className="bg-transparent py-4 border border-accent text-accent hover:bg-accent/30 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer text-base md:text-lg lg:text-xl">
								<ChevronLeft className="size-6" />
								<span>На главную</span>
							</Button>
						</Link>
					)}
				</div>
			</nav>

			{/* MOBILE */}

			<nav className="lg:hidden relative  border-b border-[#11151A] background">
				<div className="flex sticky top-0 z-50 h-20 items-center justify-between px-5">
					<Link href="/" className="flex items-center gap-2">
						<ChessQueen className="text-accent" size={30} />

						<h1 className="text-xl font-bold text-primary">
							Chess<span className="text-accent">Analyzer</span>
						</h1>
					</Link>

					{isHomePage ? (
						<button
							type="button"
							onClick={() => setIsOpenBurger(!isOpenBurger)}
							className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-[#11151A] cursor-pointer"
						>
							{isOpenBurger ? <X size={28} /> : <Menu size={28} />}
						</button>
					) : (
						<Link href="/">
							<Button className="bg-transparent py-4 border border-accent text-accent hover:bg-accent/30 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer text-sm">
								<ChevronLeft className="size-4" />
								<span>На главную</span>
							</Button>
						</Link>
					)}
				</div>

				<div
					className={cn(
						"absolute left-0 top-full w-full border-b border-[#11151A] px-5  shadow-xl background transition-all duration-150 ease-in-out",
						isOpenBurger ? "h-screen opacity-100 py-8 pointer-events-auto" : "py-0 h-0 opacity-0 pointer-events-none",
					)}
				>
					{isHomePage ? (
						<ul className="flex flex-col gap-2">
							{NAV_ITEMS.map((item, index) => (
								<li key={index}>
									<a
										href={`#${item.link}`}
										onClick={() => {
											setActiveItemId(index)
											setIsOpenBurger(false)
										}}
										className={cn(
											"block rounded-xl px-4 py-3 text-lg font-medium transition-all duration-200",
											activeItemId === index ? "bg-accent/10 text-accent" : "text-primary hover:bg-[#11151A]",
										)}
									>
										{item.title}
									</a>
								</li>
							))}
						</ul>
					) : (
						<Link href="/">
							<Button className="bg-transparent py-4 border border-accent text-accent hover:bg-accent/30 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer text-sm">
								<ChevronLeft className="size-4" />
								<span>На главную</span>
							</Button>
						</Link>
					)}
				</div>
			</nav>
		</header>
	)
}
