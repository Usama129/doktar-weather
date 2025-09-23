export interface OwmLocation {
  zip?: string;
  name: string;
  lat: number;
  lon: number;
  country?: string;
}

export interface City extends OwmLocation {
  local_names?: {};
  state?: string;
}
