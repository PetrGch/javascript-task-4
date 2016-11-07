'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы or и and
 */
exports.isStar = false;

/*
 * Запрос к коллекции
 * @param {Array} collection
 * @params {...Function} – Функции для запроса
 * @returns {Array}
 */

exports.query = function (collection) {
    var friendsCollection = collection.slice();
    var arrayOfArguments = Array.prototype.slice.call(arguments, 1);
    function compare(a, b) {
        return a[0] - b[0];
    }
    var newListOfFriends = arrayOfArguments.sort(compare)
                    .reduce(function (acc, item) {
                        return item[1](acc, friendsCollection);
                    }, friendsCollection);

    return newListOfFriends;
};

/*
 * Выбор полей
 * @params {...String}
 */
exports.select = function () {
    var arrayOfArguments = Array.prototype.slice.call(arguments);
    var selected = function (acc) {
        acc = acc.map(function (item) {
            var obj = {};
            for (var i = 0; i < arrayOfArguments.length; i++) {
                var propsName = arrayOfArguments[i];
                var property = item[propsName];
                if (item.hasOwnProperty(propsName)) {
                    obj[propsName] = property;
                }
            }

            return obj;
        });

        return acc;
    };

    return [3, selected, arrayOfArguments];
};

/*
 * Фильтрация поля по массиву значений
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Доступные значения
 */
exports.filterIn = function (property, values) {

    var filtered = function (acc) {
        return acc.filter(function (item) {
            if (values.indexOf(item[property]) !== -1) {
                return true;
            }

            return false;
        });
    };

    return [1, filtered];
};

/*
 * Сортировка коллекции по полю
 * @param {String} property – Свойство для фильтрации
 * @param {String} order – Порядок сортировки (asc - по возрастанию; desc – по убыванию)
 */
exports.sortBy = function (property, order) {
    var sorted = function (acc) {
        acc.sort(function (a, b) {
            var second = b[property];
            var first = a[property];
            if (first === second) {
                return 0;
            }
            if (order === 'asc') {
                return (first > second);
            }

            return (first < second);
        });

        return acc;
    };

    return [2, sorted];
};

/*
 * Форматирование поля
 * @param {String} property – Свойство для фильтрации
 * @param {Function} formatter – Функция для форматирования
 */
exports.format = function (property, formatter) {
    var formated = function (acc) {
        return acc.map(function (item) {
            item[property] = formatter(item[property]);

            return item;
        });
    };

    return [4, formated];
};

/*
 * Ограничение количества элементов в коллекции
 * @param {Number} count – Максимальное количество элементов
 */
exports.limit = function (count) {

    var limited = function (acc) {
        return acc.slice(0, count);
    };

    return [5, limited];
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
