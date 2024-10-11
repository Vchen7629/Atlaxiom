import React, { useState, useRef, useEffect } from 'react';
import { useCreateNewDeckMutation } from '../../api-slices/decksapislice';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import "./styling/deck-creation.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetSpecificUserQuery } from '../../api-slices/usersApiSlice';


const CreateNewDeckForm = () => {
    const location = useLocation();
    const { userId } = location.state;
    const navigate = useNavigate()

    const { refetch } = useGetSpecificUserQuery(userId, {
        refetchOnMountOrArgChange: true
    });


    const [addNewDeck, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateNewDeckMutation()

    const deckNameRef = useRef()
    const deckDescRef = useRef()

    const [deckname, setDeckname] = useState('')
    const [validDeckname, setValiddeckname] = useState(false)

    const [deckdesc, setDeckdesc] = useState('')

    const [errMsg, setErrMsg] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false);

    /*useEffect(() => {
        deckNameRef.current.focus()
    }, [])*/

    useEffect(() => {
        if (!deckname) {
            setValiddeckname(false);
        } else {
            setValiddeckname(true);
            setErrMsg('');
        }
    }, [deckname, formSubmitted])

    useEffect(() => {
        if (isSuccess) {
            setDeckname('')
            setErrMsg('')

            

            navigate('/mydeckhomepage')
        }
    }, [isSuccess, navigate])

    const onDeckNameChanged = (e) => {
        setDeckname(e.target.value)
        setErrMsg('')
        setFormSubmitted(false)
    }

    const onDeckDescChanged = (e) => {
        setDeckdesc(e.target.value)
        setFormSubmitted(false)
    }

    const onFocus = () => {
        setErrMsg('')
        setFormSubmitted(false)
    }

    const canSave = validDeckname && !isLoading;

    const onSaveDeckClicked = async (e) => {
        e.preventDefault()

        setFormSubmitted(true)

        if (!deckname) {
            setErrMsg('Please enter a deck name')
            return;
        }
        
        if (canSave && userId) {
            try {
                const result = await addNewDeck({ id: userId, DeckData: { deckname, deckdesc } })
                if (result) {
                    refetch()
                } else {
                    console.error('Error: Failed to create deck.');
                }
            } catch (error) {
                console.error('Error: Unable to save the deck.', error);
            }
        } else {
            console.error('Error: Missing userId or invalid data');
        }
    }
    
    const content = (
        <>  
        <Header/>
            <main className="Deck-creation-page-background">
                <form className="Deck-creation-form-container" onSubmit={onSaveDeckClicked}>
                    <h1 className="Deck-creation-form-title"> Create New deck</h1>
                    <div className="Deck-name-container">
                        <label className="form-deck-name-label">
                            Deck Name:
                        </label>
                        <input
                            className="form-deck-name-input"
                            placeholder="Enter Your Deck Name"
                            value={deckname}
                            ref={deckNameRef}
                            onChange={onDeckNameChanged}
                            onFocus={onFocus}
                        />  
                    </div>
                    <div className="Deck-desc-container" >
                        <label className="form-deck-desc-label">
                            Description:
                        </label>
                        <textarea
                            className="form-deck-desc-input"
                            placeholder="Enter Your Deck Desciption"
                            value={deckdesc}
                            ref={deckDescRef}
                            onChange={onDeckDescChanged}
                            onFocus={onFocus}
                        />  
                    </div>
                    <div className="Deck-add-owned-card-container">
                        <label className="form-deck-add-owned-card-label">
                            Add owned Cards to this Deck:
                        </label>

                    </div>
                    <div className="Deck-form-save-container">
                        <button className="deck-form-save-button">
                            Save Deck
                        </button>
                        {errMsg && (
                            <div>
                                <div className="save-deck-error-message-footer">
                                    {errMsg}
                                </div>
                            </div>
                        )}  
                    </div>
                </form>
            </main>
        <Footer/>
        </>
    );

    return content
};

export default CreateNewDeckForm