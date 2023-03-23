import * as yup from 'yup';


const loginSchema = yup.object().shape({
    label: yup.string().nullable().required("Please enter valid name for Effect"),
    price: yup.number().nullable().required("Please enter valid price"),
    latlong: yup.object().shape({
        lat: yup.number().nullable().required("invalid latitude, please choose from the map"),
        lng: yup.number().nullable().required("invalid longitude, please choose from the map"),
    }).nullable().required("Please enter valid location"),
    street: yup.string().nullable().required("Please enter valid street address for Effect"),
    area: yup.string().nullable().required("Please enter valid area address for Effect"),
    town: yup.string().nullable().required("Please enter valid town address for Effect"),
    propertyType: yup.mixed().oneOf([0, 1, 2, 3]).required("Please enter property type"),
    dealType: yup.mixed().oneOf([0, 1, 2]).required("Please enter deal type"),
    description: yup.string().nullable().required("Please enter valid email"),
    images: yup.array().of(yup.object().shape({
        images: yup.array().of(yup.string()),
        description: yup.string().nullable().required("Please enter valid description"),
        viewType: yup.string().nullable().required("Please enter valid image view type "),
        mainImagePath: yup.string().nullable().required("Please enter valid image view type"),
        isEffectMain: yup.string().nullable().required("please select main image"),
    })).nullable().required("Please add at least one image for this effect"),
})

const imageValidation = yup.object().shape({
    description: yup.string().nullable().required("please enter valid discriptions of this image/images"),
    mainIndex: yup.number().nullable().required("please select main image that will be set as cover for this "),
});
export {loginSchema,imageValidation}