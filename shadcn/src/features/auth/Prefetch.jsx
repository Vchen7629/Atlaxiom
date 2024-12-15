import { store } from "../../app/store"
import { usersApiSlice } from "../api-slices/usersApiSlice"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
    const userId = useSelector((state) => state.auth.userId);
    
    /*useEffect(() => {
        //const ownedcards = store.dispatch(ownedCardsApiSlice.endpoints.getOwnedCards.initiate())
        //const users = store.dispatch(usersApiSlice.endpoints.GetSpecificUser.initiate("65682adb77f68d82af9894db"));
        const specificUser = store.dispatch(usersApiSlice.endpoints.GetSpecificUser.initiate(userId));

        return () => {
            //users.unsubscribe();
            specificUser.unsubscribe();
            //ownedcards.unsubscribe();
        };

    }, [userId])*/

    useEffect(() => {
        console.log('Prefetch Component - Attempting to fetch user:', userId);

        // Directly call the API endpoint
        const fetchUser = async () => {
            try {
                const result = await store.dispatch(
                    usersApiSlice.endpoints.GetSpecificUser.initiate(userId)
                ).unwrap();
                
                console.log('Prefetch successful:', result);
            } catch (error) {
                console.error('Prefetch failed:', error);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    return <Outlet/>;
}

export default Prefetch