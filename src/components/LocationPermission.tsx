import React from 'react';
import { MapPin } from 'lucide-react';
import { LocationPermissionProps } from '../types';

export default function LocationPermission({ onRequestPermission }: LocationPermissionProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <MapPin size={48} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Enable Location Services
        </h2>
        <p className="text-gray-600 mb-6">
          To connect with people nearby, we need your permission to access your location. Your location will only be shared while using the app.
        </p>
        <button
          onClick={onRequestPermission}
          className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Share My Location
        </button>
      </div>
    </div>
  );
}