import { toPermissionListDto } from "../permissions/permissions.dto.js";

export function toRoleDto(role) {

    return {
        id: role.id,
        key: role.key,
        label: role.label,
        description: role.description,
        permissions: role.permissions
            ? toPermissionListDto(role.permissions.map((rp) => rp.permission))
            : undefined,
    };

}

export function toRoleListDto(roles) {

    return roles.map(toRoleDto);

}
