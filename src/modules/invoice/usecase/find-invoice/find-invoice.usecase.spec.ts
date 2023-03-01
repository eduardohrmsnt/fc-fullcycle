import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import Address from "../../domain/value-objects/address.value-object";
import FindInvoiceUseCase from "./find-invocie.usecase";

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


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        save: jest.fn()
    }
}

describe("FindInvoiceUseCase unit test", () => {
    it("Should find an invoice ", async  () => {
        const repository = MockRepository();

        const useCase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1"
        }

        const result = await useCase.execute(input);

        expect(result.id).toBe(invoice.id.id);
        expect(result.items).toHaveLength(2),
        expect(result.total).toBe(20);
    })
})