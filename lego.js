'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы or и and
 */
exports.isStar = false;

/**
 * Запрос к коллекции
 * @param {Array} collection
 * @params {...Function} – Функции для запроса
 * @returns {Array}
 */

var PRIORITY = {
    filterIn: 1,
    sortBy: 2,
    select: 3,
    format: 4,
    limit: 5
};

function cloneCollection(collection) {
    return collection.map(function (item) {
        // if (Object.assign({})) {
        //     return Object.assign({}, item);
        // }

        var clonObject = {};
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                clonObject[key] = item[key];
            }
        }

        return clonObject;
    });
}

exports.query = function (collection) {
    var arrayOfArguments = [].slice.call(arguments, 1);
    var friendsCollection = cloneCollection(collection);

    function sortArg(a, b) {
        return PRIORITY[a.name] - PRIORITY[b.name];
    }

    return arrayOfArguments.sort(sortArg)
                            .reduce(function (acc, item) {
                                return item(acc);
                            }, friendsCollection);
};

/**
 * Выбор полей
 * @params {...String}
 * @return {Function} select - выбирает определенные поля из объектов
 */

exports.select = function () {
    var arrayOfArguments = [].slice.call(arguments);

    return function select(acc) {
        return acc.map(function (friendItem) {
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
    return function filterIn(acc) {
        return acc.filter(function (item) {
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
    return function sortBy(acc) {
        return acc.sort(function (a, b) {
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
    return function format(acc) {
        return acc.map(function (item) {
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

    return function limit(acc) {
        return acc.slice(0, count);
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
