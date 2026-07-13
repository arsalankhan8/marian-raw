import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router";
import { getRegionPortfolioPath } from "../../../../utils/regionPaths";

export default function DynamicMaps() {
  const navigate = useNavigate();
  const handleViewMore = () => {
    navigate(getRegionPortfolioPath());
  };

  const [countries, setCountries] = useState(null);

  const locations = [
    { id: 1, name: "New York City", country: "USA", short: "NYC", lat: 40.7128, lng: -74.0060, desc: "3 Projects" },
    { id: 2, name: "Cleveland, Ohio", country: "USA", short: "Ohio", lat: 40.4173, lng: -82.9071, desc: "1 project" },
    { id: 3, name: "Mississauga, Ontario", country: "Canada", short: "Ontario", lat: 51.2538, lng: -85.3232, desc: "2 Projects" },
  ];

  // ✅ Custom Div Icon (using short name for display)
  const createIcon = (short, country) =>
    L.divIcon({
      className: "custom-marker",
      html: `
        <div style="text-align:center;">
          <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" style="width:32px;height:32px;" />
          <div style="font-size:12px;color:#00688F;margin-top:3px;font-weight:bold;">${short}</div>
          <div style="font-size:10px;color:#555;">${country}</div>
        </div>
      `,
      iconSize: [32, 42],
      iconAnchor: [16, 42],
      popupAnchor: [0, -42],
    });

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error loading GeoJSON:", err));
  }, []);

  return (
    <div className="w-full h-[600px] mt-[60px]">
      <style>{`
        .leaflet-popup-content-wrapper {
          max-width: none !important;
        }
        .leaflet-popup-content {
          width: auto !important;
          box-sizing: border-box !important;
        }
      `}</style>

      <MapContainer
        key="main-map"
        center={[43.6532, -79.3832]}
        zoom={3}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={createIcon(loc.short, loc.country)} // ✅ Using short city here
          >
            <Popup maxWidth={600} minWidth={220} closeButton autoPan className="custom-popup">
              <div style={{ width: 320 }} className="p-4 rounded-2xl bg-white  text-gray-800">
                <h3 className="font-bold text-lg text-[#00688F] leading-tight mb-1">{loc.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{loc.desc}</p>
                <p className="text-xs text-gray-500 mb-3 italic">Country: {loc.country}</p>
                <button
                  onClick={handleViewMore}
                  className="mt-1 px-4 py-1.5 bg-[#00688F] text-white text-sm rounded-lg hover:bg-[#004d66] transition-all duration-300"
                >
                  View More
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
