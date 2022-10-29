var path = require('path');
const fs = require('fs');

module.exports = {
    /**
     * Se o ambiente esta configurado para production.
     */
    isProd() {
        return (process.env.NODE_ENV === 'production');
    },

    /**
     * Se o ambiente esta configurado para developer.
     */
    isDev() {
        return (process.env.NODE_ENV !== 'production');
    },

    /**
     * Gerar arquivo envs.js
     */
    makeEnvs(targetPath) {
        var count = 0;

        var data = '/**\r\n';
        data    += ' * Envs de Compilacao\r\n';
        data    += ' */\r\n\r\n';

        var keys = Object.keys(process.env);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key.startsWith('APP_')) {
                data += "window." + key + " = '" + process.env[key] + "';\r\n";
                count += 1;
            }
        }

        // Verificar se deve salvar arquivo
        if (count > 0) {
            var fileEnv = path.resolve(targetPath, 'envs.js');
            fs.writeFileSync(fileEnv, data);
        }
    }
};