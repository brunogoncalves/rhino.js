class Auth
{
    /**
     * Construtor.
     * 
     * @param {AuthProvider} provider INstancia do provider
     */
    constructor(provider)
    {
        this.setProvider(provider);

        this.$token = null;
        this.$user  = null;
    }

    /**
     * Instalar use no Vue.
     * 
     * @param {Vue} Vue Instancia do Vue
     */
    install(Vue) {
        Vue.prototype.$auth = this;
        Vue.auth = this;
    }

    /**
     * Verificar se usuário já esta logado.
     * 
     * @returns {Boolean}
     */
    async check()
    {
        return (await this.user() != null);
    }

    /**
     * Retorna o usuario logado.
     * 
     * @param {boolean} inLogin
     * @returns {Object|null}
     */
    async user(inLogin = false)
    {
        // Verificar se usuario já foi carregado
        if (this.$user) {
            return this.$user;
        }

        // Carregar token de acesso
        var token = this.$provider.getAccessToken();
        if ((!token) || (token == '')) {
            return null;
        }

        // Carregar dados do usuario
        try {
            this.$user = await this.$provider.me(inLogin);

            this.$token = token;

            return this.$user;
        } catch (err) {
            this.__clearCache();
            return null;
        }
    }
    
    /**
     * Fazer o login.
     * 
     * @param {String} email E-mail do login
     * @param {String} senha Senha do login
     * @param {Boolean} remember Define se deve guardar email do usuario
     * @param {String} inquilino ns do inquilino
     * @returns {Object}
     */
    async login(email, senha, remember, inquilino)
    {
        var ret = await this.$provider.login(email, senha, inquilino);

        // Guardar accesToken na sessao
        this.$provider.setAccessToken(ret.access_token);

        // Verificar se deve guardar email
        this.$provider.setEmailRememberSession(remember ? email : null);

        // Quando houver um login deve resetar o cache
        this.$token = ret.access_token;
        this.$user = null;
        
        return this.user(true);
    }

    /**
     * Executar o logout.
     * 
     * @returns {Boolean}
     */
    async logout()
    {
        try {
            await this.$provider.logout();
        } catch (er) {
            // ignorar....
        }

        this.$user = null;
        this.$token = null;

        return true;
    }

    /**
     * Fazer a solicitação da troca de senha.
     * 
     * @param {String} email E-mail do usuario
     * @param {String} url URL para o reset
     * @param {String} inquilino NS do inquilino
     * @returns {Object}
     */
    async forgotPassword(email, url, inquilino)
    {
        return await this.$provider.forgotPassword(email, url, inquilino);
    }

    /**
     * Resetar a senha do usuario pelo token.
     * 
     * @param {String} token Token de autorização
     * @param {String} novaSenha Nova senha
     * @param {String} confirmacao Confirmacao da nova senha
     * @returns {Boolean}
     */
    async resetPassword(token, novaSenha, confirmacao)
    {
        var ret = await this.$provider.resetPassword(token, novaSenha, confirmacao);

        return ret.status;
    }

    /**
     * Informar o email guardado na sessao.
     * 
     * @param {String|null} token Token de acesso
     */
    getEmailRememberSession() {
        return this.$provider.getEmailRememberSession();
    }

    /**
     * Limpar cache da sessao.
     */
    __clearCache()
    {
        this.$token = null;
        this.$user = null;

        this.$provider.setAccessToken(null);
    }

    /**
     * Atribuir objeto de provider do auth.
     * 
     * @param {Object} provider Auth provider
     * @returns {Auth}
     */
    setProvider(provider)
    {
        this.$provider = provider;

        return this;
    }
}

module.exports = Auth;