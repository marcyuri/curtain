// Interface commune (Document 13, Ch.11.1). Le module files/ ne
// connaît jamais l'implémentation concrète — seule cette interface.
//
// Toute implémentation doit exposer :
//
// @typedef {object} StorageProvider
// @property {(params: { buffer: Buffer, filename: string, mimeType: string }) => Promise<{ url: string }>} upload
// @property {(url: string) => Promise<void>} remove
