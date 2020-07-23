/*
 * Задача 4.
 *
 * Напишите функции compose(), которая в качестве аргументов принимает неограниченное количество функций.
 *
 * При запуске compose() последовательно запускает коллбек-функции из аргументов.
 *
 * Важно: compose() выполняет коллбек-функции из аргументов НАЧИНАЯ С КОНЦА.
 *
 * Каждая коллбек-функция из цепочки в качестве своего аргумента принимает то, что возвращает предыдущая коллбек-функция.
 * То есть возвращаемое значение каждой коллбек-функции из цепочки
 * становится доступным из параметра следующей коллбек-функции в цепочке.
 *
 * Функция compose() возвращает ещё одну функцию с одним параметром.
 * Значение, переданное этой функции в качестве аргумента должно стать
 * параметром первой коллбек-функции в цепочке выполнения функции compose().
 *
 * Итого, подпись функции compose: `compose(f, g)(x) = f(g(x))`.
 *
 * Генерировать ошибки если:
 * - Любой из аргументов не является функцией;
 * - Любая функция из аргументов не вернула значение.
 *
 * Заметка:
 * Если функции, которая является возвращаемым значением compose()
 * не передать в качестве аргумента какое-либо значение, генерировать ошибку не нужно.
 */

const compose = (...functions) => {
    const isFunction = functions.some((item) => typeof item !== 'function');

    if(isFunction) {
        throw new Error('Each function argument should be a function');
    }

    return (arg) => {

        let result = null;
        const reversedFunctions = functions.reverse();

        for (let i = 0; i < reversedFunctions.length; i++) {
            let func = reversedFunctions[i];

            let internalResult = null;

            if (i === 0) {
                internalResult = func(arg);
            } else {
                internalResult = func(result);
            }

            if(!internalResult){
                throw new Error(`Function number ${i++} didn't return any value`)
            }

            result = internalResult;
        }

        return result;
    };
};

const result1 = compose(
    (prevResult) => prevResult + "o",
    (prevResult) => prevResult + "l",
    (prevResult) => prevResult + "l",
    // (prevResult) => {},
    (prevResult) => prevResult + "e",
)("h");
const result2 = compose(
    (prevResult) => prevResult + "o",
    (prevResult) => prevResult + "l",
    (prevResult) => prevResult + "l",
    (prevResult) => prevResult + "e",
    () => "h"
)();
console.log(result1); // 'hello'
console.log(result2); // 'hello'