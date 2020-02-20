export function euler(old, der, h) {
    var result;

    result = old + h * der;

    return result;
};