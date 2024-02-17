'use client'

import { useParams } from "next/navigation"

const Page = () => {
  const params = useParams()

  return (
    <div>
      <p>{params.id}</p>
    </div>
  )
}

export default Page
