"use client"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	className?: string
}

export const FindPlayerButton: React.FC<Props> = ({ className }) => {
	const router = useRouter()

	const handleClick = () => router.push("/search")

	return (
		<Button
			onClick={handleClick}
			className={cn(`bg-accent rounded-2xl py-8 px-10 cursor-pointer hover:bg-accent/80 transition-colors duration-300 ease-in-out`, className)}
		>
			<Search />
			<span className="text-md md:text-lg lg:text-xl">Найти игрока</span>
		</Button>
	)
}
