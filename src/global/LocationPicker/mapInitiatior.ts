/*global google*/
import { MapType } from "./mapType";
var script: HTMLScriptElement | null = null;

var initMap = async (key: string,
    mapRef: React.MutableRefObject<HTMLElement>,
    mapOptions: {}) => {

    return await new Promise<google.maps.Map>(async (res, rej) => {
        try {
            // let node = document.getElementById("googlemap");
            if (script !== null) {
                await _initMap(mapOptions, mapRef).then((map) => {
                    document.head.appendChild(script as HTMLScriptElement);
                    res(map)
                }).catch((e) => {
                    res(e)
                })
            } else {
                script = document.createElement("script");
                script.async = true;
                script.type = "text/javascript"
                script.id = "googlemap"
                script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
                script.addEventListener("load", async () => await _initMap(mapOptions, mapRef).
                    then((map) => {
                        res(map)
                    }).catch((e) => {
                        res(e)
                    }))

                document.head.appendChild(script as HTMLScriptElement);
            }
        } catch (e) {
            rej(e)
        }
    })
}

var unmountMap = () => {
    try {
        if (script !== null)
            document.head.removeChild(script)
    } catch (e) {
        console.log(e)
    }

}


async function _initMap(mapOptions: google.maps.MapOptions, mapRef: React.MutableRefObject<HTMLElement>) {


    return await new Promise<google.maps.Map>((res, rej) => {

        try {
            let map = new google.maps.Map(mapRef.current
                // , 
                // {
                // zoom: 8,
                // center: { lat: 8.4553522, lng: -13.2943229},
                // disableDefaultUI: true,
                // disableDefaultUI:true
            //     ...mapOptions
            // }
            )
            res(map)
        } catch (e) {
            rej(e)
        }
    })
}

export {
    initMap,
    unmountMap,
};

