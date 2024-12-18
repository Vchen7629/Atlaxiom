import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartColumn, faEdit } from "@fortawesome/free-solid-svg-icons";

const NavBarComponent = ({ navbarprops }: any) => {
    const {
        deckActive,
        setDeckActive,
        statisticsActive,
        setStatisticsActive,
        editActive,
        setEditActive,
        setSelectedNavItem
    } = navbarprops


    const handleDeckClick = () => {
        setSelectedNavItem('deck');
        setDeckActive(true);
        setStatisticsActive(false);
        setEditActive(false);
    };

    const handleStatisticsClick = () => {
        setSelectedNavItem('statistics');
        setDeckActive(false);
        setStatisticsActive(true);
        setEditActive(false);
    };

    const handleEditAccClick = () => {
        setSelectedNavItem('edit');
        setDeckActive(false);
        setStatisticsActive(false);
        setEditActive(true);
    };

    return (
        <>
            <div className="flex my-4 space-x-4 relative w-3/4 h-fit text-lg">
                <button 
                    className={`flex py-1 px-4 rounded-lg ${deckActive ? "bg-[hsl(var(--background3))]" : "bg-footer"} text-[hsl(var(--text))] items-center`} 
                    onClick={handleDeckClick}
                >
                    <FontAwesomeIcon icon={faChartColumn} className="text-gray-500"/>
                    <span className="ml-[10px]">View Decks</span>
                </button>
                <button 
                    className={`flex py-1 px-4 rounded-lg ${statisticsActive ? "bg-[hsl(var(--background3))]" : "bg-footer"} text-[hsl(var(--text))] items-center`} 
                    onClick={handleStatisticsClick}
                >
                    <FontAwesomeIcon icon={faChartColumn} className="text-gray-500"/>
                    <span className="ml-[10px]">View Statistics</span>
                </button>
                <button 
                    className={`flex py-1 px-4 rounded-lg ${editActive ? "bg-[hsl(var(--background3))]" : "bg-footer"} text-[hsl(var(--text))] items-center`} 
                    onClick={handleEditAccClick}
                >
                    <FontAwesomeIcon icon={faEdit} className="text-gray-500"/>
                    <span className="ml-[10px]">Edit Account</span>
                </button>
            </div>
        </>
    )
}

export default NavBarComponent