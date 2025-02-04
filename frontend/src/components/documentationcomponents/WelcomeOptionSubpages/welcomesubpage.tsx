
export function WelcomeSubPage() {

    return (
        <main className="flex flex-col space-y-[3vh] w-full h-full">
            <span className="text-4xl text-[hsl(var(--background3))] font-bold">Welcome</span>
            <div className="flex flex-col space-y-[2vh]">
                <span className="text-lg font-normal text-gray-400">Welcome to the Documentation Page of Atlaxiom! Here you can find answers to potential questions.</span>
                <div className="flex space-x-2 text-lg font-normal text-gray-400">
                    <span>If you have any more questions you may contact us through our contact </span>
                    <button className="text-blue-400 font-bold">form</button>
                </div>
            </div>
        </main>
    )
}