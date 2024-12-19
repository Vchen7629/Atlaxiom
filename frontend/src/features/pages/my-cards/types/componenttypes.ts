export type GridListViewComponentProps = {
    gridlistviewprops: {
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
        //setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>;
        //setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        listView: boolean;
        galleryView: boolean;
    }
}

export type searchbarprops = { 
    searchbarprops: {
        searchTerm: string;
        setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    }
}