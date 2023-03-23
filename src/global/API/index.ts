import axios from "axios";

export async function LoadWeatherData(lat: number, lng: number) {
    const APIKEY = "e7c5c5be19ac7fa05404b3d4ec483d07";
    // &exclude={part}
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${APIKEY}`;

    return await axios.get(url).then((res) => {
        return res.data;
    });

}