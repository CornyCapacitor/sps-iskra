import { PageImage } from "@/components/PageImage"

const page = () => {
  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/about-placeholder.jpg"} />
      <section className="flex flex-col gap-5 items-center justify-center p-10 min-h-[500px]">
        <h1 className="text-3xl">Stowarzyszenie Proobronno-Szkoleniowe &#x201E;ISKRA&#x201D;</h1>
        <p>Stowarzyszenie Proobronno-Szkoleniowe „SPS ISKRA” jest dedykowane propagowaniu strzelectwa, strzelectwa sportowego, oraz kolekcjonerstwa broni i amunicji zgodnie z przepisami Ustawy o broni i amunicji z dnia 21 maja 1999 r. Realizujemy swoje cele poprzez szkolenia, edukację dzieci, młodzieży i dorosłych, oraz działania na rzecz obronności państwa i bezpieczeństwa publicznego. Ponadto angażujemy się w ochronę dziedzictwa narodowego, promowanie kultury fizycznej, oraz działania wspomagające rozwój społeczności lokalnych.</p>
        <h2 className="text-2xl">Nasza działalność</h2>
        <p>Organizujemy różnorodne programy szkoleń, ćwiczeń, kursów, zawodów, oraz konferencji i seminariów. Współpracujemy z organami administracji publicznej, jednostkami wojskowymi, oraz innymi podmiotami w celu efektywnego realizowania naszych celów. Nasze szkolenia są prowadzone przez wykwalifikowanych instruktorów, z poszanowaniem obowiązujących przepisów prawa z zakresu bezpieczeństwa i porządku publicznego.</p>
        <h2 className="text-2xl">Członkowstwo</h2>
        <p>Zapraszamy do członkostwa osoby, które podzielają nasze cele i chcą aktywnie uczestniczyć w naszej działalności. Warunkiem ubiegania się o członkostwo jest złożenie deklaracji członkowskiej oraz aktywne uczestnictwo w życiu stowarzyszenia.</p>
        <div>Obrazek przedstawiający delkarację członkowską do pobrania</div>
        <h2 className="text-2xl">Składki</h2>
        <p>Składka członkowska roczna wynosi - 100 zł płatne jednorazowo do 30 marca roku kalendarzowego (w przypadku nowych członków po 30 marca w ciągu trzech miesięcy od dołączenia).</p>
        <div>Przy wpłatach pieniężnych na cele statutowe stowarzyszenia proszę wyraźnie:
          wpisywać imię, nazwisko oraz na co przeznaczona jest wpłata
          Nazwa i adres odbiorcy:
          STOWARZYSZENIE PROOBRONNO - SZKOLENIOWE ISKRA
          ul.Wiejska41/1, 85-458 Bydgoszcz
          Numer Konta mBank Oddz. Bydgoszcz: 32 1140 2004 0000 3702 8448 1044
        </div>
        <h2 className="text-2xl">Jeśli chcesz dodatkowo wesprzeć działalność możesz zwiększyć kwotę przelewu oraz dopisać w tytule „+ekstra”</h2>
        <h2 className="text-2xl">Nasze osiągnięcia</h2>
        <p>STOWARZYSZENIE PROOBRONNO - SZKOLENIOWE ISKRA, BYDGOSZCZ wpisane jest do Rejestru Stowarzyszeń, Innych Organizacji Społecznych i Zawodowych, Fundacji Oraz Samodzielnych Publicznych Zakładów Opieki Zdrowotnej pod numerem KRS: 0001077903  z dnia 09.01.2024 08:15.14  , nr NIP: 9671472469  nr REGON: 527439340</p>
        <h1 className="text-3xl">Dołącz do nas już dziś i wspólnie działajmy na rzecz bezpieczeństwa i rozwoju społeczności lokalnych!</h1>
      </section>
    </main>
  )
}

export default page
