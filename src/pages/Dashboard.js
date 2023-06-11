import React from "react"
import { useAuthContext } from "../hooks/useAuthContext"

//components
import TransactionForm from "../components/TansactionForm/TransactionForm"
import TransactionList from "../components/TransactionList/TransactionList"

function Dashboard() {
  const { user } = useAuthContext()
  
  return (
    <div className="container p-3">
      <div className="row justify-content-center my-5 ">
        <div className=" col-lg-4 col-md-6 ">
          <div className="border p-2 bg-primary rounded text-light">
            <TransactionForm uid={user.user.id} />
          </div>
        </div>
        <div className=" col-lg-6 col-md-5 me-1 transaction-list">
          <TransactionList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
