'use client'

import { HomeCard } from "@/components/HomeCard";
import { PageImage } from "@/components/PageImage";
import { SectionSeparator } from "@/components/SectionSeparator";
import { useEffect, useState } from "react";
import { cardsData } from "./cardsData";

import HelperCard from "@/components/HelperCard";
import supabase from "./config/supabaseClient";

export default function Home() {
  const [cards, setCards] = useState<Card[]>(cardsData)
  const [helpers, setHelpers] = useState<Helper[]>([])

  const fetchHelpers = async () => {
    const { data } = await supabase
      .from('wspierajacy')
      .select()

    if (data) {
      setHelpers(data)
    }
  }

  useEffect(() => {
    fetchHelpers()
  }, [])

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/home.jpg"} />
      <section className="flex flex-wrap gap-5 items-center justify-center p-10 min-h-[500px]">
        {cards.map((card, index) => (
          <HomeCard key={index} title={card.title} description={card.description} image={card.image} path={card.path} />
        ))}
      </section>
      <SectionSeparator />
      <section className="flex flex-col items-center p-10 justify-start min-h-[500px]">
        <h1 className="text-3xl">Współpraca</h1>
        <div className="flex flex-wrap items-center justify-center">
          {helpers.map((helper) => (
            <HelperCard key={helper.id} id={helper.name} name={helper.name} path={helper.path} />
          ))}
        </div>
      </section>
    </main>
  );
}
