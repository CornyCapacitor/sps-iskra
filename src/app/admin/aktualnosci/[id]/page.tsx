'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import supabase from '@/app/config/supabaseClient'
import Link from 'next/link'

const Page = () => {
  const params = useParams()
  const [data, setData] = useState<News>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const fetchData = async () => {
    const { data } = await supabase
      .from('aktualnosci')
      .select()
      .eq('id', params.id)

    if (data) {
      setData(data[0])
      setTitle(data[0].title)
      setDescription(data[0].description)
      setImageUrl(data[0].image)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
        <Link href="/admin" className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Wróć do panelu administratora</Link>
        <span>Id: {params.id}</span>
        {data && (
          <>
            <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł aktualności" />
            <textarea className="w-[350px] min-h-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 scrollbar_hidden" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis aktualności" />
            <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Ścieżka URL do zdjęcia" />
          </>
        )}
      </div>
    </main>
  )
}

export default Page
