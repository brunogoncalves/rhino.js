const carbon = require('../../support/carbon');

test('Carbon - inicio e final do mes', () => {

    var dia = carbon.createFromFormat('2022-03-15', 'YYYY-MM-DD');

    expect(carbon.format(dia, 'YYYY-MM-[01]')).toStrictEqual('2022-03-01');
    expect(carbon.format(dia, 'YYYY-MM-LL')).toStrictEqual('2022-03-31');
});

test('Carbon - inicio e final da semana', () => {

    var dia = carbon.createFromFormat('2022-03-15', 'YYYY-MM-DD');

    expect(carbon.format(dia, 'YYYY-MM-W')).toStrictEqual('2022-03-13');
    expect(carbon.format(dia, 'YYYY-MM-WW')).toStrictEqual('2022-03-19');
});