import {useEffect, useState, useRef, useCallback} from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { Dimmer, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';

function Map({setCoords,draggable, coords, width, height, zoom}) {
  const[map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    lng:0
  });
  const [markerPosition, setMarkerPosition]= useState();
  const markerRef = useRef(null);
  const mapRef = useRef(null);


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
  });

  const containerStyle = {
    width: width || '850px',
    height: height || '400px'
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(currentPosition);
    map.fitBounds(bounds);
    setMap(map);
    mapRef.current = map;
  }, [currentPosition]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [setMap]);

  // const geocodeLatLng = () => {
  //   var requestOptions = {
  //     method: 'GET',
  //   };
  //   fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${coords.lat}&lon=${coords.lng}&apiKey=${process.env.REACT_APP_REVERSE_GEOCODING_API_KEY}`, requestOptions)
  //     .then(response => response.json())
  //     .then(result =>{
  //       // result.features[0].properties.street result.features[0].properties.city
  //     })
  //     .catch(error => alert('error', error));
  // }

  useEffect (() => {
    setCurrentPosition({
        lat:coords.lat,
        lng:coords.lng
    })
    if(!coords) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          setCurrentPosition({
              lat:position.coords.latitude,
              lng: position.coords.longitude
          })
          setCoords((prevState)=>
           ({...prevState, ...currentPosition})
          );
          if (position.coords.accuracy > 10) {
            toast.error("The GPS accuracy isn't good enough");
          }
        });
      } else {
        alert('Alert need location permission')
      }
    }
  }, []);

  const onMarkerLoad = useCallback(
    marker => {
      markerRef.current = marker;
    },
    []
  );

  function onDragEnd(...args) {
    setCurrentPosition((prevState)=> ({
      ...prevState,
      lat: markerRef.current.position.lat(),
      lng: markerRef.current.position.lng()
    }));
    setCoords((prevState)=> ({
      ...prevState,
      lat: markerRef.current.position.lat(),
      lng: markerRef.current.position.lng()
    }));
  }

  return isLoaded ? (
    <>
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom= {9}
          onLoad={onLoad}
          onUnmount={onUnmount}
      >
      <MarkerF
        onLoad={onMarkerLoad}
        position={markerPosition ? markerPosition : currentPosition}
        draggable={draggable}
        onDragEnd={onDragEnd}
      />
      </GoogleMap>
    </>
    ) :
    <>
      <Dimmer active={isLoaded} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </>
}

export default Map