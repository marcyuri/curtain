import { MapPin, LocateFixed } from "lucide-react";
import "./LocationPicker.css";

function LocationPicker({
  label,
  address="",
  latitude="",
  longitude="",
  disabled=false,
  helperText="",
  error="",
  onAddressChange,
  onCoordinates,
}){
  const detect=()=>{
    if(!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(({coords})=>{
      onCoordinates?.({
        latitude:coords.latitude,
        longitude:coords.longitude,
      });
    });
  };

  return(
    <div className="location-picker">
      {label&&<label className="location-picker__label">{label}</label>}

      <div className={`location-picker__control ${error?"location-picker__control--error":""}`}>
        <MapPin size={18}/>
        <input
          value={address}
          disabled={disabled}
          placeholder="Adresse ou lieu"
          onChange={e=>onAddressChange?.(e.target.value)}
        />
        <button type="button" onClick={detect} disabled={disabled}>
          <LocateFixed size={18}/>
        </button>
      </div>

      <div className="location-picker__coords">
        <input value={latitude} readOnly placeholder="Latitude"/>
        <input value={longitude} readOnly placeholder="Longitude"/>
      </div>

      <div className="location-picker__map">
        Carte (intégration Leaflet / Google Maps à venir)
      </div>

      {error?<small className="location-picker__error">{error}</small>:helperText&&<small className="location-picker__helper">{helperText}</small>}
    </div>
  );
}
export default LocationPicker;
