import { store } from "../../app/store"
import { usersApiSlice } from "../api-slices/usersApiSlice"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
    const authState = useSelector(state => state.auth);
    console.log('Prefetch:', authState);
    useEffect(() => {
        //const ownedcards = store.dispatch(ownedCardsApiSlice.endpoints.getOwnedCards.initiate())
        //const users = store.dispatch(usersApiSlice.endpoints.GetSpecificUser.initiate("65682adb77f68d82af9894db"));
        const allusers = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

        return () => {
            console.log("unsubscribing");
            //users.unsubscribe();
            allusers.unsubscribe();
            //ownedcards.unsubscribe();
        };

    }, [])

    return <Outlet/>;
}
    
        //const allusers = store.dispatch(usersApiSlice.endpoints.getUsers.initiate(loggedInUsername))

        //return () => {
            //console.log("unsubscribing")
            //ownedcards.unsubscribe()
            //users.unsubscribe()
            //allusers.unsubscribe()
        //}
    //}
export default Prefetch