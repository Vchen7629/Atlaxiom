import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartColumn, faEdit } from "@fortawesome/free-solid-svg-icons";
import { NavBarComp } from "../types/componenttypes";

const NavBarComponent = ({ navbarprops }: NavBarComp) => {
    const {
        deckActive, setDeckActive,
        statisticsActive, setStatisticsActive,
        editActive, setEditActive,
        setSelectedNavItem
    } = navbarprops


    function handleDeckClick() {
        setSelectedNavItem('deck');
        setDeckActive(true);
        setStatisticsActive(false);
        setEditActive(false);
    };

    function handleStatisticsClick() {
        setSelectedNavItem('statistics');
        setDeckActive(false);
        setStatisticsActive(true);
        setEditActive(false);
    };

    function handleEditAccClick() {
        setSelectedNavItem('edit');
        setDeckActive(false);
        setStatisticsActive(false);
        setEditActive(true);
    };

    return (
        <div className="flex my-4 space-x-4 relative h-fit text-sm w-full lg:text-lg lg:w-3/4 ">
            <button 
                className={`flex py-2 px-2 rounded-lg ${deckActive ? "bg-[hsl(var(--background3))]" : "bg-footer"} text-white items-center`} 
                onClick={handleDeckClick}
            >
                <FontAwesomeIcon icon={faChartColumn}/>
                <span className="ml-[10px]">View Decks</span>
            </button>
            <button 
                className={`flex py-2 px-2 rounded-lg ${statisticsActive ? "bg-[hsl(var(--background3))]" : "bg-footer"} text-white items-center`} 
                onClick={handleStatisticsClick}
            >
                <FontAwesomeIcon icon={faChartColumn}/>
                <span className="ml-[10px]">View Statistics</span>
            </button>
            <button 
                className={`flex py-2 px-2 rounded-lg ${editActive ? "bg-[hsl(var(--background3))]" : "bg-footer"} text-white items-center`} 
                onClick={handleEditAccClick}
            >
                <FontAwesomeIcon icon={faEdit}/>
                <span className="ml-[10px]">Edit Account</span>
            </button>
        </div>
    )
}

export default NavBarComponent