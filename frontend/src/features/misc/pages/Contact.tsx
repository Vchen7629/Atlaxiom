import { ContactForm } from "@/features/forms/contactform"
import Footer from "@/shared/components/Footer.tsx"
import Header from "@/shared/components/header.tsx"
import { Toaster } from "sonner"

const ContactPage = () => {
    return (
        <main className="min-h-[100vh] flex flex-col justify-between">
            <Toaster richColors  expand visibleToasts={4} position="bottom-center"/>
            <Header/>
            <div className="flex flex-col relative min-h-[95vh] py-[15vh] w-full px-[15vw] bg-[hsl(var(--background1))]  overflow-hidden ">
                <span className="text-[hsl(var(--background3))] text-4xl font-bold mb-[4vh]"> Contact Us</span>
                <ContactForm/>
            </div>
            <Footer/>
        </main>
    )
}

export default ContactPage