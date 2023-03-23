import Effect from "./effect";

export default class WishList {

    private _id: string = "";
    private _product: Effect = new Effect();

   public WishList({id,product}:{id:string,product:Effect}){
        this._id=id;
        this._product=product;
    }


    get id(){return this._id}
    get productID(){return this._product}

}