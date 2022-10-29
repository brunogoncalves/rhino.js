/**
 * Controle de rotas autenticadas.
 */
module.exports = (router, storage, url, opts = {}) => {

    // Tratar parametros
    var optsDefault = {
        loginName  : 'login',
        routeLogin : 'login',
    };
    opts = Object.assign(optsDefault, opts);

    // Verificar se foi definido o controle de auth pelo options do router
    const auth = router.options.auth ? router.options.auth : null;

    // Registrar middleware em todas as rotas
    router.beforeEach(async (to, from, next) => {
        // Verificar se rota deve estar autenticada.
        // Caso nao necessite, continuar fluxo.
        if (!to.meta.auth) {
            return next();
        }

        // Verificar se contexto esta autenticado
        if ((!auth) || (!(await auth.check()))) {

            // Guardar a rota TO para continuar depois do login
            if ((to.name != opts.loginName)) {
                var url_continue = url.route(to).fullPath();
                storage.session.set('auth_continue', url_continue);
            }

            // Redirecionar para o login
            var route = {};
            if (typeof opts.routeLogin == 'function') {
                route = opts.routeLogin(to, router, auth, opts);
            } else {
                route = { name: opts.loginName };
            }

            // Verificar se foi informado um string location
            if ((typeof route == 'string') && (route.indexOf('http') >= 0)) {
                return window.location = route;
            }

            return router.push(route);
        }

        return next();
    });
};