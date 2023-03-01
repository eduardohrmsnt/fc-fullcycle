import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductModel } from "./product.model";

@Table({
    tableName: "invoices",
    timestamps: false
})
export class InvoiceModel extends Model{

    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    document: string;

    @Column({allowNull: false})
    street: string;

    @Column({allowNull: false})
    number: number;

    @Column({allowNull: false})
    state: string;

    @Column({allowNull: false})
    city: string;

    @Column({allowNull: true})
    complement: string;

    @Column({allowNull: false})
    zip: string;
    
    @HasMany(() => ProductModel)
    declare items: ProductModel[];
}