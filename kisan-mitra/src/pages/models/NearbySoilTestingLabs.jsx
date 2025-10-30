import React, { useEffect, useState } from 'react';

// Define the TomTom API key and URL
const TOMTOM_API_KEY = 'JmkmJsySZiXyjniOEJWCYXGebT7eNgca';
const TOMTOM_MAP_URL = `https://api.tomtom.com/map/1/tile/basic/main/0/0/0.png?view=Unified&key=${TOMTOM_API_KEY}`;

const NearbySoilTestingLabs = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState(null);

  // Fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError('Unable to retrieve location. Please check your browser settings.');
          console.error(error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  // Initialize the map using TomTom API once location is fetched
  useEffect(() => {
    if (location.lat && location.lng) {
      const script = document.createElement('script');
      script.src = `https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.22.0/maps/maps-web.min.js`;
      script.async = true;
      script.onload = () => {
        const map = tt.map({
          key: TOMTOM_API_KEY,
          container: 'map',
          center: [location.lng, location.lat],
          zoom: 14,
        });

        const marker = new tt.Marker().setLngLat([location.lng, location.lat]).addTo(map);

        // Add marker for nearby soil testing labs (mocked data for demonstration)
        const nearbyLabs = [
          { lat: location.lat + 0.01, lng: location.lng + 0.01, name: 'Soil Testing Lab 1' },
          { lat: location.lat - 0.01, lng: location.lng - 0.01, name: 'Soil Testing Lab 2' },
        ];

        nearbyLabs.forEach((lab) => {
          const labMarker = new tt.Marker().setLngLat([lab.lng, lab.lat]).addTo(map);
          const popup = new tt.Popup({ offset: 35 }).setText(lab.name);
          labMarker.setPopup(popup).togglePopup();
        });
      };

      document.head.appendChild(script);
    }
  }, [location]);

  return (
    <div className="nearby-labs-container">
      <h2 className="header">Nearby Soil Testing Labs</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          <p className="location-text">Your current location: Latitude {location.lat}, Longitude {location.lng}</p>
          <div id="map" className="map-container"></div>
        </div>
      )}

      {/* Inline CSS for styling */}
      <style jsx>{`
        .nearby-labs-container {
          text-align: center;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 20px auto;
        }

        .header {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 10px;
        }

        .location-text {
          font-size: 1.2rem;
          margin: 10px 0;
          color: #555;
        }

        .map-container {
          width: 100%;
          height: 500px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .error {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default NearbySoilTestingLabs;