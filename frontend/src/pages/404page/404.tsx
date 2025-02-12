import { startTransition } from "react";
import { useNavigate } from "react-router-dom"

const InvalidPage = () => {
    const navigate = useNavigate();

    function handleHomeClick() {
        startTransition(() => {
            navigate("/")
        })
    }

    function handleHelplick() {
        startTransition(() => {
            navigate("/FAQ")
        })
    }

    return (
        <main className="flex min-h-[100vh] bg-[hsl(var(--background1))] space-x-[5vw] items-center justify-center">
            <div className="flex flex-col w-[25vw] h-[40vh] space-y-[3vh]">
                <span className="text-4xl text-goldenrod">Something's wrong here...</span>
                <span className="text-gray-500 text-xl font-bold mb-[4vh] ">
                    We can't find the page you're looking for. Check out our Help page or head back to home
                </span>
                <div className="flex max-w-[60%] space-x-[1vw]">
                    <button className="w-[7vw] h-[5vh]  bg-goldenrod" onClick={handleHelplick}>
                        <span className="text-white text-xl font-bold">Help</span>
                    </button>
                    <button className="w-[7vw] h-[5vh] border-blue-400 border-2" onClick={handleHomeClick}>
                        <span className="text-blue-400 text-xl font-bold">Home</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-centerw-[10vw] h-[40vh] py-[vh] space-y-[3vh]">
                <span className="text-[100px] text-goldenrod font-black">404</span>
            </div>
        </main>
    )
}

export default InvalidPage