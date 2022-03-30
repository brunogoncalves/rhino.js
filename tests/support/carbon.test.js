const carbon = require('../../support/carbon');

test('Carbon - inicio e final do mes', () => {

    var dia = carbon.createFromFormat('2022-03-15', 'YYYY-MM-DD');

    var du = carbon.getLastDayMonth(dia);

    expect(carbon.format(dia, 'YYYY-MM-[01]')).toStrictEqual('2022-03-01');
    expect(carbon.format(du, 'YYYY-MM-DD')).toStrictEqual('2022-03-31');
});

test('Carbon - inicio e final da semana', () => {

    var dia = carbon.createFromFormat('2022-03-15', 'YYYY-MM-DD');

    var d1 = carbon.getFirstDayWeek(dia);
    var d2 = carbon.getLastDayWeek(dia);

    expect(carbon.format(d1, 'YYYY-MM-DD')).toStrictEqual('2022-03-13');
    expect(carbon.format(d2, 'YYYY-MM-DD')).toStrictEqual('2022-03-19');

    // Com virada de mês

    var dia = carbon.createFromFormat('2022-03-30', 'YYYY-MM-DD');

    var d1 = carbon.getFirstDayWeek(dia);
    var d2 = carbon.getLastDayWeek(dia);

    expect(carbon.format(d1, 'YYYY-MM-DD')).toStrictEqual('2022-03-27');
    expect(carbon.format(d2, 'YYYY-MM-DD')).toStrictEqual('2022-04-02');
});