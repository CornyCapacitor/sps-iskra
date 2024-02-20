'use client'

import { PageImage } from "@/components/PageImage"
import { useEffect, useState } from "react"

import NewsCard from "@/components/NewsCard"
import supabase from "../config/supabaseClient"

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([])

  const fetchData = async () => {
    const { data } = await supabase
      .from('aktualnosci')
      .select()

    if (data) {
      setNews(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/aktualnosci-placeholder.jpg"} />
      <section className="flex flex-col gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 className="text-3xl">Aktualności</h1>
        <section className="flex flex-wrap gap-5 items-center justify-center p-10 min-h-[500px]">
          {news.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </section>
      </section>
    </main>
  )
}

export default NewsPage
