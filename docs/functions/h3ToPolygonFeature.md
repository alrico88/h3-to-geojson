[**h3-to-geojson**](../README.md)

***

[h3-to-geojson](../README.md) / h3ToPolygonFeature

# Function: h3ToPolygonFeature()

> **h3ToPolygonFeature**(`cell`, `properties`?): `Feature`\<`Polygon`\>

Converts an H3 cell to a GeoJSON Polygon feature.

## Parameters

### cell

`string`

The H3 cell to convert.

### properties?

`GeoJsonProperties` = `{}`

Optional properties to include in the feature.

## Returns

`Feature`\<`Polygon`\>

A GeoJSON Polygon feature representing the H3 cell boundary.

## Defined in

[index.ts:79](https://github.com/alrico88/h3-to-geojson/blob/master/src/index.ts#L79)
