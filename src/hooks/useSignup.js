import "../config/SupabaseClient"
import { useState } from "react"
import supabase from "../config/SupabaseClient"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(null)
  // const [showToast, setShowToast] = useState(false)

  const { dispatch } = useAuthContext()

  const signupUser = async (email, password, username) => {
    setHasError(null)
    setLoading(true)
    // setShowToast(false)

    if (!email || !username) {
      setLoading(false)
      setHasError("please make sure to fill all the fields correctly!")
      setTimeout(() => {
        setHasError(null)
      }, 2000)
    } else {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        })
        if (data) {
          setLoading(false)
          setHasError(null)
          // setShowToast(true)

          if (data.user !== null) {
            dispatch({ type: "SIGNIN", payload: data })
          }
        }
        if (error) {
          throw new Error(error.message)
        }
      } catch (error) {
        setLoading(false)
        // setShowToast(false)
        setHasError(error.message)
      }
    }
  }

  return {
    loading,
    hasError,
    signupUser,
  }
}
