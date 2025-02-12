export function CreateDeckBackground() {
    return (
        <main className="flex flex-col items-center px-2 pt-8 w-full h-[45vh] bg-[hsl(var(--contrast))] shadow-lg rounded-xl">
            <div className="flex items-center justify-center p-2 h-11 w-1/4 rounded-lg bg-[hsl(var(--background3))]">
                <span className="text-[hsl(var(--tex))]">New Deck</span>
            </div>
        </main>
    )
}