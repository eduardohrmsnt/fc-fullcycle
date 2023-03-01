import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import Address from "../domain/value-objects/address.value-object";
import InvoiceFacadeFactory from "../factory/facade.factory";
import { InvoiceModel } from "../repository/invoice.model";
import { ProductModel } from "../repository/product.model";

describe("Product Repository teste", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([ProductModel, InvoiceModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should find an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const invoice = new Invoice({
            id: new Id("1"),
            name: "Nota top",
            document: "00000031",
            address: new Address({
                city: "Luiz Alves",
                state: "SC",
                street: "Rua 3 de Janeiro",
                zip: "89128000",
                number: 305
            }),
            items: [
                new Product({
                    id: new Id("1"),
                    name: "Produto 1",
                    price: 10
                }),
                new Product({
                    id: new Id("2"),
                    name: "Produto 2",
                    price: 10
                })
            ]
        })

        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            city: invoice.address.city,
            state: invoice.address.state,
            street: invoice.address.street,
            zip: invoice.address.zip,
            complement: invoice.address.complement,
            number: invoice.address.number,
            items: invoice.items.map((product) => { return { id: product.id.id, price: product.price, name: product.name }})
        },
        {
            include: [{ model: ProductModel }],
        })


        const result = await facade.find({ id: "1" } );


        expect(result.id).toBe("1");
        expect(result.name).toBe("Nota top");
        expect(result.document).toBe("00000031");
    })

    it("Should Generate an invoice ", async  () => {
        const facade = InvoiceFacadeFactory.create()

        const input = {
            name: "Nota top",
            document: "00000031",
            street: "Rua 3 de Janeiro",
            number: 305,
            complement: "Oi",
            city: "Luiz Alves",
            state: "SC",
            zipCode: "89128000",
            items: [
                {
                    id: "1",
                    name: "Produto 1",
                    price: 10
                },
                {
                    id: "2",
                    name: "Produto 2",
                    price: 10
                }
            ]
        }

        const result = await facade.generate(input);

        expect(result.id).toBeDefined();
        expect(result.items).toHaveLength(2),
        expect(result.total).toBe(20);
    })
})