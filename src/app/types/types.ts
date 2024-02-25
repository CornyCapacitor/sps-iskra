type CommonProps = {
  id: string,
  title: string,
  image: string | null,
  created_at: string,
  description: string,
  who: string,
}

type News = CommonProps

type Competition = CommonProps

type Training = CommonProps & { aspect: string }

type Card = {
  title: string,
  description: string,
  path: string,
}