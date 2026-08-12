import { Router } from "express";
import multer from "multer";

import filesController from "./files.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { validate } from "../../middleware/validate.js";
import { uploadFileSchema, fileIdParamSchema } from "./files.schema.js";
import env from "../../config/env.js";

// memoryStorage : le buffer est transmis tel quel au StorageProvider
// actif (Document 13 Ch.11.1), qui décide seul où et comment
// persister le fichier — cette route ne connaît jamais le disque ni S3
// directement.
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: env.MAX_UPLOAD_SIZE_MB * 1024 * 1024 },
});

// Tout utilisateur authentifié peut téléverser/gérer ses propres
// fichiers (Document 06 Ch.12) — pas de permission dédiée, le contrôle
// se fait par propriété (ownerId) dans le service, pas par rôle.
const router = Router();

router.post(
    "/",
    authenticate,
    upload.single("file"),
    validate(uploadFileSchema, "body"),
    filesController.upload
);

router.delete(
    "/:id",
    authenticate,
    validate(fileIdParamSchema, "params"),
    filesController.remove
);

export default router;
