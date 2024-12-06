import { point, polygon } from "@turf/helpers";
import { getGeoJSONBBox, type BBox } from "bbox-helper-functions";
import type {
  Feature,
  GeoJsonProperties,
  MultiPolygon,
  Point,
  Polygon,
  Position,
} from "geojson";
import {
  cellToBoundary,
  cellToLatLng,
  getResolution,
  latLngToCell,
  polygonToCells,
} from "h3-js";

/**
 * Gets the H3 resolution of a given cell.
 * @param {string} cell - The H3 cell for which to retrieve the resolution.
 * @returns {number} The H3 resolution of the cell.
 */
export function getH3Resolution(cell: string): number {
  return getResolution(cell);
}

/**
 * Converts a geographic coordinate to an H3 cell at a specified resolution.
 * @param {Position} coord - The geographic coordinate in [longitude, latitude] format.
 * @param {number} resolution - The desired H3 resolution.
 * @returns {string} The H3 cell corresponding to the input coordinate.
 */
export function coordToH3(coord: Position, resolution: number): string {
  const [lon, lat] = coord;

  return latLngToCell(lat, lon, resolution);
}

/**
 * Converts an H3 cell to a geographic coordinate.
 * @param {string} cell - The H3 cell to convert.
 * @returns {Position} The geographic coordinate in [longitude, latitude] format.
 */
export function h3ToCoord(cell: string): Position {
  const [lat, lng] = cellToLatLng(cell);

  return [lng, lat];
}

/**
 * Converts an H3 cell to a GeoJSON Point feature.
 * @param {string} cell - The H3 cell to convert.
 * @param {GeoJsonProperties} [properties={}] - Optional properties to include in the feature.
 * @returns {Feature<Point>} A GeoJSON Point feature representing the H3 cell.
 */
export function h3ToPointFeature(
  cell: string,
  properties: GeoJsonProperties = {},
): Feature<Point> {
  return point(h3ToCoord(cell), properties);
}

/**
 * Converts an H3 cell to a GeoJSON Point geometry.
 * @param {string} cell - The H3 cell to convert.
 * @returns {Point} A GeoJSON Point geometry representing the H3 cell.
 */
export function h3ToPointGeometry(cell: string): Point {
  return h3ToPointFeature(cell).geometry;
}

/**
 * Converts an H3 cell to a GeoJSON Polygon feature.
 * @param {string} cell - The H3 cell to convert.
 * @param {GeoJsonProperties} [properties={}] - Optional properties to include in the feature.
 * @returns {Feature<Polygon>} A GeoJSON Polygon feature representing the H3 cell boundary.
 */
export function h3ToPolygonFeature(
  cell: string,
  properties: GeoJsonProperties = {},
): Feature<Polygon> {
  return polygon([cellToBoundary(cell, true)], properties);
}

/**
 * Converts an H3 cell to a GeoJSON Polygon geometry.
 * @param {string} cell - The H3 cell to convert.
 * @returns {Polygon} A GeoJSON Polygon geometry representing the H3 cell boundary.
 */
export function h3ToPolygonGeometry(cell: string): Polygon {
  return h3ToPolygonFeature(cell).geometry;
}

/**
 * Calculates the bounding box (BBox) of an H3 cell.
 * @param {string} cell - The H3 cell to calculate the BBox for.
 * @returns {BBox} The bounding box of the H3 cell in [minX, minY, maxX, maxY] format.
 */
export function getH3BBox(cell: string): BBox {
  return getGeoJSONBBox(h3ToPolygonFeature(cell));
}

/**
 * Retrieves all H3 cells that fall inside a given GeoJSON Polygon or MultiPolygon.
 * @param {Polygon | MultiPolygon} geojson - A GeoJSON Polygon or MultiPolygon.
 * @param {number} resolution - The desired H3 resolution.
 * @returns {string[]} An array of H3 cells that fall inside the input geometry.
 */
export function getH3InsideGeoJSON(
  geojson: Polygon | MultiPolygon,
  resolution: number,
): string[] {
  return polygonToCells(
    geojson.coordinates as number[][] | number[][][],
    resolution,
    true,
  );
}
