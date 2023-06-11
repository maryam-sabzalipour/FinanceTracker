import React, { useEffect, useState } from "react"
import { useSupabase } from "../../hooks/useSupabase"

//import my cutom styles
import "./TransactionForm.scss"

function TransactionForm({ uid }) {
  const [transaction, setTransaction] = useState("")
  const [amount, setAmount] = useState("")
  let total = 0
  const { AdduserData, success, hasError, loading } = useSupabase()

  const handleSubmit = (e) => {
    e.preventDefault()
    AdduserData(transaction, amount, uid, "transactions")
  }
 
  useEffect(() => {
    if (success) {
      setTransaction("")
      setAmount("")
    }
  }, [success])
  return (
    <>
      <h3 className="h4 mt-3">Add a Transaction</h3>
      <div className="row mt-5 p-2">
        <div className="col-12">
          <form onSubmit={handleSubmit} className="transaction-form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Transaction name:
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={transaction}
                onChange={(e) => setTransaction(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount $:
              </label>
              <input
                type="number"
                id="amount"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-light mb-5 mt-2 hover-primary"
            >
              {loading ? "Adding..." : "Add Transaction"}
            </button>
            {hasError && <p className="text-light">{hasError}</p>}
          </form>
        </div>
      </div>
    </>
  )
}

export default TransactionForm
