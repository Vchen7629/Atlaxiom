import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { startTransition } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster } from "sonner"
import { useGoogleLogin } from "@react-oauth/google"
import googleIcon from "../../../img/google.png"
import { useGoogleLoginMutation } from "@/app/auth/GoogleOauthApiSlice.ts"
import { LoginForm } from "@/components/forms/loginform.tsx"

const LoginPage = () => {
    const [googleLoginApi] = useGoogleLoginMutation();
    const navigate = useNavigate()   

    const Login = useGoogleLogin({
        flow: 'implicit',
        scope: 'email profile openid',
        onSuccess: async (tokenResponse) => {
            console.log('Google OAuth Success Response:', tokenResponse);
            try {
                await googleLoginApi(tokenResponse);
                startTransition(() => {
                    navigate("/profile");
                })
            } catch (err) {
                console.error("API Call Failed: ", err)
            }
        },
        onError: (error) => {
          console.log('Login Failed:', error);
        },
      }
    );
    

    const content = (
        <main className="min-h-[100vh] flex flex-col justify-between">
            <Toaster richColors  expand visibleToasts={4} position="bottom-center"/>
            <Header/>
            <div className="flex relative h-[95vh] w-full bg-[hsl(var(--background1))] justify-center overflow-hidden ">
                <div className="flex flex-col w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[25%] px-[2%] items-center justify-center">
                    <LoginForm />               
                    <div className="flex flex-col mt-[5vh] w-full items-center h-fit">
                        <span className="text-xl mb-[2vh]">Or</span> 
                        <button 
                            type="button"
                            className="flex items-center relative bg-google-gray w-full h-14 rounded-lg" 
                            onClick={() => Login()}
                        >
                            <img src={googleIcon}  alt="Google Icon" className="h-14 ml-3"/>
                            <span className="absolute left-1/2 translate-x-[-50%] font-roboto text-black text-xl">Continue with Google</span>
                            </button>
                        </div>            
                    </div>
                </div>
            <Footer/>
        </main>
    )

    return content
}

export default LoginPage