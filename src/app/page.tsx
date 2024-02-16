'use client'

import { Navbar } from "@/components/Navbar";
import { PageImage } from "@/components/PageImage";

export default function Home() {

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <Navbar />
      <PageImage imageUrl={"/placeholder-image-main.jpg"} />
      <h1 className="text-2xl">SPS Iskra</h1>
    </main>
  );
}
