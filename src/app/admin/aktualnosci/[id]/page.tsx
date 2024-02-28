'use client'

import { spsIskraAuthAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import supabase from '@/app/config/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import Swal from 'sweetalert2'

const Page = () => {
  const [user] = useAtom(spsIskraAuthAtom)
  const params = useParams()
  const router = useRouter()

  // News parameters
  const [data, setData] = useState<News>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(false)

  // States for displaying and updating* the news image
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  // Swal colours
  const themeBackground = "#000000"
  const themeColor = "#ffffff"

  // Fetching data from database
  const fetchData = async () => {
    const { data } = await supabase
      .from('aktualnosci')
      .select()
      .eq('id', params.id)

    if (data) {
      setData(data[0])
      setTitle(data[0].title)
      setDescription(data[0].description)
      setImage(data[0].image)
      if (data[0].image) {
        setTempImageUrl(`https://mlgdboblxxbeaippvitv.supabase.co/storage/v1/object/public/aktualnosci/${params.id}`)
      }
    }
  }

  // Running fetchData function on page load
  useEffect(() => {
    fetchData()
  }, [])

  // Handler for all the changes update
  const handleUpdateChanges = async (e: { preventDefault: () => void }) => {
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

    // Checking if inputs are not empty
    if (!title || !description) {
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

    // If new file is attached, question to user if is sure about that, additional idiot-proof check
    if (title && description && file) {
      Swal.fire({
        icon: 'question',
        iconColor: '#2563eb',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Czy na pewno chcesz zaktualizować tę aktualność i zmienić zdjęcie? Nie będziesz w stanie odzyskać z bazy danych starego zdjęcia.",
        showConfirmButton: true,
        confirmButtonText: "Tak",
        showCancelButton: true,
        cancelButtonText: "Wróć",
      }).then((result) => {
        if (result.isConfirmed) {
          updateChanges()
          Swal.fire({
            icon: 'success',
            iconColor: 'green',
            background: `${themeBackground}`,
            color: `${themeColor}`,
            title: "Aktualność zaktualizowana.",
            showConfirmButton: true,
            confirmButtonText: "Ok",
            timer: 5000,
          }).then(() => {
            router.push('/admin')
          })
        }
        return
      })
    }

    // If everything is attached, without changing the image, additional idiot-proof check
    if (title && description && !file) {
      Swal.fire({
        icon: 'question',
        iconColor: '#2563eb',
        background: `${themeBackground}`,
        color: `${themeColor}`,
        title: "Czy na pewno chcesz zaktualizować tę aktualność?",
        showConfirmButton: true,
        confirmButtonText: "Tak",
        showCancelButton: true,
        cancelButtonText: "Wróć",
      }).then((result) => {
        if (result.isConfirmed) {
          updateChanges()
          Swal.fire({
            icon: 'success',
            iconColor: 'green',
            background: `${themeBackground}`,
            color: `${themeColor}`,
            title: "Aktualność zaktualizowana.",
            showConfirmButton: true,
            confirmButtonText: "Ok",
            timer: 5000,
          }).then(() => {
            router.push('/admin')
          })
        }
        return
      })
    }
  }

  // Updating the changes
  const updateChanges = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('aktualnosci')
      .update({
        title: title,
        description: description,
        image: image,
      })
      .eq('id', params.id)
      .select()

    if (data) {
      return data
    }

    if (error) {
      console.error(error)
    }

    if (file) {
      try {
        await deleteImage()
        await updateImage()
      } catch (error) {
        console.error(error)
      }
    }
  }

  // Rejecting all the changes and reloading the news edit page
  const abortChanges = () => {
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

  // Handler for delete news and delete news image
  const handleDeleteNews = () => {
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
        deleteNews()
        deleteImage()
        Swal.fire({
          icon: 'success',
          iconColor: 'green',
          background: `${themeBackground}`,
          color: `${themeColor}`,
          title: "Aktualność usunięta pomyślnie.",
          showConfirmButton: true,
          confirmButtonText: "Ok",
          timer: 5000,
        }).then(() => {
          router.push('/admin')
        })
      }
      return
    })
  }

  // Delete news from the database table
  const deleteNews = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('aktualnosci')
      .delete()
      .eq('id', params.id)

    if (data) {
      return data
    }

    if (error) {
      console.error(error)
    }
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
        setImage(true)
      }
    }
    reader.readAsDataURL(file)
  }

  // Setting the image to be removed locally
  const removeImage = () => {
    Swal.fire({
      icon: 'question',
      iconColor: '#2563eb',
      background: `${themeBackground}`,
      color: `${themeColor}`,
      title: "Czy na pewno chcesz usunąć zdjęcie z tej aktualizacji?",
      showConfirmButton: true,
      confirmButtonText: "Tak",
      showCancelButton: true,
      cancelButtonText: "Nie",
    }).then((result) => {
      if (result.isConfirmed) {
        setTempImageUrl("")
        setImage(false)
      }
    })
  }

  // Delete news image from the storage bucket
  const deleteImage = async () => {
    if (!user) return

    const { data, error } = await supabase
      .storage
      .from('aktualnosci')
      .remove([`${params.id}`])

    if (data) {
      return data
    }

    if (error) {
      console.error(error)
    }
  }

  // Update news image to the storage bucket
  const updateImage = async () => {
    if (!file || !user) {
      return
    }

    const { data, error } = await supabase
      .storage
      .from('aktualnosci')
      .upload(`${params.id}`, file)

    if (data) {
      return data
    }

    if (error) {
      console.error(error)
    }
  }

  <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
    <span className="text-2xl">Prawdopodobnie nie powinno cię tu być.</span>
  </main>

  if (user) {
    return (
      <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
          <Link href="/admin" className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Wróć do panelu administratora</Link>
          <span>Id: {params.id}</span>
          {data && (
            <>
              <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł aktualności" />
              <textarea className="w-[350px] min-h-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 scrollbar_hidden" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis aktualności" />
              <Image src={tempImageUrl || `/sps-iskra-logo.jpg`} alt="Zdjęcie aktualności" width={350} height={350} className="rounded-lg" />
              <p>Wybierz inne zdjęcie klikając poniżej:</p>
              <input type="file" className="w-[350px] flex items-center justify-center text-center" onChange={changeImage} />
              <button className="w-[350px] p-3 rounded-md bg-slate-600 text-white hover:bg-slate-700 focus:outline-none text-center" onClick={() => removeImage()}>Usuń zdjęcie z tej aktualności</button>
              <button className="w-[350px] p-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none text-center" onClick={(e) => handleUpdateChanges(e)}>Zapisz zmiany</button>
              <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => abortChanges()}>Odrzuć zmiany</button>
              <button className="w-[350px] p-3 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none text-center" onClick={() => handleDeleteNews()}>Usuń aktualność</button>
            </>
          )}
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
