import brandsService from "./brands.service.js";
import { success } from "../../shared/utils/apiResponse.js";

async function list(req, res) {

    const { brands, meta } = await brandsService.listBrands(req.query);

    return success(res, {
        message: "Marques récupérées avec succès.",
        data: brands,
        meta,
    });

}

async function getById(req, res) {

    const brand = await brandsService.getBrandById(req.params.id);

    return success(res, {
        message: "Marque récupérée avec succès.",
        data: brand,
    });

}

async function create(req, res) {

    const brand = await brandsService.createBrand(req.body);

    return success(res, {
        message: "Marque créée avec succès.",
        data: brand,
        statusCode: 201,
    });

}

async function update(req, res) {

    const brand = await brandsService.updateBrand(req.params.id, req.body);

    return success(res, {
        message: "Marque modifiée avec succès.",
        data: brand,
    });

}

async function remove(req, res) {

    await brandsService.deleteBrand(req.params.id);

    return success(res, {
        message: "Marque supprimée avec succès.",
    });

}

const brandsController = {
    list,
    getById,
    create,
    update,
    remove,
};

export default brandsController;
