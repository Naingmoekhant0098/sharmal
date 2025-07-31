import React, { useRef, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import LocationIcon from '../../assets/icons/Location.png';

const HoverableMarkerComponent = ({ position, property, images }) => {
  const markerRef = useRef();
  const popupRef = useRef();
  const map = useMap();

  const imageUrl =
    process.env.REACT_APP_IS_PRODUCTION === 'true'
      ? `${process.env.REACT_APP_RESOURCE_ENDPOINT}${images[0].CreatedBy}/Property/${images[0].ImageName}`
      : `${process.env.REACT_APP_UAT_RESOURCE_ENDPOINT}${images[0].CreatedBy}/Property/${images[0].ImageName}`;

  useEffect(() => {
    const marker = markerRef.current;
    const popup = popupRef.current;

    if (marker) {
      const leafletEl = marker._leaflet_id
        ? map._layers[marker._leaflet_id]
        : null;

      if (leafletEl) {
        leafletEl.on('mouseover', () => {
          leafletEl.openPopup();
        });
        leafletEl.on('mouseout', () => {
          setTimeout(() => {
            if (!document.querySelector('.leaflet-popup:hover')) {
              leafletEl.closePopup();
            }
          }, 150);
        });
      }
    }
  }, [map]);

  return (
    <Marker position={position} ref={markerRef}>
      <Popup
        ref={popupRef}
        maxWidth={300}
        closeButton={false}
        autoClose={false}
        closeOnClick={false}
      >
        <div
          onMouseLeave={() => {
            markerRef.current?.closePopup();
          }}
          onClick={() =>
            window.location.href = `/property?Code=${property.Code}`
          }
          style={{ fontSize: '13px', lineHeight: 1.5, cursor: 'pointer' }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: 8 }}>
            🌟 {property.Title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <img src={LocationIcon} alt="location" style={{ width: 14, marginRight: 6 }} />
            <span>{property.City}</span>
          </div>
          <img
            src={imageUrl}
            alt="property"
            style={{
              width: '100%',
              borderRadius: '10px',
              objectFit: 'cover',
              maxHeight: 130,
            }}
          />
        </div>
      </Popup>
    </Marker>
  );
};

export default HoverableMarkerComponent;
