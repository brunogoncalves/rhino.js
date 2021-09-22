/**
 * Middleware para router.
 * 
 * Fazer scroll da pagina par ao topo.
 */
module.exports = (router) => {

    router.beforeEach((to, from, next) => {

        // So fazer scroll se não tem hash (ancora)
        if (to.hash == '') {
            window.scrollTo(0, 0);
        }

        return next();
    });

};