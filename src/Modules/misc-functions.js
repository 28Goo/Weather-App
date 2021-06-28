function capitalizeFirstLetter(string) {
    let words = string.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
}

function resetInput(location) {
    const input = document.getElementById('query-location');
    input.placeholder = input.value;
    if (!location) input.placeholder = '';
    input.value = null;
}

function resetContainer(container) {
    container.innerHTML = null;
}

export { capitalizeFirstLetter, resetInput, resetContainer }