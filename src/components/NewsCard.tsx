import { getProperDate } from "./getProperDate"

import Image from "next/image"
import Link from "next/link"

const NewsCard = ({ id, title, image, created_at }: News) => {
  const properDate = getProperDate(created_at)
  console.log(properDate)

  return (
    <Link href="/[id]" as={`/aktualnosci/${id}`} id={id} className="w-[375px] h-[200px] rounded-lg p-5 text-black bg-slate-50 shadow-xl hover:bg-slate-200 transition-[0.2s] hover:cursor-pointer justify-between flex-col">
      <h1 className="text-2xl">{title}</h1>
      <p className="text-1xl">{getProperDate(created_at)}</p>
      <div className="flex items-center justify-center">
        <Image src={`${image ? `/${image}` : "/sps-iskra-logo.png"}`} alt="Zdjęcie aktualności" width={80} height={80} className="rounded-xl" />
      </div>
    </Link>
  )
}

export default NewsCard
