import ImageUpload from '../ImageUpload';
import TiptapEditor from '../TiptapEditor';
import { ImageData } from '@/types/article';

interface ContentSectionProps {
    coverImage: ImageData | null;
    content: string;
    onImageChange: (image: ImageData | null) => void;
    onContentChange: (content: string) => void;
}

export default function ContentSection({
                                           coverImage,
                                           content,
                                           onImageChange,
                                           onContentChange,
                                       }: ContentSectionProps) {
    return (
        <>
            <div className="form-group">
                <label>Image de couverture *</label>
                <ImageUpload
                    value={coverImage}
                    onChange={onImageChange}
                />
            </div>

            <div className="form-group">
                <label>Contenu de cet article *</label>
                <TiptapEditor
                    content={content}
                    onChange={onContentChange}
                />
            </div>
        </>
    );
}
