import bcrypt from "bcrypt";

// Un unique compte Super Admin, pour pouvoir se connecter à un
// environnement neuf (Document 13 Ch.4.6). Mot de passe volontairement
// simple ici (développement uniquement) — à changer immédiatement en
// production, ou remplacé par une procédure d'invitation dédiée
// lorsqu'elle existera (hors périmètre de cette étape).

const SUPER_ADMIN_EMAIL = "admin@lovecanbuild.local";
const SUPER_ADMIN_PASSWORD = "ChangeMe123!";

export async function seedUsers(prisma) {

    const passwordHash = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 12);

    const superAdminRole = await prisma.role.findUnique({
        where: { key: "SUPER_ADMIN" },
    });

    const user = await prisma.user.upsert({
        where: { email: SUPER_ADMIN_EMAIL },
        update: {},
        create: {
            email: SUPER_ADMIN_EMAIL,
            passwordHash,
            firstName: "Super",
            lastName: "Admin",
        },
    });

    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: user.id,
                roleId: superAdminRole.id,
            },
        },
        update: {},
        create: {
            userId: user.id,
            roleId: superAdminRole.id,
        },
    });

    console.log(`   ✓ Super Admin (${SUPER_ADMIN_EMAIL})`);

}
