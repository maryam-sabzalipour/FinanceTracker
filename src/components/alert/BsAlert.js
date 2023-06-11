// const { useState, useEffect, useRef } = React
// const { Toast } = bootstrap
import React, { useEffect, useRef } from "react"
import { Toast } from "bootstrap"
import { useSignup } from "../../hooks/useSignup"

function BsAlert() {
  // const { showAlert, setShowAlert } = useSignup()
  // var [toast, setToast] = useState(false)
  const { toast } = useSignup()
  const toastRef = useRef()

  useEffect(() => {
    var myToast = toastRef.current
    var bsToast = Toast.getInstance(myToast)

    if (!bsToast) {
      // initialize Toast
      bsToast = new Toast(myToast, { autohide: false })
      // hide after init
      bsToast.hide()
      // setToast(false)
    } else {
      // toggle
      toast ? bsToast.show() : bsToast.hide()
    }
  })

  return (
    <div className="py-2">
      {/* <button
        className="btn btn-success"
        onClick={() => setToast((toast) => !toast)}
      >
        Toast {toast ? "hide" : "show"}
      </button> */}
      <div className="toast position-absolute m-4" role="alert" ref={toastRef}>
        <div className="toast-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
  )
}
export default BsAlert
