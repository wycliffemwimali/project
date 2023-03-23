import { styled } from "@mui/system";
import { ReGoMap } from "../../global/LocationPickerExperimental/reGoMap";


const MainBody = styled("div")(({ theme }) => ({
    flex: 1,

    // backgroundColor: theme.palette.secondary.light,
}));


export default function Dashboard() {

    return (
        <MainBody>
            <ReGoMap
                // AutoCompleteDropDown={() => {
                //     return AutocompleteRef as any
                // }}
                // WeatherCardDown={() => {
                //     return WeatherRef as any
                // }}

                getSelectedPace={() => {

                }}
                mapHeight="calc(100vh - 65px)"
            />
        </MainBody>
    );
}

