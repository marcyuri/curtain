export function toCategoryDto(category) {

    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
    };

}

export function toCategoryListDto(categories) {

    return categories.map(toCategoryDto);

}
