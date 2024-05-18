let squentialId = 0;

function generateId() {
    return squentialId++;
}

export { generateId };