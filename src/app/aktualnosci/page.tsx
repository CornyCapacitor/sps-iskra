'use client'

import NewsCard from "@/components/NewsCard"
import { PageImage } from "@/components/PageImage"

const page = () => {
  const news: News[] = [
    {
      id: "FC4IB",
      title: "Założyliśmy stowarzyszenie!",
      image: null,
      date: "Jakaś tam data",
      description: "Oficjalne założenie SPS Iskra!",
    },
    {
      id: "5EMA9",
      title: "Odpaliliśmy stronę internetową!",
      image: null,
      date: "Jakaś tam data",
      description: "Oficjalne odebranie projektu strony internetowej SPS Iskra",
    },
  ]

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/aktualnosci-placeholder.jpg"} />
      <section className="flex flex-col gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 className="text-3xl">Aktualności</h1>
        <div className="flex items-center justify-center p-5 gap-5">
          {news.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default page
