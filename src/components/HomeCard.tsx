type Card = {
  title: string,
  description: string,
}

export const HomeCard = ({ title, description }: Card) => {
  return (
    <div className="w-[375px] h-[200px] rounded-lg p-5 text-black bg-slate-50 shadow-xl hover:bg-slate-200 transition-[0.2s] hover:cursor-pointer justify-between flex-col">
      <p>{title.toUpperCase()}</p>
      <p>{description}</p>
    </div>
  )
}