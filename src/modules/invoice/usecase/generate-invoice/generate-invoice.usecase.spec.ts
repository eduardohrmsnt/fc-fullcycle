import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import Address from "../../domain/value-objects/address.value-object";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const invoice = new Invoice({
    id: new Id("1"),
    name: "Nota top",
    document: "00000031",
    address: new Address({
        city: "Luiz Alves",
        state: "SC",
        street: "Rua 3 de Janeiro",
        zip: "89128000",
        complement: "Oi",
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


const MockRepository = () => {
    return {
        find: jest.fn(),
        save: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("GenerateInvoiceUseCase unit test", () => {
    it("Should Generate an invoice ", async  () => {
        const repository = MockRepository();

        const useCase = new GenerateInvoiceUseCase(repository);

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

        const result = await useCase.execute(input);

        expect(result.id).toBe(invoice.id.id);
        expect(result.items).toHaveLength(2),
        expect(result.total).toBe(20);
    })
})