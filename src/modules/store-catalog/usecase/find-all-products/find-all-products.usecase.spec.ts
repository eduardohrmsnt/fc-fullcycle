
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product = new Product({
    id: new Id("3"),
    name: "Eduardo",
    description: "Descricao",
    salesPrice: 10
})

const product2 = new Product({
    id: new Id("3"),
    name: "Eduardo2",
    description: "Descricao2",
    salesPrice: 12
})

const MockRepository = () =>{
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
        find: jest.fn()
    }
}

describe("Find all products use case unit test", () => {
    it("should find all products", async () => {
        const productRepository = MockRepository();

        const usecase = new FindAllProductsUseCase(productRepository);

        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product.id.id);
        expect(result.products[0].name).toBe(product.name);
        expect(result.products[0].description).toBe(product.description);
        expect(result.products[0].salesPrice).toBe(product.salesPrice);
        expect(result.products[1].id).toBe(product2.id.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].description).toBe(product2.description);
        expect(result.products[1].salesPrice).toBe(product2.salesPrice);
    })
})