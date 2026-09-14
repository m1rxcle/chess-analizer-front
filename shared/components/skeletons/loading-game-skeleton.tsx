import { Skeleton } from "@/shared/ui/skeleton"

export const LoadingGameSkeleton = () => {
	return (
		<ul className="flex flex-col items-start w-full gap-4">
			{Array.from({ length: 10 }).map((_, index) => (
				<div className="flex  items-center justify-between w-full " key={index}>
					<Skeleton className="hidden lg:flex w-8 h-5" />
					<Skeleton className="w-14 h-5" />
					<Skeleton className="w-14 h-5" />
				</div>
			))}
		</ul>
	)
}
