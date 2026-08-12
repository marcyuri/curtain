export function toFileDto(file) {

    return {
        id: file.id,
        url: file.url,
        purpose: file.purpose,
        mimeType: file.mimeType,
        size: file.size,
        createdAt: file.createdAt,
    };

}
