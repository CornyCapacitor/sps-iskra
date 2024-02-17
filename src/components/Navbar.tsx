'use client'

import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

export const Navbar = () => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <nav className="w-full absolute top-5 left-0 flex items-center justify-center">
      <div className="flex w-[95%] h-32 px-5 items-center justify-center text-white gap-3 bg-black opacity-80 rounded-xl text_20px">
        <Image src="/sps-iskra-logo.png" alt="Logo SPS Iskra" width={125} height={125} className="" />
        <div className="flex h-full items-center justify-center">
          <Link href="/" className="nav_link">Start</Link>
          <Link href="/aktualnosci" className="nav_link">Aktualności</Link>
          <Link href="/kalendarz" className="nav_link">Kalendarz</Link>
          <Link href="/komunikaty_z_zawodow" className="nav_link">Zawody</Link>
          <div className={`flex items-center justify-center w-[150px] px-10 h-full text_20px text-center hover:cursor-pointer ${isOpened ? "bg-[#323233]" : "hover:bg-[#323233]"}`} onClick={() => setIsOpened((prev) => !prev)}>
            <span>Szkolenia</span>
            {isOpened &&
              <ul className="flex flex-col items-center justify-center w-[150px] absolute top-[128px] bg-black opacity-80">
                <Link href="/szkolenia_proobronne" className="flex items-center justify-center w-[150px] py-5 px-10 h-full text-center hover:bg-[#323233] hover:transition-[0.2s]">Proobronne</Link>
                <Link href="/szkolenia_cywilne" className="flex items-center justify-center w-[150px] py-5 px-10 h-full text-center hover:bg-[#323233] hover:transition-[0.2s]">Dla osób cywilnych</Link>
                <Link href="/szkolenia_mundurowe" className="flex items-center justify-center w-[150px] py-5 px-10 h-full text-center hover:bg-[#323233] hover:transition-[0.2s]">Dla służb mundurowych</Link>
              </ul>
            }
          </div>
          <Link href="/sportowy_klub_strzelecki" className="nav_link">SKS ISKRA</Link>
          <Link href="/o_nas" className="nav_link">O nas</Link>
          <Link href="/kontakt" className="nav_link">Kontakt</Link>
        </div>
      </div>
    </nav>
  )
}