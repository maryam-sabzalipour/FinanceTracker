import React, { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import "./FormStyles/FormStyles.scss"

function SignUp() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loading, hasError, signupUser } = useSignup()
  // const alertRef = useRef()

  //Show Toast
  // if (showToast) {
  //   alertRef.current.classList.add("show")
  // }
  const handleSubmit = async (e) => {
    e.preventDefault()
    signupUser(email, password, userName)
  }

  return (
    <>
      {/* <div className="d-flex justify-content-end mt-1 me-1">
        <div
          className="toast text-white bg-success border-0 "
          data-bs-animation="true"
          data-bs-autohide="true"
          data-bs-delay="5000"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={alertRef}
        >
          <div className="d-flex">
            <div className="toast-body">Registered Successfully.</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => alertRef.current.classList.remove("show")}
            ></button>
          </div>
        </div>
      </div> */}
      <div className="mt-5"></div>
      <div className="container-lg mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5 col-sm-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
              </div>
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
                <div className="col-md-4">
                  {loading ? (
                    <button disabled className="btn btn-outline-primary w-100">
                      loading
                    </button>
                  ) : (
                    <button className="btn btn-outline-primary w-100">
                      Sign up
                    </button>
                  )}
                </div>
              </div>
              {hasError && <p>{hasError}</p>}
            </form>
          </div>
        </div>
        {/* bootstrap alert */}
      </div>
    </>
  )
}

export default SignUp
