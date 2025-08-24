"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [location, setLocation] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);

      // Reverse geocode with Nominatim (free)
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLocation(data.display_name || "Unknown location");
        });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <div>
          <strong>Location:</strong> {location || "Loading..."} <br />
          <strong>Lat:</strong> {position.lat.toFixed(3)} <br />
          <strong>Lng:</strong> {position.lng.toFixed(3)}
        </div>
      </Popup>
    </Marker>
  );
}

export default function InteractiveMap() {
  return (
    <div className="w-full h-[80vh]">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
