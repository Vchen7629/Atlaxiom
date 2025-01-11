import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const SearchCardGalleryViewItem = ({ card }: { card: any }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.id, 
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div 
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="flex h-full w-full"
        >
            <img src={card.card_images?.[0]?.image_url} className='h-full object-contain'/>
        </div>
    );
};

export default SearchCardGalleryViewItem