import Link from "next/link"

const NewsCard = ({ id, title, image, date, description, }: News) => {
  return (
    <Link href="/[id]" as={`/aktualnosci/${id}`} id={id} className="w-[375px] h-[200px] rounded-lg p-5 text-black bg-slate-50 shadow-xl hover:bg-slate-200 transition-[0.2s] hover:cursor-pointer justify-between flex-col">
      <p>{title}</p>
      <p>{image}</p>
      <p>Data: {date}</p>
      <p>Opis: {description}</p>
    </Link>
  )
}

export default NewsCard
