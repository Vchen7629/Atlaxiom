import { useNavigate } from "react-router-dom"
import AccountCreationForm from "./AccountCreationForm"
import { startTransition } from "react"

const SignUpPageComponent = () => {
    const navigate = useNavigate()

    function handleLoginClick() {
        startTransition(() => {
            navigate("/login")
        })
    }

    function handleBackClick() {
        startTransition(() => {
            navigate("/")
        })
    }

    return (
        <main className="flex h-[100vh] w-full items-center justify-center bg-[url('../img/background3.jpg')] ">
            <div className="flex w-[75%] h-[90vh]">
                <section className="flex flex-col w-[40%] bg-footer rounded-tl-2xl rounded-bl-2xl pt-10 px-16 space-y-16">
                    <span className="text-3xl text-white font-black">Atlaxiom</span>
                    <span className="text-2xl w-[80%] text-white font-black">Create an Account to keep track of your card colleciton</span>
                    
                </section>
                <section className="flex flex-col w-[60%] bg-white rounded-br-2xl rounded-tr-2xl py-8 pl-16 space-y-4">
                    <div className="flex w-[95%] justify-between">
                        <span className="text-black text-4xl font-bold">Sign-Up</span>
                        <button className="px-6 py-2 bg-gray-200 rounded-lg" onClick={handleBackClick}>
                            <span className="text-black font-bold">Back</span>
                        </button>
                    </div>
                    <div className="text-black space-x-2">
                        <span>Already have an account?</span> 
                        <button className="text-goldenrod font-bold" onClick={handleLoginClick}>Log in</button>
                    </div>
                    <AccountCreationForm/>
                </section>
            </div>
        </main>
    )
}

export default SignUpPageComponent