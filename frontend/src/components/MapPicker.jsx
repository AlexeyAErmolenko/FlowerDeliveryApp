import React, { useEffect, useRef } from "react";

export default function MapPicker({ location, onChange, address, onAddressChange, shops = [] }) {
  const mapRef = useRef();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) return;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);

    function initMap() {
      const center = location ? { lat: location.lat, lng: location.lng } : (shops[0]?.location || { lat: 50.4501, lng: 30.5234 });
      const map = new window.google.maps.Map(mapRef.current, { center, zoom: 12 });
      // shops markers
      shops.forEach(s => {
        if (s.location?.lat) {
          new window.google.maps.Marker({ position: { lat: s.location.lat, lng: s.location.lng }, map, title: s.name });
        }
      });
      // draggable pin
      const marker = new window.google.maps.Marker({
        position: center,
        map,
        draggable: true,
        title: "Delivery location"
      });
      marker.addListener("dragend", async () => {
        const pos = marker.getPosition();
        const loc = { lat: pos.lat(), lng: pos.lng() };
        onChange(loc);
        // reverse geocode to address
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: loc }, (results, status) => {
          if (status === "OK" && results[0]) {
            onAddressChange(results[0].formatted_address);
          }
        });
      });
    }

    return () => {
      // no cleanup for script to keep simple
    };
  }, [apiKey, shops]);

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: 300 }} />
    </div>
  );
}
