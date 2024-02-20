'use client'

import { LoginToast } from "@/components/LoginToast"
import { spsIskraAuthAtom } from "@/state/atoms"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"

import Link from "next/link"
import { useState } from "react"

const AdminPage = () => {
  const [user] = useAtom(spsIskraAuthAtom)

  const [news, setNews] = useState<any>([])
  const [competitions, setCompetitions] = useState<any>([])
  const [trainings, setTrainings] = useState<any>([])

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
    LoginToast.fire({
      icon: "success",
      title: "Wylogowano pomyślnie"
    })
  }

  const fetchNews = () => {
    setNews([{ id: "dupa" }, { id: "kupa" }])
  }

  const fetchCompetitions = () => {
    setCompetitions([{ id: "dupa" }, { id: "kupa" }])
  }

  const fetchTrainings = () => {
    setTrainings([{ id: "dupa" }, { id: "kupa" }])
  }

  if (user) {
    return (
      <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
          <button className="w-[150px] p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none text-center self-end" onClick={() => handleLogout()}>Wyloguj</button>
          {news.length ?
            <>
              <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => setNews([])}>Schowaj aktualności</button>
              <span>Aktualności</span>
            </>
            :
            <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => fetchNews()}>Pokaż aktualności</button>
          }
          {competitions.length ?
            <>
              <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => setCompetitions([])}>Schowaj zawody</button>
              <span>Zawody</span>
            </>
            :
            <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => fetchCompetitions()}>Pokaż zawody</button>
          }
          {trainings.length ?
            <>
              <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => setTrainings([])}>Schowaj zkolenia</button>
              <span>Szkolenia</span>
            </>
            :
            <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => fetchTrainings()}>Pokaż szkolenia</button>
          }
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-800 p-6 text-white text-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96 flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl">Aby wprowadzać zmiany, musisz być zalogowany</h1>
        <Link href="/admin/login" className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Zaloguj</Link>
      </div>
    </main>
  )
}

export default AdminPage
