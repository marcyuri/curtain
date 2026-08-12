import { Router } from "express";

import permissionsRoutes from "../../modules/permissions/permissions.routes.js";
import rolesRoutes from "../../modules/roles/roles.routes.js";
import usersRoutes from "../../modules/users/users.routes.js";
import authRoutes from "../../modules/auth/auth.routes.js";
import filesRoutes from "../../modules/files/files.routes.js";
import categoriesRoutes from "../../modules/categories/categories.routes.js";
import brandsRoutes from "../../modules/brands/brands.routes.js";

// Agrège toutes les routes de la version 1 de l'API (Document 13,
// Ch.2/Ch.5.1). Chaque nouveau module ajoute une ligne ici, jamais de
// logique.

const router = Router();

router.use("/auth", authRoutes);
router.use("/permissions", permissionsRoutes);
router.use("/roles", rolesRoutes);
router.use("/users", usersRoutes);
router.use("/files", filesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/brands", brandsRoutes);

export default router;
