import DuckDB from 'duckdb';
import fs from 'fs';
import path from 'path';

const db = new DuckDB();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { operation, params } = req.body;

  try {
    const conn = db.connect();

    // Load GeoJSON data
    const pointData = JSON.parse(
      fs.readFileSync(path.resolve('./public/data/point.geojson'))
    );
    const polygonData = JSON.parse(
      fs.readFileSync(path.resolve('./public/data/polygon.geojson'))
    );

    // Create tables
    conn.run('CREATE TABLE points (geometry JSON, properties JSON)');
    conn.run('CREATE TABLE polygons (geometry JSON, properties JSON)');

    conn.insertJSON('points', pointData.features);
    conn.insertJSON('polygons', polygonData.features);

    let result;

    switch (operation) {
      case 'point_in_polygon':
        result = conn.all(
          `SELECT * FROM points WHERE ST_Contains((SELECT geometry FROM polygons LIMIT 1), geometry)`
        );
        break;
      case 'buffer':
        const { distance } = params;
        result = conn.all(
          `SELECT ST_Buffer(geometry, ${distance}) FROM points`
        );
        break;
      default:
        res.status(400).json({ error: 'Invalid operation' });
        return;
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}