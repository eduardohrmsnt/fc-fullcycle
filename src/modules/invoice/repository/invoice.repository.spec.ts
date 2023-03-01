import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import Address from "../domain/value-objects/address.value-object";
import { InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import { ProductModel } from "./product.model";

describe("Invoice Repository teste", () => {
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

        const invoiceRepository = new InvoiceRepository();

        const productFind = await invoiceRepository.find(invoice.id.id);

        expect(productFind.id.id).toEqual(invoice.id.id);
        expect(productFind.name).toEqual(invoice.name);
        expect(productFind.document).toEqual(invoice.document);

    })


    it("should save an invoice", async () => {

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


        const invoiceRepository = new InvoiceRepository();

        const invoiceFind = await invoiceRepository.save(invoice);

        expect(invoiceFind.id.id).toEqual(invoice.id.id);
        expect(invoiceFind.name).toEqual(invoice.name);
        expect(invoiceFind.document).toEqual(invoice.document);

    })
})