import { waveform } from 'ldrs';

export function loadingState({ waveloaderprops }: { waveloaderprops: {isLoading: boolean, setShowLoading: React.Dispatch<React.SetStateAction<boolean>>}}) {
    const {
        isLoading,
        setShowLoading,
    } =  waveloaderprops

    waveform.register()

    if (!isLoading) {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 250);
        return () => clearTimeout(timer);
    }

    return (
        <div className="flex flex-col h-[45vh] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
            <span>Loading</span>
            <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
        </div>
    )
}
