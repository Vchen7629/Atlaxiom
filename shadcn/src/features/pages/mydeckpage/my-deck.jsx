import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from "../../../components/footer/Footer"
import Header from "../../../components/header/header"
import { useGetSpecificUserQuery } from '../../api-slices/usersApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


const MyDeck = () => {
    const userId = useSelector((state) => state.auth.userId);
    const navigate = useNavigate();

    const {} = useGetSpecificUserQuery(userId, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });


    const handleCreateDeckClick = () => {
        navigate('/newDeck', { state: { userId } });
    };

    const handleModifyDeckClick = () => {
        navigate('/modifyDeck', { state: { userId } });
    }

    return (
        <main className="min-h-[100vh] flex flex-col  bg-metal bg-metal-size bg-metal-position justify-between">
            <Header/>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center px-[15px] w-[29vw] h-[50vh] pt-[30px] rounded-3xl bg-[#1a1919]">
                    <h1 className="mt-[8%] text-4xl font-black pb-[5%] text-goldenrod">My decks Menu</h1>
                    <div className="w-[80%] pl-5 border-transparent border-b-2 hover:border-b-2 hover:border-gold">
                        <FontAwesomeIcon icon={faPlus} className="text-gold mb-[20px] fa-2xl"/>
                        <button className="h-[50px] ml-[5%] mt-[5%] mb-[10%]" onClick={handleCreateDeckClick}>
                            <div className="text-[32px] text-left">New Deck</div>
                            <div className="text-left text-gray-500 text-[20px]">Create a new deck </div>
                        </button>
                    </div>
                    <div className="w-[80%] pl-5 border-transparent border-b-2 hover:border-b-2 hover:border-gold">
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} className="mb-[39px] text-gold fa-2xl"/>
                        <button className="w-[80%] ml-[5%] h-[75px] mt-[5%] mb-[10%]" onClick={handleModifyDeckClick}>
                            <div className="text-[32px] text-left">My Decks</div>
                            <div className="text-left text-gray-500 text-[20px]">View and Modify decks you own, add or remove cards from deck </div>
                        </button>
                    </div>
                    <div className="w-[80%] pl-5 border-transparent border-b-2 hover:border-b-2 hover:border-gold">
                        <FontAwesomeIcon icon={faTrash} className="mb-[20px] text-gold fa-2xl"/>
                        <button className="h-[50px] ml-[5%] mt-[5%] mb-[10%]" onClick={handleCreateDeckClick}>
                            <div className="text-[32px] text-left">Delete Decks</div>
                            <div className="text-left text-gray-500 text-[20px]">Delete decks you own </div>
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )

}

export default MyDeck