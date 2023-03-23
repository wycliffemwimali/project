// @ts-nocheck
export type Location = {
    street: string | null,
    area: string | null,
    town: string | null,
    lat: number | null,
    lng: number | null,

}

// export enum PropertyType {
//     Land = "Land",
//     Home = "Homes",
//     Site = "Sites",
//     Office = "Offices",
// }
export enum PropertyType {
Any = -1,
Land = 0,
Home = 1,
Site = 2,
Office = 3,
}


export enum DealType {
    Any = -1,
    ForSale = 0,
    ForRent=1,
    ForLease=2,
}
// export enum DealType {
//     ForSale = "ForSale",
//     ForRent = "ForRent",
//     ForLease = "ForLease",

// }
export type Images = {
    images: string[],
    description: string,
    viewType: string,
    isEffectMain: boolean,
    mainImageIndex: number,
    mainImagePath:string,
}

export default class Effect {

    // private _createdAt: string = new Date().toISOString();
    // private _deletedAt: string = new Date().toISOString();
    // private _updatedAt: string = new Date().toISOString();
    private _dealType: DealType = DealType.ForLease;
    private _propertyType: PropertyType = PropertyType.Home;
    private _name: string = "";
    private _images: Array<Images> = [];
    private _cost: string = "";
    private _location: Location | null = null;
    private _about: string = "";
    private _refId: string = "";
    private _id: string = "";

    constructor();
    fromJson=({ id, name, images, cost, location, about, 
        dealType, propertyType, refId }:
        {
            id: string,
            name: string, images: Array<Images>,
            cost: string, location: Location | null, about: string,
            // createdAt: string, deletedAt: string, updatedAt: string, 
            dealType: DealType, propertyType: PropertyType
            refId: string
        }) =>{
        this._name = name;
        this._images = images;
        this._cost = cost;
        this._location = location;
        this._about = about;
        this._id = id;
        // this._createdAt = createdAt;
        // this._deletedAt = deletedAt;
        // this._updatedAt = updatedAt;
        this._propertyType = propertyType;

        this._dealType = dealType;
        this._refId = refId;
        
        return this;
    }

    get name() {
        return this._name;
    }
    get images() {
        return this._images;
    }
    get cost() {
        return this._cost;
    }
    get location() {
        return this._location;
    }
    get about() {
        return this._about;
    }
    get id() {
        return this._id;
    }


    get refId() {
        return this._refId;
    }
    get dealType() {
        return this._dealType;
    }
    get propertyType() {
        return this._propertyType;
    }
    // get createdAt() {
    //     return this._createdAt;
    // }
    // get updatedAt() {
    //     return this._updatedAt;
    // }
    // get deletedAt() {
    //     return this._deletedAt;
    // }

    set name(nme: string) {
        this._name = nme;
    }
    set images(img: Array<Images>) {
        this._images = img;
    }
    set cost(cost: string) {
        this._cost = cost;
    }
    set location(loc: Location | null) {
        this._location = loc;
    }

    set about(abt: string) {
        this._about = abt;
    }
}

