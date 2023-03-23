import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";

type AutoCompletePropType = {
    onChange: (lat: number, lng: number) => void
}
export const CountrySelect = React.forwardRef((props: AutoCompletePropType, ref) => {
    return (
        <Autocomplete

            ref={ref}
            id="country-select-demo"
            sx={{
                width: 300
            }
            }
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}


            onChange={(e, value) => {
                props.onChange(value?.lat as number, value?.lng as number);
            }}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                    />
                    {`${option.label}(${option.code}) 
                    (lat: ${option.lat},lng:${option.lng})`}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    variant="outlined"
                    {...params}
                    // size="small"
                    sx={{
                        width: "400px",
                        //  position: "absolute",
                        m: th => th.spacing(1),
                        backgroundColor: th => th.palette.common.white,
                        borderRadius: th => th.spacing(1)
                    }}

                    helperText="Choose a country"
                    // label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
})

interface CountryType {
    code: string;
    label: string;
    lat: number;
    lng: number;
    suggested?: boolean;
}

const countries: readonly CountryType[] = [
    { code: 'AD', lat: 42.546245, lng: 1.601554, label: 'Andorra' },
    { code: 'AE', lat: 23.424076, lng: 53.847818, label: 'United Arab Emirates' },
    { code: 'AF', lat: 33.93911, lng: 67.709953, label: 'Afghanistan' },
    { code: 'AG', lat: 17.060816, lng: -61.796428, label: 'Antigua and Barbuda' },
    { code: 'AI', lat: 18.220554, lng: -63.068615, label: 'Anguilla' },
    { code: 'AL', lat: 41.153332, lng: 20.168331, label: 'Albania' },
    { code: 'AM', lat: 40.069099, lng: 45.038189, label: 'Armenia' },
    { code: 'AN', lat: 12.226079, lng: -69.060087, label: 'Netherlands Antilles' },
    { code: 'AO', lat: -11.202692, lng: 17.873887, label: 'Angola' },
    { code: 'AQ', lat: -75.250973, lng: -0.071389, label: 'Antarctica' },
    { code: 'AR', lat: -38.416097, lng: -63.616672, label: 'Argentina' },
    { code: 'AS', lat: -14.270972, lng: -170.132217, label: 'American Samoa' },
    { code: 'AT', lat: 47.516231, lng: 14.550072, label: 'Austria' },
    { code: 'AU', lat: -25.274398, lng: 133.775136, label: 'Australia' },
    { code: 'AW', lat: 12.52111, lng: -69.968338, label: 'Aruba' },
    { code: 'AZ', lat: 40.143105, lng: 47.576927, label: 'Azerbaijan' },
    { code: 'BA', lat: 43.915886, lng: 17.679076, label: 'Bosnia and Herzegovina' },
    { code: 'BB', lat: 13.193887, lng: -59.543198, label: 'Barbados' },
    { code: 'BD', lat: 23.684994, lng: 90.356331, label: 'Bangladesh' },
    { code: 'BE', lat: 50.503887, lng: 4.469936, label: 'Belgium' },
    { code: 'BF', lat: 12.238333, lng: -1.561593, label: 'Burkina Faso' },
    { code: 'BG', lat: 42.733883, lng: 25.48583, label: 'Bulgaria' },
    { code: 'BH', lat: 25.930414, lng: 50.637772, label: 'Bahrain' },
    { code: 'BI', lat: -3.373056, lng: 29.918886, label: 'Burundi' },
    { code: 'BJ', lat: 9.30769, lng: 2.315834, label: 'Benin' },
    { code: 'BM', lat: 32.321384, lng: -64.75737, label: 'Bermuda' },
    { code: 'BN', lat: 4.535277, lng: 114.727669, label: 'Brunei' },
    { code: 'BO', lat: -16.290154, lng: -63.588653, label: 'Bolivia' },
    { code: 'BR', lat: -14.235004, lng: -51.92528, label: 'Brazil' },
    { code: 'BS', lat: 25.03428, lng: -77.39628, label: 'Bahamas' },
    { code: 'BT', lat: 27.514162, lng: 90.433601, label: 'Bhutan' },
    { code: 'BV', lat: -54.423199, lng: 3.413194, label: 'Bouvet Island' },
    { code: 'BW', lat: -22.328474, lng: 24.684866, label: 'Botswana' },
    { code: 'BY', lat: 53.709807, lng: 27.953389, label: 'Belarus' },
    { code: 'BZ', lat: 17.189877, lng: -88.49765, label: 'Belize' },
    { code: 'CA', lat: 56.130366, lng: -106.346771, label: 'Canada' },
    { code: 'CC', lat: -12.164165, lng: 96.870956, label: 'Cocos [Keeling] Islands' },
    { code: 'CD', lat: -4.038333, lng: 21.758664, label: 'Congo [DRC]' },
    { code: 'CF', lat: 6.611111, lng: 20.939444, label: 'Central African Republic' },
    { code: 'CG', lat: -0.228021, lng: 15.827659, label: 'Congo [Republic]' },
    { code: 'CH', lat: 46.818188, lng: 8.227512, label: 'Switzerland' },
    { code: 'CI', lat: 7.539989, lng: -5.54708, label: 'Côte d\'Ivoire' },
    { code: 'CK', lat: -21.236736, lng: -159.777671, label: 'Cook Islands' },
    { code: 'CL', lat: -35.675147, lng: -71.542969, label: 'Chile' },
    { code: 'CM', lat: 7.369722, lng: 12.354722, label: 'Cameroon' },
    { code: 'CN', lat: 35.86166, lng: 104.195397, label: 'China' },
    { code: 'CO', lat: 4.570868, lng: -74.297333, label: 'Colombia' },
    { code: 'CR', lat: 9.748917, lng: -83.753428, label: 'Costa Rica' },
    { code: 'CU', lat: 21.521757, lng: -77.781167, label: 'Cuba' },
    { code: 'CV', lat: 16.002082, lng: -24.013197, label: 'Cape Verde' },
    { code: 'CX', lat: -10.447525, lng: 105.690449, label: 'Christmas Island' },
    { code: 'CY', lat: 35.126413, lng: 33.429859, label: 'Cyprus' },
    { code: 'CZ', lat: 49.817492, lng: 15.472962, label: 'Czech Republic' },
    { code: 'DE', lat: 51.165691, lng: 10.451526, label: 'Germany' },
    { code: 'DJ', lat: 11.825138, lng: 42.590275, label: 'Djibouti' },
    { code: 'DK', lat: 56.26392, lng: 9.501785, label: 'Denmark' },
    { code: 'DM', lat: 15.414999, lng: -61.370976, label: 'Dominica' },
    { code: 'DO', lat: 18.735693, lng: -70.162651, label: 'Dominican Republic' },
    { code: 'DZ', lat: 28.033886, lng: 1.659626, label: 'Algeria' },
    { code: 'EC', lat: -1.831239, lng: -78.183406, label: 'Ecuador' },
    { code: 'EE', lat: 58.595272, lng: 25.013607, label: 'Estonia' },
    { code: 'EG', lat: 26.820553, lng: 30.802498, label: 'Egypt' },
    { code: 'EH', lat: 24.215527, lng: -12.885834, label: 'Western Sahara' },
    { code: 'ER', lat: 15.179384, lng: 39.782334, label: 'Eritrea' },
    { code: 'ES', lat: 40.463667, lng: -3.74922, label: 'Spain' },
    { code: 'ET', lat: 9.145, lng: 40.489673, label: 'Ethiopia' },
    { code: 'FI', lat: 61.92411, lng: 25.748151, label: 'Finland' },
    { code: 'FJ', lat: -16.578193, lng: 179.414413, label: 'Fiji' },
    { code: 'FK', lat: -51.796253, lng: -59.523613, label: 'Falkland Islands [Islas Malvinas]' },
    { code: 'FM', lat: 7.425554, lng: 150.550812, label: 'Micronesia' },
    { code: 'FO', lat: 61.892635, lng: -6.911806, label: 'Faroe Islands' },
    { code: 'FR', lat: 46.227638, lng: 2.213749, label: 'France' },
    { code: 'GA', lat: -0.803689, lng: 11.609444, label: 'Gabon' },
    { code: 'GB', lat: 55.378051, lng: -3.435973, label: 'United Kingdom' },
    { code: 'GD', lat: 12.262776, lng: -61.604171, label: 'Grenada' },
    { code: 'GE', lat: 42.315407, lng: 43.356892, label: 'Georgia' },
    { code: 'GF', lat: 3.933889, lng: -53.125782, label: 'French Guiana' },
    { code: 'GG', lat: 49.465691, lng: -2.585278, label: 'Guernsey' },
    { code: 'GH', lat: 7.946527, lng: -1.023194, label: 'Ghana' },
    { code: 'GI', lat: 36.137741, lng: -5.345374, label: 'Gibraltar' },
    { code: 'GL', lat: 71.706936, lng: -42.604303, label: 'Greenland' },
    { code: 'GM', lat: 13.443182, lng: -15.310139, label: 'Gambia' },
    { code: 'GN', lat: 9.945587, lng: -9.696645, label: 'Guinea' },
    { code: 'GP', lat: 16.995971, lng: -62.067641, label: 'Guadeloupe' },
    { code: 'GQ', lat: 1.650801, lng: 10.267895, label: 'Equatorial Guinea' },
    { code: 'GR', lat: 39.074208, lng: 21.824312, label: 'Greece' },
    { code: 'GS', lat: -54.429579, lng: -36.587909, label: 'South Georgia and the South Sandwich Islands' },
    { code: 'GT', lat: 15.783471, lng: -90.230759, label: 'Guatemala' },
    { code: 'GU', lat: 13.444304, lng: 144.793731, label: 'Guam' },
    { code: 'GW', lat: 11.803749, lng: -15.180413, label: 'Guinea-Bissau' },
    { code: 'GY', lat: 4.860416, lng: -58.93018, label: 'Guyana' },
    { code: 'GZ', lat: 31.354676, lng: 34.308825, label: 'Gaza Strip' },
    { code: 'HK', lat: 22.396428, lng: 114.109497, label: 'Hong Kong' },
    { code: 'HM', lat: -53.08181, lng: 73.504158, label: 'Heard Island and McDonald Islands' },
    { code: 'HN', lat: 15.199999, lng: -86.241905, label: 'Honduras' },
    { code: 'HR', lat: 45.1, lng: 15.2, label: 'Croatia' },
    { code: 'HT', lat: 18.971187, lng: -72.285215, label: 'Haiti' },
    { code: 'HU', lat: 47.162494, lng: 19.503304, label: 'Hungary' },
    { code: 'ID', lat: -0.789275, lng: 113.921327, label: 'Indonesia' },
    { code: 'IE', lat: 53.41291, lng: -8.24389, label: 'Ireland' },
    { code: 'IL', lat: 31.046051, lng: 34.851612, label: 'Israel' },
    { code: 'IM', lat: 54.236107, lng: -4.548056, label: 'Isle of Man' },
    { code: 'IN', lat: 20.593684, lng: 78.96288, label: 'India' },
    { code: 'IO', lat: -6.343194, lng: 71.876519, label: 'British Indian Ocean Territory' },
    { code: 'IQ', lat: 33.223191, lng: 43.679291, label: 'Iraq' },
    { code: 'IR', lat: 32.427908, lng: 53.688046, label: 'Iran' },
    { code: 'IS', lat: 64.963051, lng: -19.020835, label: 'Iceland' },
    { code: 'IT', lat: 41.87194, lng: 12.56738, label: 'Italy' },
    { code: 'JE', lat: 49.214439, lng: -2.13125, label: 'Jersey' },
    { code: 'JM', lat: 18.109581, lng: -77.297508, label: 'Jamaica' },
    { code: 'JO', lat: 30.585164, lng: 36.238414, label: 'Jordan' },
    { code: 'JP', lat: 36.204824, lng: 138.252924, label: 'Japan' },
    { code: 'KE', lat: -0.023559, lng: 37.906193, label: 'Kenya' },
    { code: 'KG', lat: 41.20438, lng: 74.766098, label: 'Kyrgyzstan' },
    { code: 'KH', lat: 12.565679, lng: 104.990963, label: 'Cambodia' },
    { code: 'KI', lat: -3.370417, lng: -168.734039, label: 'Kiribati' },
    { code: 'KM', lat: -11.875001, lng: 43.872219, label: 'Comoros' },
    { code: 'KN', lat: 17.357822, lng: -62.782998, label: 'Saint Kitts and Nevis' },
    { code: 'KP', lat: 40.339852, lng: 127.510093, label: 'North Korea' },
    { code: 'KR', lat: 35.907757, lng: 127.766922, label: 'South Korea' },
    { code: 'KW', lat: 29.31166, lng: 47.481766, label: 'Kuwait' },
    { code: 'KY', lat: 19.513469, lng: -80.566956, label: 'Cayman Islands' },
    { code: 'KZ', lat: 48.019573, lng: 66.923684, label: 'Kazakhstan' },
    { code: 'LA', lat: 19.85627, lng: 102.495496, label: 'Laos' },
    { code: 'LB', lat: 33.854721, lng: 35.862285, label: 'Lebanon' },
    { code: 'LC', lat: 13.909444, lng: -60.978893, label: 'Saint Lucia' },
    { code: 'LI', lat: 47.166, lng: 9.555373, label: 'Liechtenstein' },
    { code: 'LK', lat: 7.873054, lng: 80.771797, label: 'Sri Lanka' },
    { code: 'LR', lat: 6.428055, lng: -9.429499, label: 'Liberia' },
    { code: 'LS', lat: -29.609988, lng: 28.233608, label: 'Lesotho' },
    { code: 'LT', lat: 55.169438, lng: 23.881275, label: 'Lithuania' },
    { code: 'LU', lat: 49.815273, lng: 6.129583, label: 'Luxembourg' },
    { code: 'LV', lat: 56.879635, lng: 24.603189, label: 'Latvia' },
    { code: 'LY', lat: 26.3351, lng: 17.228331, label: 'Libya' },
    { code: 'MA', lat: 31.791702, lng: -7.09262, label: 'Morocco' },
    { code: 'MC', lat: 43.750298, lng: 7.412841, label: 'Monaco' },
    { code: 'MD', lat: 47.411631, lng: 28.369885, label: 'Moldova' },
    { code: 'ME', lat: 42.708678, lng: 19.37439, label: 'Montenegro' },
    { code: 'MG', lat: -18.766947, lng: 46.869107, label: 'Madagascar' },
    { code: 'MH', lat: 7.131474, lng: 171.184478, label: 'Marshall Islands' },
    { code: 'MK', lat: 41.608635, lng: 21.745275, label: 'Macedonia [FYROM]' },
    { code: 'ML', lat: 17.570692, lng: -3.996166, label: 'Mali' },
    { code: 'MM', lat: 21.913965, lng: 95.956223, label: 'Myanmar [Burma]' },
    { code: 'MN', lat: 46.862496, lng: 103.846656, label: 'Mongolia' },
    { code: 'MO', lat: 22.198745, lng: 113.543873, label: 'Macau' },
    { code: 'MP', lat: 17.33083, lng: 145.38469, label: 'Northern Mariana Islands' },
    { code: 'MQ', lat: 14.641528, lng: -61.024174, label: 'Martinique' },
    { code: 'MR', lat: 21.00789, lng: -10.940835, label: 'Mauritania' },
    { code: 'MS', lat: 16.742498, lng: -62.187366, label: 'Montserrat' },
    { code: 'MT', lat: 35.937496, lng: 14.375416, label: 'Malta' },
    { code: 'MU', lat: -20.348404, lng: 57.552152, label: 'Mauritius' },
    { code: 'MV', lat: 3.202778, lng: 73.22068, label: 'Maldives' },
    { code: 'MW', lat: -13.254308, lng: 34.301525, label: 'Malawi' },
    { code: 'MX', lat: 23.634501, lng: -102.552784, label: 'Mexico' },
    { code: 'MY', lat: 4.210484, lng: 101.975766, label: 'Malaysia' },
    { code: 'MZ', lat: -18.665695, lng: 35.529562, label: 'Mozambique' },
    { code: 'NA', lat: -22.95764, lng: 18.49041, label: 'Namibia' },
    { code: 'NC', lat: -20.904305, lng: 165.618042, label: 'New Caledonia' },
    { code: 'NE', lat: 17.607789, lng: 8.081666, label: 'Niger' },
    { code: 'NF', lat: -29.040835, lng: 167.954712, label: 'Norfolk Island' },
    { code: 'NG', lat: 9.081999, lng: 8.675277, label: 'Nigeria' },
    { code: 'NI', lat: 12.865416, lng: -85.207229, label: 'Nicaragua' },
    { code: 'NL', lat: 52.132633, lng: 5.291266, label: 'Netherlands' },
    { code: 'NO', lat: 60.472024, lng: 8.468946, label: 'Norway' },
    { code: 'NP', lat: 28.394857, lng: 84.124008, label: 'Nepal' },
    { code: 'NR', lat: -0.522778, lng: 166.931503, label: 'Nauru' },
    { code: 'NU', lat: -19.054445, lng: -169.867233, label: 'Niue' },
    { code: 'NZ', lat: -40.900557, lng: 174.885971, label: 'New Zealand' },
    { code: 'OM', lat: 21.512583, lng: 55.923255, label: 'Oman' },
    { code: 'PA', lat: 8.537981, lng: -80.782127, label: 'Panama' },
    { code: 'PE', lat: -9.189967, lng: -75.015152, label: 'Peru' },
    { code: 'PF', lat: -17.679742, lng: -149.406843, label: 'French Polynesia' },
    { code: 'PG', lat: -6.314993, lng: 143.95555, label: 'Papua New Guinea' },
    { code: 'PH', lat: 12.879721, lng: 121.774017, label: 'Philippines' },
    { code: 'PK', lat: 30.375321, lng: 69.345116, label: 'Pakistan' },
    { code: 'PL', lat: 51.919438, lng: 19.145136, label: 'Poland' },
    { code: 'PM', lat: 46.941936, lng: -56.27111, label: 'Saint Pierre and Miquelon' },
    { code: 'PN', lat: -24.703615, lng: -127.439308, label: 'Pitcairn Islands' },
    { code: 'PR', lat: 18.220833, lng: -66.590149, label: 'Puerto Rico' },
    { code: 'PS', lat: 31.952162, lng: 35.233154, label: 'Palestinian Territories' },
    { code: 'PT', lat: 39.399872, lng: -8.224454, label: 'Portugal' },
    { code: 'PW', lat: 7.51498, lng: 134.58252, label: 'Palau' },
    { code: 'PY', lat: -23.442503, lng: -58.443832, label: 'Paraguay' },
    { code: 'QA', lat: 25.354826, lng: 51.183884, label: 'Qatar' },
    { code: 'RE', lat: -21.115141, lng: 55.536384, label: 'Réunion' },
    { code: 'RO', lat: 45.943161, lng: 24.96676, label: 'Romania' },
    { code: 'RS', lat: 44.016521, lng: 21.005859, label: 'Serbia' },
    { code: 'RU', lat: 61.52401, lng: 105.318756, label: 'Russia' },
    { code: 'RW', lat: -1.940278, lng: 29.873888, label: 'Rwanda' },
    { code: 'SA', lat: 23.885942, lng: 45.079162, label: 'Saudi Arabia' },
    { code: 'SB', lat: -9.64571, lng: 160.156194, label: 'Solomon Islands' },
    { code: 'SC', lat: -4.679574, lng: 55.491977, label: 'Seychelles' },
    { code: 'SD', lat: 12.862807, lng: 30.217636, label: 'Sudan' },
    { code: 'SE', lat: 60.128161, lng: 18.643501, label: 'Sweden' },
    { code: 'SG', lat: 1.352083, lng: 103.819836, label: 'Singapore' },
    { code: 'SH', lat: -24.143474, lng: -10.030696, label: 'Saint Helena' },
    { code: 'SI', lat: 46.151241, lng: 14.995463, label: 'Slovenia' },
    { code: 'SJ', lat: 77.553604, lng: 23.670272, label: 'Svalbard and Jan Mayen' },
    { code: 'SK', lat: 48.669026, lng: 19.699024, label: 'Slovakia' },
    { code: 'SL', lat: 8.460555, lng: -11.779889, label: 'Sierra Leone', suggested: true },
    { code: 'SM', lat: 43.94236, lng: 12.457777, label: 'San Marino' },
    { code: 'SN', lat: 14.497401, lng: -14.452362, label: 'Senegal' },
    { code: 'SO', lat: 5.152149, lng: 46.199616, label: 'Somalia' },
    { code: 'SR', lat: 3.919305, lng: -56.027783, label: 'Suriname' },
    { code: 'ST', lat: 0.18636, lng: 6.613081, label: 'São Tomé and Príncipe' },
    { code: 'SV', lat: 13.794185, lng: -88.89653, label: 'El Salvador' },
    { code: 'SY', lat: 34.802075, lng: 38.996815, label: 'Syria' },
    { code: 'SZ', lat: -26.522503, lng: 31.465866, label: 'Swaziland' },
    { code: 'TC', lat: 21.694025, lng: -71.797928, label: 'Turks and Caicos Islands' },
    { code: 'TD', lat: 15.454166, lng: 18.732207, label: 'Chad' },
    { code: 'TF', lat: -49.280366, lng: 69.348557, label: 'French Southern Territories' },
    { code: 'TG', lat: 8.619543, lng: 0.824782, label: 'Togo' },
    { code: 'TH', lat: 15.870032, lng: 100.992541, label: 'Thailand' },
    { code: 'TJ', lat: 38.861034, lng: 71.276093, label: 'Tajikistan' },
    { code: 'TK', lat: -8.967363, lng: -171.855881, label: 'Tokelau' },
    { code: 'TL', lat: -8.874217, lng: 125.727539, label: 'Timor-Leste' },
    { code: 'TM', lat: 38.969719, lng: 59.556278, label: 'Turkmenistan' },
    { code: 'TN', lat: 33.886917, lng: 9.537499, label: 'Tunisia' },
    { code: 'TO', lat: -21.178986, lng: -175.198242, label: 'Tonga' },
    { code: 'TR', lat: 38.963745, lng: 35.243322, label: 'Turkey' },
    { code: 'TT', lat: 10.691803, lng: -61.222503, label: 'Trinidad and Tobago' },
    { code: 'TV', lat: -7.109535, lng: 177.64933, label: 'Tuvalu' },
    { code: 'TW', lat: 23.69781, lng: 120.960515, label: 'Taiwan' },
    { code: 'TZ', lat: -6.369028, lng: 34.888822, label: 'Tanzania' },
    { code: 'UA', lat: 48.379433, lng: 31.16558, label: 'Ukraine' },
    { code: 'UG', lat: 1.373333, lng: 32.290275, label: 'Uganda' },
    { code: 'UM', lat: 0, lng: 0, label: 'U.S. Minor Outlying Islands' },
    { code: 'US', lat: 37.09024, lng: -95.712891, label: 'United States' },
    { code: 'UY', lat: -32.522779, lng: -55.765835, label: 'Uruguay' },
    { code: 'UZ', lat: 41.377491, lng: 64.585262, label: 'Uzbekistan' },
    { code: 'VA', lat: 41.902916, lng: 12.453389, label: 'Vatican City' },
    { code: 'VC', lat: 12.984305, lng: -61.287228, label: 'Saint Vincent and the Grenadines' },
    { code: 'VE', lat: 6.42375, lng: -66.58973, label: 'Venezuela' },
    { code: 'VG', lat: 18.420695, lng: -64.639968, label: 'British Virgin Islands' },
    { code: 'VI', lat: 18.335765, lng: -64.896335, label: 'U.S. Virgin Islands' },
    { code: 'VN', lat: 14.058324, lng: 108.277199, label: 'Vietnam' },
    { code: 'VU', lat: -15.376706, lng: 166.959158, label: 'Vanuatu' },
    { code: 'WF', lat: -13.768752, lng: -177.156097, label: 'Wallis and Futuna' },
    { code: 'WS', lat: -13.759029, lng: -172.104629, label: 'Samoa' },
    { code: 'XK', lat: 42.602636, lng: 20.902977, label: 'Kosovo' },
    { code: 'YE', lat: 15.552727, lng: 48.516388, label: 'Yemen' },
    { code: 'YT', lat: -12.8275, lng: 45.166244, label: 'Mayotte' },
    { code: 'ZA', lat: -30.559482, lng: 22.937506, label: 'South Africa' },
    { code: 'ZM', lat: -13.133897, lng: 27.849332, label: 'Zambia' },
    { code: 'ZW', lat: -19.015438, lng: 29.154857, label: 'Zimbabwe' }
];


