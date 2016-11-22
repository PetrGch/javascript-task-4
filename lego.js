'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы or и and
 */
exports.isStar = false;


var FUNCTION_PRIORATY = {
    filterIn: 1,
    sortBy: 2,
    select: 3,
    format: 4,
    limit: 5
};

/**
* Запрос к коллекции
* @param {Array} collection – Массив объектов (список друзей)
* @returns {Array} clonObject – Склонированный массив объектов (список друзей)
*/

function cloneCollection(collection) {
    return collection.map(function (item) {
        var clonObject = {};

        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                clonObject[key] = item[key];
            }
        }

        return clonObject;
    });
}

/**
* Запрос к коллекции
* @param {Array} collection – Массив объектов (список друзей)
* @params {...Function} – Функции для запроса
* @returns {Array} – Обработанный массив объектов (список друзей)
*/
exports.query = function (collection) {
    var arrayOfArguments = [].slice.call(arguments, 1);
    var friendsCollection = cloneCollection(collection);

    function sortArg(a, b) {
        return FUNCTION_PRIORATY[a.name] - FUNCTION_PRIORATY[b.name];
    }

    return arrayOfArguments.sort(sortArg)
                            .reduce(function (accFriends, item) {
                                return item(accFriends);
                            }, friendsCollection);
};

/**
 * Выбор полей
 * @params {...String}
 * @return {Function} select - выбирает определенные поля из объектов
 */

exports.select = function () {
    var arrayOfArguments = [].slice.call(arguments);

    return function select(accFriends) {
        return accFriends.map(function (friendItem) {
            var objectOfFriend = {};
            for (var i = 0; i < arrayOfArguments.length; i++) {
                var property = arrayOfArguments[i];
                if (friendItem.hasOwnProperty(property)) {
                    objectOfFriend[property] = friendItem[property];
                }
            }

            return objectOfFriend;
        });
    };
};

/**
 * Фильтрация поля по массиву значений
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Доступные значения
 * @returns {Function} acc - отфильтрованный массив объектов
 */

exports.filterIn = function (property, values) {
    return function filterIn(accFriends) {
        return accFriends.filter(function (item) {
            return (values.indexOf(item[property]) !== -1);
        });
    };
};

/**
 * Сортировка коллекции по полю
 * @param {String} property – Свойство для фильтрации
 * @param {String} order – Порядок сортировки (asc - по возрастанию; desc – по убыванию)
 * @return {Function} sortBy – сортирует объекты в массиве
 */

exports.sortBy = function (property, order) {
    return function sortBy(accFriends) {
        return accFriends.sort(function (a, b) {
            var first = a[property];
            var second = b[property];
            if (order === 'asc') {
                return (first <= second) ? -1 : 1;
            }

            return (first < second) ? 1 : -1;
        });
    };
};

/**
 * Форматирование поля
 * @param {String} property – Свойство для фильтрации
 * @param {Function} formatter – Функция для форматирования
 * @return {Function} format – форматирует поля объектов
 */

exports.format = function (property, formatter) {
    return function format(accFriends) {
        return accFriends.map(function (item) {
            item[property] = formatter(item[property]);

            return item;
        });
    };
};

/**
 * Ограничение количества элементов в коллекции
 * @param {Number} count – Максимальное количество элементов
 * @return {Function} limit – обрезает количество объектов массива
 */

exports.limit = function (count) {

    return function limit(accFriends) {
        return accFriends.slice(0, count);
    };
};

if (exports.isStar) {

    /**
     * Фильтрация, объединяющая фильтрующие функции
     * @star
     * @params {...Function} – Фильтрующие функции
     */
    exports.or = function () {
        return;
    };

    /**
     * Фильтрация, пересекающая фильтрующие функции
     * @star
     * @params {...Function} – Фильтрующие функции
     */
    exports.and = function () {
        return;
    };
}
