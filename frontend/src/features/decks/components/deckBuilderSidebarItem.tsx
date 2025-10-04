import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { SearchListResult } from '../types/dragAndDropItem';

// This component implements the styling and dragndrop logic for card items showing
// up in the sidebar when you are creating a new deck
const DeckBuilderSidebarCardItem = (
    { card, listView, galleryView }: 
    {card: SearchListResult, listView: boolean, galleryView: boolean}
) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.id as string 
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <>
        {listView ? (
            <div
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                className="flex h-[15%] z-30 space-x-2 w-full bg-[hsl(var(--background1))]"
            >
                <img
                    src={card.card_images?.[0]?.image_url || card.image_url}
                    className="h-full object-contain"
                    alt={card.card_name || card.card_name}
                />
                <div className="flex flex-col max-h-[95%]">
                    <span className="font-black text-[hsl(var(--background3))] text-xs">{card.name || card.card_name}</span>
                    <span className="overflow-y-auto mt-1 text-xs text-[hsl(var(--text))] max-w-[95%]">
                        {card.desc || "No description available"}
                    </span>
                </div>
            </div>
        ) : galleryView && (
            <div 
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                className="relative flex h-full w-full group"
            >
                <img 
                    src={card.card_images?.[0]?.image_url || card.image_url} 
                    alt={card.name || card.card_name} 
                    className='h-full object-contain group-hover:blur-xs'
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {card.name || card.card_name}
                </span>
            </div>
        )}
        </>
    );
};

export default DeckBuilderSidebarCardItem