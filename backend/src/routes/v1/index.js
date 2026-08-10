import { Router } from "express";

import permissionsRoutes from "../../modules/permissions/permissions.routes.js";
import rolesRoutes from "../../modules/roles/roles.routes.js";
import usersRoutes from "../../modules/users/users.routes.js";

// Agrège toutes les routes de la version 1 de l'API (Document 13,
// Ch.2/Ch.5.1). Chaque nouveau module ajoute une ligne ici, jamais de
// logique.

const router = Router();

router.use("/permissions", permissionsRoutes);
router.use("/roles", rolesRoutes);
router.use("/users", usersRoutes);

export default router;
