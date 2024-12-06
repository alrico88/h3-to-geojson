[**h3-to-geojson**](../README.md)

***

[h3-to-geojson](../README.md) / getH3InsideGeoJSON

# Function: getH3InsideGeoJSON()

> **getH3InsideGeoJSON**(`geojson`, `resolution`): `string`[]

Retrieves all H3 cells that fall inside a given GeoJSON Polygon or MultiPolygon.

## Parameters

### geojson

A GeoJSON Polygon or MultiPolygon.

`Polygon` | `MultiPolygon`

### resolution

`number`

The desired H3 resolution.

## Returns

`string`[]

An array of H3 cells that fall inside the input geometry.

## Defined in

[index.ts:110](https://github.com/alrico88/h3-to-geojson/blob/master/src/index.ts#L110)
