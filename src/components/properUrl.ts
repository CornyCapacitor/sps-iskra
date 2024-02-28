export const properUrl = (type: string, id: string | string[]) => {
  const randomParam = "?_" + new Date().getTime()

  if (type === "aktualnosci") {
    const newsImageUrl = `https://mlgdboblxxbeaippvitv.supabase.co/storage/v1/object/public/aktualnosci/${id}`
    return newsImageUrl + randomParam
  } else if (type === "szkolenia") {
    const trainingsImageUrl = ""
    return trainingsImageUrl + randomParam
  } else if (type === "zawody") {
    const competitionsImageUrl = ""
    return competitionsImageUrl + randomParam
  }

  return ""
}