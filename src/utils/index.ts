export const dateFormat = (date) => {
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();

    return monthIndex + '-' + year;
}

export const nameFormat = (name) => {
    return name.replace(/ /ig, "");
}