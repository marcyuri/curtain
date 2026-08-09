import rolesService from "./roles.service.js";
import { success } from "../../shared/utils/apiResponse.js";

async function list(req, res) {

    const roles = await rolesService.listRoles();

    return success(res, {
        message: "Rôles récupérés avec succès.",
        data: roles,
    });

}

async function getById(req, res) {

    const role = await rolesService.getRoleById(req.params.id);

    return success(res, {
        message: "Rôle récupéré avec succès.",
        data: role,
    });

}

async function create(req, res) {

    const role = await rolesService.createRole(req.body);

    return success(res, {
        message: "Rôle créé avec succès.",
        data: role,
        statusCode: 201,
    });

}

async function update(req, res) {

    const role = await rolesService.updateRole(req.params.id, req.body);

    return success(res, {
        message: "Rôle modifié avec succès.",
        data: role,
    });

}

async function remove(req, res) {

    await rolesService.deleteRole(req.params.id);

    return success(res, {
        message: "Rôle supprimé avec succès.",
    });

}

const rolesController = {
    list,
    getById,
    create,
    update,
    remove,
};

export default rolesController;
