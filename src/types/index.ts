export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

export interface User {
  id: string;
  longitude: number;
  latitude: number;
  lastUpdated: Date;
}

export interface LocationPermissionProps {
  onRequestPermission: () => void;
}