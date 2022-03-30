// Verificar biblioteca
var _dt = require('date-and-time');
if (!(typeof _dt.parse == 'function')) {
    _dt = _dt.default;
}

class Carbon
{
    /**
     * Format padrao.
     * @returns {string}
     */
    static get FORMAT_DEFAULT() {
        return 'YYYY-MM-DD HH:mm:ss';
        //return 'yyyy-MM-dd hh:mm:ss';
    }

    /**
     * Retorna a data e hora atual.
     * @returns {Date}
     */
    static now() {
        return Date.now();
    }

    /**
     * Retorna a data e hora de hoje.
     * @returns {Date}
     */
    static today() {
        var hoje = Carbon.format(Carbon.now(), 'YYYY-MM-DD');

        return Carbon.createFromFormat(hoje + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Converter um string em data e hora por um formato específico.
     * 
     * @param {String} value Data e/ou hora em string a ser convertida
     * @param {String} format Formato da data e hora 
     * @param {Boolean} utc
     * @returns {Date}
     */
    static createFromFormat(value, format, utc = true) {
        format = ((format == undefined) || (format == '')) ? this.FORMAT_DEFAULT : format;

        //return df.parse(format, value);
        return _dt.parse(value, format, utc);
    }

    /**
     * Verificar se data em string é uma data valida pelo um formato específico.
     * 
     * @param {String} value Data e/ou hora em string a ser convertida
     * @param {String} format Formato da data e hora 
     * @returns {Boolean}
     */
    static isValid(value, format) {
        format = ((format == undefined) || (format == '')) ? this.FORMAT_DEFAULT : format;

        return _dt.isValid(value, format);
    }

    /**
     * Converter um data e hora em string em um formato especifico.
     * @param {Date} dt Data e hora
     * @param {String} format Formato a converter em string
     * @param {Boolean} utc
     * @returns {String}
     */
    static format(dt, format, utc = true) {
        // Veriifcar se o dt foi informado como numerico
        dt = (typeof dt == 'number') ? new Date(dt) : dt;

        // Tratar formatação
        format = ((format == undefined) || (format == '')) ? this.FORMAT_DEFAULT : format;

        // Converter
        //return df.asString(format, dt);
        return _dt.format(dt, format, utc);
    }

    /**
     * Adicionar anos.
     * 
     * @param {Date} dt Data e Hora
     * @param {Number} value Qtdade a ser somada
     * @returns {Date}
     */
    static addYears(dt, value) {
        return Carbon.__addFunc('addYears', dt, value);
    }

    /**
     * Adicionar meses.
     * 
     * @param {Date} dt Data e Hora
     * @param {Number} value Qtdade a ser somada
     * @returns {Date}
     */
    static addMonths(dt, value) {
        return Carbon.__addFunc('addMonths', dt, value);
    }

    /**
     * Adicionar dias.
     * 
     * @param {Date} dt Data e Hora
     * @param {Number} value Qtdade a ser somada
     * @returns {Date}
     */
    static addDays(dt, value) {
        return Carbon.__addFunc('addDays', dt, value);
    }

    /**
     * Adicionar horas.
     * 
     * @param {Date} dt Data e Hora
     * @param {Number} value Qtdade a ser somada
     * @returns {Date}
     */
    static addHours(dt, value) {
        return Carbon.__addFunc('addHours', dt, value);
    }

    /**
     * Adicionar minutos.
     * 
     * @param {Date} dt Data e Hora
     * @param {Number} value Qtdade a ser somada
     * @returns {Date}
     */
    static addMinutes(dt, value) {
        return Carbon.__addFunc('addMinutes', dt, value);
    }

    /**
     * Adicionar segundos.
     * 
     * @param {Date} dt Data e Hora
     * @param {Number} value Qtdade a ser somada
     * @returns {Date}
     */
    static addSeconds(dt, value) {
        return Carbon.__addFunc('addSeconds', dt, value);
    }

    /**
     * Adicionar milisegundos.
     * 
     * @param {Date} dt Data e Hora
     * @param {Number} value Qtdade a ser somada
     * @returns {Date}
     */
    static addMilliseconds(dt, value) {
        return Carbon.__addFunc('addMilliseconds', dt, value);
    }

    /**
     * Subtrair uma data da outra.
     * 
     * @param {Date} dt1 Data 1
     * @param {Date} dt2 Data 2
     * @returns {Date}
     */
    static subtract(dt1, dt2) {
        // Veriifcar se o dt foi informado como numerico
        dt1 = (typeof dt1 == 'number') ? new Date(dt1) : dt1;
        dt2 = (typeof dt2 == 'number') ? new Date(dt2) : dt2;

        return _dt.subtract(dt1, dt2);
    }

    /**
     * Retorna a data do primeiro dia da semana.
     * 
     * @param {Date} d Data base
     * @param {Boolean} utc De deve tratar como UTC
     * @returns {Date}
     */
    static getFirstDayWeek(d, utc = true) {
        if (utc) {
            var diff = d.getUTCDate() - d.getUTCDay();
            return new Date(d.setUTCDate(diff));
        } else {
            var diff = d.getDate() - d.getDay();
            return new Date(d.setDate(diff));
        }
    }

    /**
     * Retorna a data do último dia da semana.
     * 
     * @param {Date} d Data base
     * @param {Boolean} utc De deve tratar como UTC
     * @returns {Date}
     */
    static getLastDayWeek(d, utc = true) {
        if (utc) {
            var diff = d.getUTCDate() - d.getUTCDay() + 6;
            return new Date(d.setUTCDate(diff));
        } else {
            var diff = d.getDate() - d.getDay() + 6;
            return new Date(d.setDate(diff));
        }
    }

    /**
     * Retorna a data do último dia da mês.
     * 
     * @param {Date} d Data base
     * @param {Boolean} utc De deve tratar como UTC
     * @returns {Date}
     */
    static getLastDayMonth(d, utc = true) {
        // O Dia ZERO do mê sé o ultimo dia
        if (utc) {
            return new Date(d.getUTCFullYear(), d.getUTCMonth() + 1, 0);
        } else {
            return new Date(d.getFullYear(), d.getMonth() + 1, 0);
        }
    }

    /**
     * Executar função de add value a data.
     * 
     * @param {Date} dt Data e Hora
     * @param {Number} value Qtdade a ser somada
     * @returns {Date}
     */
     static __addFunc(func, dt, value) {
        // Veriifcar se o dt foi informado como numerico
        dt = (typeof dt == 'number') ? new Date(dt) : dt;

        return _dt[func](dt, value);
    }
}

module.exports = Carbon;