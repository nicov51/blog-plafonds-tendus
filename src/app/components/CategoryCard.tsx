interface CategoryCardProps {
    title: string;
    description: string;
    icon: string;
    color: string;
}

export default function CategoryCard({ title, description, icon, color }: CategoryCardProps) {
    return (
        <div className="category-card">
            <div className="category-card__icon" style={{ backgroundColor: `${color}20` }}>
                <span style={{ color }}>{icon}</span>
            </div>
            <h3 className="category-card__title">{title}</h3>
            <p className="category-card__description">{description}</p>
        </div>
    );
}

