import { outlet, Link, Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import { selectCurrentToken } from "./authSlice"

const StayLoggedIn = () => {

    const [persist] = usePersist()
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
                console.log("verifying refresh token")
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (err) {
                    console.log(err)
                }
            }
        
            if (!token && persist) verifyRefreshToken()
        }
        
        return () => effectRan.current = true

    }, [])

    let content 
    if (!persist) {
        console.log("no persist")
        content = <Outlet/>
    } else if (isLoading) {
        console.log("loading")
        content = <p>Loading...</p>
    } else if (isError) {
        console.log("error")
        content = (
            <p className="errmsg">
                {error.data?.message}
                <Link to="/login">Please Login again</Link>
            </p>
        )
    } else if (isSuccess && TrueSuccess) {
        console.log("success")
        content=<Outlet/>
    } else if (token && isUninitialized) {
        console.log("Token exists but not initialized", isUninitialized)
        content=<Outlet/>
    }

    return content

}

export default StayLoggedIn
