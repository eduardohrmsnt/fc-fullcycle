import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Product from "./product.entity";
import Address from "./value-objects/address.value-object";

export interface InvoiceProps{
    id?: Id; 
    name: string
    document: string
    address: Address 
    items: Product[]
    createdAt?: Date
    updatedAt?: Date
}

export default class Invoice extends BaseEntity implements AggregateRoot{
    private _name: string
    private _document: string
    private _address: Address 
    private _items: Product[]

    constructor(props: InvoiceProps){
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name
        this._document = props.document
        this._address = props.address
        this._items = props.items
        this.validate();
    }


    validate(): void{
        if(this._items.length === 0)
            throw new Error("At least one item should be added");
        if(this._address === undefined)
            throw new Error("Address is required");
        if(this._document.length === 0)
            throw new Error("Document is required");
        if(this._name.length === 0)
            throw new Error("Name is required");
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }

    get name(): string{
        return this._name;
    }

    get items(): Product[]{
        return this._items
    }

    get document(): string{
        return this._document;
    }

    get address(): Address{
        return this._address;
    }
}