import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import { useRefreshMutation } from "./authApiSlice.ts"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectLoggingOut } from "./authSlice"

const StayLoggedIn = () => {
    const navigate = useNavigate()

    const token = useSelector(selectCurrentToken)
    const loggingOut = useSelector(selectLoggingOut);
    const effectRan = useRef(false)

    const [refresh, {
        isUninitialized,
        isSuccess,
        isError,
    }] = useRefreshMutation()

    useEffect(() => {        
        if (effectRan.current === true || process.env.NODE_ENV !== "development") {
            if (!token && !loggingOut) {
                const verifyRefreshToken = async() => {
                    try {
                        await refresh()
                    } catch (err) {
                        console.error(err)
                    }
                }

                verifyRefreshToken();
            }
        }
        
        effectRan.current = true

        return () => {
            effectRan.current = true;
        };

    }, [refresh, token, loggingOut])

    if (isError) {
        navigate("/login")
        return null;
    } else if (isSuccess) {
        return <Outlet/>
    } else if (token && isUninitialized) {
        return <Outlet/>
    }

    return null

}

export default StayLoggedIn
