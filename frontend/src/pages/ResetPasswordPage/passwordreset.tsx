import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { Toaster } from "sonner"
import { PasswordResetForm } from "@/components/forms/passwordresetform.tsx"
import { useEffect } from "react"
import { useVerifyTokenMutation } from "@/app/lambdas/lambda.ts"
import { useParams } from "react-router-dom"


const PasswordResetPage = () => {
    const [verifyToken, { isSuccess, isLoading}] = useVerifyTokenMutation();
    const { token } = useParams();

    useEffect(() => {
        async function ValidateReset() {
            const resetId = token
            
            if (resetId) {
                await verifyToken({ token: resetId }).unwrap();
            } else {
                console.log("missing resetId")
            }
        }
        
        ValidateReset();
    }, [verifyToken])
    
    const content = (
        <main className="min-h-[100vh] flex flex-col justify-between">
            <Toaster richColors  expand visibleToasts={4} position="bottom-center"/>
            <Header/>
            <div className="flex relative h-[95vh] w-full bg-[hsl(var(--background1))] overflow-hidden ">
                {(isSuccess || isLoading)? (
                    <div className="flex flex-col w-full mt-[20vh] px-[2%] space-y-[2vh] items-center">              
                        <span className="text-3xl font-bold text-[hsl(var(--background3))]">Reset Password</span>
                        <span className="text-md text-gray-400 w-[25%] text-center">No worries! Enter your email below, and we'll send you a link to reset your password.</span>
                        <div className="w-[20vw]">
                                <PasswordResetForm/>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col w-full mt-[20vh] px-[2%] space-y-[2vh] items-center">
                        404 Not found
                    </div>
                )}
            </div>
            <Footer/>
        </main>
    )

    return content
}

export default PasswordResetPage