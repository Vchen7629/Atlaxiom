import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CollectionGalleryResult } from '../types/draganddropitemtypes';

const CollectionGalleryViewItem = ({ result }: { result: CollectionGalleryResult }) => {
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
            className="flex relative h-full w-full group"
        >
            <img src={result.image_url} alt={result.card_name} className='h-full object-contain group-hover:blur-xs'/>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {result.card_name}
            </div>
        </div>
    );
};

export default CollectionGalleryViewItem