import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';

import styles from './Map.module.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoicmV0aW5hZGVzaWduIiwiYSI6ImNrODFnbnpwOTAwajQzZm5zeXFxZjg3ZmwifQ.fP1f-G79abYwRqsMMUx3WQ';

export default function Map() {
  const [location, setLocation] = useState({
    lng: 11.576124,
    lat: 48.137154,
    zoom: 13,
  });
  const mapContainer = useRef();

  useEffect(() => {
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
  }, [location.lat, location.lng, location.zoom]);

  function addMarker(long, lat, map) {
    const el = document.createElement('div');
    el.className = styles.marker;
    const popup = new mapboxgl.Popup().setText('Blabal');
    new mapboxgl.Marker(el)
      .setLngLat([long, lat])
      .setPopup(popup)
      .addTo(map);
  }

  return (
    <div className={styles.map}>
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  );
}
