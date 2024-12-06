import { describe, it, expect } from 'vitest';
import {
  getH3Resolution,
  coordToH3,
  h3ToCoord,
  h3ToPointFeature,
  h3ToPointGeometry,
  h3ToPolygonFeature,
  h3ToPolygonGeometry,
  getH3BBox,
  getH3InsideGeoJSON,
} from '../src/index';
import { Feature, Polygon } from 'geojson';

const sampleH3Cell = '89390cb1b27ffff'; // H3 cell at resolution 9
const sampleCoord = [-3.6886, 40.4201]; // Madrid [longitude, latitude]
const sampleResolution = 9;

describe('H3 Utilities', () => {
  it('should return the correct resolution of an H3 cell', () => {
    const resolution = getH3Resolution(sampleH3Cell);
    expect(resolution).toBe(sampleResolution);
  });

  it('should convert a geographic coordinate to an H3 cell', () => {
    const h3Cell = coordToH3(sampleCoord, sampleResolution);
    expect(h3Cell).toBe(sampleH3Cell);
  });

  it('should convert an H3 cell to a geographic coordinate', () => {
    const coord = h3ToCoord(sampleH3Cell);
    expect(coord).toHaveLength(2);
    expect(coord[0]).toBeCloseTo(sampleCoord[0], 2); // Longitude
    expect(coord[1]).toBeCloseTo(sampleCoord[1], 2); // Latitude
  });

  it('should convert an H3 cell to a GeoJSON Point feature', () => {
    const pointFeature = h3ToPointFeature(sampleH3Cell, {
      h3: sampleH3Cell,
    });
    expect(pointFeature.type).toBe('Feature');
    expect(pointFeature.geometry.type).toBe('Point');
    expect(pointFeature.properties?.h3).toBe(sampleH3Cell);
  });

  it('should convert an H3 cell to a GeoJSON Point geometry', () => {
    const pointGeometry = h3ToPointGeometry(sampleH3Cell);
    expect(pointGeometry.type).toBe('Point');
    expect(pointGeometry.coordinates).toHaveLength(2);
  });

  it('should convert an H3 cell to a GeoJSON Polygon feature', () => {
    const polygonFeature = h3ToPolygonFeature(sampleH3Cell);
    expect(polygonFeature.type).toBe('Feature');
    expect(polygonFeature.geometry.type).toBe('Polygon');
  });

  it('should convert an H3 cell to a GeoJSON Polygon geometry', () => {
    const polygonGeometry = h3ToPolygonGeometry(sampleH3Cell);
    expect(polygonGeometry.type).toBe('Polygon');
    expect(polygonGeometry.coordinates[0]).toBeInstanceOf(Array);
  });

  it('should calculate the bounding box (BBox) of an H3 cell', () => {
    const bbox = getH3BBox(sampleH3Cell);
    expect(bbox).toHaveLength(4);
    expect(bbox[0]).toBeLessThan(bbox[2]); // minX < maxX
    expect(bbox[1]).toBeLessThan(bbox[3]); // minY < maxY
  });

  it('should retrieve H3 cells inside a GeoJSON Polygon', () => {
    const samplePolygon: Feature<Polygon> = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-3.689806973163799, 40.41811157752021],
            [-3.689806973163799, 40.421815052498246],
            [-3.685341087477263, 40.421815052498246],
            [-3.685341087477263, 40.41811157752021],
            [-3.689806973163799, 40.41811157752021],
          ],
        ],
      },
      properties: {},
    };

    const h3Cells = getH3InsideGeoJSON(
      samplePolygon.geometry,
      sampleResolution,
    );
    expect(h3Cells).toBeInstanceOf(Array);
    expect(h3Cells.length).toBeGreaterThan(0);
    expect(h3Cells.includes(sampleH3Cell)).toBe(true);
    h3Cells.forEach((cell) => {
      expect(getH3Resolution(cell)).toBe(sampleResolution);
    });
  });
});
