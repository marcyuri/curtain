import filesService from "./files.service.js";
import { success } from "../../shared/utils/apiResponse.js";
import { ValidationError } from "../../errors/ValidationError.js";

async function upload(req, res) {

    if (!req.file) {
        throw new ValidationError("Aucun fichier reçu.");
    }

    const file = await filesService.uploadFile(req.file, {
        purpose: req.body.purpose,
        ownerId: req.user.id,
    });

    return success(res, {
        message: "Fichier téléversé avec succès.",
        data: file,
        statusCode: 201,
    });

}

async function remove(req, res) {

    await filesService.deleteFile(req.params.id, { requestingUserId: req.user.id });

    return success(res, {
        message: "Fichier supprimé avec succès.",
    });

}

const filesController = {
    upload,
    remove,
};

export default filesController;
