import { PageImage } from "@/components/PageImage"
import { SectionSeparator } from "@/components/SectionSeparator"

const page = () => {
  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/szkolenia-placeholder.jpg"} />
      <section className="flex flex-wrap gap-5 items-start justify-center p-10 min-h-[500px]">
        <h1 className="text-3xl">Szkolenia dla osób cywilnych</h1>
      </section>
      <SectionSeparator />
      <section className="flex flex-wrap gap-5 items-start justify-center p-10 min-h-[500px]">
        <h1 className="text-3xl">Szkolenia dla służb mundurowych</h1>
      </section>
      <SectionSeparator />
      <section className="flex flex-wrap gap-5 items-start justify-center p-10 min-h-[500px]">
        <h1 className="text-3xl">Szkolenia proobronne</h1>
      </section>
    </main>
  )
}

export default page
