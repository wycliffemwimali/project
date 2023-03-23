
/*global google*/

import React from "react";
import { PlaceServiceStatus } from "../LocationPicker/mapType";
import { ReGoMapContext } from "./context";
import { initMap } from "./mapInitiatior";
import { AutoCompletePredictions, GoogleMap, LatLng, Marker, Position, ReGoMapContextStateType, ReGoMapPropTypes } from "./mapType";


type propType = ReGoMapPropTypes;

type slBound = {
    north: number
    south: number
    west: number
    east: number
}

class MapContextProvider extends React.Component<propType, ReGoMapContextStateType>{
    constructor(props: propType) {
        super(props);


        //havent got the right boundries of sl and dont think if this is ne cessory
        this.SierraLeoneBound = {
            north: 23.0824,
            south: 47.1987,
            west: 45.25,
            east: 45.25,
        };

        this.restrictionBound = {
            latLngBounds: this.SierraLeoneBound,
            strictBounds: true,
        };
        // 8.4770816 -13.2481024
        // ??
        this.defaultMapOptions = {
            center: { lat: 8.4553522, lng: -13.2943229 },//obj
            zoom: 13,//int
            mapTypeControl: false,//bool
            streetViewControl: false,//bool
            // restriction: this.restrictionBound,
            ...this.props.mapOption,
        }
        this.state = {
            selectedPalce: { name: null, location: null },
            placePredictions: [],
            markers: [],
            autoCompleteServices: null,
            map: this.props.map ?? null,
            selectedLocation: null,// on map location press
            startLocation: this.props.startLocation ?? null,
            mapDiv: document.createElement("div"),
        }
    }


    infoWindow: google.maps.InfoWindow | null = null;
    defaultMapOptions: google.maps.MapOptions
    SierraLeoneBound: slBound
    mapEventListener: google.maps.MapsEventListener | null = null

    restrictionBound: {
        latLngBounds: slBound
        strictBounds: boolean
    }

    timeout: NodeJS.Timeout | null = null;
    getDeviceLocation = () => {
        navigator.geolocation.getCurrentPosition((options) => this.getCurrentPosition(options))
    }

    getCurrentPosition = (position: Position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setMarkers({ lat, lng });
        this.setState(prev => ({ ...prev, startLocation: { lat, lng } }))
    }




    loadMap = async () => {
        // this.defaultMapOptions
        await initMap(this.props.APIkey, this.state.mapDiv,
            this.defaultMapOptions
        ).then((map) => {

            try {
                this.infoWindow = new google.maps.InfoWindow();
                this.setState(prev => ({ ...prev, map }))
            } catch (e) {
                console.log("%c" + e, "coloe:red")
            }

        })

    }

    componentDidMount() {
        this.loadMap()
    }

    componentWillUnmount() {
        // this.mapEventListener?.remove();
    }
    shouldComponentUpdate(nextProps: Readonly<ReGoMapPropTypes>, nextState: Readonly<ReGoMapContextStateType>, nextContext: any): boolean {

        return (this.state.map !== nextState.map)
    }




    updateMarker = (position: LatLng, title: string, map: GoogleMap) => {
        let markers = this.state.markers as Marker[];

        if (markers.length > 1) {
            this.setMapOnAll(null)
            markers.pop()
            this.setState(prev => ({ ...prev, markers }))
        }

        var marker = new google.maps.Marker({
            position: position,
            title: title ? title : "programs Location"
        });

        markers.push(marker);
        this.setMapOnAll(map)
        return marker;
    }

    setMapOnAll = (map: GoogleMap | null) => {
        let markers = this.state.markers as Marker[];
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }

        this.setState(prev => ({ ...prev, markers }))
    }

    hideMarkers = () => {
        this.setMapOnAll(null);
    }

    mapEventCallback = (latLng: google.maps.LatLng, map: GoogleMap, getSelectedPace: (lat: number, lng: number, name: string) => void, undo?: HTMLDivElement) => {
        if (latLng) {
            // var marker = this.updateMarker(latLng as LatLng, "Programs location", map);


            if (this.infoWindow !== null) {
                this.infoWindow.close();
            }
            this.infoWindow = new google.maps.InfoWindow();
            this.infoWindow.setContent("❌");
            this.infoWindow.open({
                // anchor: marker,
                map,
                shouldFocus: false,

            });

            // undo
            getSelectedPace(latLng.lat(), latLng.lng(), "");


        }
    }


    geoLocateToAPoint = (lat: number, lng: number) => {
        this.setMarkers({ lat, lng });
    }
    setMarkers = ({ lat, lng }: { lat: number, lng: number }) => {
        const map = this.state.map;
        if (map) {
            var myLatlng = new google.maps.LatLng({ lat: lat, lng: lng });
            this.updateMarker(myLatlng, "My location", map);
            map.setCenter(myLatlng);
            console.log(map)
        }
    }

    setPredictions = (placePredictions: AutoCompletePredictions) => {
        this.setState(prev => ({ ...prev, placePredictions }))
    }

    debounce = (func: () => void, wait: number) => {

        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(func, wait);
    };

    displaySuggestions = (predictions: AutoCompletePredictions, status: PlaceServiceStatus) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) { return; }
        this.setPredictions(predictions)
    };


    render() {

        return (
            <ReGoMapContext.Provider
                value={{
                    state: this.state,
                    infoWindow: this.infoWindow,
                    geoLocateToAPoint: this.geoLocateToAPoint,
                    // geoLocateOnAutoCompletePlaceClicked: this.geoLocateOnAutoCompletePlaceClicked.bind(this),
                    getDeviceLocation: this.getDeviceLocation.bind(this),
                    mapEventCallback: this.mapEventCallback,
                }}>
                {
                    this.props.children
                }
            </ReGoMapContext.Provider>
        );
    }
}

let MapContextConsumer = ReGoMapContext.Consumer;

export {
    MapContextConsumer,
    MapContextProvider,
};


