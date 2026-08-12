import categoriesRepository from "./categories.repository.js";
import { toCategoryDto, toCategoryListDto } from "./categories.dto.js";
import { generateSlug } from "../../shared/utils/generateSlug.js";
import { buildPaginationMeta } from "../../shared/utils/pagination.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

// Le slug est TOUJOURS dérivé du nom côté serveur (Document 07 Ch.15 —
// même principe que le nom de fichier généré côté serveur), jamais
// fourni directement par le client. En cas de collision (deux
// catégories au nom proche), un suffixe numérique est ajouté.

async function generateUniqueSlug(name) {

    const baseSlug = generateSlug(name);

    let slug = baseSlug;
    let suffix = 1;

    while (await categoriesRepository.findBySlug(slug)) {

        suffix += 1;
        slug = `${baseSlug}-${suffix}`;

    }

    return slug;

}

async function listCategories({ page, limit, search }) {

    const { categories, total } = await categoriesRepository.findMany({ page, limit, search });

    return {
        categories: toCategoryListDto(categories),
        meta: buildPaginationMeta({ page, limit, total }),
    };

}

async function getCategoryById(id) {

    const category = await categoriesRepository.findById(id);

    if (!category) {
        throw new NotFoundError("Catégorie introuvable.");
    }

    return toCategoryDto(category);

}

async function createCategory({ name, description }) {

    const slug = await generateUniqueSlug(name);

    const category = await categoriesRepository.create({ name, slug, description });

    return toCategoryDto(category);

}

async function updateCategory(id, { name, description }) {

    const existing = await categoriesRepository.findById(id);

    if (!existing) {
        throw new NotFoundError("Catégorie introuvable.");
    }

    // Le slug n'est régénéré que si le nom change réellement — éviter
    // de casser une URL déjà partagée pour une simple mise à jour de
    // description.
    const slug = name && name !== existing.name
        ? await generateUniqueSlug(name)
        : undefined;

    const updated = await categoriesRepository.updateById(id, { name, slug, description });

    return toCategoryDto(updated);

}

async function deleteCategory(id) {

    const existing = await categoriesRepository.findById(id);

    if (!existing) {
        throw new NotFoundError("Catégorie introuvable.");
    }

    // La contrainte réelle (catégorie utilisée par des produits) sera
    // ajoutée à l'Étape 12, une fois le modèle Product existant — pas
    // par anticipation (Document 01 Ch.7).
    await categoriesRepository.deleteById(id);

}

const categoriesService = {
    listCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};

export default categoriesService;
