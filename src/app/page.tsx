'use client'

import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
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
    <main className="flex-col w-full items-center justify-center text-center">
      <Navbar />
      <Image src="/placeholder-image-main.jpg" alt="Żołnierz w dziczy" width={viewportWidth} height={500} />
      <h1 className="text-2xl">SPS Iskra</h1>
    </main>
  );
}
