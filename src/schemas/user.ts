export class User {

    // private _createdAt:  string = new Date().toISOString()
    // private _deletedAt: string = new Date().toISOString()
    // private _updatedAt:  string = new Date().toISOString()

    private _name: string = "";
    private _email: string = "";
    private _phone: string = "";
    private _role: string = "";
    private _image: string = "";
    private _wishlist: Array<string> = [];
    // private _orders: Array<string> = [];
    private _id: string = "";
    private _refId: string = "";

    //  refId,

    constructor({ id, name, email, role, image, wishlist, phone,
        // orders, 
        refId
    }:
        {
            id: string,
            name: string, email: string,
            refId: string,
            role: string,
            image: string, wishlist: Array<string>,
            phone: string
            // createdAt:string,updatedAt:string,deletedAt:string
        }) {
        this._role = role;
        this._wishlist = wishlist;
        this._email = email;
        this._name = name;
        this._image = image;
        this._phone = phone;
        // this._createdAt=createdAt;
        // this._updatedAt=updatedAt;
        // this._deletedAt=deletedAt;
        this._id = id;
        this._refId = refId;
    }
    public get name() {
        return this._name;
    }

    public get email() {
        return this._email;
    }

    public get role() {
        return this._role;
    }

    public get wishlist() {
        return this._wishlist;
    }

    public get image() {
        return this._image;
    }
    public get id() {
        return this._id;
    }
    public get phone() {
        return this._phone;
    }

    // public get orders() {
    //     return this._orders;
    // }

    public get refId() {
        return this._refId;
    }



    public set refId(refId: string) {
        this._refId = refId;
    }

    // public set orders(orders: Array<string>) {
    //     this._orders = orders;
    // }

    public set phone(phone: string) {
        this._phone = phone;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set email(email: string) {
        this._email = email;
    }


    public set wishlist(wishlist: Array<string>) {
        this._wishlist = wishlist;
    }

    public set image(image: string) {
        this._image = image;
    }

}


export namespace User {
    export function toAuthObject(usr: User, password: string): Object {
        return (
            {
                phoneNumber: usr.phone,
                name: usr.name,
                email: usr.email,
                password: password
            }
        )
    }


    export function toObject(usr: User): Object {
        return (
            {
                role: usr.role,
                email: usr.email,
                wishlist: usr.wishlist,
                name: usr.name,
                image: usr.image,
                phone: usr.phone,
                id: usr.id,
                refId: usr.refId,
            }
        )
    }

    export function fromObject({
        role,
        email,
        wishlist,
        name,
        image,
        phone,
        id,
        refId,
    }: {
        role: string,
        email: string,
        wishlist: string[],
        name: string,
        image: string,
        phone: string,
        id: string,
        refId: string,
    }): User {
        return new User({
            role,
            email,
            id,
            image,
            name,
            phone,
            refId,
            wishlist,
        })
    }

}