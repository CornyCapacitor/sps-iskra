'use client'

import { HomeCard } from "@/components/HomeCard";
import { Navbar } from "@/components/Navbar";
import { PageImage } from "@/components/PageImage";
import { SectionSeparator } from "@/components/SectionSeparator";
import { useState } from "react";
import { cardsData } from "./cardsData";

type Card = {
  title: string,
  description: string,
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>(cardsData)

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <Navbar />
      <PageImage imageUrl={"/placeholder-image-main.jpg"} />
      <section className="flex flex-wrap gap-5 items-center justify-center p-10 min-h-[500px]">
        {cards.map((card, index) => (
          <HomeCard key={index} title={card.title} description={card.description} />
        ))}
      </section>
      <SectionSeparator />
      <section className="flex items-center justify-center h-[500px]">
        <span>Coś tam</span>
      </section>
      <SectionSeparator />
      <section className="flex items-center justify-center h-[500px]">
        <span>Coś tam</span>
      </section>
      <SectionSeparator />
      <footer className="flex items-center justify-center h-[100px]">Footer</footer>
    </main>
  );
}
