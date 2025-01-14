import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { SearchListResult } from '../types/draganddropitemtypes';

const SearchCardListViewItem = ({ card }: { card: SearchListResult }) => {
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
            className="flex h-[15%] z-30 space-x-2 w-full bg-[hsl(var(--background1))]"
        >
            <img
                src={card.card_images?.[0]?.image_url}
                className="h-full object-contain"
                alt={card.card_name}
            />
            <div className="flex flex-col max-h-[95%]">
                <div className="font-black text-xs">{card.name}</div>
                <div className="overflow-y-auto mt-1 text-xs text-gray-300 max-w-[95%]">
                    {card.desc || "No description available"}
                </div>
            </div>
        </div>
    );
};

export default SearchCardListViewItem