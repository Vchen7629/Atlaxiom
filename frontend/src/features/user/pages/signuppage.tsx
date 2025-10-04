import { useNavigate } from "react-router-dom"
import AccountCreationForm from "../components/AccountCreationForm"
import { startTransition } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import { useGoogleLoginMutation } from "@/app/auth/GoogleOauthApiSlice"
import googleIcon from "../../../../img/googledark.png"

const SignUpPageComponent = () => {
    const navigate = useNavigate()
    const [googleLoginApi] = useGoogleLoginMutation();

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

    const SignupGoogleOauth = useGoogleLogin({
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
                    <div className="flex text-black w-[65%] text-xl font-bold py-4 justify-center">Or</div>
                    <button 
                        type="button"
                        className="flex items-center relative bg-google-black w-[65%] h-14 rounded-md" 
                        onClick={() => SignupGoogleOauth()}
                    >
                        <img src={googleIcon}  alt="Google Icon" className="h-14 ml-4 outline-none"/>
                        <span className="absolute left-1/2 translate-x-[-50%] font-roboto text-gray-250 text-xl">Continue with Google</span>
                    </button>
                </section>
            </div>
        </main>
    )
}

export default SignUpPageComponent