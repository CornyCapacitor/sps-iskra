'use client'

import { PageImage } from "@/components/PageImage"
import { useParams } from "next/navigation"
import { useState } from "react"

const Page = () => {
  const params = useParams()
  const [image] = useState<string | null>(null)

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={`${image ? image : "/aktualnosci-placeholder.jpg"}`} />
      <section className="flex flex-wrap gap-5 items-start justify-center p-10 min-h-[500px]">
        <h1 className="text-3xl">{params.id}</h1>
      </section>
    </main>
  )
}

export default Page
