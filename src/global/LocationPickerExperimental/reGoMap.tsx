
import { Undo } from "@mui/icons-material";
import { Button, Card, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { number } from "yup";
import { CountrySelect } from "./autoComplete";
import { ReGoMapContext } from "./context";
import { MapContextProvider } from "./mapContext";


type ReGoMapProp = {
    mapWidth?: string,
    mapHeight?: string,
    // AutoCompleteDropDown: () => React.MutableRefObject<JSX.Element>,
    // WeatherCardDown: () => React.MutableRefObject<JSX.Element>,
    getSelectedPace: (lat: number, lng: number, name: string) => void,
}

function ReGoMap(props: ReGoMapProp) {
    // const { AutoCompleteDropDown, WeatherCardDown } = props;


    return (
        <MapContextProvider
            mapOption={{
                mapTypeId: "hybrid"
            }}
            APIkey={"AIzaSyAfXbD205GniQKU8oh9Ltd1675VvYaVkh0"}
        // AutoCompleteComponent={AutoCompleteDropDown}
        // WeatherContentComponent={WeatherCardDown}
        >
            <LoadMap {...props} />
        </MapContextProvider>
    );
}



function LoadMap(props: ReGoMapProp) {
    const context = React.useContext(ReGoMapContext)
    const mapRef = React.useRef<HTMLElement | null>(null);
    const { mapWidth, mapHeight, getSelectedPace } = props;
    let WeatherRef = useRef()
    let ControlsCardRef = useRef()
    let AutocompleteRef = useRef()
    const [polygons, setPolygon] = useState<google.maps.LatLng[]>([]);

    React.useEffect(() => {
        if (context.state?.map) {
            const map = context.state.map;

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(WeatherRef.current);
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(AutocompleteRef.current);
            map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(ControlsCardRef.current);


            let undo = document.createElement("div");
            undo.style.width = "50px";
            undo.style.height = "50px";
            undo.innerText = "undo";



            context.getDeviceLocation();

            var mapEventListener = map.addListener("click", (e: google.maps.MapMouseEvent) => {



                let hold = polygons;
                // let found = hold.filter((p) => p.lat() === e.latLng?.lat() && p.lng() === e.latLng?.lng());

                // if (found.length > 0) {

                // } else {
                hold.push(e.latLng as google.maps.LatLng)
                setPolygon(hold);
                let flightPath = new google.maps.Polyline({
                    path: polygons,
                    // clickable: false,
                    editable: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    map: map,
                });

                flightPath!.addListener("click", () => {

                    let hold = polygons;
                    hold.push(hold[0])
                    setPolygon(hold);
                    const bermudaTriangle = new google.maps.Polygon({
                        paths: hold,
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.35,
                        map: map
                    });

                    let areaOfPoligon = google.maps.geometry.spherical.computeArea(bermudaTriangle.getPath());
                    alert(`the area is ${areaOfPoligon}`)

                })

                document.getElementById("remove-line")!.addEventListener("click", () => {
                    setPolygon([]);
                    flightPath.setMap(null);
                });

                // }

                context.mapEventCallback(e.latLng as google.maps.LatLng, map, getSelectedPace);
            }
            );

            context.state.mapDiv.style.width = mapWidth ?? "100%";
            context.state.mapDiv.style.height = mapHeight ?? "300px";
            mapRef.current?.appendChild(context.state.mapDiv)
            return (() => {
                mapEventListener.remove();
            })
        }

    }, [context, context.state, getSelectedPace, mapHeight, mapWidth, context.infoWindow])

    function onAutoCompleteLocationChange(lat: number, lng: number) {
        context.geoLocateToAPoint(lat, lng);
    }


    return <>
        <Box ref={mapRef} />
        <Box ref={WeatherRef}>
            <Card sx={{ width: "300px", height: "300px", m: th => th.spacing(1) }} >
            </Card>
        </Box>
        <CountrySelect
            ref={AutocompleteRef}
            onChange={onAutoCompleteLocationChange}
        />
        <Box ref={ControlsCardRef} display="flex" justifyContent="center" alignItems='center' >
            <Card sx={{ width: "500px", height: "70px", m: th => th.spacing(1) }} >
                <IconButton
                    id="remove-line"
                >
                    <Undo />
                </IconButton>

                <Button >
                    reset
                </Button>
            </Card>
        </Box>
    </>
}








export { ReGoMap };



