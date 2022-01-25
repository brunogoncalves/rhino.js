const arr = require('../../support/arr');

test('Arr.exists', () => {
    var obj = { nome: 'usuario', idade: 38 };

    expect(arr.exists(null, 'nome')).toStrictEqual(false);
    expect(arr.exists(obj, 'nome')).toStrictEqual(true);
    expect(arr.exists(obj, 'sobrenome')).toStrictEqual(false);
    expect(arr.exists(obj, 'idade')).toStrictEqual(true);
    expect(arr.exists(obj, 'id')).toStrictEqual(false);
    
    expect(arr.exists({}, 'id')).toStrictEqual(false);
});

test('Arr.get', () => {
    var obj = { nome: 'usuario', idade: 38, endereco: { numero: '123' } };

    expect(arr.get(null, 'nome', 'meu nome')).toBe('meu nome');
    expect(arr.get(123, 'nome', 'meu nome')).toBe('meu nome');
    expect(arr.get(true, 'nome', 'meu nome')).toBe('meu nome');
    expect(arr.get(obj, 'nome')).toBe('usuario');
    expect(arr.get(obj, 'nome', 'teste')).toBe('usuario');
    expect(arr.get(obj, 'sobrenome')).toBeNull();
    expect(arr.get(obj, 'sobrenome', 'teste')).toBe('teste');
    expect(arr.get(obj, 'endereco.numero', '100')).toBe('123');
    expect(arr.get(obj, 'endereco.logradouro')).toBeNull();
    expect(arr.get(obj, 'endereco.logradouro', 'Rua')).toBe('Rua');
    expect(arr.get(obj, 'endereco.logradouro.', 'Rua')).toBe('Rua');
});

test('Arr.only', () => {
    var obj = { nome: 'usuario', idade: 38, endereco: { numero: '123' } };

    expect(arr.only(obj, ['nome'])).toEqual({ nome: 'usuario'});
    expect(arr.only(obj, ['nome'])).not.toEqual({ nome: 'teste'});
});

test('Arr.except', () => {
    var obj = { nome: 'usuario', idade: 38, endereco: { numero: '123' } };

    expect(arr.except(obj, ['endereco'])).toEqual({ nome: 'usuario', idade: 38 });
});
