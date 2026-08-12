import categoriesService from "./categories.service.js";
import { success } from "../../shared/utils/apiResponse.js";

async function list(req, res) {

    const { categories, meta } = await categoriesService.listCategories(req.query);

    return success(res, {
        message: "Catégories récupérées avec succès.",
        data: categories,
        meta,
    });

}

async function getById(req, res) {

    const category = await categoriesService.getCategoryById(req.params.id);

    return success(res, {
        message: "Catégorie récupérée avec succès.",
        data: category,
    });

}

async function create(req, res) {

    const category = await categoriesService.createCategory(req.body);

    return success(res, {
        message: "Catégorie créée avec succès.",
        data: category,
        statusCode: 201,
    });

}

async function update(req, res) {

    const category = await categoriesService.updateCategory(req.params.id, req.body);

    return success(res, {
        message: "Catégorie modifiée avec succès.",
        data: category,
    });

}

async function remove(req, res) {

    await categoriesService.deleteCategory(req.params.id);

    return success(res, {
        message: "Catégorie supprimée avec succès.",
    });

}

const categoriesController = {
    list,
    getById,
    create,
    update,
    remove,
};

export default categoriesController;
