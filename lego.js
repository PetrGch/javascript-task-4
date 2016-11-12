'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы or и and
 */
exports.isStar = false;

var PRIORITIES = {
    'limit': 5,
    'format': 4,
    'select': 3,
    'sortBy': 2,
    'filterIn': 1
};

function clone(array) {
    return array.map(function (element) {
        return Object.assign({}, element);
    });
}

/**
 * Запрос к коллекции
 * @param {Array} collection
 * @params {...Function} – Функции для запроса
 * @returns {Array}
 */
exports.query = function (collection) {
    var functions = [].slice.call(arguments, 1);
    var copy = clone(collection);

    functions = functions.sort(function (one, another) {
        return PRIORITIES[one.name] - PRIORITIES[another.name];
    });

    return functions.reduce(function (array, func) {
        return func(array);
    }, copy);
};

/**
 * Выбор полей
 * @params {...String}
 * @returns {Function}
 */
exports.select = function () {
    var properties = [].slice.call(arguments);

    return function select(collection) {
        return collection.map(function (item) {
            return properties.reduce(function (object, property) {
                if (item.hasOwnProperty(property)) {
                    object[property] = item[property];
                }

                return object;
            }, {});
        });
    };
};

/**
 * Фильтрация поля по массиву значений
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Доступные значения
 * @returns {Function}
 */
exports.filterIn = function (property, values) {
    return function filterIn(collection) {
        return collection.filter(function (person) {
            return (values.indexOf(person[property]) !== -1);
        });
    };
};

/**
 * Сортировка коллекции по полю
 * @param {String} property – Свойство для фильтрации
 * @param {String} order – Порядок сортировки (asc - по возрастанию; desc – по убыванию)
 * @returns {Function}
 */
exports.sortBy = function (property, order) {
    var key = order === 'asc' ? 1 : -1;

    return function sortBy(collection) {
        return collection.sort(function (one, another) {
            if (one[property] < another[property]) {
                return -1 * key;
            }
            if (one[property] > another[property]) {
                return key;
            }

            return 0;
        });
    };
};

/**
 * Форматирование поля
 * @param {String} property – Свойство для фильтрации
 * @param {Function} formatter – Функция для форматирования
 * @returns {Function}
 */
exports.format = function (property, formatter) {
    return function format(collection) {
        return collection.map(function (person) {
            person[property] = formatter(person[property]);

            return person;
        });
    };
};

/**
 * Ограничение количества элементов в коллекции
 * @param {Number} count – Максимальное количество элементов
 * @returns {Function}
 */
exports.limit = function (count) {
    return function limit(collection) {
        if (count < 0) {
            throw new RangeError('Count should be positive number');
        }

        return collection.slice(0, count);
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
