// Rôles du système RBAC (Document 06, Chapitre 4).
// Les rôles proviennent toujours du backend ; ces constantes servent
// uniquement à éviter les chaînes magiques dans le code Frontend.

export const ROLES = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMINISTRATOR: "ADMINISTRATOR",
    MANAGER: "MANAGER",
    EMPLOYEE: "EMPLOYEE",
    CONSULTANT: "CONSULTANT",
    ACCOUNTANT: "ACCOUNTANT",
    HR: "HR",
    CUSTOMER: "CUSTOMER",
    GUEST: "GUEST",
};
