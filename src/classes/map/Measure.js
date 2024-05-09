import Interaction from './Interaction.js';
import MapSingleton from '../MapSingleton.js';
import { featureEach, segmentEach, length, area } from '@turf/turf';

class Measure {
  constructor() {
    this.interaction = new Interaction();
    this.map = MapSingleton.getInstance().getMap();
    this._createInternalLayers();
  }

  _createInternalLayers() {
    this.map.addSource('__measureDraw', {
      'type': 'geojson',
      'data': this._getEmptyDataSource()
    });

    this.map.addLayer({
      'id': '__measureDrawPolygon',
      'type': 'fill',
      'source': '__measureDraw',
      'paint': {
        'fill-color': '#000',
        'fill-opacity': 0.1
      },
    });

    this.map.addLayer({
      'id': '__measureDrawLine',
      'type': 'line',
      'source': '__measureDraw',
      'paint': {
        'line-color': '#555',
        'line-width': 2
      },
    });

    this.map.addLayer({
      'id': '__measureDrawPoint',
      'type': 'circle',
      'source': '__measureDraw',
      'paint': {
        'circle-radius': 3,
        'circle-color': '#000',
      },
    });

    //label 
    this.map.addLayer({
      'id': '__measureDrawCoordsLabel',
      'type': 'symbol',
      'source': '__measureDraw',
      'layout': {
        'text-field': ['get', 'label'],
        'text-size': 12,
        "text-anchor": "top-left",
        "text-offset": [0.2, 0.2]
      },
      'filter': ['==', 'measureType', 'coords']
    });

    this.map.addLayer({
      'id': '__measureDrawDistanceLabel',
      'type': 'symbol',
      'source': '__measureDraw',
      'layout': {
        "text-font": ["Noto Sans Bold"],
        'text-field': ['get', 'label'],
        "symbol-placement": "line-center",
        "text-size": 12,
        "text-justify": "center",
        "text-allow-overlap": true,
        "text-ignore-placement": true
      },
      "paint": {
        "text-color": "#000",
        "text-halo-color": "#FFF",
        "text-halo-width": 2,
        "text-halo-blur": 0.5
      },
      'filter': ['==', 'measureType', 'distance']
    });

    this.map.addLayer({
      'id': '__measureDrawAreaLabel',
      'type': 'symbol',
      'source': '__measureDraw',
      'layout': {
        "text-font": ["Noto Sans Bold"],
        'text-field': ['get', 'label'],
        "symbol-placement": "point",
        "text-size": 12,
        "text-justify": "center",
        "text-allow-overlap": true,
        "text-ignore-placement": true
      },
      "paint": {
        "text-color": "#000",
        "text-halo-color": "#FFF",
        "text-halo-width": 2,
        "text-halo-blur": 0.5
      },
      'filter': ['==', 'measureType', 'area']
    });
  }

  /**
   * @private
   * @memberof Interaction
   * @description Get empty data source
   * @returns {Object} Empty data source
   */
  _getEmptyDataSource() {
    return {
      'type': 'FeatureCollection',
      'features': []
    }
  }

  _gd2dms(coords) {

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

  _updateSourceData(inputFeatures) {

    let data = this.map.getSource('__measureDraw')._data;
    let features = [];

    segmentEach(data, (currentFeature) => {
      features.push(currentFeature);
    });

    featureEach(inputFeatures, (currentFeature) => {
      features.push(currentFeature);
    });

    this.map.getSource('__measureDraw').setData({
      'type': 'FeatureCollection',
      'features': features
    });

    console.log(this.map.getSource('__measureDraw')._data);
  }

  _getDistance(featureCollection) {
    const features = [];
    segmentEach(featureCollection, (currentSegment) => {
      const featureLength = length(currentSegment);
      currentSegment.properties = {
        'label': `${(featureLength * 1000.0).toFixed(2)} m`,
        'measureType': 'distance'
      };
      features.push(currentSegment);
    });
    return {
      'type': 'FeatureCollection',
      'features': features
    };
  }

  _getArea(featureCollection) {
    const features = [];
    featureEach(featureCollection, (currentFeature) => {
      const featureArea = area(currentFeature);
      currentFeature.properties = {
        'label': `${(featureArea / 1000000.0).toFixed(2)} km²`,
        'measureType': 'area'
      };
      features.push(currentFeature);
    });
    return {
      'type': 'FeatureCollection',
      'features': features
    };
  }
  // _measureDistances(features) {
  //   const featuresDist = [];
  //   segmentEach(features, (currentSegment) => {
  //     featuresDist.push(this._getDistance(currentSegment));
  //   });
  //   return {
  //     'type': 'FeatureCollection',
  //     'features': featuresDist
  //   };
  // }

  async getCoordinates() {
    let feature = await this.interaction.getPoint();
    let coords = feature.geometry.coordinates;
    let formattedCoords = this._gd2dms(coords);
    feature.properties = {
      'label': formattedCoords,
      'measureType': 'coords'
    };
    this._updateSourceData(feature);
    return feature;
  }

  async getDistance() {
    let feature = await this.interaction.getLineString();
    let features = this._getDistance(feature);
    this._updateSourceData(features);
    return feature;
  }

  async getArea() {
    let feature = await this.interaction.getPolygon();
    let features = this._getArea(feature);
    this._updateSourceData(features);
    return feature;
  }

}

export default Measure
