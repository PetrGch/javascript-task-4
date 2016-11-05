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
    var selectArg = [];
    var newListOfFriends = arrayOfArguments.sort(compare)
                    .reduce(function (acc, item) {
                        if (item[2]) {
                            selectArg = selectArg.concat(item[2]);
                        }

                        return item[1](acc, friendsCollection, selectArg);
                    }, friendsCollection);

    return newListOfFriends.filter(function (item) {
        if (item) {
            return true;
        }

        return false;
    });
};

/*
 * Выбор полей
 * @params {...String}
 */
exports.select = function () {
    var arrayOfArguments = Array.prototype.slice.call(arguments);
    var arr = [];
    var selected = function (acc, friendsCollection, arg) {
        acc.forEach(function (item, index) {
            for (var i = 0; i < arg.length; i++) {
                var propsName = arg[i];
                var property = friendsCollection[index][arg[i]];
                if (arr[index] === undefined) {
                    arr[index] = {};
                }
                if (acc[index] === false) {
                    arr[index] = false;
                }
                if (property && acc[index]) {
                    arr[index][propsName] = property;
                }
            }
        });

        return arr;
    };

    return [3, selected, arrayOfArguments];
};

/*
 * Фильтрация поля по массиву значений
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Доступные значения
 */
exports.filterIn = function (property, values) {

    var filtered = function (acc, friendsCollection) {
        acc = acc.map(function (item, index) {
            var friendsItem = friendsCollection[index];
            if (friendsItem.hasOwnProperty(property) &&
                values.indexOf(friendsItem[property]) !== -1) {

                return true;
            }


            return false;
        });

        return acc;
    };

    return [2, filtered];
};

/*
 * Сортировка коллекции по полю
 * @param {String} property – Свойство для фильтрации
 * @param {String} order – Порядок сортировки (asc - по возрастанию; desc – по убыванию)
 */
exports.sortBy = function (property, order) {

    var sorted = function (acc) {
        acc.sort(function (a, b) {
            var first = a[property];
            var second = b[property];
            if (order === 'asc') {
                return (first > second) ? 1 : -1;
            }

            return (first < second) ? 1 : -1;
        });

        return acc;
    };

    return [1, sorted];
};

/*
 * Форматирование поля
 * @param {String} property – Свойство для фильтрации
 * @param {Function} formatter – Функция для форматирования
 */
exports.format = function (property, formatter) {
    var formated = function (acc) {
        acc = acc.filter(function (item) {
            if (item && item.hasOwnProperty(property)) {
                item[property] = formatter(item[property]);

                return true;
            }

            return false;
        });

        return acc;
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
