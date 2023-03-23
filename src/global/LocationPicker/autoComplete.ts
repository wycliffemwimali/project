/*global google*/
import { GoogleMap } from "./mapType";

export default function initAutoComplete(card: React.MutableRefObject<HTMLElement>, map: GoogleMap) {

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card.current);
    return new google.maps.places.AutocompleteService();

}