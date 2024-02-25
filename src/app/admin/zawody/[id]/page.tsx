'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import supabase from '@/app/config/supabaseClient'
import { spsIskraAuthAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import Swal from 'sweetalert2'

const Page = () => {
  const [user] = useAtom(spsIskraAuthAtom)
  const params = useParams()
  const router = useRouter()

  const [data, setData] = useState<Competition>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [newFile, setNewFile] = useState<File | null>(null)

  const themeBackground = "#000000"
  const themeColor = "#ffffff"

  const fetchData = async () => {
    const { data } = await supabase
      .from('zawody')
      .select()
      .eq('id', params.id)

    if (data) {
      setData(data[0])
      setTitle(data[0].title)
      setDescription(data[0].description)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setNewFile(file)

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target) {
        setTempImageUrl(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteCompetition = () => {
    Swal.fire({
      icon: 'question',
      iconColor: '#2563eb',
      background: `${themeBackground}`,
      color: `${themeColor}`,
      title: "Czy na pewno chcesz usunąć tę aktualność?",
      showConfirmButton: true,
      confirmButtonText: "Tak",
      showCancelButton: true,
      cancelButtonText: "Wróć",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCompetition()
        router.push('/admin')
      }
      return
    })
  }

  const deleteCompetition = async () => {
    if (!user) {
      return
    }

    const { data, error } = await supabase
      .from('zawody')
      .delete()
      .eq('id', params.id)

    if (data) {
      return data
    }

    if (error) {
      console.error(error)
    }
  }

  const handleUpdateChanges = () => {
    Swal.fire({
      icon: 'question',
      iconColor: '#2563eb',
      background: `${themeBackground}`,
      color: `${themeColor}`,
      title: "Czy na pewno chcesz zaktualizować ten komunikat?",
      showConfirmButton: true,
      confirmButtonText: "Tak",
      showCancelButton: true,
      cancelButtonText: "Wróć",
    }).then((result) => {
      if (result.isConfirmed) {
        updateChanges()
        router.push('/admin')
      }
      return
    })
  }

  const updateChanges = async () => {
    if (!user) {
      return
    }

    const { data, error } = await supabase
      .from('zawody')
      .update({
        title: title,
        description: description,
      })
      .eq('id', params.id)
      .select()

    if (data) {
      return data
    }

    if (error) {
      console.error(error)
    }
  }

  const abortChanges = () => {
    window.location.reload()
  }

  return (
    <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
        <Link href="/admin" className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Wróć do panelu administratora</Link>
        <span>Id: {params.id}</span>
        {data && (
          <>
            <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł komunikatu" />
            <textarea className="w-[350px] min-h-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 scrollbar_hidden" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis komunikatu" />
            <Image src={tempImageUrl || `/sps-iskra-logo.jpg`} alt="Zdjęcie komunikatu" width={350} height={350} className="rounded-lg" />
            <p>Wybierz inne zdjęcie klikając poniżej:</p>
            <input type="file" className="w-[350px] flex items-center justify-center text-center" onChange={changeImage} />
            <button className="w-[350px] p-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none text-center" onClick={() => handleUpdateChanges()}>Zapisz zmiany</button>
            <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => abortChanges()}>Odrzuć zmiany</button>
            <button className="w-[350px] p-3 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none text-center" onClick={() => handleDeleteCompetition()}>Usuń komunikat</button>
          </>
        )}
      </div>
    </main>
  )
}

export default Page
