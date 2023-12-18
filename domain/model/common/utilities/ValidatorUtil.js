export function isEmpty(variable) {
    return typeof variable === 'undefined' || variable === null || variable.trim() == '';
}