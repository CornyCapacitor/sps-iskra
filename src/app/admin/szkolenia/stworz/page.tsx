'use client'

import { spsIskraAuthAtom } from "@/state/atoms"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useState } from "react"

import supabase from "@/app/config/supabaseClient"
import Image from "next/image"
import Link from "next/link"
import Swal from "sweetalert2"

const Page = () => {
  const [user] = useAtom(spsIskraAuthAtom)
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [aspect, setAspect] = useState("")

  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [file, setNewFile] = useState<File | null>(null)

  const themeBackground = "#000000"
  const themeColor = "#ffffff"

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

  const handleCreateTraining = (e: { preventDefault: () => void }) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        iconColor: '#e71f1f',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Nie zidentyfikowano użytkownika. Zaloguj się ponownie i spróbuj jeszcze raz.",
        timer: 5000,
      })
      return
    }

    if (!title || !description || !aspect) {
      Swal.fire({
        icon: 'error',
        iconColor: '#e71f1f',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Nie wypełniłeś/wybrałeś właściwych pól poprawnie.",
        timer: 5000,
      })
      return
    }

    if (title && description && !file) {
      Swal.fire({
        icon: 'question',
        iconColor: '#2563eb',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Czy na pewno nie chcesz załączać zdjęcia do tego szkolenia?",
        showConfirmButton: true,
        confirmButtonText: "Tak",
        showCancelButton: true,
        cancelButtonText: "Nie",
      }).then((result) => {
        if (result.isConfirmed) {
          createTraining()
        }
        return
      })
    }

    if (title && description && file) {
      Swal.fire({
        icon: 'question',
        iconColor: '#2563eb',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Czy jesteś pewien, że wszystkie pola wypełniłeś poprawnie? Chcesz opublikować tworzone szkolenie?",
        showConfirmButton: true,
        confirmButtonText: "Tak",
        showCancelButton: true,
        cancelButtonText: "Nie",
      }).then((result) => {
        if (result.isConfirmed) {
          createTraining()
        }
        return
      })
    }
  }

  const createTraining = async () => {
    if (!user) {
      return
    }

    const shortid = require('shortid')
    const uniqueId = shortid.generate()

    const updateValue = { id: uniqueId, title: title, description: description, who: user.user_metadata?.username, image: null, aspect: aspect }

    const updateData = async () => {
      const { data } = await supabase
        .from('szkolenia')
        .insert(updateValue)
        .select()

      if (data) {
        Swal.fire({
          icon: 'success',
          iconColor: 'green',
          background: `${themeBackground}`,
          color: `${themeColor}`,
          title: "Opublikowano nowe szkolenie pomyślnie.",
          showConfirmButton: true,
          confirmButtonText: "Ok",
          timer: 5000,
        }).then((result) => {
          if (result.isConfirmed || result.dismiss) {
            router.push('/admin')
          }
        })
      }
    }

    const updateFile = async () => {
      if (!file || !user) {
        return
      }

      const { data, error } = await supabase
        .storage
        .from('szkolenia')
        .upload(`uniqueId`, file)

      if (data) {
        console.log(data)
      }

      if (error) {
        console.log(error)
      }
    }

    updateData()
    updateFile()
  }

  const abortTraining = () => {
    window.location.reload()
  }

  return (
    <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
        <span>Stwórz nowe szkolenie:</span>
        <Link href="/admin" className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Wróć do panelu administratora</Link>
        <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł szkolenia" />
        <textarea className="w-[350px] min-h-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 scrollbar_hidden" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis szkolenia" />
        <select value={aspect} className="custom_select" onChange={(e) => setAspect(e.target.value)}>
          <option value="" className="custom_option" disabled selected>Wybierz rodzaj szkolenia</option>
          <option value="cywilne" className="custom_option">Dla osób cywilnych</option>
          <option value="mundurowe" className="custom_option">Dla służb mundurowych</option>
          <option value="proobronne" className="custom_option">Proobronne</option>
        </select>
        <Image src={tempImageUrl || `/sps-iskra-logo.jpg`} alt="Zdjęcie szkolenia" width={350} height={350} className="rounded-lg" />
        <p>Wybierz zdjęcie klikając poniżej:</p>
        <input type="file" className="w-[350px] flex items-center justify-center text-center" onChange={changeImage} />
        <button className="w-[350px] p-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none text-center" onClick={(e) => handleCreateTraining(e)}>Stwórz szkolenie</button>
        <button className="w-[350px] p-3 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none text-center" onClick={() => abortTraining()}>Odrzuć wprowadzone zmiany</button>
      </div>
    </main>
  )
}

export default Page
