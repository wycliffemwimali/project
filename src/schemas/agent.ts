export default class Agent {

    // private _createdAt: number = Date.now();
    // private _deletedAt: number = Date.now();
    // private _updatedAt: number = Date.now();
    
    private _name: string = "";
    private _image: string = "";
    private _about: string = "";
    private _rating: number = 0;
    private _refId: string = "";
    private _id: string = "";

   public Agent({ rating,refId,id,name, image, about }: { rating:number,refId:string,id:string,name: string, image: string, about: string }) {
        this._name = name;
        this._about = about;
        this._image = image;
        this._rating=rating;
        this._refId=refId;
        this._id=id;
    }

    public get name() {
        return this._name;
    }

    public get image() {
        return this._image;
    }

    public get about() {
        return this._about;
    }

    public get refId() {
        return this._refId;
    }

    public get rating() {
        return this._rating;
    }

    public get id() {
        return this._id;
    }

}