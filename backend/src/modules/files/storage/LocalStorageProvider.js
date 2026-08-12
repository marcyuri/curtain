import { writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Document 13, Ch.11.1 — stockage local en développement uniquement
// (backend/uploads/, déjà présent dans l'arborescence depuis la
// Phase 0, ignoré par git sauf .gitkeep).

const UPLOADS_DIR = path.resolve(__dirname, "../../../../uploads");

async function upload({ buffer, filename }) {

    const filePath = path.join(UPLOADS_DIR, filename);

    await writeFile(filePath, buffer);

    return { url: `/uploads/${filename}` };

}

async function remove(url) {

    const filename = path.basename(url);
    const filePath = path.join(UPLOADS_DIR, filename);

    try {

        await unlink(filePath);

    } catch {

        // Fichier déjà absent — pas une erreur bloquante pour un
        // remove (idempotent, cohérent avec le reste du projet).

    }

}

const localStorageProvider = { upload, remove };

export default localStorageProvider;
