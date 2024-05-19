import { convert } from 'geo-coordinates-parser';

class CoordinateProvider {
  static seach(text) {
    try {
      let converted = convert(text);
      return [
        {
          "type": "coordinates",
          "lat": converted.decimalLatitude,
          "lng": converted.decimalLongitude,
          "label": text,
        }
      ];
    }
    catch {
      return [];
    }
  }
}

export default CoordinateProvider;