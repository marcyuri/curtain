import bcrypt from "bcrypt";

// Document 13, Ch.6.6 — hachage bcrypt, coût 12, jamais de hachage
// réversible. Fonction pure, sans dépendance à Express ni à Prisma.

const SALT_ROUNDS = 12;

export async function hashPassword(plainPassword) {

    return bcrypt.hash(plainPassword, SALT_ROUNDS);

}

export async function verifyPassword(plainPassword, passwordHash) {

    return bcrypt.compare(plainPassword, passwordHash);

}
