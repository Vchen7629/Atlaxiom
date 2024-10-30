import Privacypolicy from "../buttons/Privacypolicy"
import Home from "../buttons/home"

const Footer = () => {

    const content = (
        <footer>
            <div  className="bg-footer flex w-full h-[8vh] p-5 justify-center items-center text-lg">  
                <ul className="flex">
                    <li className="px-2.5 border-r-2 border-goldenrod"><Privacypolicy/></li>
                    <li className="px-2.5 border-r-2 border-goldenrod"><Home/></li>
                    <li className="px-2.5">Click for Surprise</li>
                </ul>
            </div>
        </footer>
    )

    return content
}

export default Footer