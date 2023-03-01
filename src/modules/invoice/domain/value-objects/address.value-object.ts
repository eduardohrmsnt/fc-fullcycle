import ValueObject from "../../../@shared/domain/value-object/value-object.interface";

export interface AddressProps{
    street: string, number: number, zip: string, city: string, state: string, complement?: string
}
export default class Address implements ValueObject{
    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";
    _state: string = "";
    _complement: string = "";

    constructor(props: AddressProps){
        this._street = props.street;
        this._number = props.number;
        this._zip = props.zip;
        this._city = props.city;
        this._state = props.state;
        this._complement = props.complement;

        this.validate();
    }

    get street() : string {
        return this._street;
    }
    get zip() : string {
        return this._zip;
    }
    get city() : string {
        return this._city;
    }
    get number() : number {
        return this._number;
    }
    get complement() : string {
        return this._complement;
    }
    get state() : string {
        return this._state;
    }

    validate(){
        if(this._street.length === 0){
            throw new Error("Street is required");
        }
        if(this._number === 0){
            throw new Error("Number is required");
        }
        
        if(this._zip.length === 0){
            throw new Error("Zip is required");
        }
        
        if(this._city.length === 0){
            throw new Error("City is required");
        }

        if(this._state.length === 0){
            throw new Error("State is required");
        }
    }

    toString() : string{
        return `${this._street}, ${this._number}, ${this._zip} ${this._city}, ${this._state}`;
    }
}