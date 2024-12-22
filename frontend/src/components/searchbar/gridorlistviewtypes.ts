export type GridListViewComponentProps = {
    filterProps: {
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>;
        listView: boolean;
        galleryView: boolean;
    }
}