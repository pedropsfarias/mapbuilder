function gd2dms(coords) {
    function toDMS(value) {
        const degrees = Math.floor(Math.abs(value));
        const minutesFloat = (Math.abs(value) - degrees) * 60;
        const minutes = Math.floor(minutesFloat);
        const seconds = ((minutesFloat - minutes) * 60).toFixed(2);

        return `${degrees}° ${minutes}' ${seconds}"`;
    }

    const [longitude, latitude] = coords;

    const longitudeDir = longitude < 0 ? 'W' : 'E';
    const latitudeDir = latitude < 0 ? 'S' : 'N';

    const longitudeDMS = toDMS(longitude) + longitudeDir;
    const latitudeDMS = toDMS(latitude) + latitudeDir;

    return `${longitudeDMS} ${latitudeDMS}`;
}

export { gd2dms };