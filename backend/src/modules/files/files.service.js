import { randomUUID } from "node:crypto";
import path from "node:path";

import filesRepository from "./files.repository.js";
import { toFileDto } from "./files.dto.js";
import storageProvider from "./storage/index.js";
import { ALLOWED_MIME_TYPES_BY_PURPOSE } from "./files.constants.js";
import { ValidationError } from "../../errors/ValidationError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { ForbiddenError } from "../../errors/ForbiddenError.js";
import env from "../../config/env.js";

async function uploadFile({ buffer, originalname, mimetype, size }, { purpose, ownerId }) {

    const allowedMimeTypes = ALLOWED_MIME_TYPES_BY_PURPOSE[purpose];

    if (!allowedMimeTypes.includes(mimetype)) {
        throw new ValidationError(
            `Type de fichier non autorisé pour ce contexte. Types acceptés : ${allowedMimeTypes.join(", ")}.`
        );
    }

    const maxSizeBytes = env.MAX_UPLOAD_SIZE_MB * 1024 * 1024;

    if (size > maxSizeBytes) {
        throw new ValidationError(`Le fichier dépasse la taille maximale autorisée (${env.MAX_UPLOAD_SIZE_MB} Mo).`);
    }

    // Nom de fichier généré côté serveur, jamais celui fourni par le
    // client (Document 07 Ch.15) — évite les collisions et les
    // tentatives de path traversal.
    const extension = path.extname(originalname);
    const generatedFilename = `${randomUUID()}${extension}`;

    const { url } = await storageProvider.upload({
        buffer,
        filename: generatedFilename,
        mimeType: mimetype,
    });

    const file = await filesRepository.create({
        ownerId,
        purpose,
        url,
        mimeType: mimetype,
        size,
    });

    return toFileDto(file);

}

async function deleteFile(id, { requestingUserId }) {

    const file = await filesRepository.findById(id);

    if (!file) {
        throw new NotFoundError("Fichier introuvable.");
    }

    if (file.ownerId !== requestingUserId) {
        throw new ForbiddenError("Vous ne pouvez pas supprimer ce fichier.");
    }

    await storageProvider.remove(file.url);
    await filesRepository.deleteById(id);

}

const filesService = {
    uploadFile,
    deleteFile,
};

export default filesService;
