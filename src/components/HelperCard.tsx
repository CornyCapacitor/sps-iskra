import Link from 'next/link'

type HelperCardProps = Omit<Helper, 'created_at' | 'who'>

const HelperCard = ({ id, name, path }: HelperCardProps) => {
  return (
    <Link href={`/${path}`} target="_blank" id={id}>
      <img src="/ast-motors.png" alt={`Logo ${name}`} className="cursor-pointer" />
    </Link>
  )
}

export default HelperCard
