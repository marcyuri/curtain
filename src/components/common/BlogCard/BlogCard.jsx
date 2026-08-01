import {
    CalendarDays,
    Clock3,
    Eye,
    ArrowRight
} from "lucide-react";

import Badge from "../../ui/Badge";
import Button from "../../ui/Button";

import "./BlogCard.css";

function BlogCard({

    article,

    variant = "default",

    onRead,

    className = ""

}) {

    const {

        image,

        category,

        title,

        excerpt,

        author,

        publishedAt,

        readingTime,

        views,

        tags = [],

        featured

    } = article;

    return (

        <article
            className={`blog-card blog-card--${variant} ${className}`}
        >

            <div className="blog-card__image">

                <img
                    src={image}
                    alt={title}
                />

                {featured && (

                    <Badge
                        className="blog-card__badge"
                    >

                        À la une

                    </Badge>

                )}

            </div>

            <div className="blog-card__content">

                <span className="blog-card__category">

                    {category}

                </span>

                <h3>

                    {title}

                </h3>

                <p>

                    {excerpt}

                </p>

                <div className="blog-card__meta">

                    <span>

                        <CalendarDays size={16} />

                        {publishedAt}

                    </span>

                    <span>

                        <Clock3 size={16} />

                        {readingTime}

                    </span>

                    <span>

                        <Eye size={16} />

                        {views}

                    </span>

                </div>

                <div className="blog-card__author">

                    Par {author}

                </div>

                <div className="blog-card__tags">

                    {tags.map(tag => (

                        <Badge
                            key={tag}
                        >

                            {tag}

                        </Badge>

                    ))}

                </div>

                <Button
                    onClick={() => onRead?.(article)}
                >

                    Lire l'article

                    <ArrowRight size={18} />

                </Button>

            </div>

        </article>

    );

}

export default BlogCard;