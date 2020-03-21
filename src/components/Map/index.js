import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { useGeolocation } from 'react-use';

import Loader from '../Loader';
import styles from './Map.module.scss';

const fallbackLocation = {
  lng: 11.576124,
  lat: 48.137154,
};

mapboxgl.accessToken =
  'pk.eyJ1IjoicmV0aW5hZGVzaWduIiwiYSI6ImNrODFnbnpwOTAwajQzZm5zeXFxZjg3ZmwifQ.fP1f-G79abYwRqsMMUx3WQ';

export default function Map() {
  const { latitude, longitude, loading } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 2500,
  });

  const [location, setLocation] = useState({ lng: null, lat: null, zoom: 13 });
  const [map, setMap] = useState(null);

  const mapContainer = useRef();

  useEffect(() => {
    if (map) {
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
            timeout: 2500,
          },
          trackUserLocation: true,
        }),
      );

      for (let i = 0; i < 100; i++) {
        const offsetX = (Math.random() - 0.5) / 2;
        const offsetY = (Math.random() - 0.5) / 2;
        addMarker(11.576124 + offsetX, 48.137154 + offsetY, map);
      }

      map.on('move', () => {
        setLocation({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2),
        });
      });
    }
  }, [map]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!location.lng && !location.lat) {
      const lng = longitude || fallbackLocation.lng;
      const lat = latitude || fallbackLocation.lat;

      setLocation({
        lng,
        lat,
        zoom: 13,
      });

      setMap(
        new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/retinadesign/ck81gqhvb0pg11io6607jo0xo',
          center: [lng, lat],
          zoom: location.zoom,
        }),
      );
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, location.lat, location.lng]);

  function addMarker(long, lat, map) {
    const popup = new mapboxgl.Popup().setText('Blaba');

    new mapboxgl.Marker(
      Object.assign(document.createElement('div'), {
        className: styles.marker,
      }),
    )
      .setLngLat([long, lat])
      .setPopup(popup)
      .addTo(map);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.map}>
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  );
}
