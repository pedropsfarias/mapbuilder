import MapSingleton from '../MapSingleton';
import { distance, point, nearestPointOnLine, polygonToLine, pointToLineDistance, geomEach, flatten, segmentEach } from '@turf/turf'


class Interaction {
  constructor() {
    this.map = MapSingleton.getInstance().getMap()
    this.tolerance = 3
    this.isRunning = false;
  }

  _mouseMove() {
    this.map.on('mousemove', (e) => {

      if (this.isRunning) return;

      var bbox = [
        [e.point.x - this.tolerance * 3, e.point.y - this.tolerance * 3],
        [e.point.x + this.tolerance * 3, e.point.y + this.tolerance * 3]
      ];
      const mousePoint = point([e.lngLat.lng, e.lngLat.lat]);
      const features = this.map.queryRenderedFeatures(bbox);

      if (!features.length) {
        this.map.getSource('point').setData(this.getDataSourcePoint({ lat: 0, lng: 0 }));
        return;
      }

      for (let i = 0; i < features.length; i++) {
        const feature = features[i];
        const geom = feature.geometry;

        if (geom.type === 'Point') {
          const dist = distance(geom, mousePoint) * 1000.0;
          if (dist < this.tolerance) {
            const coordinates = feature.geometry.coordinates.slice();
            this.map.getSource('point').setData(this.getDataSourcePoint({ lat: coordinates[1], lng: coordinates[0] }));
          } else {
            this.map.getSource('point').setData(this.getDataSourcePoint({ lat: 0, lng: 0 }));
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
          // this.map.getSource('test').setData(nearest);

          //nearestPointOnLine
          const nearestPoint = nearestPointOnLine(nearest, mousePoint);
          this.map.getSource('point').setData(nearestPoint);

        } else if (geom.type == 'LineString' || geom.type == 'MultiLineString') {
          let features = [];
          segmentEach(geom, (currentSegment) => {
            features.push(currentSegment);
          });

          features.sort((a, b) => {
            return pointToLineDistance(mousePoint, a) - pointToLineDistance(mousePoint, b);
          });

          const nearest = features[0];
          // this.map.getSource('test').setData(nearest);

          //nearestPointOnLine
          const nearestPoint = nearestPointOnLine(nearest, mousePoint);
          this.map.getSource('point').setData(nearestPoint);

        }




      }


    })
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

    const geojson = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [0, 0]
          }
        }
      ]
    };

    this.map.addSource('point', {
      'type': 'geojson',
      'data': geojson
    });

    this.map.addLayer({
      'id': 'point',
      "type": "symbol",
      'source': 'point',
      "layout": {
        "text-field": "×", // Unicode character for 'X'
        "text-size": 24,
      },
      "paint": {
        "text-color": "magenta"
      }
    });

    this.map.addSource('test', {
      'type': 'geojson',
      'data': geojson
    });

    this.map.addLayer({
      'id': 'test',
      "type": "line",
      'source': 'test',
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#ff0000", // Red lines
        "line-width": 8,
        "line-opacity": 0.8
      }
    });

    this._mouseMove();
  }
}

export default Interaction
