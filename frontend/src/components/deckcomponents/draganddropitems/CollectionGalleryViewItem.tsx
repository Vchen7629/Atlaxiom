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
            className="flex h-full w-full"
        >
            <img src={result.image_url} className='h-full object-contain'/>
        </div>
    );
};

export default CollectionGalleryViewItem