'use client'

import { LoginToast } from "@/components/LoginToast"
import { spsIskraAuthAtom } from "@/state/atoms"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"

import { getProperDate } from "@/components/getProperDate"
import Link from "next/link"
import { useState } from "react"

const AdminPage = () => {
  const [user] = useAtom(spsIskraAuthAtom)

  const [news, setNews] = useState<News[]>([])
  const [showNews, setShowNews] = useState(false)
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [showCompetitions, setShowCompetitions] = useState(false)
  const [civilTrainings, setCivilTrainings] = useState<Training[]>([])
  const [uniformedTrainings, setUniformedTrainings] = useState<Training[]>([])
  const [proDefenseTrainings, setProDefenseTrainings] = useState<Training[]>([])
  const [showTrainings, setShowTrainings] = useState(false)

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

  const fetchNews = async () => {
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
      setShowNews(true)
    }
  }

  const fetchCompetitions = async () => {
    const { data } = await supabase
      .from('zawody')
      .select()

    if (data) {
      // Sorting by timestamp
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime();
        return dateA - dateB
      })
      setCompetitions(sortedData)
      setShowCompetitions(true)
    }
  }

  const fetchTrainings = async () => {
    const { data } = await supabase
      .from('szkolenia')
      .select()

    if (data) {
      const civilTrainingsData = data.filter(training => training.aspect === 'cywilne')
      const uniformedTrainingsData = data.filter(training => training.aspect === 'mundurowe')
      const proDefenseTrainingsData = data.filter(training => training.aspect === 'proobronne')
      setCivilTrainings(civilTrainingsData)
      setUniformedTrainings(uniformedTrainingsData)
      setProDefenseTrainings(proDefenseTrainingsData)
      setShowTrainings(true)
    }
  }

  if (user) {
    return (
      <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
          <button className="w-[150px] p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none text-center self-end" onClick={() => handleLogout()}>Wyloguj</button>
          {showNews ?
            <>
              <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => setShowNews(false)}>Schowaj aktualności</button>
              {news.length === 0 ?
                <span>Nie wyświetlono żadnych aktualności</span>
                :
                <ul className="flex flex-col gap-5">
                  <button className="w-[350px] p-3 rounded-md bg-gray-600 text-white hover:bg-gray-500 focus:outline-none text-center">+ Dodaj nową aktualność</button>
                  {news.map((news) => (
                    <div key={news.id} className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center cursor-pointer">
                      <p>{news.title}</p>
                      <p>{getProperDate(news.created_at)} | {news.who}</p>
                    </div>
                  ))}
                  <div className="w-[350px] border-b border-white"></div>
                </ul>
              }
            </>
            :
            <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => fetchNews()}>Pokaż aktualności</button>
          }
          {showCompetitions ?
            <>
              <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => setShowCompetitions(false)}>Schowaj zawody</button>
              {competitions.length === 0 ?
                <span>Nie wyświetlono żadnych komunikatów z zawodów</span>
                :
                <ul className="flex flex-col gap-5">
                  <button className="w-[350px] p-3 rounded-md bg-gray-600 text-white hover:bg-gray-500 focus:outline-none text-center">+ Dodaj nowy komunikat z zawodów</button>
                  {competitions.map((competition) => (
                    <div key={competition.id} className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center cursor-pointer">
                      <p>{competition.title}</p>
                      <p>{getProperDate(competition.created_at)} | {competition.who}</p>
                    </div>
                  ))}
                  <div className="w-[350px] border-b border-white"></div>
                </ul>
              }
            </>
            :
            <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => fetchCompetitions()}>Pokaż zawody</button>
          }
          {showTrainings ?
            <>
              <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => setShowTrainings(false)}>Schowaj zkolenia</button>
              {civilTrainings.length === 0 && uniformedTrainings.length === 0 && proDefenseTrainings.length === 0 ?
                <span>Nie wyświetlno żadnych szkoleń</span>
                :
                <ul className="flex flex-col gap-5">
                  <button className="w-[350px] p-3 rounded-md bg-gray-600 text-white hover:bg-gray-500 focus:outline-none text-center">+ Dodaj nowe szkolenie</button>
                  <h2 className="font-semibold">Szkolenia cywilne:</h2>
                  {civilTrainings.map((training) => (
                    <div key={training.id} className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center cursor-pointer">
                      <p>{training.title}</p>
                      <p>{getProperDate(training.created_at)} | {training.who}</p>
                    </div>
                  ))}
                  <h2 className="font-semibold">Szkolenia mundurowe:</h2>
                  {uniformedTrainings.map((training) => (
                    <div key={training.id} className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center cursor-pointer">
                      <p>{training.title}</p>
                      <p>{getProperDate(training.created_at)} | {training.who}</p>
                    </div>
                  ))}
                  <h2 className="font-semibold">Szkolenia proobronne:</h2>
                  {proDefenseTrainings.map((training) => (
                    <div key={training.id} className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center cursor-pointer">
                      <p>{training.title}</p>
                      <p>{getProperDate(training.created_at)} | {training.who}</p>
                    </div>
                  ))}
                </ul>
              }
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
