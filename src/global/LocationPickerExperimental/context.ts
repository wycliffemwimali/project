/*global google*/
import React from "react";
import { ReGoMapContextType } from "./mapType";

export const ReGoMapContext = React.createContext<ReGoMapContextType>({
    geoLocateToAPoint: (lat: number, lng: number) => {},
    infoWindow: null,
    getDeviceLocation: () => {},
    mapEventCallback: (latLng, map, getSelectedPace) => {},
    state: null
});