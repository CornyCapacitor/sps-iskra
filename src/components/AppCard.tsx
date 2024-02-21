import { getProperDate } from "./getProperDate"

import Image from "next/image"
import Link from "next/link"

type AppCardProps = News & { type: string, aspect?: string }

const AppCard = ({ id, title, image, created_at, type, aspect }: AppCardProps) => {
  const properDate = getProperDate(created_at)

  if (aspect) {
    return (
      <Link href="/[id]" as={`/${type}/${id}`} id={id} className="w-[375px] h-[200px] rounded-lg p-5 text-black bg-slate-50 shadow-xl hover:bg-slate-200 transition-[0.2s] hover:cursor-pointer justify-between flex-col">
        <h1 className="text-2xl">{title}</h1>
        <div className="flex items-center justify-center">
          <Image src={`${image ? `/${image}` : "/sps-iskra-logo.png"}`} alt={`Zdjęcie przedstawiające ${type}`} width={80} height={80} className="rounded-xl" />
        </div>
      </Link>
    )
  }

  return (
    <Link href="/[id]" as={`/${type}/${id}`} id={id} className="w-[375px] h-[200px] rounded-lg p-5 text-black bg-slate-50 shadow-xl hover:bg-slate-200 transition-[0.2s] hover:cursor-pointer justify-between flex-col">
      <h1 className="text-2xl">{title}</h1>
      <p className="text-1xl">{properDate}</p>
      <div className="flex items-center justify-center">
        <Image src={`${image ? `/${image}` : "/sps-iskra-logo.png"}`} alt={`Zdjęcie przedstawiające ${type}`} width={80} height={80} className="rounded-xl" />
      </div>
    </Link>
  )
}

export default AppCard
