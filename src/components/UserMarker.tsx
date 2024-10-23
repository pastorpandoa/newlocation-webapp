import React from 'react';
import { Marker } from 'react-map-gl';
import { MapPin } from 'lucide-react';

interface UserMarkerProps {
  longitude: number;
  latitude: number;
  isCurrentUser?: boolean;
}

export default function UserMarker({ longitude, latitude, isCurrentUser = false }: UserMarkerProps) {
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <div className={`${isCurrentUser ? 'text-blue-500' : 'text-red-500'} animate-pulse`}>
        <MapPin size={32} className="drop-shadow-lg" />
      </div>
    </Marker>
  );
}