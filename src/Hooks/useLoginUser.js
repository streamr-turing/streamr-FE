import { useEffect, useContext } from "react"

import { useQuery } from "@apollo/client"
import { GET_USER } from "../GraphQL/Queries"

import { UserContext } from "../Providers/UserContext"

const useLoginUser = userId => {
  const { setUser } = useContext(UserContext)

  const { data } = useQuery(GET_USER, {
    variables: { id: userId }
  })

  useEffect(() => {
    if (data) setUser(data.fetchUser)
    console.log("here")
  }, [data])
}

export default useLoginUser