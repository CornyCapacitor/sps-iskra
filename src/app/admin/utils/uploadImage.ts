import supabase from "@/app/config/supabaseClient"

export const uploadImage = async (bucketName: string, uniqueId: string, file: File) => {

  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .upload(`${uniqueId}`, file)

  if (data) {
    return data
  }

  if (error) {
    console.error(error)
  }
}