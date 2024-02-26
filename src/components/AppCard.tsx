import { getProperDate } from "./getProperDate"

import Link from "next/link"

type AppCardProps = News & { type: string }

const AppCard = ({ id, title, image, created_at, type, }: AppCardProps) => {
  const properDate = getProperDate(created_at)

  if (type === "szkolenia") {
    return (
      <Link href="/[id]" as={`/${type}/${id}`} id={id} className="relative w-[375px] h-[200px] rounded-lg p-5 text-black bg-slate-100 shadow-1xl hover:bg-slate-200 transition-[0.2s] hover:cursor-pointer hover:shadow-2xl justify-between flex-col">
        <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${image ? `/${image}` : "/sps-iskra-logo.png"})` }}></div>
        <div className="absolute inset-0 flex flex-col justify-center rounded-lg text-black">
          <h1 className="text-2xl font-bold text-center bg-white opacity-80 py-2">{title}</h1>
          <p className="text-1xl font-bold text-center bg-white opacity-80 py-2">{properDate}</p>
        </div>
      </Link>
    )
  }

  if (type === "aktualnosci") {
    return (
      <Link href="/[id]" as={`/${type}/${id}`} id={id} className="relative w-[375px] h-[200px] rounded-lg p-5 text-black bg-slate-100 shadow-1xl hover:bg-slate-200 transition-[0.2s] hover:cursor-pointer hover:shadow-2xl justify-between flex-col">
        <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${image ? `https://mlgdboblxxbeaippvitv.supabase.co/storage/v1/object/public/aktualnosci/${id}` : "/sps-iskra-logo.png"})` }}></div>
        <div className="absolute inset-0 flex flex-col justify-center rounded-lg text-black">
          <h1 className="text-2xl font-bold text-center bg-white opacity-80 py-2">{title}</h1>
          <p className="text-1xl font-bold text-center bg-white opacity-80 py-2">{properDate}</p>
        </div>
      </Link>
    )
  }
}

export default AppCard
