/**
 * Задача 1.
 *
 * Напишите имплементацию функции Function.prototype.bind().
 *
 * Наша собственная функция bind() должна задавать контекст выполнения целевой функции,
 * и возвращать новую, привязанную версию целевой функции.
 *
 * Функция bind() должна обладать следующими параметрами:
 * - Первый параметр — это функция, контекст выполнения которой мы хотим привязать;
 * - Второй параметр — это объект (не массив), в контексте которого нужно вызывать функцию из первого параметра;
 * - Третий и все остальные параметры — это аргументы для вызова функции из первого параметра.
 *
 * Генерировать ошибки если:
 * - Первый параметр не является типом function;
 * - Второй параметр не является типом object;
 * - Второй параметр является массивом.
 *
 * Условия:
 * - Использовать встроенную функцию Function.prototype.bind() запрещено.
 */

// Решение

//Решение
const bind = function (func, objectObj, ...getFunc) {

    if (typeof func !== 'function') {
        throw new Error('The first argument should be a function');
    }
    if(typeof objectObj !== 'object') {
        throw new Error('Second argument should be an object');
    }
    if (Array.isArray(objectObj)) {
        throw new Error('The second argument should be an object and not an array');
    }

    return function () {
        return func.apply(objectObj, getFunc);
    }
};

function getName(greeting, message) {
    return `${greeting} ${message} ${this.name}`;
}

const user = { name: 'Walter', getName };
const oliver = { name: 'Oliver' };

const boundedGetName = bind(getName, oliver, 'Hello!', 'I am', '!');

console.log(user.getName('Hello!', 'My name is')); // Hello! My name is Walter.
console.log(boundedGetName()); // Hello! I am Oliver.