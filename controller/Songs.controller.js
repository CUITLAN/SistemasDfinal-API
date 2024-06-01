import { pool } from "../config/database.js";

export const addsongFunction = async (req, res, next) => {
  const { playlist_id, song_id, name, artist, Preview_Song, Release_Date, Image } = req.body;

  try {
    // Buscar si la canción ya existe en la playlist
    const query = 'SELECT * FROM songs WHERE playlist_id = ? AND song_id = ?';
    const [existingSong] = await pool.query(query, [playlist_id, song_id]);

    if (existingSong.length > 0) {
      return res.status(200).json({ message: "Canción ya registrada" });
    }

    // Insertar canción
    const insertQuery = "INSERT INTO songs (playlist_id, song_id, name, artist, Preview_Song, Release_Date, Image) VALUES (?,?,?,?,?,?,?)";
    await pool.query(insertQuery, [playlist_id, song_id, name, artist, Preview_Song, Release_Date, Image]);
    return res.status(201).json({ message: 'Canción agregada' });

  } catch (error) {
    console.log('Error al registrar la canción:', error);
    return res.status(500).json({ error });
  }
};
//Esta es para obtener todas las canciones de una playlists
export const getSongFunction = async (req, res, next) => {
  const { playlist_id } = req.params;
  try {
    const query = "SELECT * FROM songs WHERE playlist_id = ?";
    const songs = await pool.query(query, [playlist_id]);
    console.log(songs);
    return res.status(200).json({ songs });
  } catch (error) {
    console.log('Error al obtener las canciones', error);
    return res.status(500).json({ error: "Error al obtener las canciones" });
  }
};
// Made by Alan T
