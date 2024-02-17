'use client'

import { PageImage } from "@/components/PageImage"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

const Page = () => {
  const params = useParams()
  const [image] = useState<string | null>(null)

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={`${image ? image : "/aktualnosci-placeholder.jpg"}`} />
      <section className="flex flex-col flex-wrap gap-5 items-center justify-start p-10 min-h-[500px]">
        <Link className="w-full lg:w-[350px] p-3 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none text-center" href={"/aktualnosci"}>Wróć do aktualności</Link>
        <h1 className="text-3xl">{params.id}</h1>
      </section>
    </main>
  )
}

export default Page
