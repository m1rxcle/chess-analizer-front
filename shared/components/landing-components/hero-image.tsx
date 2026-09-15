import Image from "next/image"

export const HeroImage = ({ id }: { id: string }) => {
	return (
		<div id={id} className="relative  overflow-hidden w-full h-100  md:h-200 md:w-150 lg:h-200 lg:w-400 ">
			<Image src="/hero-8.png" sizes="(max-width: 768px) 100vw, 50vw" alt="hero" fill priority className="object-cover object-top overflow-hidden" />
			<div className="absolute inset-0 bg-linear-to-b from-[#0B1115] via-transparent to-transparent" />
			<div className="absolute inset-0 bg-linear-to-r from-[#0B1115] via-transparent to-transparent" />
			<div className="absolute inset-0 bg-linear-to-t from-[#0B1115] via-transparent to-transparent" />
		</div>
	)
}
