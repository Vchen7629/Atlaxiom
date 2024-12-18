import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

const StayLoggedIn = () => {
    const navigate = useNavigate()

    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [TrueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isSuccess,
        isError,
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
        
        effectRan.current = true

    }, [refresh, token])

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
