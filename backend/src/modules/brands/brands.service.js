import brandsRepository from "./brands.repository.js";
import { toBrandDto, toBrandListDto } from "./brands.dto.js";
import { generateSlug } from "../../shared/utils/generateSlug.js";
import { buildPaginationMeta } from "../../shared/utils/pagination.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

async function generateUniqueSlug(name) {

    const baseSlug = generateSlug(name);

    let slug = baseSlug;
    let suffix = 1;

    while (await brandsRepository.findBySlug(slug)) {

        suffix += 1;
        slug = `${baseSlug}-${suffix}`;

    }

    return slug;

}

async function listBrands({ page, limit, search }) {

    const { brands, total } = await brandsRepository.findMany({ page, limit, search });

    return {
        brands: toBrandListDto(brands),
        meta: buildPaginationMeta({ page, limit, total }),
    };

}

async function getBrandById(id) {

    const brand = await brandsRepository.findById(id);

    if (!brand) {
        throw new NotFoundError("Marque introuvable.");
    }

    return toBrandDto(brand);

}

async function createBrand({ name, logo }) {

    const slug = await generateUniqueSlug(name);

    const brand = await brandsRepository.create({ name, slug, logo });

    return toBrandDto(brand);

}

async function updateBrand(id, { name, logo }) {

    const existing = await brandsRepository.findById(id);

    if (!existing) {
        throw new NotFoundError("Marque introuvable.");
    }

    const slug = name && name !== existing.name
        ? await generateUniqueSlug(name)
        : undefined;

    const updated = await brandsRepository.updateById(id, { name, slug, logo });

    return toBrandDto(updated);

}

async function deleteBrand(id) {

    const existing = await brandsRepository.findById(id);

    if (!existing) {
        throw new NotFoundError("Marque introuvable.");
    }

    await brandsRepository.deleteById(id);

}

const brandsService = {
    listBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
};

export default brandsService;
