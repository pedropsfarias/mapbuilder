import MapSingleton from '../MapSingleton';
import { distance, point, nearestPointOnLine, pointToLineDistance, segmentEach } from '@turf/turf'

class Interaction {
  constructor() {
    this.map = MapSingleton.getInstance().getMap();
    this.snapEnabled = true;
    this.tolerance = 3;
    this.minZoom = 16;
    this.snapedPoint = null;
    this.mousePoint = null;

    this._createInternalLayer();
  }

  /**
   * @private
   * @memberof Interaction
   * @description Create internal layer for snapping
   * @returns {void}
   */
  _createInternalLayer() {
    this.map.addSource('__interaction', {
      'type': 'geojson',
      'data': this._getEmptyDataSource()
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

  /**
   * @private
   * @memberof Interaction
   * @description Snap to nearest point
   * @param {Object} e
   * @returns {void}
   */
  _snap(e) {
    const zoom = this.map.getZoom();
    if (zoom < this.minZoom) {
      this.map.getSource('__interaction').setData(this._getEmptyDataSource());
      this.snapedPoint = null;
      return;
    }

    const bbox = [
      [e.point.x - this.tolerance * 3, e.point.y - this.tolerance * 3],
      [e.point.x + this.tolerance * 3, e.point.y + this.tolerance * 3]
    ];
    const mousePoint = point([e.lngLat.lng, e.lngLat.lat]);
    const features = this.map.queryRenderedFeatures(bbox);

    if (!features.length) {
      this.map.getSource('__interaction').setData(this._getEmptyDataSource());
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
          this.map.getSource('__interaction').setData(this._getEmptyDataSource());
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

  /**
   * @private
   * @memberof Interaction
   * @description Mouse move event handler
   * @param {Object} e
   * @returns {void}
   */
  _mouseMoveEventHandler(e) {
    if (this.snapEnabled) {
      this._snap(e);
      return;
    }
  }

  /**
   * @private
   * @memberof Interaction
   * @description Watch mouse move event
   * @returns {void}
   */
  _watchMouseMove() {
    this._mouseMoveFunction = (e) => this._mouseMoveEventHandler(e);
    this.map.on('mousemove', this._mouseMoveFunction);
  }

  /**
   * @private
   * @memberof Interaction
   * @description Watch mouse click event
   * @async
   * @returns {Promise}
   */
  _watchMouseClick() {
    return new Promise((resolve) => {
      this.map.once('click', (e) => {
        this.mousePoint = point([e.lngLat.lng, e.lngLat.lat]);
        const clickPoint = this.snapedPoint || this.mousePoint;
        this.map.off('mousemove', this._mouseMoveFunction);
        this.map.getSource('__interaction').setData(this._getEmptyDataSource());
        resolve(clickPoint);
      });
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

  /**
   * Get point from map from mouse click
   *
   * @param {Boolean} snap - Snap to nearest point
   * @memberof Interaction
   * @returns {Object} Point
   * @async
   */
  async getPoint(snap = true) {
    this.snapEnabled = snap;
    this._watchMouseMove();
    const point = await this._watchMouseClick();
    return point;
  }
}

export default Interaction
