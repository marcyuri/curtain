import { Router } from "express";

import permissionsController from "./permissions.controller.js";

// ⚠️ TEMPORAIRE : ni authenticate ni authorize ne sont encore branchés
// ici (Document 13 Ch.15, roadmap — les guards RBAC arrivent à
// l'Étape 9, après le module auth). Ces routes seront retouchées pour
// ajouter authenticate + authorize("permission.read") dès que ces
// middlewares existeront. Ne pas exposer ce module derrière un
// reverse-proxy public avant cette sécurisation.

const router = Router();

router.get("/", permissionsController.list);

export default router;
