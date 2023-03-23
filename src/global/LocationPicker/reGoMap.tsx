/*global google*/
import {
    TextField, Card, MenuItem, MenuList, alpha, useTheme, Popper,
    Grow,
    Paper,
    ClickAwayListener,
    Box
} from "@mui/material";

import React, { MutableRefObject } from "react";

import { MapContextConsumer, MapContextProvider } from "./mapContext"
import { initMap, unmountMap } from "./mapInitiatior";
import {
    AutoCompletePredictions, AutoCompleteService, GoogleMap, PlaceServiceStatus,
    ReGoMapContextType
} from "./mapType";



export type _ReGoMapPropTypes = {
    onLocationChoosen: (name: string, position: { lat: number, lng: number }) => void,
    mapRef?: React.MutableRefObject<HTMLElement>,
    withAutoComplete: boolean,
    APIkey: string,
    mapOption?: google.maps.MapOptions,
    startLocation?: { lat: number, lng: number } | null
}

function ReGoMap({
    onLocationChoosen,
    mapRef,
    withAutoComplete,
    startLocation,
    APIkey,
    mapOption
}: _ReGoMapPropTypes) {

    var loc = React.useRef<HTMLElement>();
    var _mapRef = mapRef ?? loc as React.MutableRefObject<HTMLElement>

    const [map, setMap] = React.useState<google.maps.Map | null>(null)

    const init = async () => {
        await initMap(APIkey, _mapRef, { ...mapOption }).then((map) => {
            setMap(map)
        })
    }

    React.useEffect(() => {
        if (map == null)
            init();
    }, [])

    return (

        <Box
            ref={_mapRef}
            style={{ height: "350px" }}
        >
            {map &&
                <MapContextProvider
                    onLocationChoosen={onLocationChoosen}
                    map={map}
                    withAutoComplete={withAutoComplete}
                    startLocation={startLocation}>
                    <MapContextConsumer>
                        {
                            (value) => {
                                return (withAutoComplete && value.state?.map) && <AutoComplete context={value} />
                            }
                        }
                    </MapContextConsumer>
                </MapContextProvider>

            }
        </Box>
        // </ReGoMapGlobalContext>
    );

}

const ITEM_HEIGHT = 48;

function AutoComplete({ context }: { context: ReGoMapContextType }) {

    var cardRef = React.useRef<HTMLDivElement>();
    // var textRef = React.useRef();
    var inputTextRef = React.useRef<any>();

    const [autoCompleteServices, setAutoCompleteServices] = React.useState<AutoCompleteService | null>(null)
    const theme = useTheme()

    var timeout: NodeJS.Timeout;

    function debounce(func: () => void, wait: number) {

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(func, wait);
    };

    const displaySuggestions = function (predictions: AutoCompletePredictions, status: PlaceServiceStatus) {
        if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) { return; }
        context.setPredictions(predictions)
    };

    React.useEffect(() => {
        if (autoCompleteServices === null && context.state?.map !== null) {
            let service = context.initAutoComplete(cardRef as React.MutableRefObject<HTMLElement>, context.state?.map as GoogleMap)
            setAutoCompleteServices(service as AutoCompleteService);
        }
    }, [context.state?.map]);

    return (
        <React.Fragment>
            <Card
                ref={cardRef as React.RefObject<HTMLDivElement>}
                elevation={0} style={{
                    padding: "5px",
                    margin: "5px",
                    backgroundColor: alpha(theme.palette.primary.light, .8)
                }
                }>
                <TextField
                    autoFocus
                    onChange={(e) => {
                        var value = inputTextRef.current?.value;
                        if (value.length > 2) {
                            debounce(async () => {

                                await autoCompleteServices?.getPlacePredictions({
                                    componentRestrictions: { country: 'SL' },
                                    input: value
                                }, (p, s) => displaySuggestions(p as AutoCompletePredictions, s))

                            }, 150)
                        }

                    }}
                    size="small"
                    color="primary"
                    variant={"outlined"}
                    // ref={textRef}
                    inputRef={inputTextRef}
                    fullWidth
                    label="Search" />
            </Card>
            <DropDown anchorRef={cardRef} context={context} />
        </React.Fragment>
    );
}

function DropDown({ anchorRef, context }: { anchorRef: React.MutableRefObject<HTMLElement | undefined>, context: ReGoMapContextType }) {
    const [open, setOpen] = React.useState(false);

    const handleToggle = (inOrOut: boolean) => {
        setOpen(inOrOut);
    };

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }


    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);

    React.useEffect(() => {
        anchorRef.current?.addEventListener("click", (event) => {
            if (!open) {
                handleToggle(true);
            }
        })

        anchorRef.current?.addEventListener("focusin", (event) => {
            if (!open) {
                handleToggle(true);
            }
        })
        anchorRef.current?.addEventListener("focusout", (event) => {
            if (open) {
                handleToggle(false);
            }
        })

        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                    }
                    }>
                    <Paper elevation={0} >
                        <ClickAwayListener onClickAway={handleClose}>

                            <MenuList
                                style={{ overflow: "scroll" }}
                                id="menu-list-grow" onKeyDown={handleListKeyDown} >
                                {
                                    context.state?.placePredictions?.map((prediction, index) => (

                                        <MenuItem key={index} selected={prediction.description === 'Pyxis'} onClick={() => {
                                            context.geoLocateOnAutoCompletePlaceClicked(prediction)
                                            // handleListKeyDown()
                                        }} >
                                            {prediction.description}
                                        </MenuItem>
                                    ))}
                            </MenuList>
                        </ClickAwayListener >
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
}



export { ReGoMap }