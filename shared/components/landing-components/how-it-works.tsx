import { ChevronRight, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "../../ui/button"

export const HowItWorksSection = () => {
	return (
		<section id="how-it-works" className="min-h-screen mx-5 md:mx-10 scroll-mt-24">
			<div className="flex flex-col md:flex-row gap-10">
				<div className="glass-effect px-8 py-10 rounded-3xl space-y-8">
					<h1 className="text-2xl font-bold">Как это работает?</h1>

					<div className="flex flex-col gap-3">
						<div className="flex items-start gap-5">
							<div className="flex flex-col items-center gap-2">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-bold">1</div>
								<div className="h-20 w-px border border-dashed border-accent" />
							</div>

							<div className="space-y-2">
								<h3 className="text-lg font-semibold">Найдите игрока</h3>

								<p className="text-secondary">Введите никнейм игрока с Chess.com и мы найдем его партии</p>
							</div>
						</div>

						<div className="flex items-start gap-5">
							<div className="flex flex-col items-center gap-2">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-bold">2</div>
								<div className="h-20 w-px border border-dashed border-accent" />
							</div>
							<div className="space-y-2">
								<h3 className="text-lg font-semibold">Выберите партию</h3>

								<p className="text-secondary">Выберите партию, которую хотите проанализировать</p>
							</div>
						</div>

						<div className="flex items-start gap-5">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-bold">3</div>
							<div className="space-y-2">
								<h3 className="text-lg font-semibold">Получите анализ</h3>

								<p className="text-secondary">Получите подробный анализ ходов и ошибок в партии</p>
							</div>
						</div>
					</div>
					<Link href="/search">
						<Button variant="ghost" className="cursor-pointer hover:text-accent border  border-white/30 rounded-full py-5 px-6">
							Начать сейчас
							<ChevronRight />
						</Button>
					</Link>
				</div>

				<div className="glass-effect rounded-3xl px-8 py-10 w-full">
					<h1 className="text-2xl font-bold mb-8">Пример анализа</h1>
					<div className="flex flex-col md:items-start gap-4 lg:flex-row lg:justify-between ">
						<video className="rounded-lg w-full lg:w-1/2" src="/how-it-works.mp4" muted autoPlay loop />
						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-2 border border-white/20 rounded-lg w-full">
								<div className="border-b border-white/20 flex justify-between  p-2 bg-black/40 rounded-md">
									<span className="text-2xl">1. e4</span>
									<div className="bg-accent p-2 w-fit rounded-full">
										<Star size={20} className="text-white fill-white" />
									</div>
								</div>
								<div className=" border-b border-white/10">
									<div className="p-2 flex justify-between ">
										<span className="text-secondary text-xl">Лучший ход</span>
										<span className="text-xl">e4</span>
									</div>
								</div>
								<div className=" border-b border-white/10">
									<div className="flex justify-between p-2">
										<span className="text-secondary text-xl">Оценка</span>
										<span className="text-xl">+0.32</span>
									</div>
								</div>

								<div className="flex justify-between p-2">
									<span className="text-secondary text-xl">Глубина</span>
									<span className="text-xl">18</span>
								</div>
							</div>
							<div className="bg-accent/30 rounded-lg">
								<div className="p-10 space-y-4">
									<div className="flex items-center gap-2">
										<div className="bg-accent p-1 w-fit rounded-full">
											<Star size={20} className="text-white fill-white" />
										</div>
										<h2>Отличный ход!</h2>
									</div>
									<p className="text-secondary">Вы контролируете центр и развиваете фигуры.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
