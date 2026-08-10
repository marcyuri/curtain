import { describe, it, expect, vi } from "vitest";

import { authorize } from "../../src/middleware/authorize.js";

function buildReqRes(permissions) {

    return {
        req: { user: { permissions } },
        res: {},
        next: vi.fn(),
    };

}

describe("authorize middleware", () => {

    it("appelle next() sans erreur si l'utilisateur a la permission requise", () => {

        const { req, res, next } = buildReqRes(["product.read", "product.create"]);

        authorize("product.read")(req, res, next);

        expect(next).toHaveBeenCalledWith();

    });

    it("appelle next(ForbiddenError) si l'utilisateur n'a pas la permission", () => {

        const { req, res, next } = buildReqRes(["product.read"]);

        authorize("product.delete")(req, res, next);

        expect(next).toHaveBeenCalledOnce();
        const errorArg = next.mock.calls[0][0];
        expect(errorArg.statusCode).toBe(403);

    });

    it("autorise si l'utilisateur a AU MOINS UNE des permissions listées", () => {

        const { req, res, next } = buildReqRes(["order.read"]);

        authorize("order.read", "order.readOwn")(req, res, next);

        expect(next).toHaveBeenCalledWith();

    });

    it("refuse si req.user est absent (authenticate non exécuté avant)", () => {

        const req = {};
        const next = vi.fn();

        authorize("product.read")(req, {}, next);

        expect(next.mock.calls[0][0].statusCode).toBe(403);

    });

});
