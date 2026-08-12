import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/modules/files/files.repository.js", () => ({
    default: {
        create: vi.fn(),
        findById: vi.fn(),
        deleteById: vi.fn(),
    },
}));

vi.mock("../../src/modules/files/storage/index.js", () => ({
    default: {
        upload: vi.fn().mockResolvedValue({ url: "/uploads/generated-name.jpg" }),
        remove: vi.fn(),
    },
}));

const { default: filesRepository } = await import("../../src/modules/files/files.repository.js");
const { default: storageProvider } = await import("../../src/modules/files/storage/index.js");
const { default: filesService } = await import("../../src/modules/files/files.service.js");
const { UPLOAD_PURPOSES } = await import("../../src/modules/files/files.constants.js");

beforeEach(() => {
    vi.clearAllMocks();
});

describe("filesService.uploadFile", () => {

    it("rejette un type MIME non autorisé pour le contexte", async () => {

        await expect(
            filesService.uploadFile(
                { buffer: Buffer.from("x"), originalname: "malware.exe", mimetype: "application/x-msdownload", size: 100 },
                { purpose: UPLOAD_PURPOSES.PRODUCT_IMAGE, ownerId: "u1" }
            )
        ).rejects.toThrow("Type de fichier non autorisé");

    });

    it("rejette un fichier trop volumineux", async () => {

        await expect(
            filesService.uploadFile(
                { buffer: Buffer.from("x"), originalname: "photo.jpg", mimetype: "image/jpeg", size: 999 * 1024 * 1024 },
                { purpose: UPLOAD_PURPOSES.PRODUCT_IMAGE, ownerId: "u1" }
            )
        ).rejects.toThrow("dépasse la taille maximale");

    });

    it("génère un nom de fichier différent du nom original (jamais le nom du client)", async () => {

        filesRepository.create.mockResolvedValueOnce({
            id: "f1",
            url: "/uploads/generated-name.jpg",
            purpose: UPLOAD_PURPOSES.PRODUCT_IMAGE,
            mimeType: "image/jpeg",
            size: 100,
            createdAt: new Date(),
        });

        await filesService.uploadFile(
            { buffer: Buffer.from("x"), originalname: "../../etc/passwd.jpg", mimetype: "image/jpeg", size: 100 },
            { purpose: UPLOAD_PURPOSES.PRODUCT_IMAGE, ownerId: "u1" }
        );

        const uploadCall = storageProvider.upload.mock.calls[0][0];

        expect(uploadCall.filename).not.toContain("etc/passwd");
        expect(uploadCall.filename).not.toBe("../../etc/passwd.jpg");

    });

});

describe("filesService.deleteFile", () => {

    it("lève une NotFoundError si le fichier n'existe pas", async () => {

        filesRepository.findById.mockResolvedValueOnce(null);

        await expect(
            filesService.deleteFile("id-inexistant", { requestingUserId: "u1" })
        ).rejects.toThrow("Fichier introuvable.");

    });

    it("lève une ForbiddenError si l'utilisateur n'est pas le propriétaire", async () => {

        filesRepository.findById.mockResolvedValueOnce({ id: "f1", ownerId: "autre-utilisateur", url: "/uploads/x.jpg" });

        await expect(
            filesService.deleteFile("f1", { requestingUserId: "u1" })
        ).rejects.toThrow("Vous ne pouvez pas supprimer ce fichier.");

    });

    it("supprime le fichier si l'utilisateur en est le propriétaire", async () => {

        filesRepository.findById.mockResolvedValueOnce({ id: "f1", ownerId: "u1", url: "/uploads/x.jpg" });

        await filesService.deleteFile("f1", { requestingUserId: "u1" });

        expect(storageProvider.remove).toHaveBeenCalledWith("/uploads/x.jpg");
        expect(filesRepository.deleteById).toHaveBeenCalledWith("f1");

    });

});
