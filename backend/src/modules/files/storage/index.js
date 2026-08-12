import env from "../../../config/env.js";
import localStorageProvider from "./LocalStorageProvider.js";
import s3StorageProvider from "./S3StorageProvider.js";

// Document 13, Ch.11.1 — le module files/ dépend de l'interface
// StorageProvider, l'implémentation active étant sélectionnée ici
// selon la configuration, jamais codée en dur dans le service.

const providers = {
    local: localStorageProvider,
    s3: s3StorageProvider,
};

const activeStorageProvider = providers[env.STORAGE_DRIVER];

export default activeStorageProvider;
