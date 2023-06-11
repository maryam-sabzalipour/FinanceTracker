import supabase from "../config/SupabaseClient"
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignin = () => {
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(null)
  const { dispatch } = useAuthContext()

  const signinUser = async (email, password) => {
    setLoading(true)
    setHasError(null)

    if (!email || !password) {
      setLoading(false)
      setHasError("please make sure to fill all the fields correctly!")
      setTimeout(() => {
        setHasError(null)
      }, 2000)
    } else {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (data) {
          //update state
          setLoading(false)
          setHasError(null)
          if (data.user !== null) {
            dispatch({ type: "SIGNIN", payload: data })
          }
        }
        if (error) {
          throw new Error(error.message)
        }
      } catch (error) {
        //update state
        setLoading(false)
        setHasError(error.message)
      }
    }
  }

  return { loading, hasError, signinUser }
}
