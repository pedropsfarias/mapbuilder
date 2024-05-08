import MapSingleton from '../MapSingleton';
import { distance, point, nearestPointOnLine, pointToLineDistance, segmentEach, coordAll, lineString, lineToPolygon } from '@turf/turf'

class Interaction {
  constructor(snap = true, tolerance = 3, minZoom = 16) {
    this.map = MapSingleton.getInstance().getMap();
    this.snapEnabled = snap;
    this.tolerance = tolerance;
    this.minZoom = minZoom;
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
    this.map.addSource('__interactionSnap', {
      'type': 'geojson',
      'data': this._getEmptyDataSource()
    });

    this.map.addSource('__interactionDraw', {
      'type': 'geojson',
      'data': this._getEmptyDataSource()
    });

    this.map.addLayer({
      'id': '__interactionSnap',
      "type": "symbol",
      'source': '__interactionSnap',
      "layout": {
        "text-field": "×",
        "text-size": 24,
      },
      "paint": {
        "text-color": "magenta"
      }
    });

    //Point
    this.map.addLayer({
      'id': '__interactionDrawPoint',
      'type': 'circle',
      'source': '__interactionDraw',
      'paint': {
        'circle-radius': 2,
        'circle-color': '#f0f',
      },
      'filter': ['in', '$type', 'LineString']
    });

    //LineString
    this.map.addLayer({
      'id': '__interactionDraw',
      'type': 'line',
      'source': '__interactionDraw',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#f0f',
        'line-width': 1
      },
      'filter': ['in', '$type', 'LineString']
    });

    //Polygon
    this.map.addLayer({
      'id': '__interactionDrawFill',
      'type': 'fill',
      'source': '__interactionDraw',
      'layout': {},
      'paint': {
        'fill-color': '#f0f',
        'fill-opacity': 0.05,
      },
      'filter': ['in', '$type', 'Polygon']
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
      this.map.getSource('__interactionSnap').setData(this._getEmptyDataSource());
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
      this.map.getSource('__interactionSnap').setData(this._getEmptyDataSource());
      this.snapedPoint = null;
      return;
    }

    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      const geom = feature.geometry;

      if (geom.type === 'Point') {
        const dist = distance(geom, mousePoint) * 1000.0;
        if (dist < this.tolerance) {
          this.map.getSource('__interactionSnap').setData(feature);
        } else {
          this.map.getSource('__interactionSnap').setData(this._getEmptyDataSource());
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
        this.map.getSource('__interactionSnap').setData(nearestPoint);

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
        this.map.getSource('__interactionSnap').setData(nearestPoint);

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
  _watchSingleMouseClick() {
    return new Promise((resolve) => {
      this.map.once('click', (e) => {
        this.mousePoint = point([e.lngLat.lng, e.lngLat.lat]);
        const clickPoint = this.snapedPoint || this.mousePoint;
        this.map.off('mousemove', this._mouseMoveFunction);
        this.map.getSource('__interactionSnap').setData(this._getEmptyDataSource());
        resolve(clickPoint);
      });
    });
  }


  /**
   * @private
   * @memberof Interaction
   * @description Watch mouse  multi click event
   * @async
   * @returns {Promise}
   */
  _watchMultiMouseClick(type = "LineString") {
    const points = [];
    let isMoving = false;
    let movePointIsAdded = false;

    const pointHandler = (e) => {
      this.mousePoint = point([e.lngLat.lng, e.lngLat.lat]);
      const clickPoint = this.snapedPoint || this.mousePoint;

      if (!movePointIsAdded) {
        points.push(clickPoint);
        movePointIsAdded = true;
      } else if (isMoving) {
        points[points.length - 1] = clickPoint;
      } else {
        points.push(clickPoint);
      }

      const lineStringCoords = coordAll({
        'type': 'FeatureCollection',
        'features': points
      });

      const drawLine = type == "LineString" && points.length > 1;
      const drawAsLine = type == "Polygon" && points.length > 1;

      const features = [];

      if (drawLine || drawAsLine) {
        features.push(lineString(lineStringCoords));
      }

      if (type == "Polygon" && points.length >= 3) {
        features.push(lineToPolygon(lineString(lineStringCoords)));
      }

      this.map.getSource('__interactionDraw').setData({
        'type': 'FeatureCollection',
        'features': features
      });

    };

    const clickFnc = (e) => {
      isMoving = false;
      pointHandler(e);
    }

    const mouseMoveFnc = (e) => {
      isMoving = true;
      pointHandler(e);
    }

    this.map.on('click', clickFnc);
    this.map.on('mousemove', mouseMoveFnc);

    return new Promise((resolve) => {
      this.map.once('contextmenu', (e) => {
        e.preventDefault();
        this.map.off('mousemove', this._mouseMoveFunction);
        this.map.off('mousemove', mouseMoveFnc);
        this.map.off('click', clickFnc);
        this.map.getSource('__interactionSnap').setData(this._getEmptyDataSource());
        this.map.getSource('__interactionDraw').setData(this._getEmptyDataSource());
        resolve(points);
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
    const point = await this._watchSingleMouseClick();
    return point;
  }

  async getLineString(snap = true) {
    this.snapEnabled = snap;
    this._watchMouseMove();
    const points = await this._watchMultiMouseClick("LineString");
    console.log("points", points);
    return points;
  }

  async getPolygon(snap = true) {
    this.snapEnabled = snap;
    this._watchMouseMove();
    const points = await this._watchMultiMouseClick("Polygon");
    console.log("points", points);
    return points;
  }
}

export default Interaction
