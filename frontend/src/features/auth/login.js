import Footer from "../../components/footer/Footer"
import Header from "../../components/header/header"
import "./styling/Login.css"
import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"



const LoginPage = () => {
    return (
    <>
        <Header/>
            <div className="login-page-body-container">
                Login
            </div>
        <Footer/>
    </>
    )
}

export default LoginPage