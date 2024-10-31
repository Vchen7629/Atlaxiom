import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';



const HomePage = () => {
    const content = (
        <main className="flex flex-col bg-radial-gray min-h-[100vh] justify-between">
            <Header/>
            <div className="flex items-center w-full xs:h-[86vh] lg:h-[83vh]">
                <div className="relative left-[15%] flex flex-col items-center">
                    <div className= "w-[50%] font-black text-left xs:text-6xl lg:text-6xl 2xl:text-8xl text-gold">
                        Atlaxiom
                    </div>
                    <div className="mt-10 xs:top-[50%] lg:top-[45%] xl:top-[50%] w-[50%] text-left text-2xl"> 
                        All-in one website allowing you to catalog your card-collection and create 
                        custom decks
                    </div>
                </div>
                <div className="bg-[url('../img/dragonicon.png')] relative bg-center bg-contain bg-no-repeat h-[45%] w-[45%]"/>
            </div>
            <Footer/>
        </main>
    )
    return content
}

export default HomePage

