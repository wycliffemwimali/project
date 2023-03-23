import { Agent } from "http"
import Effect from "./effect"
import { User } from "./user"

class Location {
    street: string = ""
    city: string = ""
    region: string = ""
    lat: number | null = null
    lng: number | null = null
}

export enum PropertyType {
    Land = "Land",
    Home = "Homes",
    Site = "Sites",
    Office = "Offices",
}

export enum DealType {
    ForSale = "ForSale",
    ForRent = "Land",
    ForLease = "ForLease"
}



export default class Order {
    private _orderBy: User = new User({
        id: "",
        name: "",
        email: "",
        refId: "",
        role: "",
        image: "",
        wishlist: [],
        phone: ""
    });
    private _effect: Effect = new Effect();
    private _agent: Agent = new Agent();
    private _id: string = "";


    Order({ id, agent, orderBy, effect,
    }:
        {
            id: string,
            agent: Agent,
            orderBy: User,
            effect: Effect,
        }) {
        this._id = id;
        this._agent = agent;
        this._effect = effect;
        this._orderBy = orderBy;
    }

    get orderBy() {
        return this._orderBy;
    }

    get agent() {
        return this._agent;
    }

    get effect() {
        return this._effect;
    }

    get id() {
        return this._id;
    }

}

