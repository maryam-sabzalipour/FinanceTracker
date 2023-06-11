import React from "react"
import { Link } from "react-router-dom"
import { useSignout } from "../../hooks/useSignout"
import { useAuthContext } from "../../hooks/useAuthContext"
//custom styles
import "./Navbar.scss"

function Navbar() {
  const { signoutUser } = useSignout()
  const { user } = useAuthContext()

  return (
    <nav className="navbar navbar-expand-md bg-primary mt-0 pt-0 ">
      <div className="container d-flex justify-content-between p-3">
        <div>
          <Link
            to="/"
            className="navbar-brand text-light text-decoration-none pb-0"
          >
            My Money Tracker
          </Link>
        </div>

        <ul className="list-group list-group-horizontal list-unstyled">
          {!user ? (
            <>
              <li className="nav-item me-3">
                <Link className="text-light text-decoration-none" to="/signin">
                  Sign in
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="text-light text-decoration-none" to="/signup">
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <span className="text-light me-4">Hi, {user.user.user_metadata.username}! </span>
              <li className="nav-item">
                <Link
                  className="text-light text-decoration-none"
                  to="/signup"
                  onClick={signoutUser}
                >
                  Sign out
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
