
/*global google*/

import React from "react";
import initAutoComplete from "./autoComplete";
import { ReGoMapContext } from "./context";
import { initMap } from "./mapInitiatior";
import {
    AutoCompletePrediction, AutoCompletePredictions, GoogleMap, LatLng, MapType, Marker, Position,
    ReGoMapContextPropType, ReGoMapContextStateType, ReGoMapPropTypes
} from "./mapType";


type propType = ReGoMapContextPropType & ReGoMapPropTypes;

type slBound = {
    north: number
    south: number
    west: number
    east: number
}

class MapContextProvider extends React.PureComponent<propType, ReGoMapContextStateType>{
    constructor(props: propType) {
        super(props);

        this.onLocationChoosen = this.props.onLocationChoosen;
        this.withAutoComplete = this.props.withAutoComplete;

        this.SierraLeoneBound = {
            north: -34.36,
            south: -47.35,
            west: 166.28,
            east: -175.81,
        };

        this.restrictionBound = {
            latLngBounds: this.SierraLeoneBound,
            strictBounds: true,
        };
        // 8.4770816 -13.2481024
        // ??{ lat: 8.4553522, lng: -13.2943229}
        this.defaultMapOptions = {
            center: this.props.startLocation,//obj
            zoom: 8,//int
            backgroundColor: "#000000",//color
            mapTypeControl: false,//bool
            streetViewControl: false,//bool
            restriction: this.restrictionBound,
            ...this.props.mapOption,
        }

        this.state = {
            selectedPalce: { name: null, location: null },
            placePredictions: [],
            autoCompleteServices: null,
            markers: [],
            map: this.props.map as GoogleMap,
            selectedLocation: null,
            startLocation: this.props.startLocation ?? null
        }
    }

    onLocationChoosen: (name: string, position: { lat: number, lng: number }) => void

    infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow()
    withAutoComplete: boolean
    defaultMapOptions: google.maps.MapOptions
    SierraLeoneBound: slBound
    mapEventListener: google.maps.MapsEventListener | null = null

    restrictionBound: {
        latLngBounds: slBound
        strictBounds: boolean
    }

    ///////////init////////////



    initAutoComplete = () => {

    }

    getCurrentPosition = (position: Position) => {
        console.log(position)
        // this.defaultMapOptions.center ={ lat: 8.4553522, lng: -13.2943229}
        //  { lat: position.coords.latitude, lng: position.coords.longitude }
        var myLocation = new google.maps.LatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
        this.setMarkers({ lat: myLocation.lat(), lng: myLocation.lng() });
        this.state.map.setCenter(myLocation);
        // this.state.map.setOptions(this.defaultMapOptions)

        // this.state.map.re
        this.setState(prev => ({ ...prev, startLocation: { lat: myLocation.lat(), lng: myLocation.lng() } }))
    }

    initMap = () => {
        // this.defaultMapOptions.center = this.state.startLocation
        var location: LatLng = new google.maps.LatLng(this.state.startLocation as { lat: number; lng: number; });

        this.setMarkers({ lat: location.lat(), lng: location.lng() });
        this.state.map.setCenter(location);

        // this.state.map?.setOptions(this.defaultMapOptions)

    }

    componentDidMount() {
        if (this.state.startLocation == null) {
            try {
                navigator.geolocation.getCurrentPosition((options) => this.getCurrentPosition(options))
            } catch (e) {
                alert(e)
            }
        } else {
            this.initMap()
        }
    }
    componentWillUnmount() {
        this.mapEventListener?.remove();
    }

    setMap = (map: GoogleMap) => {
        this.setState(prev => ({ ...prev, map }))
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


    // initMapDelegate = async (lat: number, lng: number) => 
    // { this.defaultMapOptions.center = { lat, lng } as google.maps.LatLngLiteral
    //  this.setState(prev => ({ ...prev, startLocation: { lat, lng } }))
    // }

    mapEventCallback = (mapsMouseEvent: google.maps.MapMouseEvent, map: GoogleMap) => {
        var marker = this.updateMarker(mapsMouseEvent.latLng as LatLng, "Programs location", map);

        if (this.infoWindow !== null) {
            this.infoWindow.close();
        }
        this.infoWindow = new google.maps.InfoWindow();
        this.infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng?.toJSON(), null, 2)
        );
        this.infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });

        this.onLocationChoosen("", { lat: mapsMouseEvent.latLng?.lat() as number, lng: mapsMouseEvent.latLng?.lng() as number })
    }

    setMarkers = ({ lat, lng }: { lat: number, lng: number }) => {
        // map: GoogleMap
        const map = this.state.map;
        var myLatlng = new google.maps.LatLng({ lat: lat, lng: lng });
        this.updateMarker(myLatlng, "My location", map);
        this.mapEventListener = map.addListener("click", (e: google.maps.MapMouseEvent) => this.mapEventCallback(e, map));
    }

    initAutoCompleteDelegate = (ref: React.MutableRefObject<HTMLElement>, map: GoogleMap) => {
        if (this.withAutoComplete) {
            let autoCompleteServices = initAutoComplete(ref, map)
            this.setState(prev => ({ ...prev, autoCompleteServices }))
            return autoCompleteServices;
        }
        return null;
    }

    setPredictions = (placePredictions: AutoCompletePredictions) => {
        this.setState(prev => ({ ...prev, placePredictions }))
    }

    geoLocateOnAutoCompletePlaceClicked = (place: AutoCompletePrediction) => {

        let map = this.state.map as GoogleMap;
        new google.maps.Geocoder().geocode({
            placeId: place.place_id
        })
            .then(({ results }) => {
                let marker = this.updateMarker(results[0].geometry.location, results[0].formatted_address, map)

                map.setZoom(15);
                map.setCenter(results[0].geometry.location);
                marker.setVisible(true);
                if (this.infoWindow) {
                    this.infoWindow.close();
                }



                this.infoWindow.setContent(
                    place.structured_formatting.main_text + " \n" + results[0].formatted_address
                );

                this.infoWindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                });
                this.onLocationChoosen(results[0].formatted_address, results[0].geometry.location.toJSON())

            })
            .catch((e) => window.alert("Geocoder failed due to: " + e));

    }




    render() {

        return (
            <ReGoMapContext.Provider
                value={{
                    state: this.state,
                    initAutoComplete: this.initAutoCompleteDelegate,
                    setPredictions: this.setPredictions,
                    geoLocateOnAutoCompletePlaceClicked: this.geoLocateOnAutoCompletePlaceClicked,
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
