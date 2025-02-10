import { RequestPasswordResetForm } from "@/components/forms/requestpasswordresetform.tsx"
import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { Toaster } from "sonner"


const RequestPasswordResetPage = () => {
    const content = (
        <main className="min-h-[100vh] flex flex-col justify-between">
            <Toaster richColors  expand visibleToasts={4} position="bottom-center"/>
            <Header/>
            <div className="flex relative h-[95vh] w-full bg-[hsl(var(--background1))] overflow-hidden ">
                <div className="flex flex-col w-full mt-[20vh] px-[2%] space-y-[2vh] items-center">              
                    <span className="text-3xl font-bold text-[hsl(var(--background3))]">Forgot Password</span>
                    <span className="text-md text-gray-400 w-[25%] text-center">No worries! Enter your email below, and we'll send you a link to reset your password.</span>
                    <div className="w-[20vw]">
                        <RequestPasswordResetForm />
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )

    return content
}

export default RequestPasswordResetPage