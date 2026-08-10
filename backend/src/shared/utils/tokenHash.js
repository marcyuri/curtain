import { createHash, randomBytes } from "node:crypto";

// Les tokens de refresh / réinitialisation / vérification sont
// stockés hachés en base (Document 13, Ch.6.1 : "stocké côté serveur"),
// mais doivent pouvoir être retrouvés par leur hash lors de la
// vérification — bcrypt (non déterministe, salé aléatoirement à
// chaque appel) ne convient pas ici, contrairement aux mots de passe
// (shared/utils/hashPassword.js). SHA-256 est déterministe et rapide,
// approprié pour des tokens déjà longs et aléatoires (l'entropie vient
// du token lui-même, pas du hachage).

export function generateRawToken() {

    return randomBytes(32).toString("hex");

}

export function hashToken(rawToken) {

    return createHash("sha256").update(rawToken).digest("hex");

}
