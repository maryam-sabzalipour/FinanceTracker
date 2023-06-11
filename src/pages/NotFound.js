import React from "react"
import notFound from "../assets/img/not-found.svg"
import { Link } from "react-router-dom"
function NotFound() {
  return (
    <div className="container mt-3">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-5 pt-4">
          <h3>OOooops!!</h3>
          <h5 className="my-4">Seems this page does not exist!</h5>
          <Link to="/" className="mb-5 btn btn-primary">
            Back to Home
          </Link>
        </div>
        <div className="col-lg-7">
          <img className="w-100" src={notFound} alt="page not found!" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
