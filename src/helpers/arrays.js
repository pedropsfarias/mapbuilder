function rotateArray(arr, rotations, direction) {
    const len = arr.length;
    rotations = rotations % len;

    function rotateLeft(array, rot) {
        return array.slice(rot).concat(array.slice(0, rot));
    }

    function rotateRight(array, rot) {
        return array.slice(len - rot).concat(array.slice(0, len - rot));
    }

    if (direction === 'left') {
        return rotateLeft(arr, rotations);
    } else if (direction === 'right') {
        return rotateRight(arr, rotations);
    } else {
        throw new Error("Invalid direction. Use 'left' or 'right'.");
    }
}

export { rotateArray };