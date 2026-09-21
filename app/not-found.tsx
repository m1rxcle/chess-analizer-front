'use client'

import { SearchHeroImage } from "@/shared/components/search-page/search-hero-image";
import { TitleBadge } from "@/shared/components/title-badge";
import { Button } from "@/shared/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col lg:justify-center lg:flex-row lg:items-start gap-10 lg:gap-0 overflow-x-hidden">
			<div  className="mx-5 space-y-10 md:mx-10 md:mt-10 lg:w-1/2 overflow-hidden">
				<TitleBadge  text="Странницы не существует" />
				<div className="space-y-4">
					<h1 className="text-4xl text-accent lg:text-9xl font-bold text-center lg:text-left ">
						404
					</h1>
					<p className="text-secondary text-lg text-center lg:text-left lg:text-2xl w-1/2">
						Вы скорее всего пытаетесь найти страницу которая не существует.
					</p>
                    <Button
							variant="link"
							onClick={() => router.back()}
							className="hover:no-underline bg-transparent py-6 px-6 w-1/2 border border-accent text-accent hover:bg-accent/30 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
						>
							<ChevronLeft className="size-4" />
							<span className="text-lg">Назад</span>
						</Button>
				</div>
			</div>
			<div  className="w-full lg:w-2/3 flex justify-center items-center pb-20 md:pb-0 ">
				<SearchHeroImage />
			</div>
		</div>
    )
}