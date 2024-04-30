import maplibregl from 'maplibre-gl';

class Measure {
  constructor(map: maplibregl.Map) {
    map.on('mousemove', (e) => {
      console.log(e);
    });
  }
}

export default Measure;
