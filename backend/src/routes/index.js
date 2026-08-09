import { Router } from "express";

import env from "../config/env.js";
import v1Routes from "./v1/index.js";

// Le préfixe de version est géré une seule fois ici (Document 13,
// Ch.5.1), jamais répété module par module.

const router = Router();

router.use(env.API_PREFIX, v1Routes);

export default router;
