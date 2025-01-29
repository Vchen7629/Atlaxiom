import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice.ts"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectLoggingOut } from "./authSlice"

const StayLoggedIn = () => {
    const navigate = useNavigate()

    const token = useSelector(selectCurrentToken)
    const loggingOut = useSelector(selectLoggingOut);
    const effectRan = useRef(false)
    const [TrueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isSuccess,
        isError,
    }] = useRefreshMutation()

    useEffect(() => {
        console.log(loggingOut)
        
        if (effectRan.current === true) {
            if (!token && !loggingOut && !effectRan.current) {
                const verifyRefreshToken = async() => {
                    try {
                        await refresh()
                        setTrueSuccess(true)
                    } catch (err) {
                        console.error(err)
                    }
                }

                verifyRefreshToken();
            }
        }
        
        effectRan.current = true

    }, [refresh, token, effectRan, loggingOut])

    if (isError) {
        navigate("/login")
        return null;
    } else if (isSuccess && TrueSuccess) {
        return <Outlet/>
    } else if (token && isUninitialized) {
        return <Outlet/>
    }

    return null

}

export default StayLoggedIn
