export function toBrandDto(brand) {

    return {
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        logo: brand.logo,
        createdAt: brand.createdAt,
        updatedAt: brand.updatedAt,
    };

}

export function toBrandListDto(brands) {

    return brands.map(toBrandDto);

}
