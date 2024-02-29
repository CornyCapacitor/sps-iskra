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

  // Helper parameters
  const [name, setName] = useState("")
  const [path, setPath] = useState("")

  // States for displaying and updating* the helper image
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  // Swal colours
  const themeBackground = "#000000"
  const themeColor = "#ffffff"

  // Handler for create helper and upload training image
  const handleCreateHelper = async (e: { preventDefault: () => void }) => {
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

    // Checking if there's name provided
    if (!name) {
      Swal.fire({
        icon: 'error',
        iconColor: '#e71f1f',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Musisz nadać wspierającemu jakąś nazwę.",
        timer: 5000,
      })
      return
    }

    // If no path attached
    if (name && !path) {
      Swal.fire({
        icon: 'question',
        iconColor: '#2563eb',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Czy na pewno nie chcesz dodawać linku dla wspierającego?",
        showConfirmButton: true,
        confirmButtonText: "Tak",
        showCancelButton: true,
        cancelButtonText: "Nie",
      }).then((result) => {
        if (result.isConfirmed) {
          if (!file) {
            Swal.fire({
              icon: 'question',
              iconColor: '#2563eb',
              background: `${themeBackground}`,
              color: `${themeColor}`,
              title: "Czy na pewno nie chcesz załączać zdjęcia do wspierającego?",
              showConfirmButton: true,
              confirmButtonText: "Tak",
              showCancelButton: true,
              cancelButtonText: "Nie",
            }).then((result) => {
              if (result.isConfirmed) {
                createHelper()
              }
              return
            })
          } else {
            Swal.fire({
              icon: 'question',
              iconColor: '#2563eb',
              background: `${themeBackground}`,
              color: `${themeColor}`,
              title: "Czy jesteś pewien, że wszystkie pola wypełniłeś poprawnie? Chcesz dodać nowego wspierającego?",
              showConfirmButton: true,
              confirmButtonText: "Tak",
              showCancelButton: true,
              cancelButtonText: "Nie",
            }).then((result) => {
              if (result.isConfirmed) {
                createHelper()
              }
              return
            })
          }
        }
      })
      return
    }

    // Checking if user wants to create helper without image attached
    if (name && path && !file) {
      Swal.fire({
        icon: 'question',
        iconColor: '#2563eb',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Czy na pewno nie chcesz załączać zdjęcia do wspierającego?",
        showConfirmButton: true,
        confirmButtonText: "Tak",
        showCancelButton: true,
        cancelButtonText: "Nie",
      }).then((result) => {
        if (result.isConfirmed) {
          createHelper()
        }
        return
      })
    }

    // If everything is attached, additional idiot-proof check
    if (name && path && file) {
      Swal.fire({
        icon: 'question',
        iconColor: '#2563eb',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Czy jesteś pewien, że wszystkie pola wypełniłeś poprawnie? Chcesz dodać nowego wspierającego?",
        showConfirmButton: true,
        confirmButtonText: "Tak",
        showCancelButton: true,
        cancelButtonText: "Nie",
      }).then((result) => {
        if (result.isConfirmed) {
          createHelper()
        }
        return
      })
    }
  }

  // Creating helper based on user changes
  const createHelper = () => {
    if (!user) return

    const shortid = require('shortid')
    const uniqueId = shortid.generate()

    const updateValue = { id: uniqueId, name: name, path: path, who: user.user_metadata?.username, image: file ? true : false }

    const updateData = async () => {
      const { data } = await supabase
        .from('wspierajacy')
        .insert(updateValue)
        .select()

      if (data) {
        Swal.fire({
          icon: 'success',
          iconColor: 'green',
          background: `${themeBackground}`,
          color: `${themeColor}`,
          title: "Dodano nowego wspierającego.",
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
        .from('wspierajacy')
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
          <span>Stwórz nowego wspierającego:</span>
          <Link href="/admin" className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Wróć do panelu administratora</Link>
          <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nazwa wspierającego" />
          <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={path} onChange={(e) => setPath(e.target.value)} placeholder="Link do wspierającego" />
          <Image src={tempImageUrl || `/sps-iskra-logo.jpg`} alt="Zdjęcie wspierającego" width={350} height={350} className="rounded-lg" />
          <p>Wybierz zdjęcie klikając poniżej:</p>
          <input type="file" className="w-[350px] flex items-center justify-center text-center" onChange={changeImage} />
          <button className="w-[350px] p-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none text-center" onClick={(e) => handleCreateHelper(e)}>Dodaj wspierającego</button>
          <button className="w-[350px] p-3 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none text-center" onClick={() => abortTraining()}>Odrzuć tworzonego wspierającego</button>
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
