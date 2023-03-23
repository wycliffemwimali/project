/*global google*/
import React from "react";
import { ReGoMapContextType, ReGoMapGlobalContextType } from "./mapType";

export const ReGoMapContext = React.createContext<ReGoMapContextType>({
    initAutoComplete: (ref, map) => null,
    setPredictions: () => null,
    geoLocateOnAutoCompletePlaceClicked: () => null,
    state: null
});


// for the enytire app
export const ReGoMapGlobalContext = React.createContext<ReGoMapGlobalContextType>({
  
});



 