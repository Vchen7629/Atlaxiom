import { DeleteInputProps } from "../types/deletecomponenttypes";

const DeleteAccountInputComponent = ({ DeleteInputProps }: DeleteInputProps) => {
    const {
        deleteInput,
        setDeleteInput,
        setDeleteErrMsg,
    } = DeleteInputProps

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setDeleteInput(inputValue);
        setDeleteErrMsg('');
    };

    const handleUsernameFocus = () => {
        setDeleteErrMsg('');
    }

    return (
        <section className="flex flex-col">
            <span className="text-sm text-gray-500">To confirm this, type "DELETE"</span>
            <div className="flex w-[15vw] h-[40px] pl-3 relative border-2 border-gray-400 justify-start text-gold rounded-xl">                      
                <div className="flex items-center w-full">
                    <input
                        className="bg-transparent w-full h-full text-md text-[hsl(var(--text))] focus:outline-none"
                        type="text"
                        value={deleteInput}
                        onChange={handleInputChange}
                        onFocus={handleUsernameFocus}
                    />
                </div>
            </div>
        </section>
    )
}

export default DeleteAccountInputComponent