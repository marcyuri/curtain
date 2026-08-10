// Transforme le modèle Prisma en objet exposé à l'API (Document 13,
// Ch.3.2). Règle absolue : passwordHash n'apparaît JAMAIS dans un DTO
// (Document 06 Ch.6, Document 10 Ch.6.6) — mapping explicite champ par
// champ plutôt qu'un spread, précisément pour empêcher qu'un futur
// champ sensible ajouté au modèle Prisma ne se retrouve exposé par
// erreur.

export function toUserDto(user) {

    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatar: user.avatar,
        status: user.status,
        language: user.language,
        timezone: user.timezone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        roles: user.roles
            ? user.roles.map((userRole) => ({
                  id: userRole.role.id,
                  key: userRole.role.key,
                  label: userRole.role.label,
              }))
            : undefined,
    };

}

export function toUserListDto(users) {

    return users.map(toUserDto);

}
