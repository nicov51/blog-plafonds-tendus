import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';

interface ArticleCardProps {
    article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const formattedDate = new Date(article.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <Link href={`/articles/${article.slug}`} className="article-card">
            <div className="article-card__image-wrapper">
                <Image
                    src={article.image.url}
                    alt={article.image.alt || article.title}
                    fill
                    className="article-card__image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="article-card__content">
                <div className="article-card__meta">
                    <span className="article-card__date">{formattedDate}</span>
                    <span className="article-card__separator">•</span>
                    <span className="article-card__views">👁️ {article.views}</span>
                </div>

                <h3 className="article-card__title">{article.title}</h3>
                <p className="article-card__description">{article.metaDescription}</p>

                <div className="article-card__footer">
                    <div className="article-card__tags">
                        {article.tags.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="article-card__tag">
                #{tag}
              </span>
                        ))}
                    </div>
                    <div className="article-card__likes">
                        ❤️ {article.likesCount}
                    </div>
                </div>
            </div>
        </Link>
    );
}

