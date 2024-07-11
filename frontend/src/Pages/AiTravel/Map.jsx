import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw';

const Map = ({ hotels, searchResults, onHotelSelect, onMapMove, selectedHotel, initialCenter }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCenter || [76.2711, 10.8505],
      zoom: 14,
    });

    map.current.on('load', () => {
      if (!map.current.getSource('hotels')) {
        map.current.addSource('hotels', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [],
          },
        });

        map.current.addLayer({
          id: 'hotels',
          type: 'symbol',
          source: 'hotels',
          layout: {
            'icon-image': 'lodging-15',
            'icon-size': 1.5,
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
            .setHTML(`<strong>${properties.name}</strong><br>Price: ₹${properties.price}`)
            .addTo(map.current);
        });

        map.current.on('mouseenter', 'hotels', () => {
          map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'hotels', () => {
          map.current.getCanvas().style.cursor = '';
        });
      }

      // Add the search results layer
      if (!map.current.getSource('searchResults')) {
        map.current.addSource('searchResults', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [],
          },
        });

        map.current.addLayer({
          id: 'searchResults',
          type: 'symbol',
          source: 'searchResults',
          layout: {
            'icon-image': 'lodging-15',
            'icon-size': 2,
            'icon-allow-overlap': true,
          },
          paint: {
            'icon-color': '#FF0000',
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
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

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

      const searchSource = map.current.getSource('searchResults');
      if (searchSource) {
        searchSource.setData({
          type: 'FeatureCollection',
          features: searchResults,
        });
      }
    }
  }, [hotels, searchResults]);

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded() && selectedHotel) {
      map.current.flyTo({
        center: selectedHotel.location,
        zoom: 15,
      });
    }
  }, [selectedHotel]);

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