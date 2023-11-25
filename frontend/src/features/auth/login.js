import DashFooter from "../../components/dash/dashfooter"
import DashHeader from "../../components/dash/dashheader"
import "./styling/login.css"

const Login = () => {
    return (
    <>
        <DashHeader/> 
        <main className="login-body-container">
            <h1>Login</h1>
        </main>
        <DashFooter/>
    </>
    )
}

export default Login