import MapSingleton from '../MapSingleton';
import { distance, point, nearestPointOnLine, polygonToLine, pointToLineDistance, geomEach, flatten, segmentEach } from '@turf/turf'


class Interaction {
  constructor() {
    this.map = MapSingleton.getInstance().getMap();
    this.snapEnabled = true;
    this.tolerance = 3;
    this.minZoom = 16;
    this.snapedPoint = null;
    this.mousePoint = null;

    this.map.addSource('__interaction', {
      'type': 'geojson',
      'data': this.getEmptyDataSource()
    });

    this.map.addLayer({
      'id': '__interaction',
      "type": "symbol",
      'source': '__interaction',
      "layout": {
        "text-field": "×",
        "text-size": 24,
      },
      "paint": {
        "text-color": "magenta"
      }
    });
  }

  _snap(e) {
    const zoom = this.map.getZoom();
    if (zoom < this.minZoom) {
      this.map.getSource('__interaction').setData(this.getEmptyDataSource());
      this.snapedPoint = null;
      return;
    }

    var bbox = [
      [e.point.x - this.tolerance * 3, e.point.y - this.tolerance * 3],
      [e.point.x + this.tolerance * 3, e.point.y + this.tolerance * 3]
    ];
    const mousePoint = point([e.lngLat.lng, e.lngLat.lat]);
    const features = this.map.queryRenderedFeatures(bbox);

    if (!features.length) {
      this.map.getSource('__interaction').setData(this.getEmptyDataSource());
      this.snapedPoint = null;
      return;
    }

    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      const geom = feature.geometry;

      if (geom.type === 'Point') {
        const dist = distance(geom, mousePoint) * 1000.0;
        if (dist < this.tolerance) {
          this.map.getSource('__interaction').setData(feature);
        } else {
          this.map.getSource('__interaction').setData(this.getEmptyDataSource());
        }

      } else if (geom.type == 'MultiPolygon' || geom.type == 'Polygon') {
        let features = [];
        segmentEach(geom, (currentSegment) => {
          features.push(currentSegment);
        });

        features.sort((a, b) => {
          return pointToLineDistance(mousePoint, a) - pointToLineDistance(mousePoint, b);
        });

        const nearest = features[0];
        const nearestPoint = nearestPointOnLine(nearest, mousePoint);
        this.map.getSource('__interaction').setData(nearestPoint);

      } else if (geom.type == 'LineString' || geom.type == 'MultiLineString') {
        let features = [];
        segmentEach(geom, (currentSegment) => {
          features.push(currentSegment);
        });

        features.sort((a, b) => {
          return pointToLineDistance(mousePoint, a) - pointToLineDistance(mousePoint, b);
        });

        const nearest = features[0];
        const nearestPoint = nearestPointOnLine(nearest, mousePoint);
        this.map.getSource('__interaction').setData(nearestPoint);

      }
    }
  }

  _mouseMoveEvent(e) {
    if (this.snapEnabled) {
      this._snap(e);
      return;
    }
    this.mousePoint = point([e.lngLat.lng, e.lngLat.lat]);
  }

  _mouseMove() {
    this.map.on('mousemove', (e) => this._mouseMoveEvent(e));
  }

  getEmptyDataSource() {
    return {
      'type': 'FeatureCollection',
      'features': []
    }
  }

  getDataSourcePoint({ lat, lng }) {
    return {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [lng, lat]
          }
        }
      ]
    }
  }


  getPoint() {

    this._mouseMove();
  }
}

export default Interaction
