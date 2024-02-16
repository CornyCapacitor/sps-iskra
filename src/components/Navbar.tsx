import Image from "next/image"
import Link from "next/link"

export const Navbar = () => {
  return (
    <nav className="w-full absolute top-5 left-0 flex items-center justify-center">
      <div className="flex w-[95%] h-32 px-5 items-center justify-center text-white gap-3 bg-black opacity-80 rounded-xl">
        <Image src="/sps-iskra-logo.jpg" alt="Logo SPS Iskra" width={125} height={125} />
        <div className="flex h-full items-center justify-center">
          <Link href="/" className="nav_link">Start</Link>
          <Link href="/aktualnosci" className="nav_link">Aktualności</Link>
          <Link href="/kalendarz" className="nav_link">Kalendarz</Link>
          <Link href="/komunikaty_z_zawodow" className="nav_link">Komunikaty z zawodów</Link>
          <Link href="/szkolenia_proobronne" className="nav_link">Szkolenia proobronne</Link>
          <Link href="/szkolenia_dla_osob_cywilnych" className="nav_link">Szkoelnia dla osób cywilnych</Link>
          <Link href="/szkolenia_dla_sluzb_mundurowych" className="nav_link">Szkolenia dla służb mundurowych</Link>
          <Link href="/sportowy_klub_strzelecki" className="nav_link">Sportowy klub strzelecki Iskra SKS ISKRA</Link>
          <Link href="/o_nas" className="nav_link">O nas</Link>
          <Link href="/kontakt" className="nav_link">Kontakt</Link>
        </div>
      </div>
    </nav>
  )
}