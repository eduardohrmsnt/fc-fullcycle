import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import CheckStockUseCase from "./check-stock.usecase"

const product = new Product({
    id: new Id("1"),
    name: "Product",
    description: "Esse produto",
    purchasePrice: 10,
    stock: 10
})


const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}
describe("CheckStock usecase unit test", () =>{
    it("Should get stock of a product", async () => {
        const productRepository = MockRepository();

        const checkStockUseCase = new CheckStockUseCase(productRepository);

        const input = {
            productId: "1"
        };

        const result = await checkStockUseCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.productId).toEqual(product.id.id);
        expect(result.stock).toEqual(product.stock);
    })
})