'use client';

import { useRouter } from 'next/navigation';
import { useArticleForm } from '@/hooks/useArticleForm';
import { ArticleFormData } from '@/types/article';
import FormHeader from './FormHeader';
import BasicInfoSection from './BasicInfoSection';
import ContentSection from './ContentSection';
import MetadataSection from './MetadataSection';
import FormActions from './FormActions';

interface ArticleFormProps {
    mode: 'create' | 'edit';
    initialData?: Partial<ArticleFormData>;
}

export default function ArticleForm({ mode, initialData }: ArticleFormProps) {
    const router = useRouter();
    const {
        formData,
        isSubmitting,
        error,
        updateField,
        updateTitle,
        updateTags,
        handleSubmit,
    } = useArticleForm({ mode, initialData });

    return (
        <form onSubmit={handleSubmit} className="article-editor">
            <FormHeader error={error} />

            <BasicInfoSection
                title={formData.title}
                slug={formData.slug}
                excerpt={formData.excerpt}
                onTitleChange={updateTitle}
                onSlugChange={(slug) => updateField('slug', slug)}
                onExcerptChange={(excerpt) => updateField('excerpt', excerpt)}
            />

            <ContentSection
                coverImage={formData.coverImage}
                content={formData.content}
                onImageChange={(image) => updateField('coverImage', image)}
                onContentChange={(content) => updateField('content', content)}
            />

            <MetadataSection
                category={formData.category}
                tags={formData.tags}
                published={formData.published}
                onCategoryChange={(category) => updateField('category', category)}
                onTagsChange={updateTags}
                onPublishedChange={(published) => updateField('published', published)}
            />

            <FormActions
                mode={mode}
                isSubmitting={isSubmitting}
                onCancel={() => router.back()}
            />
        </form>
    );
}
