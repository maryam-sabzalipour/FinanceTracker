import "./App.css"
import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

//components & pages
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/navbar/Navbar"
import NotFound from "./pages/NotFound"

function App() {
  const { authIsReady, user } = useAuthContext()
  // console.log(user)
  // const [token, setToken] = useState("")
  // const getUserSession = (data) => {
  //   setToken(data)
  //   if (token) {
  //     sessionStorage.setItem("token", JSON.stringify(token))
  //   }
  // }
  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     JSON.parse(sessionStorage.getItem("token"))
  //   }
  // }, [])
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard"/> : <Navigate to="/signin" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/signin" />}
            />

            <Route
              path="/signup"
              element={user ? <Navigate to="/dashboard" /> : <SignUp />}
            />

            <Route
              path="/signin"
              element={user ? <Navigate to="/dashboard" /> : <SignIn />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </div>
  )
}

export default App
