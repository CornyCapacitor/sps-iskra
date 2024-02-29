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

  // News parameters
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [aspect, setAspect] = useState("")

  // States for displaying and updating* the news image
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  // Swal colours
  const themeBackground = "#000000"
  const themeColor = "#ffffff"

  // Handler for create news and upload training image
  const handleCreateTraining = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    // Checking if user's logged on
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

    // Checking if inputs and select are not empty
    if (!title || !description || !aspect) {
      Swal.fire({
        icon: 'error',
        iconColor: '#e71f1f',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Nie wypełniłeś właściwych pól poprawnie.",
        timer: 5000,
      })
      return
    }

    // Checking if user wants to create training without image attached
    if (title && description && aspect && !file) {
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

    // If everything is attached, additional idiot-proof check
    if (title && description && aspect && file) {
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

  // Creating training based on user changes
  const createTraining = () => {
    if (!user) return

    const shortid = require('shortid')
    const uniqueId = shortid.generate()

    const updateValue = { id: uniqueId, title: title, description: description, who: user.user_metadata?.username, image: file ? true : false, aspect: aspect }

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

    const updateImage = async () => {
      if (!file || !user) return

      const { data, error } = await supabase
        .storage
        .from('szkolenia')
        .upload(`${uniqueId}`, file)

      if (data) {
        return data
      }

      if (error) {
        console.error(error)
      }
    }

    updateData()
    updateImage()
  }

  // Coś ta funkcja powyżej z dziwną nazwą uploaduje, nie wiem dlaczego jeszcze

  // Rejecting all the changes
  const abortTraining = () => {
    Swal.fire({
      icon: 'question',
      iconColor: '#2563eb',
      background: `${themeBackground}`,
      color: `${themeColor}`,
      title: "Czy na pewno chcesz odrzucić wprowadzone zmiany? Jeśli tak, wprowadzone dane zostanę utracone.",
      showConfirmButton: true,
      confirmButtonText: "Tak",
      showCancelButton: true,
      cancelButtonText: "Nie",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/admin')
      }
    })
  }

  // Setting file state as selected file from user's device
  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFile(file)

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target) {
        setTempImageUrl(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  if (user) {
    return (
      <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
          <span>Stwórz nowe szkolenie:</span>
          <Link href="/admin" className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Wróć do panelu administratora</Link>
          <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł szkolenie" />
          <textarea className="w-[350px] min-h-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 scrollbar_hidden" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis szkolenia" />
          <select className="custom_select" value={aspect} onChange={(e) => setAspect(e.target.value)}>
            <option value="" disabled className="text-gray">Wybierz rodzaj szkolenia</option>
            <option value="cywilne" className="text-black">Szkolenie dla osób cywilnych</option>
            <option value="mundurowe" className="text-black">Szkolenie dla służb mundurowych</option>
            <option value="proobronne" className="text-black">Szkolenie proobronne</option>
          </select>
          <Image src={tempImageUrl || `/sps-iskra-logo.jpg`} alt="Zdjęcie szkolenia" width={350} height={350} className="rounded-lg" />
          <p>Wybierz zdjęcie klikając poniżej:</p>
          <input type="file" className="w-[350px] flex items-center justify-center text-center" onChange={changeImage} />
          <button className="w-[350px] p-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none text-center" onClick={(e) => handleCreateTraining(e)}>Stwórz szkolenie</button>
          <button className="w-[350px] p-3 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none text-center" onClick={() => abortTraining()}>Odrzuć tworzone szkolenie</button>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
      <span className="text-2xl">Prawdopodobnie nie powinno cię tu być.</span>
    </main>
  )
}

export default Page
