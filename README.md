# h3-to-geojson

A lightweight utility library for converting H3 cells to GeoJSON features and geometries, along with additional tools for working with the [H3 geoindexing system](https://h3geo.org/).

## Features

- Convert H3 cells to GeoJSON Point and Polygon features or geometries.
- Convert coordinates to H3 cells and vice versa.
- Retrieve H3 cells contained within a GeoJSON Polygon or MultiPolygon.
- Calculate the bounding box (BBox) of an H3 cell.
- Get the resolution of an H3 cell.

## Installation

Install the library:

```bash
npm install h3-to-geojson
```

or

```bash
pnpm add h3-to-geojson
```

## Usage

Here is an example of how to use the library:

```javascript
import {
  coordToH3,
  h3ToCoord,
  h3ToPointFeature,
  h3ToPolygonFeature,
  getH3InsideGeoJSON,
} from 'h3-to-geojson';

// Convert coordinates to an H3 cell
const coord = [-3.6886, 40.4201]; // Madrid [longitude, latitude]
const resolution = 9;
const h3Cell = coordToH3(coord, resolution);
console.log('H3 Cell:', h3Cell);

// Convert an H3 cell back to coordinates
const backToCoord = h3ToCoord(h3Cell);
console.log('Coordinates:', backToCoord);

// Convert an H3 cell to a GeoJSON Point feature
const pointFeature = h3ToPointFeature(h3Cell);
console.log('GeoJSON Point Feature:', pointFeature);

// Convert an H3 cell to a GeoJSON Polygon feature
const polygonFeature = h3ToPolygonFeature(h3Cell);
console.log('GeoJSON Polygon Feature:', polygonFeature);

// Retrieve all H3 cells inside a GeoJSON Polygon
const geojsonPolygon = {
  type: 'Polygon',
  coordinates: [
    [
      [-3.700647, 40.404397],
      [-3.700647, 40.43498],
      [-3.667943, 40.43498],
      [-3.667943, 40.404397],
      [-3.700647, 40.404397],
    ],
  ],
};
const h3Cells = getH3InsideGeoJSON(geojsonPolygon, resolution);
console.log('H3 Cells inside the GeoJSON Polygon:', h3Cells);
```

## Documentation

See [DOCS](./docs/README.md)

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Built on top of the [H3-js](https://github.com/uber/h3-js) library.
- GeoJSON utilities powered by [@turf/helpers](https://turfjs.org/).
