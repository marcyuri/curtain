import { useMemo, useState } from "react";
import "./BlogSection.css";

import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import BlogCard from "../BlogCard";

const SORT_OPTIONS = [
    {
        label: "Plus récents",
        value: "recent",
    },
    {
        label: "Plus populaires",
        value: "popular",
    },
    {
        label: "Temps de lecture",
        value: "readingTime",
    },
];

const BlogSection = ({
    title = "Nos actualités",
    subtitle,
    posts = [],
    categories = [],
    authors = [],
    searchable = true,
    filterable = true,
    sortable = true,
    carousel = false,
    limit,
    showFeaturedFirst = true,
    showMoreLabel = "Voir tous les articles",
    onShowMore,
}) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [author, setAuthor] = useState("all");
    const [sort, setSort] = useState("recent");

    const filteredPosts = useMemo(() => {
        let list = [...posts];

        if (category !== "all") {
            list = list.filter(
                (post) => post.category === category
            );
        }

        if (author !== "all") {
            list = list.filter(
                (post) => post.author === author
            );
        }

        if (search) {
            const query = search.toLowerCase();

            list = list.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    post.excerpt?.toLowerCase().includes(query)
            );
        }

        switch (sort) {
            case "popular":
                list.sort(
                    (a, b) => b.views - a.views
                );
                break;

            case "readingTime":
                list.sort(
                    (a, b) =>
                        a.readingTime - b.readingTime
                );
                break;

            default:
                list.sort(
                    (a, b) =>
                        new Date(b.date) -
                        new Date(a.date)
                );
        }

        if (showFeaturedFirst) {
            list.sort(
                (a, b) =>
                    Number(b.featured) -
                    Number(a.featured)
            );
        }

        return list;
    }, [
        posts,
        search,
        category,
        author,
        sort,
        showFeaturedFirst,
    ]);

    const displayedPosts = limit
        ? filteredPosts.slice(0, limit)
        : filteredPosts;

    return (
        <section className="blog-section">
            <header className="blog-section__header">
                <h2>{title}</h2>

                {subtitle && <p>{subtitle}</p>}
            </header>

            <div className="blog-section__toolbar">
                {searchable && (
                    <Input
                        placeholder="Rechercher un article..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                )}

                {filterable && (
                    <>
                        <Select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            options={[
                                {
                                    label:
                                        "Toutes les catégories",
                                    value: "all",
                                },
                                ...categories.map((item) => ({
                                    label: item,
                                    value: item,
                                })),
                            ]}
                        />

                        <Select
                            value={author}
                            onChange={(e) =>
                                setAuthor(e.target.value)
                            }
                            options={[
                                {
                                    label:
                                        "Tous les auteurs",
                                    value: "all",
                                },
                                ...authors.map((item) => ({
                                    label: item,
                                    value: item,
                                })),
                            ]}
                        />
                    </>
                )}

                {sortable && (
                    <Select
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value)
                        }
                        options={SORT_OPTIONS}
                    />
                )}
            </div>

            <div
                className={`blog-section__content ${carousel
                        ? "blog-section__content--carousel"
                        : ""
                    }`}
            >
                {displayedPosts.map((post) => (
                    <BlogCard
                        key={post.id}
                        {...post}
                    />
                ))}
            </div>

            {limit &&
                filteredPosts.length > limit &&
                onShowMore && (
                    <div className="blog-section__footer">
                        <Button
                            onClick={onShowMore}
                        >
                            {showMoreLabel}
                        </Button>
                    </div>
                )}
        </section>
    );
};

export default BlogSection;