import jwt from "jsonwebtoken";

import env from "../../config/env.js";

// Document 13, Ch.6.1/6.4. Le payload embarque userId, roles et
// permissions au moment de l'émission (décision documentée : évite une
// requête base de données à chaque appel protégé). Conséquence
// assumée : un changement de permissions n'est effectif qu'au
// prochain refresh (max 15 minutes).

export function signAccessToken(user) {

    const permissions = user.roles.flatMap((userRole) =>
        userRole.role.permissions.map((rp) => rp.permission.key)
    );

    const roles = user.roles.map((userRole) => userRole.role.key);

    return jwt.sign(
        {
            sub: user.id,
            email: user.email,
            roles,
            permissions: [...new Set(permissions)],
        },
        env.JWT_ACCESS_SECRET,
        { expiresIn: env.JWT_ACCESS_EXPIRES_IN }
    );

}

export function verifyAccessToken(token) {

    return jwt.verify(token, env.JWT_ACCESS_SECRET);

}
