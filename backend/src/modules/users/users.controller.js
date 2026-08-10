import usersService from "./users.service.js";
import { success } from "../../shared/utils/apiResponse.js";

async function list(req, res) {

    const { users, meta } = await usersService.listUsers(req.query);

    return success(res, {
        message: "Utilisateurs récupérés avec succès.",
        data: users,
        meta,
    });

}

async function getById(req, res) {

    const user = await usersService.getUserById(req.params.id);

    return success(res, {
        message: "Utilisateur récupéré avec succès.",
        data: user,
    });

}

async function create(req, res) {

    const user = await usersService.createUser(req.body);

    return success(res, {
        message: "Utilisateur créé avec succès.",
        data: user,
        statusCode: 201,
    });

}

async function update(req, res) {

    const user = await usersService.updateUser(req.params.id, req.body);

    return success(res, {
        message: "Utilisateur modifié avec succès.",
        data: user,
    });

}

async function remove(req, res) {

    // req.user n'existe pas encore (authenticate arrive à l'Étape 9) —
    // requestingUserId reste undefined pour l'instant, la protection
    // anti-auto-suppression du service deviendra active dès que
    // req.user sera renseigné, sans changement de code ici.
    await usersService.deleteUser(req.params.id, { requestingUserId: req.user?.id });

    return success(res, {
        message: "Utilisateur supprimé avec succès.",
    });

}

const usersController = {
    list,
    getById,
    create,
    update,
    remove,
};

export default usersController;
