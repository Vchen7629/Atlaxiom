export default function FoldingCube() {
    return (
        <main className="flex w-[100vw] h-[80vh] items-center">
            <div className="absolute left-[35%] w-32 h-32 mx-auto transform rotate-45 ">
                <div className="absolute w-1/2 h-1/2 bg-transparent top-0 right-0">
                    <div
                        className="absolute inset-0 bg-[hsl(var(--background3))] animate-skFoldCube"
                        style={{
                            animationDelay: "0s",
                            transformOrigin: "bottom",
                        }}
                    ></div>
                </div>

                <div className="absolute w-1/2 h-1/2 bg-transparent bottom-0 right-0">
                    <div
                    className="absolute inset-0 bg-[hsl(var(--background3))] animate-skFoldCube"
                    style={{
                        animationDelay: "0.3s",
                        transformOrigin: "top left",
                    }}
                    ></div>
                </div>

                <div className="absolute w-1/2 h-1/2 bg-transparent bottom-0 left-0">
                    <div
                    className="absolute inset-0 bg-[hsl(var(--background3))] animate-skFoldCube"
                    style={{
                        animationDelay: "0.6s",
                        transformOrigin: "top ",
                    }}
                    ></div>
                </div>

                <div className="absolute w-1/2 h-1/2 bg-transparent top-0 left-0">
                    <div
                    className="absolute inset-0 bg-[hsl(var(--background3))] animate-skFoldCube"
                    style={{
                        animationDelay: "0.9s",
                        transformOrigin: "bottom right",
                    }}
                    ></div>
                </div>
            </div>
            <span className="absolute text-3xl left-1/2 font-bold text-[hsl(var(--text))]">Loading....</span>
        </main>
    )
}