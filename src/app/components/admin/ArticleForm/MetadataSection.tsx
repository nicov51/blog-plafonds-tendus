interface MetadataSectionProps {
    category: string;
    tags: string[];
    published: boolean;
    onCategoryChange: (category: string) => void;
    onTagsChange: (tags: string) => void;
    onPublishedChange: (published: boolean) => void;
}

export default function MetadataSection({
                                            category,
                                            tags,
                                            published,
                                            onCategoryChange,
                                            onTagsChange,
                                            onPublishedChange,
                                        }: MetadataSectionProps) {
    return (
        <>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="category">Catégorie *</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        required
                    >
                        <option value="">Choisir une catégorie</option>
                        <option value="technique">Technique</option>
                        <option value="inspiration">Inspiration</option>
                        <option value="conseils">Conseils</option>
                        <option value="actualites">Actualités</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="tags">Tags (séparés par des virgules)</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags.join(', ')}
                        onChange={(e) => onTagsChange(e.target.value)}
                        placeholder="plafond tendu, rénovation, moderne"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => onPublishedChange(e.target.checked)}
                    />
                    <span>Publier l'article immédiatement</span>
                </label>
            </div>
        </>
    );
}
