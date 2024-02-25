'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import supabase from '@/app/config/supabaseClient'
import Link from 'next/link'

const Page = () => {
  const params = useParams()
  const [data, setData] = useState<Training>()

  const fetchData = async () => {
    const { data } = await supabase
      .from('szkolenia')
      .select()
      .eq('id', params.id)

    if (data) {
      setData(data[0])
      console.log(data)
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
          <span>{data.title}</span>
        )}
      </div>
    </main>
  )
}

export default Page
