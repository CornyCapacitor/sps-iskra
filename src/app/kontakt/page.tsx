import { PageImage } from "@/components/PageImage"

const page = () => {
  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/contact.jpg"} />
      <section className="flex flex-col gap-5 max-w-[800px] mx-auto p-10 min-h-[500px] text-justify">
        <h1 className="text-3xl text-center">Dane kontaktowe SPS ISKRA</h1>
        <p className="font-semibold">Facebook: <a className="text-blue-600" href="https://www.facebook.com/profile.php?id=61551801553096" target="_blank">https://www.facebook.com/profile.php?id=61551801553096</a></p>
        <p className="font-semibold">email: <a className="font-normal underline" href="mailto:sps.iskra@bydgoszcz.hub.pl">sps.iskra@bydgoszcz.hub.pl</a> lub <a className="font-normal underline" href="mailto:biuro@spsiskra.pl">biuro@spsiskra.pl</a></p>
        <p className="font-semibold">tel: <span className="font-normal">+48 781-697-800</span></p>
        <h2 className="text-2xl text-center">Adres korespondencyjny</h2>
        <p>ul. Wiejska 41/1</p>
        <p>85-458 Bydgoszcz</p>
      </section>
    </main>
  )
}

export default page
