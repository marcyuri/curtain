import permissionsRepository from "./permissions.repository.js";
import { toPermissionListDto } from "./permissions.dto.js";

// Les permissions sont fixées par seed (Document 13 Ch.4.6) — ce
// service ne fait que les lister, aucune création/modification/
// suppression via l'API dans cette première version (Document 06
// Ch.5 : les permissions sont atomiques et proviennent du Backend,
// pas d'un catalogue modifiable en runtime pour l'instant).

async function listPermissions() {

    const permissions = await permissionsRepository.findMany();

    return toPermissionListDto(permissions);

}

const permissionsService = {
    listPermissions,
};

export default permissionsService;
