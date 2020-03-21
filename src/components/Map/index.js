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
  const { latitude, longitude, loading } = useGeolocation();

  const [location, setLocation] = useState({ lng: null, lat: null, zoom: 13 });

  const mapContainer = useRef();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!location.lng && !location.lat) {
      setLocation({
        lng: longitude || fallbackLocation.lng,
        lat: latitude || fallbackLocation.lat,
        zoom: 13,
      });
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/retinadesign/ck81gqhvb0pg11io6607jo0xo',
      center: [location.lng, location.lat],
      zoom: location.zoom,
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, location.lat, location.lng]);

  function addMarker(long, lat, map) {
    const el = document.createElement('div');
    el.className = styles.marker;
    const popup = new mapboxgl.Popup().setText('Blabal');
    new mapboxgl.Marker(el)
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
