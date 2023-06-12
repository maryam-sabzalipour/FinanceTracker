import supabase from "../../config/SupabaseClient"
import { useAuthContext } from "../../hooks/useAuthContext"
import React, { useEffect, useState } from "react"
import "./TransactionList.scss"

function TransactionList() {
  const { user } = useAuthContext()
  const [newTransaction, setNewTransaction] = useState(null)
  const [payLoadValue, setPayloadValue] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setError(null)
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("transactions")
          .select()
          .eq("uid", user.user.id)
          .order("created_at", { ascending: false })

        if (data) {
          setError(null)
          setLoading(false)
          setNewTransaction(data)
          //handle realtime data
          supabase
            .channel("transactions")
            .on(
              "postgres_changes",
              { event: "INSERT", schema: "public", table: "transactions" },
              (payload) => {
                setNewTransaction((prevTransactions) => [
                  ...prevTransactions,
                  payload.new,
                ])
                setPayloadValue(payload.new.id)
              }
            )
            .subscribe()
        }
        if (error) {
          throw new Error(error.message)
        }
      } catch (error) {
        setLoading(false)
        setError(error.message)
      }
    }
    fetchData()

    return () => {
      supabase.removeAllChannels()
    }
  }, [user.user.id, payLoadValue])

  const handleDelete = async (id) => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id)
        .select()
      if (data) {
        setNewTransaction((prevTransactions) => {
          return prevTransactions.filter((transaction) => transaction.id !== id)
        })
      }
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      setError(error)
    }
  }
  return (
    <>
      {error && <p>{error}</p>}
      {loading && <h3>loading...</h3>}
      {newTransaction &&
        newTransaction.map((transaction) => (
          <ul key={transaction.id} className="border row p-3 shadow-sm rounded">
            <li className="list-group-item col-4  d-flex  justify-content-start align-items-center">
              {transaction.transaction}
            </li>
            <li className="list-group-item col-4 align-items-center">
              ${transaction.amount}
            </li>
            <li className="list-group-item col-4 d-flex justify-content-end align-items-center">
              <i onClick={() => handleDelete(transaction.id)}>&times;</i>
            </li>
          </ul>
        ))}
    </>
  )
}

export default TransactionList
