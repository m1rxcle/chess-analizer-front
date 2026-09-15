import { cn } from "../lib/utils"

interface Props {
	className?: string
	text: string
}

export const TitleBadge = ({ text, className }: Props) => {
	return (
		<div className={cn("relative w-fit rounded-full overflow-hidden p-px glass-effect  mx-auto lg:mx-0", className)}>
			<div
				style={{ animationDuration: "4s" }}
				className="absolute inset-0 animate-spin  bg-[conic-gradient(from_0deg,transparent_0%,transparent_60%,var(--accent)_75%,transparent_90%)] blur-sm"
			/>

			<div className="relative z-10 flex items-center gap-2 rounded-full bg-foreground px-4 py-2">
				<div className="size-1.5 rounded-full bg-accent animate-pulse" />

				<h2 className="text-secondary">{text}</h2>
			</div>
		</div>
	)
}
