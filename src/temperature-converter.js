function convertToF(celsius) {
    return celsius * 9/5 + 32;
}

function convertToC(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

export { convertToF, convertToC };
