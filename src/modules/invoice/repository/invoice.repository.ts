import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import Address from "../domain/value-objects/address.value-object";
import InvoiceGateway from "./invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { ProductModel } from "./product.model";

export default class InvoiceRepository implements InvoiceGateway {
    async save(invoice: Invoice): Promise<Invoice> {
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
            items: invoice.items.map((product) => { return { id: product.id.id, price: product.price, name: product.name } })
        },
            {
                include: [{ model: ProductModel }],
            })

        return invoice;
    }

    async find(id: string): Promise<Invoice> {
        let invoiceModel = await InvoiceModel.findOne({ where: { id }, include: ["items"] });

        let items = invoiceModel.items.map((item) => new Product({ id: new Id(item.id), name: item.name, price: item.price}))

        let invoice = new Invoice({
            id: new Id(invoiceModel.id),
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: new Address({
                city: invoiceModel.city,
                state: invoiceModel.state,
                street: invoiceModel.street,
                zip: invoiceModel.zip,
                complement: invoiceModel.complement,
                number: invoiceModel.number
            }),
            items: items
        })

        return invoice;
    }
}