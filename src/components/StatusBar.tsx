import React from 'react';

export default function StatusBar() {
  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg">
      <p className="text-sm text-gray-600 flex items-center">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        Location tracking active
      </p>
    </div>
  );
}