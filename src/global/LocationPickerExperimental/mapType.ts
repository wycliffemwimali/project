import { ReactElement } from "react"

/*global google*/
export enum MapType {
    ROADMAP = 0, TERRAIN = 1, SATELLITE = 2, HYBRID = 3
}

export type ReGoMapPropTypes = {
    onLocationChoosen?: (name: string, position: { lat: number, lng: number }) => void,
    map?: GoogleMap,
    AutoCompleteComponent?: () => React.MutableRefObject<JSX.Element>,
    WeatherContentComponent?: () => React.MutableRefObject<JSX.Element>,
    mapOption?: google.maps.MapOptions,
    startLocation?: { lat: number, lng: number } | null
    APIkey: string
}

export type ReGoMapContextType = {
    state: ReGoMapContextStateType | null
    // initAutoCompleteServices: (cardComponent: HTMLElement, WeatherDataView: HTMLElement) => Promise<google.maps.places.AutocompleteService>
    // onAutoCompleteInputValueChange: (value: string) => void
    getDeviceLocation: () => void,
    geoLocateToAPoint: (lat: number, lng: number) => void,
    infoWindow: google.maps.InfoWindow | null,
    // geoLocateOnAutoCompletePlaceClicked: (lat: number, lng: number) => { lat: number, lng: number },
    mapEventCallback: (latLng: google.maps.LatLng, map: GoogleMap, getSelectedPace: (lat: number, lng: number, name: string) => void, undo?: HTMLDivElement,) => void,
}




export type ReGoMapContextStateType = {
    selectedPalce: { name: any | null, location: any | null },
    placePredictions: AutoCompletePredictions | null,
    autoCompleteServices: google.maps.places.AutocompleteService | null,
    markers: Marker[] | null,
    map: GoogleMap | null,
    selectedLocation: { lat: number, lng: number } | null,
    startLocation: { lat: number, lng: number } | null,
    mapDiv: HTMLElement,
    // autoCompleteSearchBar: HTMLInputElement,
    // autoCompleteMapCard: HTMLElement,
}

export type GoogleMap = google.maps.Map;
export type LatLng = google.maps.LatLng
export type Marker = google.maps.Marker
export type Position = GeolocationPosition
export type PlaceServiceStatus = google.maps.places.PlacesServiceStatus
export type AutoCompleteService = google.maps.places.AutocompleteService
export type AutoCompletePrediction = google.maps.places.AutocompletePrediction
export type AutoCompletePredictions = google.maps.places.AutocompletePrediction[]