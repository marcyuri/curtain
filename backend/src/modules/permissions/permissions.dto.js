// Transforme le modèle Prisma en objet exposé à l'API (Document 13,
// Ch.3.2). Pour Permission, la forme Prisma est déjà minimale et sans
// donnée sensible — le mapping reste explicite malgré tout, pour ne
// jamais exposer un champ ajouté au modèle sans décision consciente.

export function toPermissionDto(permission) {

    return {
        id: permission.id,
        key: permission.key,
        module: permission.module,
        description: permission.description,
    };

}

export function toPermissionListDto(permissions) {

    return permissions.map(toPermissionDto);

}
