import { createContext, useEffect, useReducer } from "react"
import supabase from "../config/SupabaseClient"

export const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return { ...state, user: action.payload }
    case "SIGNOUT":
      return { ...state, user: null }
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true }

    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  })

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      dispatch({ type: "AUTH_IS_READY", payload: session })
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
