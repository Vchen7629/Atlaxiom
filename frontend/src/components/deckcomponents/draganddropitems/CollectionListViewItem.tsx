import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CollectionListResult } from '../types/draganddropitemtypes';

const CollectionListViewItem = ({ result }: { result: CollectionListResult }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: result._id, 
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
            className="flex h-[15%] space-x-2 w-full bg-[hsl(var(--background1))]"
        >
            <img
                src={result.image_url}
                className="h-full object-contain"
                alt={result.card_name}
            />
            <div className="flex flex-col max-h-[95%]">
                <div className="font-black text-xs">{result.card_name}</div>
                <div className="overflow-y-auto mt-1 text-xs text-gray-300 max-w-[95%]">
                    {result.desc || "No description available"}
                </div>
            </div>
        </div>
    );
};

export default CollectionListViewItem