export type SearchBar = {
    searchbarprops: {
        searchTerm: string;
        setSearchTerm: React.Dispatch<React.SetStateAction<string>>
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>
    }
}

export type GridListViewComponentProps = {
    gridlistviewprops: {
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
        listView: boolean;
        galleryView: boolean;
    }
}