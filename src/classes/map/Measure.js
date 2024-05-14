import Interaction from './Interaction.js';
import MapSingleton from '../MapSingleton.js';
import { featureEach, segmentEach, length, area, rhumbBearing, point } from '@turf/turf';
import { gd2dms } from '@/helpers/coords.js';

class Measure {
  constructor() {
    this.interaction = new Interaction();
    this.map = MapSingleton.getInstance().getMap();
    this._createInternalLayers();
  }

  _createInternalLayers() {
    this.map.addSource('__measureDraw', {
      type: 'geojson',
      data: this._getEmptyDataSource()
    });

    this.map.addLayer({
      id: '__measureDrawPolygon',
      type: 'fill',
      source: '__measureDraw',
      paint: {
        'fill-color': '#000',
        'fill-opacity': 0.1
      }
    });

    this.map.addLayer({
      id: '__measureDrawLine',
      type: 'line',
      source: '__measureDraw',
      paint: {
        'line-color': '#555',
        'line-width': 2
      }
    });

    this.map.addLayer({
      id: '__measureDrawPoint',
      type: 'circle',
      source: '__measureDraw',
      paint: {
        'circle-radius': 3,
        'circle-color': '#000'
      }
    });

    //label
    this.map.addLayer({
      id: '__measureDrawCoordsLabel',
      type: 'symbol',
      source: '__measureDraw',
      layout: {
        'text-field': ['get', 'label'],
        'text-size': 12,
        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
        'text-radial-offset': 0.5
      },
      filter: ['==', 'measureType', 'coords']
    });

    this.map.addLayer({
      id: '__measureDrawDistanceLabel',
      type: 'symbol',
      source: '__measureDraw',
      layout: {
        'text-font': ['Noto Sans Bold'],
        'text-field': ['get', 'label'],
        'symbol-placement': 'line-center',
        'text-size': 12,
        'text-justify': 'center',
        'text-allow-overlap': true,
        'text-ignore-placement': true
      },
      paint: {
        'text-color': '#000',
        'text-halo-color': '#FFF',
        'text-halo-width': 2,
        'text-halo-blur': 0.5
      },
      filter: ['==', 'measureType', 'distance']
    });

    this.map.addLayer({
      id: '__measureDrawAzimuthLabel',
      type: 'symbol',
      source: '__measureDraw',
      layout: {
        'text-font': ['Noto Sans Bold'],
        'text-field': ['get', 'label'],
        'symbol-placement': 'line-center',
        'text-size': 12,
        'text-justify': 'center',
        'text-allow-overlap': true,
        'text-ignore-placement': true
      },
      paint: {
        'text-color': '#000',
        'text-halo-color': '#FFF',
        'text-halo-width': 2,
        'text-halo-blur': 0.5
      },
      filter: ['==', 'measureType', 'azimuth']
    });

    this.map.addLayer({
      id: '__measureDrawAreaLabel',
      type: 'symbol',
      source: '__measureDraw',
      layout: {
        'text-font': ['Noto Sans Bold'],
        'text-field': ['get', 'label'],
        'symbol-placement': 'point',
        'text-size': 12,
        'text-justify': 'center',
        'text-allow-overlap': true,
        'text-ignore-placement': true
      },
      paint: {
        'text-color': '#000',
        'text-halo-color': '#FFF',
        'text-halo-width': 2,
        'text-halo-blur': 0.5
      },
      filter: ['==', 'measureType', 'area']
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
      type: 'FeatureCollection',
      features: []
    };
  }

  _updateSourceData(inputFeatures) {
    let data = this.map.getSource('__measureDraw')._data;
    let features = [];

    featureEach(data, (currentFeature) => {
      features.push(currentFeature);
    });

    featureEach(inputFeatures, (currentFeature) => {
      features.push(currentFeature);
    });

    this.map.getSource('__measureDraw').setData({
      type: 'FeatureCollection',
      features: features
    });

    console.log(this.map.getSource('__measureDraw')._data);
  }

  _getDistance(featureCollection) {
    const features = [];
    segmentEach(featureCollection, (currentSegment) => {
      const featureLength = length(currentSegment);
      currentSegment.properties = {
        label: `${(featureLength * 1000.0).toFixed(2)} m`,
        value: featureLength,
        measureType: 'distance'
      };
      features.push(currentSegment);
    });
    let sum = features.reduce((acc, current) => {
      return acc + current.properties.value;
    }, 0);
    const sumFeatures = [];
    const collection = {
      type: 'FeatureCollection',
      features: features
    };
    segmentEach(collection, (currentSegment) => {
      currentSegment.properties = {
        label: currentSegment.properties.label,
        value: currentSegment.properties.value,
        measureType: currentSegment.properties.measureType,
        total: `${(sum * 1000.0).toFixed(2)} m`
      };
      sumFeatures.push(currentSegment);
    });
    return {
      type: 'FeatureCollection',
      features: sumFeatures
    };
  }

  _getArea(featureCollection) {
    const features = [];
    featureEach(featureCollection, (currentFeature) => {
      const featureArea = area(currentFeature);
      currentFeature.properties = {
        label: `${(featureArea / 1000000.0).toFixed(2)} km²`,
        value: featureArea,
        measureType: 'area'
      };
      features.push(currentFeature);
    });
    return {
      type: 'FeatureCollection',
      features: features
    };
  }

  _getAzimuth(featureCollection) {
    const features = [];
    segmentEach(featureCollection, (currentSegment) => {
      const coords = currentSegment.geometry.coordinates;
      const start = point(coords[0]);
      const end = point(coords[1]);
      const azimuth = rhumbBearing(start, end);
      currentSegment.properties = {
        label: `Az ${azimuth.toFixed(2)}°`,
        value: azimuth,
        measureType: 'azimuth'
      };
      features.push(currentSegment);
    });
    return {
      type: 'FeatureCollection',
      features: features
    };
  }

  async getCoordinates() {
    let feature = await this.interaction.getPoint();
    let coords = feature.geometry.coordinates;
    let formattedCoords = gd2dms(coords);
    feature.properties = {
      label: formattedCoords,
      value: coords,
      measureType: 'coords'
    };
    this._updateSourceData(feature);
    return feature;
  }

  async getDistance() {
    let feature = await this.interaction.getLineString();
    let features = this._getDistance(feature);
    this._updateSourceData(features);
    return features;
  }

  async getArea() {
    let feature = await this.interaction.getPolygon();
    let features = this._getArea(feature);
    this._updateSourceData(features);
    return features;
  }

  async getAzimuth() {
    let feature = await this.interaction.getLineString();
    let features = this._getAzimuth(feature);
    this._updateSourceData(features);
    return features;
  }

  clear() {
    this.map.getSource('__measureDraw').setData(this._getEmptyDataSource());
  }
}

export default Measure;
