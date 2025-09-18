// import React, { useEffect, useRef } from "react";
// import css from './MapPicker.module.css';

// export default function MapPicker({ location, onChange, address, onAddressChange, shops = [] }) {
//   const mapRef = useRef();
//   const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//   useEffect(() => {
//     if (!apiKey) return;
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
//     script.async = true;
//     script.onload = () => initMap();
//     document.head.appendChild(script);

//     function initMap() {
//       const center = location ? { lat: location.lat, lng: location.lng } : (shops[0]?.location || { lat: 50.4501, lng: 30.5234 });
//       const map = new window.google.maps.Map(mapRef.current, { center, zoom: 12 });
//       // shops markers
//       shops.forEach(s => {
//         if (s.location?.lat) {
//           new window.google.maps.Marker({ position: { lat: s.location.lat, lng: s.location.lng }, map, title: s.name });
//         }
//       });
//       // draggable pin
//       const marker = new window.google.maps.Marker({
//         position: center,
//         map,
//         draggable: true,
//         title: "Delivery location"
//       });
//       marker.addListener("dragend", async () => {
//         const pos = marker.getPosition();
//         const loc = { lat: pos.lat(), lng: pos.lng() };
//         onChange(loc);
//         // reverse geocode to address
//         const geocoder = new window.google.maps.Geocoder();
//         geocoder.geocode({ location: loc }, (results, status) => {
//           if (status === "OK" && results[0]) {
//             onAddressChange(results[0].formatted_address);
//           }
//         });
//       });
//     }

//     return () => {
//       // no cleanup for script to keep simple
//     };
//   }, [apiKey, shops]);

//   return (
//     <div>
//       <div ref={mapRef} className={css.map}/>
//     </div>
//   );
// }

import React, { useEffect, useRef } from "react";
import css from './MapPicker.module.css';

export default function MapPicker({ location, onChange, address, onAddressChange, shops = [], selectedShopId }) {
  const mapRef = useRef();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const markerRef = useRef();
  const mapInstance = useRef();

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
      mapInstance.current = map;

      // магазини
      shops.forEach(s => {
        if (s.location?.lat) {
          new window.google.maps.Marker({
            position: { lat: s.location.lat, lng: s.location.lng },
            map,
            title: s.name,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }
          });
        }
      });

      // draggable marker для адреси доставки
      const marker = new window.google.maps.Marker({
        position: center,
        map,
        draggable: true,
        title: "Delivery location"
      });
      markerRef.current = marker;

      marker.addListener("dragend", async () => {
        const pos = marker.getPosition();
        const loc = { lat: pos.lat(), lng: pos.lng() };
        onChange(loc);

        // reverse geocode → address
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: loc }, (results, status) => {
          if (status === "OK" && results[0]) {
            onAddressChange(results[0].formatted_address);
          }
        });
      });
    }

    return () => {};
  }, [apiKey, shops]);

  // Якщо користувач вводить адресу вручну → рухаємо маркер
  useEffect(() => {
    if (!address || !window.google?.maps || !mapInstance.current) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const loc = results[0].geometry.location;
        mapInstance.current.setCenter(loc);
        if (markerRef.current) {
          markerRef.current.setPosition(loc);
        }
        onChange({ lat: loc.lat(), lng: loc.lng() });
      }
    });
  }, [address]);

  // Підсвітити shopId вибраного магазину
  useEffect(() => {
    if (!selectedShopId || !shops.length || !window.google?.maps || !mapInstance.current) return;
    const shop = shops.find(s => s._id === selectedShopId);
    if (shop?.location) {
      new window.google.maps.Marker({
        position: { lat: shop.location.lat, lng: shop.location.lng },
        map: mapInstance.current,
        title: shop.name,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
      });
    }
  }, [selectedShopId, shops]);

  return (
    <div>
      <div ref={mapRef} className={css.map}/>
    </div>
  );
}


// import { useState, useCallback } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import css from './MapPicker.module.css';

// // const containerStyle = {
// //   width: "100%",
// //   height: "400px",
// // };

// const defaultCenter = {
//   lat: 50.4501, // Київ, як дефолт
//   lng: 30.5234,
// };

// export default function MapPicker({ shopLocation, onAddressSelect }) {
//   const [markerPosition, setMarkerPosition] = useState(defaultCenter);
//   const [address, setAddress] = useState("");

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//     libraries: ["places"],
//   });

//   // Пересування маркера мишкою
//   const handleMapClick = useCallback((e) => {
//     const newPos = {
//       lat: e.latLng.lat(),
//       lng: e.latLng.lng(),
//     };
//     setMarkerPosition(newPos);
//     reverseGeocode(newPos);
//   }, []);

//   // Перетягування маркера
//   const handleMarkerDragEnd = (e) => {
//     const newPos = {
//       lat: e.latLng.lat(),
//       lng: e.latLng.lng(),
//     };
//     setMarkerPosition(newPos);
//     reverseGeocode(newPos);
//   };

//   // Введення адреси вручну
//   const handleAddressChange = (e) => {
//     setAddress(e.target.value);
//   };

//   const handleAddressSubmit = async (e) => {
//     e.preventDefault();
//     geocodeAddress(address);
//   };

//   // Перетворює координати у адресу
//   const reverseGeocode = (pos) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: pos }, (results, status) => {
//       if (status === "OK" && results[0]) {
//         setAddress(results[0].formatted_address);
//         onAddressSelect({
//           position: pos,
//           address: results[0].formatted_address,
//         });
//       }
//     });
//   };

//   // Перетворює адресу у координати
//   const geocodeAddress = (addr) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ address: addr }, (results, status) => {
//       if (status === "OK" && results[0]) {
//         const pos = results[0].geometry.location;
//         const newPos = { lat: pos.lat(), lng: pos.lng() };
//         setMarkerPosition(newPos);
//         onAddressSelect({
//           position: newPos,
//           address: results[0].formatted_address,
//         });
//       }
//     });
//   };

//   if (!isLoaded) return <p>Loading map...</p>;

//   return (
//     <div>
//       {/* Ввід адреси вручну */}
//       <form onSubmit={handleAddressSubmit} style={{ marginBottom: "10px" }}>
//         <input
//           type="text"
//           placeholder="Введіть адресу"
//           value={address}
//           onChange={handleAddressChange}
//           style={{ width: "300px", marginRight: "10px" }}
//         />
//         <button type="submit">Знайти</button>
//       </form>

//       <GoogleMap
//         // mapContainerStyle={containerStyle}
//         className={css.map}
//         center={markerPosition}
//         zoom={13}
//         onClick={handleMapClick}
//       >
//         {/* Маркер доставки */}
//         <Marker
//           position={markerPosition}
//           draggable={true}
//           onDragEnd={handleMarkerDragEnd}
//           label="📍 Доставка"
//         />

//         {/* Маркер магазину */}
//         {shopLocation && (
//           <Marker
//             position={shopLocation}
//             icon={{
//               url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//             }}
//             label="🏬 Магазин"
//           />
//         )}
//       </GoogleMap>
//     </div>
//   );
// }
