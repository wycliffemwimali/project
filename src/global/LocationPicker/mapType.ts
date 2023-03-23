/*global google*/

import React from "react"
export enum MapType {
    ROADMAP = 0, TERRAIN = 1, SATELLITE = 2, HYBRID = 3
}

export type ReGoMapPropTypes = {
    onLocationChoosen: (name: string, position: { lat: number, lng: number }) => void,
    map: GoogleMap,
    withAutoComplete: boolean,
    mapOption?: google.maps.MapOptions,
    startLocation?: { lat: number, lng: number } | null
}

export type ReGoMapContextType = {
    initAutoComplete: (ref: React.MutableRefObject<HTMLElement>, map: GoogleMap) => AutoCompleteService | null,
    setPredictions: (val: AutoCompletePredictions) => void,
    geoLocateOnAutoCompletePlaceClicked: (prediction: AutoCompletePrediction) => void,
    state: ReGoMapContextStateType | null
}

export type ReGoMapContextPropType = {

}

export type ReGoMapGlobalContextType = {

}

export type ReGoMapContextStateType = {
    selectedPalce: { name: any | null, location: any | null },
    placePredictions: AutoCompletePredictions | null,
    autoCompleteServices: any | null,
    markers: Marker[] | null,
    map: GoogleMap,
    selectedLocation: { lat: number, lng: number } | null,
    startLocation: { lat: number, lng: number } | null,
}

export type GoogleMap = google.maps.Map;
export type LatLng = google.maps.LatLng
export type Marker = google.maps.Marker
export type Position = GeolocationPosition
export type PlaceServiceStatus = google.maps.places.PlacesServiceStatus
export type AutoCompleteService = google.maps.places.AutocompleteService
export type AutoCompletePrediction = google.maps.places.AutocompletePrediction
export type AutoCompletePredictions = google.maps.places.AutocompletePrediction[]