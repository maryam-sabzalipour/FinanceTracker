import { useAuthContext } from "./useAuthContext"
import supabase from "../config/SupabaseClient"

import { useState } from "react"

export const useSignout = () => {
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(null)
  const { dispatch } = useAuthContext()

  const signoutUser = async () => {
    setLoading(true)
    setHasError(null)

    try {
      const { error } = await supabase.auth.signOut()
      dispatch({ type: "SIGNOUT" })

      //update state
      setLoading(false)

      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      setLoading(false)
      setHasError(error)
    }
  }

  return { loading, hasError, signoutUser }
}
