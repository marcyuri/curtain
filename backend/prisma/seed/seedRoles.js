// Rôles RBAC (Document 06 Ch.4, Document 13 Ch.7). Miroir exact de
// frontend/src/constants/roles.js.
//
// Le Super Admin reçoit systématiquement toutes les permissions. Les
// autres rôles reçoivent un sous-ensemble représentatif, à affiner
// module par module lors des phases suivantes de la roadmap.

const ROLE_PERMISSIONS = {

    SUPER_ADMIN: "*", // toutes les permissions

    ADMINISTRATOR: [
        "product.read", "product.create", "product.update", "product.delete",
        "customer.read", "customer.create", "customer.update", "customer.delete",
        "order.read", "order.create", "order.update", "order.delete",
        "invoice.read", "invoice.create",
    ],

    MANAGER: [
        "product.read", "product.update",
        "customer.read",
        "order.read", "order.update",
    ],

    EMPLOYEE: [
        "product.read",
        "order.read",
    ],

    CONSULTANT: [
        "consultation.read", "consultation.create", "consultation.update",
    ],

    ACCOUNTANT: [
        "invoice.read", "invoice.create",
    ],

    HR: [
        "employee.read", "employee.create", "employee.update", "employee.delete",
    ],

    CUSTOMER: [],

    GUEST: [],

};

export async function seedRoles(prisma) {

    const allPermissions = await prisma.permission.findMany();

    for (const [key, permissionKeys] of Object.entries(ROLE_PERMISSIONS)) {

        const role = await prisma.role.upsert({
            where: { key },
            update: {},
            create: {
                key,
                label: key,
            },
        });

        const permissionsToLink =
            permissionKeys === "*"
                ? allPermissions
                : allPermissions.filter((p) => permissionKeys.includes(p.key));

        for (const permission of permissionsToLink) {

            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: role.id,
                        permissionId: permission.id,
                    },
                },
                update: {},
                create: {
                    roleId: role.id,
                    permissionId: permission.id,
                },
            });

        }

    }

    console.log(`   ✓ ${Object.keys(ROLE_PERMISSIONS).length} rôles`);

}
