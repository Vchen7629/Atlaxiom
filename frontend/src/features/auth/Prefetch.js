import { store } from "../../app/store"
import { ownedCardsApiSlice } from "../ownedcards/ownedCardapislice"
import { usersApiSlice } from "../users/usersApiSlice"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
    useEffect(() => {
        console.log("subscribing")
        const ownedcards = store.dispatch(ownedCardsApiSlice.endpoints.getOwnedCards.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log("unsubscribing")
            ownedcards.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet/>
}

export default Prefetch