import React from "react"

const SearchResults = ({ selectedCardData }) => {
    return (
        <div>
            {selectedCardData ? (
                <>
                    <h1>{selectedCardData.name}</h1>
                    <p>Type: {selectedCardData.type}</p>
                    {/* Add more details as needed */}
                </>
            ) : (
                <div>No card selected</div>
            )}
        </div>
    )
}

export default SearchResults