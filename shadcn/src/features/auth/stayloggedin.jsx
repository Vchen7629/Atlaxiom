import { Link, Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

const StayLoggedIn = () => {

    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [TrueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {/*React 18 strict mode*/

            const verifyRefreshToken = async() => {
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (err) {
                    console.log(err)
                }
            }
        
            if (!token) verifyRefreshToken()
        }
        
        return () => effectRan.current = true

    }, [])

    let content 
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = (
            <p className="errmsg">
                {error.data?.message}
                <Link to="/login">Please Login agains</Link>
            </p>
        )
    } else if (isSuccess && TrueSuccess) {
        content=<Outlet/>
    } else if (token && isUninitialized) {
        console.log("Token exists but not initialized", isUninitialized)
        content=<Outlet/>
    }

    return content

}

export default StayLoggedIn
