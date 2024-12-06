[**h3-to-geojson**](../README.md)

***

[h3-to-geojson](../README.md) / h3ToPointFeature

# Function: h3ToPointFeature()

> **h3ToPointFeature**(`cell`, `properties`?): `Feature`\<`Point`\>

Converts an H3 cell to a GeoJSON Point feature.

## Parameters

### cell

`string`

The H3 cell to convert.

### properties?

`GeoJsonProperties` = `{}`

Optional properties to include in the feature.

## Returns

`Feature`\<`Point`\>

A GeoJSON Point feature representing the H3 cell.

## Defined in

[index.ts:57](https://github.com/alrico88/h3-to-geojson/blob/master/src/index.ts#L57)
