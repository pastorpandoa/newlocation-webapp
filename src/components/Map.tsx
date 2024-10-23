import React, { useEffect, useState, useCallback } from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ViewState } from '../types';
import { MAPBOX_TOKEN, DEFAULT_CENTER, LOCATION_OPTIONS, MAP_STYLE } from '../config/constants';
import LocationPermission from './LocationPermission';
import UserMarker from './UserMarker';
import StatusBar from './StatusBar';

export default function MapComponent() {
  const [viewState, setViewState] = useState<ViewState>(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const startLocationTracking = useCallback(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation(position);
        setViewState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 14
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      LOCATION_OPTIONS
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          setPermissionGranted(true);
          startLocationTracking();
        }
      });
    }
  }, [startLocationTracking]);

  const requestLocationPermission = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPermissionGranted(true);
        startLocationTracking();
      },
      (error) => {
        console.error('Permission denied:', error);
      },
      LOCATION_OPTIONS
    );
  }, [startLocationTracking]);

  if (!permissionGranted) {
    return <LocationPermission onRequestPermission={requestLocationPermission} />;
  }

  return (
    <div className="h-screen w-full relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="top-right" />
        {userLocation && (
          <UserMarker
            longitude={userLocation.coords.longitude}
            latitude={userLocation.coords.latitude}
            isCurrentUser={true}
          />
        )}
      </Map>
      <StatusBar />
    </div>
  );
}