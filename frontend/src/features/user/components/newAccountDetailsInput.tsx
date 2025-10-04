import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { InputProps } from "../types/editcomponenttypes";

export const NewAccountDetailsInputComponent = ({ newDetails, setNewDetails, type }: InputProps) => {

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setNewDetails(inputValue);
    };

    function handleClearClick() {
        setNewDetails('');
    };

    return (
        <div className="flex w-[90%] xl:w-[25vw] h-[40px] pl-3 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
            <div className="flex items-center w-full">
                <input
                    className="bg-transparent w-full h-full text-md focus:outline-none"
                    type="text"
                    value={newDetails}
                    onChange={handleInputChange}
                    placeholder={`Enter New ${type}...`}
                />
                {newDetails && (
                    <button className="cursor-pointer mr-[10px]" onClick={handleClearClick}>
                        <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                    </button>
                )}
                </div>
        </div>
    )
}

