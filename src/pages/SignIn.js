import React, { useState } from "react"
import { useSignin } from "../hooks/useSignin"

//import styles
import "./FormStyles/FormStyles.scss"

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loading, hasError, signinUser } = useSignin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    signinUser(email, password)
  }
  return (
    <div className="container-lg mt-5">
      <div className="row justify-content-center ">
        <div className="col-md-5 col-sm-7">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="my-3 row justify-content-center">
              <div className="col-md-4 ">
                {loading ? (
                  <button className="btn btn-outline-primary w-100" disabled>
                    loading
                  </button>
                ) : (
                  <button className="btn btn-outline-primary w-100">
                    Sign In
                  </button>
                )}
              </div>
            </div>
            {hasError && <p>{hasError}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
