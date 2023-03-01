import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import ProductModel from "../../repository/product.model"
import FindProductUseCase from "./find-product.usecase"

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product description",
    salesPrice: 10
})

const MockRepository = () =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}
describe("Find product use case test", () => {
    it("Should return a product", async ()=> {
        const productRepository = MockRepository();

        const usecase = new FindProductUseCase(productRepository);

        const input = {
            productId: product.id.id
        }

        const result = await usecase.execute(input);


        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(product.id.id);
        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
        expect(result.salesPrice).toBe(product.salesPrice);
    })
})