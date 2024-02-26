'use client'

import { PageImage } from "@/components/PageImage"
import { useEffect, useState } from "react"

import AppCard from "@/components/AppCard"
import supabase from "../config/supabaseClient"

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([])

  const fetchData = async () => {
    const { data } = await supabase
      .from('aktualnosci')
      .select()

    if (data) {
      // Sorting by timestamp
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime();
        return dateA - dateB
      })
      setNews(sortedData)
      console.log(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/news.jpg"} />
      <section className="flex flex-col gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 className="text-3xl">Aktualności</h1>
        <section className="flex flex-wrap gap-5 items-start justify-center p-10">
          {news.map((news) => (
            <AppCard key={news.id} {...news} type="aktualnosci" />
          ))}
        </section>
      </section>
    </main>
  )
}

export default NewsPage
