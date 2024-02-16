'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export const PageImage = ({ imageUrl }: { imageUrl: string }) => {
  const [viewportWidth, setViewPortWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setViewPortWidth(window.innerWidth)
    };

    handleResize();

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="w-full max-h-[800px] overflow-hidden">
      <Image src={imageUrl} alt="Żołnierz w dziczy" width={viewportWidth} height={800} />
    </div>
  )
}