import app from "./app.js";
import env from "./config/env.js";

// Point d'entrée du serveur (Document 13, Ch.2).

app.listen(env.PORT, () => {

    // TODO: remplacer par Pino (Document 13 Ch.1) dès son installation.
    // eslint-disable-next-line no-console
    console.log(`LOVE CAN BUILD API démarrée sur le port ${env.PORT} (${env.NODE_ENV})`);

});
