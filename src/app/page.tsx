'use client'

import { HomeCard } from "@/components/HomeCard";
import { PageImage } from "@/components/PageImage";
import { SectionSeparator } from "@/components/SectionSeparator";
import { useState } from "react";
import { cardsData } from "./cardsData";

export default function Home() {
  const [cards, setCards] = useState<Card[]>(cardsData)

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
          <a href="https://astmotors.pl/" target="_blank">
            <img src="/ast-motors.png" alt="Logo ast motors" className="cursor-pointer" />
          </a>
        </div>
      </section>
    </main>
  );
}
