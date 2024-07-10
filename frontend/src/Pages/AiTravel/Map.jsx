// src/components/Map.jsx
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw'; // replace with your Mapbox access token

const Map = ({ hotels, foodSpots, searchResults, onHotelSelect, onSpotSelect, onMapMove, selectedHotel, selectedSpot }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76.2711, 10.8505],
      zoom: 14, // Higher zoom level to see properties more closely
    });

    map.current.on('load', () => {
      if (!map.current.getSource('hotels')) {
        map.current.addSource('hotels', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: hotels.map(hotel => ({
              type: 'Feature',
              properties: {
                id: hotel.id,
                name: hotel.name,
                price: hotel.price,
                rating: hotel.rating,
                image: hotel.image,
              },
              geometry: {
                type: 'Point',
                coordinates: hotel.location,
              },
            })),
          },
        });

        map.current.addLayer({
          id: 'hotels',
          type: 'symbol',
          source: 'hotels',
          layout: {
            'icon-image': 'lodging-15',
            'icon-size': 1.5, // Larger size for hotel markers
            'icon-allow-overlap': true,
            'text-field': ['get', 'price'],
            'text-offset': [0, 1],
            'text-anchor': 'top',
            'text-size': 14,
          },
          paint: {
            'text-color': '#000',
          },
        });

        map.current.on('click', 'hotels', (e) => {
          const properties = e.features[0].properties;
          onHotelSelect({
            id: properties.id,
            name: properties.name,
            price: properties.price,
            rating: properties.rating,
            image: properties.image,
            location: e.features[0].geometry.coordinates,
          });
          new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(`<strong>${properties.name}</strong><br>Price: $${properties.price}`)
            .addTo(map.current);
        });

        map.current.on('mouseenter', 'hotels', () => {
          map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'hotels', () => {
          map.current.getCanvas().style.cursor = '';
        });
      }

      if (!map.current.getSource('foodSpots')) {
        map.current.addSource('foodSpots', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: foodSpots.map(spot => ({
              type: 'Feature',
              properties: {
                id: spot.id,
                name: spot.name,
                price: spot.price,
                rating: spot.rating,
                image: spot.image,
                address: spot.address,
              },
              geometry: {
                type: 'Point',
                coordinates: spot.location,
              },
            })),
          },
        });

        map.current.addLayer({
          id: 'foodSpots',
          type: 'symbol',
          source: 'foodSpots',
          layout: {
            'icon-image': 'restaurant-15', // Use a different icon for food spots
            'icon-size': 1.5,
            'icon-allow-overlap': true,
          },
          paint: {
            'icon-color': '#FF4500', // Different color for food spots
          },
        });

        map.current.on('click', 'foodSpots', (e) => {
          const properties = e.features[0].properties;
          onSpotSelect({
            id: properties.id,
            name: properties.name,
            price: properties.price,
            rating: properties.rating,
            image: properties.image,
            address: properties.address,
            location: e.features[0].geometry.coordinates,
          });
          new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(`<strong>${properties.name}</strong><br>Price: ₹${properties.price}<br>Rating: ${properties.rating} ⭐<br>Address: ${properties.address}`)
            .addTo(map.current);
        });

        map.current.on('mouseenter', 'foodSpots', () => {
          map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'foodSpots', () => {
          map.current.getCanvas().style.cursor = '';
        });
      }

      // Add the search results as a separate layer
      if (!map.current.getSource('searchResults')) {
        map.current.addSource('searchResults', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: searchResults,
          },
        });

        map.current.addLayer({
          id: 'searchResults',
          type: 'symbol',
          source: 'searchResults',
          layout: {
            'icon-image': 'lodging-15',
            'icon-size': 2, // Larger size for searched hotel markers
            'icon-allow-overlap': true,
          },
          paint: {
            'icon-color': '#FF0000', // Different color for highlighted hotels
          },
        });

        map.current.on('click', 'searchResults', (e) => {
          const properties = e.features[0].properties;
          new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(`<strong>${properties.name}</strong><br>Address: ${properties.address}`)
            .addTo(map.current);
        });
      }
    });

    map.current.on('moveend', () => {
      const center = map.current.getCenter();
      onMapMove(center);
    });

    return () => {
      if (map.current) {
        map.current.remove(); // Cleanup map on unmount
        map.current = null;
      }
    };
  }, [hotels, foodSpots, searchResults]);

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      const hotelSource = map.current.getSource('hotels');
      if (hotelSource) {
        hotelSource.setData({
          type: 'FeatureCollection',
          features: hotels.map(hotel => ({
            type: 'Feature',
            properties: {
              id: hotel.id,
              name: hotel.name,
              price: hotel.price,
              rating: hotel.rating,
              image: hotel.image,
            },
            geometry: {
              type: 'Point',
              coordinates: hotel.location,
            },
          })),
        });
      }

      const foodSource = map.current.getSource('foodSpots');
      if (foodSource) {
        foodSource.setData({
          type: 'FeatureCollection',
          features: foodSpots.map(spot => ({
            type: 'Feature',
            properties: {
              id: spot.id,
              name: spot.name,
              price: spot.price,
              rating: spot.rating,
              image: spot.image,
              address: spot.address,
            },
            geometry: {
              type: 'Point',
              coordinates: spot.location,
            },
          })),
        });
      }

      const searchSource = map.current.getSource('searchResults');
      if (searchSource) {
        searchSource.setData({
          type: 'FeatureCollection',
          features: searchResults,
        });
      }
    }
  }, [hotels, foodSpots, searchResults]);

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      map.current.flyTo({
        center: selectedHotel ? selectedHotel.location : selectedSpot ? selectedSpot.location : [76.2711, 10.8505],
        zoom: selectedHotel || selectedSpot ? 15 : 14, // Zoom into the selected hotel or spot
      });
    }
  }, [selectedHotel, selectedSpot]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Map;
