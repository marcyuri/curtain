import permissionsService from "./permissions.service.js";
import { success } from "../../shared/utils/apiResponse.js";

// Reçoit req/res, ne contient aucune logique métier (Document 13,
// Ch.3.2).

async function list(req, res) {

    const permissions = await permissionsService.listPermissions();

    return success(res, {
        message: "Permissions récupérées avec succès.",
        data: permissions,
    });

}

const permissionsController = {
    list,
};

export default permissionsController;
