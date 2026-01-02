interface BasicInfoSectionProps {
    title: string;
    slug: string;
    excerpt: string;
    onTitleChange: (title: string) => void;
    onSlugChange: (slug: string) => void;
    onExcerptChange: (excerpt: string) => void;
}

export default function BasicInfoSection({
                                             title,
                                             slug,
                                             excerpt,
                                             onTitleChange,
                                             onSlugChange,
                                             onExcerptChange,
                                         }: BasicInfoSectionProps) {
    return (
        <>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="title">Titre de l'article *</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        required
                        placeholder="Ex: Guide complet des plafonds tendus"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="slug">URL (slug) *</label>
                    <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => onSlugChange(e.target.value)}
                        required
                        placeholder="guide-complet-plafonds-tendus"
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="excerpt">Résumé (pour SEO) *</label>
                <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => onExcerptChange(e.target.value)}
                    required
                    rows={3}
                    placeholder="Bref résumé (160 caractères max recommandé)"
                />
            </div>
        </>
    );
}
