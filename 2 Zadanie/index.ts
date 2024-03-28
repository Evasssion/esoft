function deepCopy(obj: any, hash = new WeakMap()) {
    if (Object(obj) !== obj || obj instanceof Function || obj instanceof Symbol) {
        return obj; // Возвращаем примитивные типы, функции и символы как они есть
    }

    if (hash.has(obj)) {
        return hash.get(obj); // Возвращаем копию из хранилища, если объект уже скопирован
    }

    let result: any;

    if (obj instanceof Date) {
        result = new Date(obj);
    } else if (obj instanceof Map) {
        result = new Map(Array.from(obj, ([key, val]) => [key, deepCopy(val, hash)]));
    } else if (obj instanceof Set) {
        result = new Set(Array.from(obj, val => deepCopy(val, hash)));
    } else if (Array.isArray(obj)) {
        result = obj.map(item => deepCopy(item, hash));
    } else if (obj instanceof Object) {
        result = Object.create(Object.getPrototypeOf(obj));
        hash.set(obj, result);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = deepCopy(obj[key], hash);
            }
        }
    }

    return result;
}