import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Componente auxiliar para reorientar la vista del mapa cuando cambian las coordenadas
function CambiarVista({ center }) {
  const map = useMap();
  map.setView(center, 12); // Reubica el centro del mapa con un zoom de 12
  return null;
}

export default function BuscadorMapa() {
  const [ciudad, setCiudad] = useState('');
  const [posicion, setPosicion] = useState([-34.6037, -58.3816]); // Coordenadas iniciales (ej. Buenos Aires)
  const [nombreEncontrado, setNombreEncontrado] = useState('Buenos Aires, Argentina');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const buscarCiudad = async (e) => {
    e.preventDefault();
    if (!ciudad.trim()) return;

    setCargando(true);
    setError(null);

    try {
      // Usamos la API de Nominatim (OpenStreetMap) para geocodificar
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(ciudad)}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosicion([lat, lon]);
        setNombreEncontrado(data[0].display_name);
      } else {
        setError('No se encontró la ciudad. Intenta con otro nombre.');
      }
    } catch (err) {
      setError('Ocurrió un error al realizar la búsqueda.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Buscador de Ciudades con Mapa</h2>

      {/* Formulario de búsqueda */}
      <form onSubmit={buscarCiudad} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Escribe una ciudad (ej. Madrid, Tokio, Rosario)..."
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          {cargando ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Mapa */}
      <div style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
        <MapContainer center={posicion} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={posicion}>
            <Popup>{nombreEncontrado}</Popup>
          </Marker>
          <CambiarVista center={posicion} />
        </MapContainer>
      </div>
    </div>
  );
}



