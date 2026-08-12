import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/modules/categories/categories.repository.js", () => ({
    default: {
        findMany: vi.fn(),
        findById: vi.fn(),
        findBySlug: vi.fn(),
        create: vi.fn(),
        updateById: vi.fn(),
        deleteById: vi.fn(),
    },
}));

const { default: categoriesRepository } = await import(
    "../../src/modules/categories/categories.repository.js"
);
const { default: categoriesService } = await import(
    "../../src/modules/categories/categories.service.js"
);

beforeEach(() => {
    vi.clearAllMocks();
});

describe("categoriesService.createCategory", () => {

    it("génère un slug à partir du nom", async () => {

        categoriesRepository.findBySlug.mockResolvedValueOnce(null);
        categoriesRepository.create.mockResolvedValueOnce({
            id: "c1",
            name: "Chaussures de Sport",
            slug: "chaussures-de-sport",
            description: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await categoriesService.createCategory({ name: "Chaussures de Sport" });

        expect(result.slug).toBe("chaussures-de-sport");

    });

    it("ajoute un suffixe numérique en cas de collision de slug", async () => {

        categoriesRepository.findBySlug
            .mockResolvedValueOnce({ id: "existing" }) // "chaussures" déjà pris
            .mockResolvedValueOnce(null); // "chaussures-2" disponible

        categoriesRepository.create.mockResolvedValueOnce({
            id: "c2",
            name: "Chaussures",
            slug: "chaussures-2",
            description: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await categoriesService.createCategory({ name: "Chaussures" });

        expect(categoriesRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({ slug: "chaussures-2" })
        );

    });

});

describe("categoriesService.updateCategory", () => {

    it("lève une NotFoundError si la catégorie n'existe pas", async () => {

        categoriesRepository.findById.mockResolvedValueOnce(null);

        await expect(
            categoriesService.updateCategory("id-inexistant", { name: "Nouveau nom" })
        ).rejects.toThrow("Catégorie introuvable.");

    });

    it("ne régénère pas le slug si le nom ne change pas", async () => {

        categoriesRepository.findById.mockResolvedValueOnce({
            id: "c1",
            name: "Chaussures",
            slug: "chaussures",
        });

        categoriesRepository.updateById.mockResolvedValueOnce({
            id: "c1",
            name: "Chaussures",
            slug: "chaussures",
            description: "Nouvelle description",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await categoriesService.updateCategory("c1", {
            name: "Chaussures",
            description: "Nouvelle description",
        });

        expect(categoriesRepository.findBySlug).not.toHaveBeenCalled();

    });

});
