import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const SearchCardGalleryViewItem = ({ card }: any) => {
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
            className="relative flex h-full w-full group"
        >
            <img src={card.card_images?.[0]?.image_url} className='h-full object-contain group-hover:blur-xs'/>
            <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {card.name}
            </span>
        </div>
    );
};

export default SearchCardGalleryViewItem