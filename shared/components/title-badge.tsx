interface Props {
	text: string
}

export const TitleBadge = ({ text }: Props) => {
	return (
		<div className="flex items-center gap-2 bg-foreground w-fit px-4 py-2 rounded-full glass-effect mx-auto text-center lg:mx-0 lg:text-start">
			<div className="px-1 py-1 rounded-full bg-accent w-0.5 h-0.5 animate-pulse" />
			<h2 className="text-secondary">{text}</h2>
		</div>
	)
}
