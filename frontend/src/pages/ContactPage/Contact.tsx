import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { Toaster } from "sonner"

const ContactPage = () => {
    return (
        <main className="min-h-[100vh] flex flex-col justify-between">
            <Toaster richColors  expand visibleToasts={4} position="bottom-center"/>
            <Header/>
            <div className="flex justify-center relative min-h-[95vh] py-[15vh] w-full px-[10vw] bg-[hsl(var(--background1))]  overflow-hidden ">
                <span className="text-[hsl(var(--text))] text-4xl font-bold"> Work In Progress</span>
            </div>
            <Footer/>
        </main>
    )
}

export default ContactPage