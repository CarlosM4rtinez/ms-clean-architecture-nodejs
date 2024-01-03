export function isEmpty(variable) {
    return typeof variable === 'undefined' || variable === null || variable.trim() == '';
}

export function listIsEmpty(list) {
    return !list || list.length === 0;
}