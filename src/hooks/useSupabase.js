import { useState } from "react"
import supabase from "../config/SupabaseClient"

export const useSupabase = () => {
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(null)
  const [success, setSuccess] = useState(false)

  const AdduserData = async (transaction, amount, uid, tableName) => {
    setLoading(true)
    setHasError(null)
    setSuccess(false)

    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert([{ transaction, amount, uid }])
        .select()

      if (data) {
        setHasError(null)
        setLoading(false)
        setSuccess(true)

        if (error) {
          throw new Error(error.message)
        }
      }
    } catch (error) {
      setSuccess(false)
      setHasError(error)
    }
  }
  return { loading, hasError, success, AdduserData }
}
