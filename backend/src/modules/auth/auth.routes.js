import { Router } from "express";

import authController from "./auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { authenticate } from "../../middleware/authenticate.js";
import {
    loginSchema,
    registerSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    verifyEmailSchema,
} from "./auth.schema.js";

const router = Router();

router.post("/login", validate(loginSchema, "body"), authController.login);
router.post("/register", validate(registerSchema, "body"), authController.register);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);
router.post(
    "/forgot-password",
    validate(forgotPasswordSchema, "body"),
    authController.forgotPassword
);
router.post(
    "/reset-password",
    validate(resetPasswordSchema, "body"),
    authController.resetPassword
);
router.post(
    "/verify-email",
    validate(verifyEmailSchema, "body"),
    authController.verifyEmail
);

export default router;
